import {
  MarketAssetSnapshot,
  MarketDataSnapshot,
  MarketResponse,
  MarketTickerItem,
} from "@/types/market";
import { MARKET_ASSETS_CONFIG } from "@/lib/market-config";
import { formatAssetValue, formatMarketTimeUTC } from "@/lib/formatters";
import { getMacroIndicatorsData } from "@/lib/macro-provider";

// Server memory cache to preserve valid prices & prevent API rate limiting
const serverCacheMap = new Map<string, MarketAssetSnapshot>();
let lastSnapshot: MarketDataSnapshot | null = null;
let lastSnapshotTime = 0;

function isValidNumber(val: unknown): val is number {
  return typeof val === "number" && !isNaN(val) && isFinite(val);
}

// 1. Fetcher for Crypto via Bitstamp REST
async function fetchCryptoData(): Promise<Map<string, Partial<MarketAssetSnapshot>>> {
  const map = new Map<string, Partial<MarketAssetSnapshot>>();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  const nowIso = new Date().toISOString();

  try {
    const [btcRes, ethRes] = await Promise.all([
      fetch("https://www.bitstamp.net/api/v2/ticker/btcusd/", {
        signal: controller.signal,
        cache: "no-store",
      }).catch(() => null),
      fetch("https://www.bitstamp.net/api/v2/ticker/ethusd/", {
        signal: controller.signal,
        cache: "no-store",
      }).catch(() => null),
    ]);
    clearTimeout(timeout);

    if (btcRes && btcRes.ok) {
      const btc = await btcRes.json();
      const price = parseFloat(btc.last);
      const change = parseFloat(btc.percent_change_24);
      const tsMs = parseInt(btc.timestamp, 10) * 1000;
      const sourceTsIso = !isNaN(tsMs) ? new Date(tsMs).toISOString() : nowIso;

      if (isValidNumber(price) && price > 0) {
        map.set("BTC/USD", {
          symbol: "BTC/USD",
          name: "Bitcoin",
          price,
          formattedPrice: formatAssetValue(price, "USD"),
          currency: "USD",
          changePercent: isValidNumber(change) ? Number(change.toFixed(2)) : 0,
          direction: isValidNumber(change) && change > 0 ? "up" : change < 0 ? "down" : "neutral",
          sourceTimestamp: sourceTsIso,
          receivedAt: nowIso,
          marketState: "open",
          quoteStatus: "realtime",
          source: "Bitstamp",
        });
      }
    }

    if (ethRes && ethRes.ok) {
      const eth = await ethRes.json();
      const price = parseFloat(eth.last);
      const change = parseFloat(eth.percent_change_24);
      const tsMs = parseInt(eth.timestamp, 10) * 1000;
      const sourceTsIso = !isNaN(tsMs) ? new Date(tsMs).toISOString() : nowIso;

      if (isValidNumber(price) && price > 0) {
        map.set("ETH/USD", {
          symbol: "ETH/USD",
          name: "Ethereum",
          price,
          formattedPrice: formatAssetValue(price, "USD"),
          currency: "USD",
          changePercent: isValidNumber(change) ? Number(change.toFixed(2)) : 0,
          direction: isValidNumber(change) && change > 0 ? "up" : change < 0 ? "down" : "neutral",
          sourceTimestamp: sourceTsIso,
          receivedAt: nowIso,
          marketState: "open",
          quoteStatus: "realtime",
          source: "Bitstamp",
        });
      }
    }
  } catch (err) {
    console.error("[Bitstamp REST fetch error]:", err);
  }
  return map;
}

