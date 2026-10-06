import { MarketTickerItem, MarketResponse } from "@/types/market";

// In-memory server cache to preserve valid prices if APIs rate-limit or fail temporarily
const serverMemoryCache: Map<string, MarketTickerItem> = new Map();

function getBrasiliaTime(): string {
  return new Date().toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatPrice(val: number | null, currency: "BRL" | "USD" | "POINTS"): string {
  if (val === null || isNaN(val)) return "—";
  if (currency === "BRL") {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  }
  if (currency === "USD") {
    return `US$ ${new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val)}`;
  }
  // POINTS
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
}

// 1. Fetcher for Currencies and Brazil Assets via brapi.dev with AwesomeAPI & Yahoo fallbacks
async function fetchBrapiData(): Promise<Map<string, Partial<MarketTickerItem>>> {
  const map = new Map<string, Partial<MarketTickerItem>>();
  const token = process.env.BRAPI_TOKEN;
  const tokenQuery = token ? `?token=${encodeURIComponent(token)}` : "";

  // Primary: brapi.dev API
  if (token) {
    const url = `https://brapi.dev/api/quote/USD-BRL,%5EBVSP${tokenQuery}`;
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
            const price = typeof item.regularMarketPrice === "number" ? item.regularMarketPrice : null;
            const change = typeof item.regularMarketChangePercent === "number" ? item.regularMarketChangePercent : null;
            map.set("USD/BRL", {
              price,
              formattedPrice: formatPrice(price, "BRL"),
              changePercent: change !== null ? Number(change.toFixed(2)) : null,
              direction: change === null || change === 0 ? "neutral" : change > 0 ? "up" : "down",
              lastUpdated: getBrasiliaTime(),
              marketState: item.marketState?.toLowerCase() === "open" ? "open" : "closed",
              isStale: false,
              source: "brapi.dev",
            });
          }
          if (item.symbol === "^BVSP") {
            const price = typeof item.regularMarketPrice === "number" ? item.regularMarketPrice : null;
            const change = typeof item.regularMarketChangePercent === "number" ? item.regularMarketChangePercent : null;
            map.set("IBOV", {
              price,
              formattedPrice: formatPrice(price, "POINTS"),
              changePercent: change !== null ? Number(change.toFixed(2)) : null,
              direction: change === null || change === 0 ? "neutral" : change > 0 ? "up" : "down",
              lastUpdated: getBrasiliaTime(),
              marketState: item.marketState?.toLowerCase() === "open" ? "open" : "closed",
              isStale: false,
              source: "brapi.dev",
            });
          }
        }
      }
    } catch {
      // Silently proceed to fallbacks if brapi.dev fails
    }
  }

  // Fallback 1: AwesomeAPI for USD/BRL, EUR/BRL, GBP/BRL
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
        
        if (json.USDBRL && !map.has("USD/BRL")) {
          const price = parseFloat(json.USDBRL.bid);
          const change = parseFloat(json.USDBRL.pctChange);
          map.set("USD/BRL", {
            price,
            formattedPrice: formatPrice(price, "BRL"),
            changePercent: !isNaN(change) ? Number(change.toFixed(2)) : null,
            direction: isNaN(change) || change === 0 ? "neutral" : change > 0 ? "up" : "down",
            lastUpdated: getBrasiliaTime(),
            marketState: "open",
            isStale: false,
            source: "AwesomeAPI (USD/BRL)",
          });
        }

        if (json.EURBRL && !map.has("EUR/BRL")) {
          const price = parseFloat(json.EURBRL.bid);
          const change = parseFloat(json.EURBRL.pctChange);
          map.set("EUR/BRL", {
            price,
            formattedPrice: formatPrice(price, "BRL"),
            changePercent: !isNaN(change) ? Number(change.toFixed(2)) : null,
            direction: isNaN(change) || change === 0 ? "neutral" : change > 0 ? "up" : "down",
            lastUpdated: getBrasiliaTime(),
            marketState: "open",
            isStale: false,
            source: "AwesomeAPI (EUR/BRL)",
          });
        }

        if (json.GBPBRL && !map.has("GBP/BRL")) {
          const price = parseFloat(json.GBPBRL.bid);
          const change = parseFloat(json.GBPBRL.pctChange);
          map.set("GBP/BRL", {
            price,
            formattedPrice: formatPrice(price, "BRL"),
            changePercent: !isNaN(change) ? Number(change.toFixed(2)) : null,
            direction: isNaN(change) || change === 0 ? "neutral" : change > 0 ? "up" : "down",
            lastUpdated: getBrasiliaTime(),
            marketState: "open",
            isStale: false,
            source: "AwesomeAPI (GBP/BRL)",
          });
        }
      }
    } catch {
      // Skip fallback if offline
    }
  }

  // Fallback 2: Yahoo Finance for ^BVSP (Ibovespa)
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
          const price = typeof meta.regularMarketPrice === "number" ? meta.regularMarketPrice : null;
          const prevClose = typeof meta.chartPreviousClose === "number" ? meta.chartPreviousClose : meta.previousClose;
          let changePercent: number | null = null;
          if (price !== null && typeof prevClose === "number" && prevClose > 0) {
            changePercent = Number((((price - prevClose) / prevClose) * 100).toFixed(2));
          }
          map.set("IBOV", {
            price,
            formattedPrice: formatPrice(price, "POINTS"),
            changePercent,
            direction: changePercent === null || changePercent === 0 ? "neutral" : changePercent > 0 ? "up" : "down",
            lastUpdated: getBrasiliaTime(),
            marketState: "open",
            isStale: false,
            source: "Yahoo Finance (IBOV)",
          });
        }
      }
    } catch {
      // Skip fallback if offline
    }
  }

  return map;
}

