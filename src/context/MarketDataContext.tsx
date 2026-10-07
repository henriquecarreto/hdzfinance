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
  assets: {},
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
  }, [snapshot]);

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

    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);
    window.addEventListener("online", handleOnline);

    return () => {
      isMountedRef.current = false;
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
      window.removeEventListener("online", handleOnline);
    };
  }, [fetchMarketData]);

  const assets = snapshot?.assets || {};

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