// 2. Fetcher for Forex & B3 Indices via brapi.dev & AwesomeAPI Fallback
async function fetchBrapiData(): Promise<Map<string, Partial<MarketAssetSnapshot>>> {
  const map = new Map<string, Partial<MarketAssetSnapshot>>();
  const token = process.env.BRAPI_TOKEN;
  const nowIso = new Date().toISOString();

  if (token) {
    const url = `https://brapi.dev/api/quote/USD-BRL,%5EBVSP?token=${encodeURIComponent(token)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const results = data.results || [];

        for (const item of results) {
          if (item.symbol === "USD-BRL") {
            const price = isValidNumber(item.regularMarketPrice) ? item.regularMarketPrice : null;
            const change = isValidNumber(item.regularMarketChangePercent) ? item.regularMarketChangePercent : null;
            const isOpen = item.marketState?.toLowerCase() === "open";
            if (price !== null) {
              map.set("USD/BRL", {
                symbol: "USD/BRL",
                name: "Dólar Comercial",
                price,
                formattedPrice: formatAssetValue(price, "BRL"),
                currency: "BRL",
                changePercent: change !== null ? Number(change.toFixed(2)) : null,
                direction: change === null || change === 0 ? "neutral" : change > 0 ? "up" : "down",
                sourceTimestamp: item.regularMarketTime ? new Date(item.regularMarketTime).toISOString() : nowIso,
                receivedAt: nowIso,
                marketState: isOpen ? "open" : "closed",
                quoteStatus: isOpen ? "realtime" : "close",
                source: "brapi.dev",
              });
            }
          }
          if (item.symbol === "^BVSP") {
            const price = isValidNumber(item.regularMarketPrice) ? item.regularMarketPrice : null;
            const change = isValidNumber(item.regularMarketChangePercent) ? item.regularMarketChangePercent : null;
            const isOpen = item.marketState?.toLowerCase() === "open";
            if (price !== null) {
              map.set("IBOV", {
                symbol: "IBOV",
                name: "Ibovespa",
                price,
                formattedPrice: formatAssetValue(price, "POINTS"),
                currency: "POINTS",
                changePercent: change !== null ? Number(change.toFixed(2)) : null,
                direction: change === null || change === 0 ? "neutral" : change > 0 ? "up" : "down",
                sourceTimestamp: item.regularMarketTime ? new Date(item.regularMarketTime).toISOString() : nowIso,
                receivedAt: nowIso,
                marketState: isOpen ? "open" : "closed",
                quoteStatus: isOpen ? "realtime" : "close",
                source: "brapi.dev",
              });
            }
          }
        }
      }
    } catch {
      // Silently fall back to AwesomeAPI
    }
  }

  // AwesomeAPI Fallback for Currencies
  const missingCurrencies = ["USD/BRL", "EUR/BRL", "GBP/BRL"].filter((k) => !map.has(k));
  if (missingCurrencies.length > 0) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    try {
      const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL", {
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeout);
      if (res.ok) {
        const json = await res.json();
        const processAwesomeItem = (key: string, symbol: string, name: string) => {
          if (json[key] && !map.has(symbol)) {
            const price = parseFloat(json[key].bid);
            const change = parseFloat(json[key].pctChange);
            const tsMs = parseInt(json[key].timestamp, 10) * 1000;
            if (isValidNumber(price)) {
              map.set(symbol, {
                symbol,
                name,
                price,
                formattedPrice: formatAssetValue(price, "BRL"),
                currency: "BRL",
                changePercent: isValidNumber(change) ? Number(change.toFixed(2)) : null,
                direction: !isValidNumber(change) || change === 0 ? "neutral" : change > 0 ? "up" : "down",
                sourceTimestamp: !isNaN(tsMs) ? new Date(tsMs).toISOString() : nowIso,
                receivedAt: nowIso,
                marketState: "open",
                quoteStatus: "realtime",
                source: `AwesomeAPI (${symbol})`,
              });
            }
          }
        };

        processAwesomeItem("USDBRL", "USD/BRL", "Dólar Comercial");
        processAwesomeItem("EURBRL", "EUR/BRL", "Euro");
        processAwesomeItem("GBPBRL", "GBP/BRL", "Libra Esterlina");
      }
    } catch {
      // Skip if offline
    }
  }

  // Yahoo Finance Fallback for Ibovespa
  if (!map.has("IBOV")) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    try {
      const res = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/%5EBVSP?interval=1d&range=1d", {
        signal: controller.signal,
        headers: { "User-Agent": "Mozilla/5.0" },
        cache: "no-store",
      });
      clearTimeout(timeout);
      if (res.ok) {
        const json = await res.json();
        const meta = json?.chart?.result?.[0]?.meta;
        if (meta) {
          const price = isValidNumber(meta.regularMarketPrice) ? meta.regularMarketPrice : null;
          const prevClose = isValidNumber(meta.chartPreviousClose) ? meta.chartPreviousClose : meta.previousClose;
          let changePercent: number | null = null;
          if (price !== null && isValidNumber(prevClose) && prevClose > 0) {
            changePercent = Number((((price - prevClose) / prevClose) * 100).toFixed(2));
          }
          if (price !== null) {
            map.set("IBOV", {
              symbol: "IBOV",
              name: "Ibovespa",
              price,
              formattedPrice: formatAssetValue(price, "POINTS"),
              currency: "POINTS",
              changePercent,
              direction: changePercent === null || changePercent === 0 ? "neutral" : changePercent > 0 ? "up" : "down",
              sourceTimestamp: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : nowIso,
              receivedAt: nowIso,
              marketState: "open",
              quoteStatus: "realtime",
              source: "Yahoo Finance (IBOV)",
            });
          }
        }
      }
    } catch {
      // Skip if offline
    }
  }

  return map;
}

// 3. Fetcher for International Indices & Gold via Twelve Data or Yahoo Finance Fallback
async function fetchTwelveData(): Promise<Map<string, Partial<MarketAssetSnapshot>>> {
  const map = new Map<string, Partial<MarketAssetSnapshot>>();
  const apiKey = process.env.TWELVE_DATA_API_KEY;
  const nowIso = new Date().toISOString();

  if (apiKey) {
    const url = `https://api.twelvedata.com/quote?symbol=SPX,IXIC,VIX,XAU/USD,DJI&apikey=${encodeURIComponent(apiKey)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const parseTwelveItem = (itemData: Record<string, unknown> | undefined, symbolKey: string, name: string, currency: "USD" | "POINTS") => {
          if (!itemData || itemData.code) return;
          const price = parseFloat(String(itemData.close || itemData.price));
          const change = parseFloat(String(itemData.percent_change));
          const isOpen = Boolean(itemData.is_market_open);
          if (isValidNumber(price)) {
            map.set(symbolKey, {
              symbol: symbolKey,
              name,
              price,
              formattedPrice: formatAssetValue(price, currency),
              currency,
              changePercent: isValidNumber(change) ? Number(change.toFixed(2)) : null,
              direction: !isValidNumber(change) || change === 0 ? "neutral" : change > 0 ? "up" : "down",
              sourceTimestamp: itemData.timestamp ? new Date(Number(itemData.timestamp) * 1000).toISOString() : nowIso,
              receivedAt: nowIso,
              marketState: isOpen ? "open" : "closed",
              quoteStatus: isOpen ? "realtime" : "close",
              source: "Twelve Data",
            });
          }
        };

        parseTwelveItem(data["SPX"], "S&P 500", "S&P 500", "POINTS");
        parseTwelveItem(data["IXIC"], "NASDAQ", "Nasdaq Composite", "POINTS");
        parseTwelveItem(data["VIX"], "VIX", "VIX Volatilidade", "POINTS");
        parseTwelveItem(data["XAU/USD"], "XAU/USD", "Ouro Spot", "USD");
        parseTwelveItem(data["DJI"], "DJI", "Dow Jones", "POINTS");
      }
    } catch (err) {
      console.error("[Twelve Data fetch error]:", err);
    }
  }

  // Public Yahoo Finance Fallback
  const missingKeys = [
    { key: "S&P 500", symbol: "^GSPC", name: "S&P 500", curr: "POINTS" as const },
    { key: "NASDAQ", symbol: "^IXIC", name: "Nasdaq Composite", curr: "POINTS" as const },
    { key: "VIX", symbol: "^VIX", name: "VIX Volatilidade", curr: "POINTS" as const },
    { key: "XAU/USD", symbol: "GC=F", name: "Ouro Spot", curr: "USD" as const },
    { key: "DJI", symbol: "^DJI", name: "Dow Jones", curr: "POINTS" as const },
  ].filter((k) => !map.has(k.key));

  for (const item of missingKeys) {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(item.symbol)}?interval=1d&range=1d`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { "User-Agent": "Mozilla/5.0" },
        cache: "no-store",
      }).catch(() => null);
      clearTimeout(timeout);

      if (res && res.ok) {
        const json = await res.json();
        const meta = json?.chart?.result?.[0]?.meta;
        if (meta) {
          const price = isValidNumber(meta.regularMarketPrice) ? meta.regularMarketPrice : null;
          const prevClose = isValidNumber(meta.chartPreviousClose) ? meta.chartPreviousClose : meta.previousClose;
          let changePercent: number | null = null;
          if (price !== null && isValidNumber(prevClose) && prevClose > 0) {
            changePercent = Number((((price - prevClose) / prevClose) * 100).toFixed(2));
          }
          if (price !== null) {
            map.set(item.key, {
              symbol: item.key,
              name: item.name,
              price,
              formattedPrice: formatAssetValue(price, item.curr),
              currency: item.curr,
              changePercent,
              direction: changePercent === null || changePercent === 0 ? "neutral" : changePercent > 0 ? "up" : "down",
              sourceTimestamp: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : nowIso,
              receivedAt: nowIso,
              marketState: "open",
              quoteStatus: "realtime",
              source: "Yahoo Finance",
            });
          }
        }
      }
    } catch {
      // Skip if offline
    }
  }

  return map;
}

// Master Server Snapshot Generator
export async function getCanonicalMarketSnapshot(): Promise<MarketDataSnapshot> {
  const nowMs = Date.now();
  const nowIso = new Date(nowMs).toISOString();

  // Return server-cached snapshot if generated < 10 seconds ago
  if (lastSnapshot && nowMs - lastSnapshotTime < 10000) {
    return lastSnapshot;
  }

  // Fetch all categories in parallel with error boundaries
  const [cryptoData, brapiData, twelveData, macroData] = await Promise.all([
    fetchCryptoData().catch(() => new Map()),
    fetchBrapiData().catch(() => new Map()),
    fetchTwelveData().catch(() => new Map()),
    getMacroIndicatorsData().catch(() => null),
  ]);

  const assets: Record<string, MarketAssetSnapshot> = {};
  let hasErrors = false;

  const masterList = [
    { key: "USD/BRL", data: brapiData.get("USD/BRL") },
    { key: "EUR/BRL", data: brapiData.get("EUR/BRL") },
    { key: "GBP/BRL", data: brapiData.get("GBP/BRL") },
    { key: "XAU/USD", data: twelveData.get("XAU/USD") },
    { key: "S&P 500", data: twelveData.get("S&P 500") },
    { key: "NASDAQ", data: twelveData.get("NASDAQ") },
    { key: "IBOV", data: brapiData.get("IBOV") },
    { key: "DJI", data: twelveData.get("DJI") },
    { key: "VIX", data: twelveData.get("VIX") },
    { key: "BTC/USD", data: cryptoData.get("BTC/USD") },
    { key: "ETH/USD", data: cryptoData.get("ETH/USD") },
  ];

  for (const item of masterList) {
    const config = MARKET_ASSETS_CONFIG[item.key];
    const fetched = item.data;

    if (fetched && isValidNumber(fetched.price) && fetched.price > 0) {
      const snapshot: MarketAssetSnapshot = {
        symbol: config.symbol,
        name: config.name,
        price: fetched.price,
        formattedPrice: fetched.formattedPrice || formatAssetValue(fetched.price, config.currency),
        currency: config.currency,
        changePercent: fetched.changePercent ?? null,
        direction: fetched.direction || "neutral",
        sourceTimestamp: fetched.sourceTimestamp || nowIso,
        receivedAt: nowIso,
        marketState: fetched.marketState || "open",
        quoteStatus: fetched.quoteStatus || "realtime",
        source: fetched.source || "API",
      };
      serverCacheMap.set(config.symbol, snapshot);
      assets[config.symbol] = snapshot;
    } else {
      // Use cached snapshot if available on server
      const cached = serverCacheMap.get(config.symbol);
      if (cached && cached.price !== null) {
        assets[config.symbol] = {
          ...cached,
          quoteStatus: "stale",
          source: `${cached.source} (Cache)`,
        };
      } else {
        hasErrors = true;
        // Fallback for unavailable assets (NO fake hardcoded prices pretending to be live)
        assets[config.symbol] = {
          symbol: config.symbol,
          name: config.name,
          price: null,
          formattedPrice: "—",
          currency: config.currency,
          changePercent: null,
          direction: "neutral",
          sourceTimestamp: nowIso,
          receivedAt: nowIso,
          marketState: "closed",
          quoteStatus: "unavailable",
          source: "Servidor HDZ",
        };
      }
    }
  }

  // Macro Indicators (Selic & IPCA)
  if (macroData) {
    assets["SELIC"] = {
      symbol: "SELIC",
      name: "Taxa Selic",
      price: macroData.selic.value,
      formattedPrice: macroData.selic.formattedValue,
      currency: "%",
      changePercent: null,
      direction: "neutral",
      sourceTimestamp: nowIso,
      receivedAt: nowIso,
      marketState: "reference",
      quoteStatus: macroData.selic.status === "official" ? "reference" : "stale",
      source: "BCB SGS 432",
      referenceDate: macroData.selic.referenceDate,
    };

    assets["IPCA12M"] = {
      symbol: "IPCA12M",
      name: "IPCA 12m",
      price: macroData.ipca12m.value,
      formattedPrice: macroData.ipca12m.formattedValue,
      currency: "%",
      changePercent: null,
      direction: "neutral",
      sourceTimestamp: nowIso,
      receivedAt: nowIso,
      marketState: "reference",
      quoteStatus: macroData.ipca12m.status === "official" ? "reference" : "stale",
      source: "IBGE / BCB SGS 13522",
      referenceMonth: macroData.ipca12m.referenceMonth,
    };
  }

  const snapshot: MarketDataSnapshot = {
    snapshotId: `snap_${nowMs.toString(36)}`,
    generatedAt: nowIso,
    timezone: "UTC",
    assets,
    hasErrors,
  };

  lastSnapshot = snapshot;
  lastSnapshotTime = nowMs;
  return snapshot;
}

// Backwards Compatible Wrapper for Legacy `/api/markets` Consumers
export async function getMarketTickerData(): Promise<MarketResponse> {
  const snapshot = await getCanonicalMarketSnapshot();
  const brasiliaTime = formatMarketTimeUTC(snapshot.generatedAt);

  const items: MarketTickerItem[] = Object.values(snapshot.assets).map((asset) => ({
    symbol: asset.symbol,
    name: asset.name,
    price: asset.price,
    formattedPrice: asset.formattedPrice,
    currency: asset.currency,
    changePercent: asset.changePercent,
    direction: asset.direction,
    lastUpdated: brasiliaTime,
    marketState: asset.marketState === "closed" ? "closed" : "open",
    isStale: asset.quoteStatus === "stale" || asset.quoteStatus === "unavailable",
    source: asset.source,
    quoteStatus: asset.quoteStatus,
    sourceTimestamp: asset.sourceTimestamp,
  }));

  return {
    items,
    fetchedAt: brasiliaTime,
    hasErrors: snapshot.hasErrors,
    snapshotId: snapshot.snapshotId,
    generatedAt: snapshot.generatedAt,
  };
}
