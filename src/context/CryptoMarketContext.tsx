"use client";

import React, { createContext, useContext } from "react";
import { useMarketData } from "@/context/MarketDataContext";
import { formatUsdCustom } from "@/lib/formatters";

export type CryptoQuote = {
  symbol: "BTC" | "ETH";
  pair: "BTC/USD" | "ETH/USD";
  price: number;
  change24h: number;
  timestamp: number;
  source: string;
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
  return formatUsdCustom(value);
};

const CryptoMarketContext = createContext<LiveCryptoState>({
  BTC: null,
  ETH: null,
  connected: false,
  lastSuccessfulUpdate: null,
});

export function CryptoMarketProvider({ children }: { children: React.ReactNode }) {
  const { assets, lastFetchedAt } = useMarketData();

  const btcAsset = assets["BTC/USD"];
  const ethAsset = assets["ETH/USD"];

  const btcQuote: CryptoQuote | null = btcAsset && btcAsset.price !== null
    ? {
        symbol: "BTC",
        pair: "BTC/USD",
        price: btcAsset.price,
        change24h: btcAsset.changePercent || 0,
        timestamp: new Date(btcAsset.sourceTimestamp || Date.now()).getTime(),
        source: btcAsset.source,
        status: btcAsset.quoteStatus === "stale" ? "stale" : "live",
      }
    : null;

  const ethQuote: CryptoQuote | null = ethAsset && ethAsset.price !== null
    ? {
        symbol: "ETH",
        pair: "ETH/USD",
        price: ethAsset.price,
        change24h: ethAsset.changePercent || 0,
        timestamp: new Date(ethAsset.sourceTimestamp || Date.now()).getTime(),
        source: ethAsset.source,
        status: ethAsset.quoteStatus === "stale" ? "stale" : "live",
      }
    : null;

  const lastUpdateMs = lastFetchedAt ? Date.now() : null;

  return (
    <CryptoMarketContext.Provider
      value={{
        BTC: btcQuote,
        ETH: ethQuote,
        connected: true,
        lastSuccessfulUpdate: lastUpdateMs,
      }}
    >
      {children}
    </CryptoMarketContext.Provider>
  );
}

export function useLiveCryptoPrices() {
  return useContext(CryptoMarketContext);
}
