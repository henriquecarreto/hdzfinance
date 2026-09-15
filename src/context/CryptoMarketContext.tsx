"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";

export type CryptoQuote = {
  symbol: "BTC" | "ETH";
  pair: "BTC/USD" | "ETH/USD";
  price: number;
  change24h: number;
  timestamp: number;
  source: "Bitstamp";
  status: "live" | "stale" | "error";
};

export type LiveCryptoState = {
  BTC: CryptoQuote | null;
  ETH: CryptoQuote | null;
  connected: boolean;
  lastSuccessfulUpdate: number | null;
};

export const CRYPTO_MARKETS = {
  BTC: {
    pair: "BTC/USD" as const,
    marketSymbol: "btcusd",
    tradingViewSymbol: "BITSTAMP:BTCUSD",
  },
  ETH: {
    pair: "ETH/USD" as const,
    marketSymbol: "ethusd",
    tradingViewSymbol: "BITSTAMP:ETHUSD",
  },
};

export const formatUsdPrice = (value: number) => {
  if (typeof value !== "number" || isNaN(value)) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CryptoMarketContext = createContext<LiveCryptoState>({
  BTC: null,
  ETH: null,
  connected: false,
  lastSuccessfulUpdate: null,
});

const BACKOFF_STEPS = [1000, 2000, 5000, 10000, 30000];

export function CryptoMarketProvider({ children }: { children: React.ReactNode }) {
  const [btcQuote, setBtcQuote] = useState<CryptoQuote | null>(null);
  const [ethQuote, setEthQuote] = useState<CryptoQuote | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [lastSuccessfulUpdate, setLastSuccessfulUpdate] = useState<number | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef<number>(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // 1. Fetch REST API to populate initial quotes and 24h variation
  const fetchRestQuotes = useCallback(async () => {
    try {
      let data: Record<string, CryptoQuote> | null = null;
      
      // Attempt internal route first
      const res = await fetch("/api/market/crypto", { cache: "no-store" }).catch(() => null);
      if (res && res.ok) {
        data = await res.json().catch(() => null);
      }

      // Fallback: Fetch Bitstamp REST API directly if internal route fails
      if (!data || !data.BTC || !data.ETH) {
        const [btcRes, ethRes] = await Promise.all([
          fetch("https://www.bitstamp.net/api/v2/ticker/btcusd/", { cache: "no-store" }).catch(() => null),
          fetch("https://www.bitstamp.net/api/v2/ticker/ethusd/", { cache: "no-store" }).catch(() => null),
        ]);

        if (btcRes && btcRes.ok && ethRes && ethRes.ok) {
          const btcData = await btcRes.json();
          const ethData = await ethRes.json();

          data = {
            BTC: {
              symbol: "BTC",
              pair: "BTC/USD",
              price: parseFloat(btcData.last),
              change24h: parseFloat(btcData.percent_change_24),
              timestamp: parseInt(btcData.timestamp, 10) * 1000,
              source: "Bitstamp",
              status: "live",
            },
            ETH: {
              symbol: "ETH",
              pair: "ETH/USD",
              price: parseFloat(ethData.last),
              change24h: parseFloat(ethData.percent_change_24),
              timestamp: parseInt(ethData.timestamp, 10) * 1000,
              source: "Bitstamp",
              status: "live",
            },
          };
        }
      }

      if (data && isMountedRef.current) {
        const now = Date.now();
        setLastSuccessfulUpdate(now);

        if (data.BTC && !isNaN(data.BTC.price)) {
          setBtcQuote((prev) => {
            if (!prev) return data!.BTC;
            const restTs = data!.BTC.timestamp || now;
            // Race Condition Check: Do not overwrite newer WS price with older REST price
            const useRestPrice = restTs > prev.timestamp;
            return {
              ...prev,
              price: useRestPrice ? data!.BTC.price : prev.price,
              change24h: data!.BTC.change24h,
              timestamp: Math.max(prev.timestamp, restTs),
              status: "live",
            };
          });
        }

        if (data.ETH && !isNaN(data.ETH.price)) {
          setEthQuote((prev) => {
            if (!prev) return data!.ETH;
            const restTs = data!.ETH.timestamp || now;
            // Race Condition Check: Do not overwrite newer WS price with older REST price
            const useRestPrice = restTs > prev.timestamp;
            return {
              ...prev,
              price: useRestPrice ? data!.ETH.price : prev.price,
              change24h: data!.ETH.change24h,
              timestamp: Math.max(prev.timestamp, restTs),
              status: "live",
            };
          });
        }
      }
    } catch {
      // Keep existing valid prices if REST fails
    }
  }, []);

  // 2. Connect WebSocket to Bitstamp (wss://ws.bitstamp.net)
  const connectWebSocket = useCallback(() => {
    if (!isMountedRef.current) return;

    // Clean existing socket if open or opening
    if (wsRef.current) {
      wsRef.current.onopen = null;
      wsRef.current.onmessage = null;
      wsRef.current.onerror = null;
      wsRef.current.onclose = null;
      try {
        wsRef.current.close();
      } catch {
        // Ignore close error
      }
      wsRef.current = null;
    }

    try {
      const socket = new WebSocket("wss://ws.bitstamp.net");
      wsRef.current = socket;

      socket.onopen = () => {
        if (!isMountedRef.current) return;
        setConnected(true);
        retryCountRef.current = 0;

        // Subscribe to live trades for BTC and ETH
        socket.send(
          JSON.stringify({
            event: "bts:subscribe",
            data: { channel: "live_trades_btcusd" },
          })
        );
        socket.send(
          JSON.stringify({
            event: "bts:subscribe",
            data: { channel: "live_trades_ethusd" },
          })
        );
      };

      socket.onmessage = (event) => {
        if (!isMountedRef.current) return;
        try {
          const msg = JSON.parse(event.data);
          if (msg.event === "trade" && msg.data && typeof msg.data.price === "number") {
            const channel: string = msg.channel;
            const price = Number(msg.data.price);
            const ts = msg.data.timestamp ? Number(msg.data.timestamp) * 1000 : Date.now();
            const now = Date.now();

            setLastSuccessfulUpdate(now);

            if (channel === "live_trades_btcusd") {
              setBtcQuote((prev) => {
                // Reject older messages out of sequence
                if (prev && ts < prev.timestamp) return prev;
                return {
                  symbol: "BTC",
                  pair: "BTC/USD",
                  price,
                  change24h: prev ? prev.change24h : 0,
                  timestamp: ts,
                  source: "Bitstamp",
                  status: "live",
                };
              });
            } else if (channel === "live_trades_ethusd") {
              setEthQuote((prev) => {
                // Reject older messages out of sequence
                if (prev && ts < prev.timestamp) return prev;
                return {
                  symbol: "ETH",
                  pair: "ETH/USD",
                  price,
                  change24h: prev ? prev.change24h : 0,
                  timestamp: ts,
                  source: "Bitstamp",
                  status: "live",
                };
              });
            }
          }
        } catch {
          // Ignore JSON parse errors
        }
      };

      socket.onerror = () => {
        if (isMountedRef.current) {
          setConnected(false);
        }
      };

      socket.onclose = () => {
        if (!isMountedRef.current) return;
        setConnected(false);

        // Schedule reconnection with exponential backoff
        const stepIndex = Math.min(retryCountRef.current, BACKOFF_STEPS.length - 1);
        const delay = BACKOFF_STEPS[stepIndex];
        retryCountRef.current += 1;

        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            connectWebSocket();
            fetchRestQuotes();
          }
        }, delay);
      };
    } catch {
      setConnected(false);
    }
  }, [fetchRestQuotes]);

  // 3. Mount Provider lifecycle
  useEffect(() => {
    isMountedRef.current = true;

    // Initial fetch via REST & WS connection
    fetchRestQuotes();
    connectWebSocket();

    // Polling REST every 45s for 24h variation percent change
    const restPollingInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchRestQuotes();
      }
    }, 45000);

    // Stale check every 5s (> 30s without valid update = mark status as stale)
    const staleCheckInterval = setInterval(() => {
      setLastSuccessfulUpdate((lastTs) => {
        if (lastTs && Date.now() - lastTs > 30000) {
          setBtcQuote((prev) => (prev ? { ...prev, status: "stale" } : null));
          setEthQuote((prev) => (prev ? { ...prev, status: "stale" } : null));
        }
        return lastTs;
      });
    }, 5000);

    // Visibility change handler (re-sync REST & verify WS connection)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchRestQuotes();
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
          connectWebSocket();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMountedRef.current = false;
      clearInterval(restPollingInterval);
      clearInterval(staleCheckInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) {
        wsRef.current.onopen = null;
        wsRef.current.onmessage = null;
        wsRef.current.onerror = null;
        wsRef.current.onclose = null;
        try {
          wsRef.current.close();
        } catch {
          // Ignore
        }
        wsRef.current = null;
      }
    };
  }, [fetchRestQuotes, connectWebSocket]);

  return (
    <CryptoMarketContext.Provider
      value={{
        BTC: btcQuote,
        ETH: ethQuote,
        connected,
        lastSuccessfulUpdate,
      }}
    >
      {children}
    </CryptoMarketContext.Provider>
  );
}

export function useLiveCryptoPrices() {
  return useContext(CryptoMarketContext);
}
