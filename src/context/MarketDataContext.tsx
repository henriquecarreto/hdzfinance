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
  // Debug & Audit Metadata for ?marketdebug=1
  initialSnapshotReceived: boolean;
  clientSnapshotReceived: boolean;
  lastFetchStatus: number | null;
  lastFetchTime: string | null;
  lastFetchError: string | null;
}

const MarketDataContext = createContext<MarketDataContextType>({
  snapshot: null,
  assets: {},
  items: [],
  loading: true,
  error: false,
  lastFetchedAt: null,
  refetch: async () => {},
  initialSnapshotReceived: false,
  clientSnapshotReceived: false,
  lastFetchStatus: null,
  lastFetchTime: null,
  lastFetchError: null,
});

export function MarketDataProvider({
  children,
  initialSnapshot,
}: {
  children: React.ReactNode;
  initialSnapshot?: MarketDataSnapshot | null;
}) {
  const [snapshot, setSnapshot] = useState<MarketDataSnapshot | null>(
    initialSnapshot || null
  );
  const [loading, setLoading] = useState<boolean>(!initialSnapshot);
  const [error, setError] = useState<boolean>(false);

  // Debug fields
  const [clientSnapshotReceived, setClientSnapshotReceived] = useState<boolean>(false);
  const [lastFetchStatus, setLastFetchStatus] = useState<number | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<string | null>(null);
  const [lastFetchError, setLastFetchError] = useState<string | null>(null);

  const isFetchingRef = useRef<boolean>(false);
  const isMountedRef = useRef<boolean>(true);

  const fetchMarketData = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    const fetchNowIso = new Date().toISOString();

    try {
      const res = await fetch(`/api/market-data?t=${Date.now()}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      if (isMountedRef.current) {
        setLastFetchStatus(res.status);
        setLastFetchTime(fetchNowIso);
      }

      if (res.ok) {
        const data: MarketDataSnapshot & { items?: MarketTickerItem[] } =
          await res.json();

        if (isMountedRef.current && data && data.assets) {
          // Race Condition Protection: Only apply if newer or equal snapshot
          setSnapshot((prev) => {
            if (!prev) return data;
            const newTs = new Date(data.generatedAt).getTime();
            const prevTs = new Date(prev.generatedAt).getTime();
            return newTs >= prevTs ? data : prev;
          });
          setError(false);
          setClientSnapshotReceived(true);
          setLastFetchError(null);
        }
      } else {
        const errMsg = `HTTP Error ${res.status}: ${res.statusText}`;
        console.error(`[MarketDataProvider fetch error]: ${errMsg}`);
        if (isMountedRef.current) {
          setLastFetchError(errMsg);
          if (!snapshot) {
            setError(true);
          }
        }
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error("[MarketDataProvider fetch exception]:", err);
      if (isMountedRef.current) {
        setLastFetchError(errMsg);
        // CRITICAL: NEVER erase an existing valid snapshot on fetch exception!
        if (!snapshot) {
          setError(true);
        }
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

    // Background client revalidation after initial SSR render
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
        initialSnapshotReceived: Boolean(initialSnapshot),
        clientSnapshotReceived,
        lastFetchStatus,
        lastFetchTime,
        lastFetchError,
      }}
    >
      {children}
    </MarketDataContext.Provider>
  );
}

export function useMarketData() {
  return useContext(MarketDataContext);
}
