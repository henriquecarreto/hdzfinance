"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  MarketAssetSnapshot,
  MarketDataSnapshot,
  MarketTickerItem,
} from "@/types/market";
import { formatMarketTimeUTC } from "@/lib/formatters";

const DEFAULT_SNAPSHOT_ASSETS: Record<string, MarketAssetSnapshot> = {
  "USD/BRL": { symbol: "USD/BRL", name: "Dólar Comercial", price: 5.68, formattedPrice: "R$ 5,68", currency: "BRL", changePercent: 0.24, direction: "up", sourceTimestamp: new Date().toISOString(), receivedAt: new Date().toISOString(), marketState: "open", quoteStatus: "realtime", source: "Base" },
  "EUR/BRL": { symbol: "EUR/BRL", name: "Euro", price: 6.15, formattedPrice: "R$ 6,15", currency: "BRL", changePercent: 0.18, direction: "up", sourceTimestamp: new Date().toISOString(), receivedAt: new Date().toISOString(), marketState: "open", quoteStatus: "realtime", source: "Base" },
  "GBP/BRL": { symbol: "GBP/BRL", name: "Libra Esterlina", price: 7.32, formattedPrice: "R$ 7,32", currency: "BRL", changePercent: 0.31, direction: "up", sourceTimestamp: new Date().toISOString(), receivedAt: new Date().toISOString(), marketState: "open", quoteStatus: "realtime", source: "Base" },
  "XAU/USD": { symbol: "XAU/USD", name: "Ouro Spot", price: 2685.50, formattedPrice: "US$ 2.685,50", currency: "USD", changePercent: 0.45, direction: "up", sourceTimestamp: new Date().toISOString(), receivedAt: new Date().toISOString(), marketState: "open", quoteStatus: "delayed", source: "Base" },
  "S&P 500": { symbol: "S&P 500", name: "S&P 500", price: 5920.40, formattedPrice: "5.920,40", currency: "POINTS", changePercent: 0.35, direction: "up", sourceTimestamp: new Date().toISOString(), receivedAt: new Date().toISOString(), marketState: "open", quoteStatus: "delayed", source: "Base" },
  "NASDAQ": { symbol: "NASDAQ", name: "Nasdaq Composite", price: 18950.20, formattedPrice: "18.950,20", currency: "POINTS", changePercent: 0.52, direction: "up", sourceTimestamp: new Date().toISOString(), receivedAt: new Date().toISOString(), marketState: "open", quoteStatus: "delayed", source: "Base" },
  "IBOV": { symbol: "IBOV", name: "Ibovespa", price: 131250.00, formattedPrice: "131.250,00", currency: "POINTS", changePercent: 0.28, direction: "up", sourceTimestamp: new Date().toISOString(), receivedAt: new Date().toISOString(), marketState: "open", quoteStatus: "delayed", source: "Base" },
  "DJI": { symbol: "DJI", name: "Dow Jones", price: 43850.10, formattedPrice: "43.850,10", currency: "POINTS", changePercent: 0.15, direction: "up", sourceTimestamp: new Date().toISOString(), receivedAt: new Date().toISOString(), marketState: "open", quoteStatus: "delayed", source: "Base" },
  "VIX": { symbol: "VIX", name: "VIX Volatilidade", price: 14.80, formattedPrice: "14,80", currency: "POINTS", changePercent: -1.20, direction: "down", sourceTimestamp: new Date().toISOString(), receivedAt: new Date().toISOString(), marketState: "open", quoteStatus: "delayed", source: "Base" },
  "BTC/USD": { symbol: "BTC/USD", name: "Bitcoin", price: 96450.00, formattedPrice: "US$ 96.450,00", currency: "USD", changePercent: 1.85, direction: "up", sourceTimestamp: new Date().toISOString(), receivedAt: new Date().toISOString(), marketState: "open", quoteStatus: "realtime", source: "Base" },
  "ETH/USD": { symbol: "ETH/USD", name: "Ethereum", price: 3420.00, formattedPrice: "US$ 3.420,00", currency: "USD", changePercent: 2.10, direction: "up", sourceTimestamp: new Date().toISOString(), receivedAt: new Date().toISOString(), marketState: "open", quoteStatus: "realtime", source: "Base" },
  "SELIC": { symbol: "SELIC", name: "Meta Selic", price: 14.00, formattedPrice: "14,00%", currency: "%", changePercent: null, direction: "neutral", sourceTimestamp: new Date().toISOString(), receivedAt: new Date().toISOString(), marketState: "reference", quoteStatus: "reference", source: "BCB SGS 432 (Copom)", referenceDate: "06/08/2026" },
  "IPCA12M": { symbol: "IPCA12M", name: "IPCA 12m", price: 4.44, formattedPrice: "4,44%", currency: "%", changePercent: null, direction: "neutral", sourceTimestamp: new Date().toISOString(), receivedAt: new Date().toISOString(), marketState: "reference", quoteStatus: "reference", source: "IBGE / BCB SGS 13522", referenceMonth: "Jul/2026" },
};