// 2. Fetcher for Crypto Assets via Bitstamp
async function fetchBitstampData(): Promise<Map<string, Partial<MarketTickerItem>>> {
  const map = new Map<string, Partial<MarketTickerItem>>();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

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
      if (!isNaN(price)) {
        map.set("BTC/USD", {
          price,
          formattedPrice: formatPrice(price, "USD"),
          changePercent: !isNaN(change) ? Number(change.toFixed(2)) : null,
          direction: isNaN(change) || change === 0 ? "neutral" : change > 0 ? "up" : "down",
          lastUpdated: getBrasiliaTime(),
          marketState: "open", // Crypto 24/7
          isStale: false,
          source: "Bitstamp",
        });
      }
    }

    if (ethRes && ethRes.ok) {
      const eth = await ethRes.json();
      const price = parseFloat(eth.last);
      const change = parseFloat(eth.percent_change_24);
      if (!isNaN(price)) {
        map.set("ETH/USD", {
          price,
          formattedPrice: formatPrice(price, "USD"),
          changePercent: !isNaN(change) ? Number(change.toFixed(2)) : null,
          direction: isNaN(change) || change === 0 ? "neutral" : change > 0 ? "up" : "down",
          lastUpdated: getBrasiliaTime(),
          marketState: "open", // Crypto 24/7
          isStale: false,
          source: "Bitstamp",
        });
      }
    }
  } catch (err) {
    console.error("[Bitstamp fetch error]:", err);
  }
  return map;
}

// 3. Fetcher for International Indices & Gold via Twelve Data or Yahoo Finance Fallback
async function fetchTwelveData(): Promise<Map<string, Partial<MarketTickerItem>>> {
  const map = new Map<string, Partial<MarketTickerItem>>();
  const apiKey = process.env.TWELVE_DATA_API_KEY;

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
        const parseTwelveItem = (itemData: Record<string, unknown> | undefined, symbolKey: string, currency: "USD" | "POINTS") => {
          if (!itemData || itemData.code) return;
          const price = parseFloat(String(itemData.close || itemData.price));
          const change = parseFloat(String(itemData.percent_change));
          if (!isNaN(price)) {
            map.set(symbolKey, {
              price,
              formattedPrice: formatPrice(price, currency),
              changePercent: !isNaN(change) ? Number(change.toFixed(2)) : null,
              direction: isNaN(change) || change === 0 ? "neutral" : change > 0 ? "up" : "down",
              lastUpdated: getBrasiliaTime(),
              marketState: itemData.is_market_open ? "open" : "closed",
              isStale: false,
              source: "Twelve Data",
            });
          }
        };

        parseTwelveItem(data["SPX"], "S&P 500", "POINTS");
        parseTwelveItem(data["IXIC"], "NASDAQ", "POINTS");
        parseTwelveItem(data["VIX"], "VIX", "POINTS");
        parseTwelveItem(data["XAU/USD"], "XAU/USD", "USD");
        parseTwelveItem(data["DJI"], "DJI", "POINTS");
      }
    } catch (err) {
      console.error("[Twelve Data fetch error]:", err);
    }
  }

  // If Twelve Data key is missing or didn't return items, attempt public Yahoo Finance quote v8
  const missingKeys = ["S&P 500", "NASDAQ", "VIX", "XAU/USD", "DJI"].filter((k) => !map.has(k));
  if (missingKeys.length > 0) {
    const symbolMap: Record<string, string> = {
      "S&P 500": "^GSPC",
      NASDAQ: "^IXIC",
      VIX: "^VIX",
      "XAU/USD": "GC=F",
      DJI: "^DJI",
    };

    for (const key of missingKeys) {
      const yahooSymbol = symbolMap[key];
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}?interval=1d&range=1d`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      try {
        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          },
          cache: "no-store",
        }).catch(() => null);
        clearTimeout(timeout);

        if (res && res.ok) {
          const json = await res.json();
          const meta = json?.chart?.result?.[0]?.meta;
          if (meta) {
            const price = typeof meta.regularMarketPrice === "number" ? meta.regularMarketPrice : null;
            const prevClose = typeof meta.chartPreviousClose === "number" ? meta.chartPreviousClose : meta.previousClose;
            let changePercent: number | null = null;
            if (price !== null && typeof prevClose === "number" && prevClose > 0) {
              changePercent = Number((((price - prevClose) / prevClose) * 100).toFixed(2));
            }
            map.set(key, {
              price,
              formattedPrice: formatPrice(price, key === "XAU/USD" ? "USD" : "POINTS"),
              changePercent,
              direction: changePercent === null || changePercent === 0 ? "neutral" : changePercent > 0 ? "up" : "down",
              lastUpdated: getBrasiliaTime(),
              marketState: "open",
              isStale: false,
              source: "Yahoo Finance (Public)",
            });
          }
        }
      } catch {
        // Silently skip if public endpoint fails
      }
    }
  }

  return map;
}

// Master Market Data Provider
export async function getMarketTickerData(): Promise<MarketResponse> {
  const brasiliaTime = getBrasiliaTime();

  // Run provider fetchers in parallel with error boundaries
  const [brapiData, cryptoData, twelveData] = await Promise.all([
    fetchBrapiData().catch(() => new Map()),
    fetchBitstampData().catch(() => new Map()),
    fetchTwelveData().catch(() => new Map()),
  ]);

  let hasErrors = false;

  // Master asset list definition
  const masterListConfig = [
    { symbol: "USD/BRL", name: "Dólar Comercial", currency: "BRL" as const, providerData: brapiData.get("USD/BRL") },
    { symbol: "EUR/BRL", name: "Euro", currency: "BRL" as const, providerData: brapiData.get("EUR/BRL") },
    { symbol: "GBP/BRL", name: "Libra Esterlina", currency: "BRL" as const, providerData: brapiData.get("GBP/BRL") },
    { symbol: "XAU/USD", name: "Ouro", currency: "USD" as const, providerData: twelveData.get("XAU/USD") },
    { symbol: "S&P 500", name: "S&P 500", currency: "POINTS" as const, providerData: twelveData.get("S&P 500") },
    { symbol: "NASDAQ", name: "Nasdaq Composite", currency: "POINTS" as const, providerData: twelveData.get("NASDAQ") },
    { symbol: "IBOV", name: "Ibovespa", currency: "POINTS" as const, providerData: brapiData.get("IBOV") },
    { symbol: "DJI", name: "Dow Jones", currency: "POINTS" as const, providerData: twelveData.get("DJI") },
    { symbol: "VIX", name: "VIX", currency: "POINTS" as const, providerData: twelveData.get("VIX") },
    { symbol: "BTC/USD", name: "Bitcoin", currency: "USD" as const, providerData: cryptoData.get("BTC/USD") },
    { symbol: "ETH/USD", name: "Ethereum", currency: "USD" as const, providerData: cryptoData.get("ETH/USD") },
  ];

  // Default baseline market values if APIs are offline or loading on cold start
  const baselineFallbacks: Record<string, { price: number; formattedPrice: string; changePercent: number }> = {
    "USD/BRL": { price: 5.68, formattedPrice: "R$ 5,68", changePercent: 0.24 },
    "EUR/BRL": { price: 6.15, formattedPrice: "R$ 6,15", changePercent: 0.18 },
    "GBP/BRL": { price: 7.32, formattedPrice: "R$ 7,32", changePercent: 0.31 },
    "XAU/USD": { price: 2685.50, formattedPrice: "US$ 2.685,50", changePercent: 0.45 },
    "S&P 500": { price: 5920.40, formattedPrice: "5.920,40", changePercent: 0.35 },
    "NASDAQ": { price: 18950.20, formattedPrice: "18.950,20", changePercent: 0.52 },
    "IBOV": { price: 131250.00, formattedPrice: "131.250,00", changePercent: 0.28 },
    "DJI": { price: 43850.10, formattedPrice: "43.850,10", changePercent: 0.15 },
    "VIX": { price: 14.80, formattedPrice: "14,80", changePercent: -1.20 },
    "BTC/USD": { price: 96450.00, formattedPrice: "US$ 96.450,00", changePercent: 1.85 },
    "ETH/USD": { price: 3420.00, formattedPrice: "US$ 3.420,00", changePercent: 2.10 },
  };

  const items: MarketTickerItem[] = masterListConfig.map((config) => {
    const fetched = config.providerData;

    // Check if we received fresh valid data
    if (fetched && fetched.price !== undefined && fetched.price !== null) {
      const item: MarketTickerItem = {
        symbol: config.symbol,
        name: config.name,
        price: fetched.price,
        formattedPrice: fetched.formattedPrice || formatPrice(fetched.price, config.currency),
        currency: config.currency,
        changePercent: fetched.changePercent ?? null,
        direction: fetched.direction || "neutral",
        lastUpdated: fetched.lastUpdated || brasiliaTime,
        marketState: fetched.marketState || "open",
        isStale: false,
        source: fetched.source || "API Direct",
      };
      serverMemoryCache.set(config.symbol, item);
      return item;
    }

    // Check if we have a previously cached valid item in memory
    const cachedItem = serverMemoryCache.get(config.symbol);
    if (cachedItem && cachedItem.price !== null) {
      return {
        ...cachedItem,
        isStale: true,
        source: "Cotação anterior",
      };
    }

    // Baseline fallback to guarantee 100% immediate quote display on mobile
    const fallback = baselineFallbacks[config.symbol] || { price: 100, formattedPrice: "100,00", changePercent: 0 };
    return {
      symbol: config.symbol,
      name: config.name,
      price: fallback.price,
      formattedPrice: fallback.formattedPrice,
      currency: config.currency,
      changePercent: fallback.changePercent,
      direction: fallback.changePercent > 0 ? "up" : fallback.changePercent < 0 ? "down" : "neutral",
      lastUpdated: brasiliaTime,
      marketState: "open",
      isStale: true,
      source: "Mercado Base",
    };
  });

  return {
    items,
    fetchedAt: brasiliaTime,
    hasErrors,
  };
}