interface MarketDataContextType {
  snapshot: MarketDataSnapshot | null;
  assets: Record<string, MarketAssetSnapshot>;
  items: MarketTickerItem[];
  loading: boolean;
  error: boolean;
  lastFetchedAt: string | null;
  refetch: () => Promise<void>;
}

const MarketDataContext = createContext<MarketDataContextType>({
  snapshot: null,
  assets: DEFAULT_SNAPSHOT_ASSETS,
  items: [],
  loading: true,
  error: false,
  lastFetchedAt: null,
  refetch: async () => {},
});

export function MarketDataProvider({ children }: { children: React.ReactNode }) {
  const [snapshot, setSnapshot] = useState<MarketDataSnapshot | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const isFetchingRef = useRef<boolean>(false);
  const isMountedRef = useRef<boolean>(true);

  const fetchMarketData = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const res = await fetch(`/api/market-data?t=${Date.now()}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        const data: MarketDataSnapshot & { items?: MarketTickerItem[] } = await res.json();

        if (isMountedRef.current && data && data.assets) {
          // Race Condition Protection: Only apply if newer or equal snapshot
          setSnapshot((prev) => {
            if (!prev) return data;
            const newTs = new Date(data.generatedAt).getTime();
            const prevTs = new Date(prev.generatedAt).getTime();
            return newTs >= prevTs ? data : prev;
          });
          setError(false);
        }
      } else {
        if (isMountedRef.current && !snapshot) {
          setError(true);
        }
      }
    } catch (err) {
      console.error("[MarketDataProvider fetch error]:", err);
      if (isMountedRef.current && !snapshot) {
        setError(true);
      }
    } finally {
      isFetchingRef.current = false;
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []); // Empty dependencies array to keep function reference stable!

  useEffect(() => {
    isMountedRef.current = true;

    // Initial immediate fetch on mount
    fetchMarketData();

    // Regular polling interval (30 seconds)
    const intervalId = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchMarketData();
      }
    }, 30000);

    // Immediate re-fetch on Mobile / Tab Resume or Network Reconnect
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        fetchMarketData();
      }
    };

    const handleOnline = () => {
      fetchMarketData();
    };

    const handlePageShow = () => {
      fetchMarketData();
    };

    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);
    window.addEventListener("online", handleOnline);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      isMountedRef.current = false;
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [fetchMarketData]);

  const assets = snapshot?.assets || DEFAULT_SNAPSHOT_ASSETS;

  // Build legacy/compatible items array for Ticker
  const items: MarketTickerItem[] = Object.values(assets).map((asset) => ({
    symbol: asset.symbol,
    name: asset.name,
    price: asset.price,
    formattedPrice: asset.formattedPrice,
    currency: asset.currency,
    changePercent: asset.changePercent,
    direction: asset.direction,
    lastUpdated: formatMarketTimeUTC(asset.sourceTimestamp),
    marketState: asset.marketState === "closed" ? "closed" : "open",
    isStale: asset.quoteStatus === "stale" || asset.quoteStatus === "unavailable",
    source: asset.source,
    quoteStatus: asset.quoteStatus,
    sourceTimestamp: asset.sourceTimestamp,
  }));

  const lastFetchedAt = snapshot?.generatedAt
    ? formatMarketTimeUTC(snapshot.generatedAt)
    : null;

  return (
    <MarketDataContext.Provider
      value={{
        snapshot,
        assets,
        items,
        loading,
        error,
        lastFetchedAt,
        refetch: fetchMarketData,
      }}
    >
      {children}
    </MarketDataContext.Provider>
  );
}

export function useMarketData() {
  return useContext(MarketDataContext);
}
