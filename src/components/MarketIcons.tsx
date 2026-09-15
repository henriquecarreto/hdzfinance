"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface PremiumMarketIconProps {
  symbol?: string;
  type?: string;
  category?: "currency" | "commodity" | "index" | "crypto" | "macro";
  accent?: string;
  size?: number;
  className?: string;
}

export function PremiumMarketIcon({ symbol, type, className }: PremiumMarketIconProps) {
  const targetKey = (symbol || type || "").toUpperCase();
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`market-asset-fallback flex items-center justify-center font-mono font-bold text-[10px] text-[#A9B4C2] bg-[#0E1620] border border-white/[0.12] rounded-full shrink-0 ${className || ""}`}
        style={{ width: "34px", height: "34px" }}
      >
        {targetKey.slice(0, 3) || "HDZ"}
      </div>
    );
  }

  // 1. CURRENCY PAIRS (US/BR, EU/BR, GB/BR Overlapping Circular Flags)
  if (targetKey === "USD/BRL" || targetKey === "USD") {
    return (
      <div className={`currency-pair-flags ${className || ""}`} aria-hidden="true">
        <Image
          src="/images/market-assets/flag-us.svg"
          alt=""
          width={30}
          height={30}
          onError={() => setHasError(true)}
        />
        <Image
          src="/images/market-assets/flag-br.svg"
          alt=""
          width={30}
          height={30}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  if (targetKey === "EUR/BRL" || targetKey === "EUR") {
    return (
      <div className={`currency-pair-flags ${className || ""}`} aria-hidden="true">
        <Image
          src="/images/market-assets/flag-eu.svg"
          alt=""
          width={30}
          height={30}
          onError={() => setHasError(true)}
        />
        <Image
          src="/images/market-assets/flag-br.svg"
          alt=""
          width={30}
          height={30}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  if (targetKey === "GBP/BRL" || targetKey === "GBP") {
    return (
      <div className={`currency-pair-flags ${className || ""}`} aria-hidden="true">
        <Image
          src="/images/market-assets/flag-gb.svg"
          alt=""
          width={30}
          height={30}
          onError={() => setHasError(true)}
        />
        <Image
          src="/images/market-assets/flag-br.svg"
          alt=""
          width={30}
          height={30}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // 2. GOLD BAR (REAL 1024x1024 POLISHED GOLD BULLION PHOTOGRAPHY IN 3/4 PERSPECTIVE WITH TRANSPARENT BACKGROUND)
  if (targetKey === "XAU/USD" || targetKey === "OURO" || targetKey === "GOLD") {
    return (
      <Image
        src="/images/market-assets/gold-bullion.png"
        alt=""
        width={1024}
        height={1024}
        className={`gold-bullion-image ${className || ""}`}
        aria-hidden="true"
        onError={() => setHasError(true)}
      />
    );
  }

  // 3. HORIZONTAL INDEX LOGOS (S&P 500, NASDAQ, IBOVESPA, DOW JONES)
  if (targetKey === "S&P 500" || targetKey === "SPX") {
    return (
      <Image
        src="/images/market-assets/sp500.svg"
        alt=""
        width={240}
        height={60}
        className={`asset-logo-horizontal ${className || ""}`}
        aria-hidden="true"
        onError={() => setHasError(true)}
      />
    );
  }

  if (targetKey === "NASDAQ" || targetKey === "IXIC") {
    return (
      <Image
        src="/images/market-assets/nasdaq.svg"
        alt=""
        width={220}
        height={50}
        className={`asset-logo-horizontal ${className || ""}`}
        aria-hidden="true"
        onError={() => setHasError(true)}
      />
    );
  }

  if (targetKey === "IBOV" || targetKey === "IBOVESPA" || targetKey === "B3") {
    return (
      <Image
        src="/images/market-assets/b3.svg"
        alt=""
        width={210}
        height={50}
        className={`asset-logo-horizontal ${className || ""}`}
        aria-hidden="true"
        onError={() => setHasError(true)}
      />
    );
  }

  if (targetKey === "DJI" || targetKey === "DOW JONES") {
    return (
      <Image
        src="/images/market-assets/dow-jones.svg"
        alt=""
        width={240}
        height={50}
        className={`asset-logo-horizontal ${className || ""}`}
        aria-hidden="true"
        onError={() => setHasError(true)}
      />
    );
  }

  // 4. BITCOIN & ETHEREUM (UNTOUCHED PRESERVED)
  if (targetKey === "BTC/USD" || targetKey === "BITCOIN") {
    return (
      <Image
        src="/images/market-assets/bitcoin.svg"
        alt=""
        width={34}
        height={34}
        className={`market-asset-image market-asset-image--logo ${className || ""}`}
        aria-hidden="true"
        onError={() => setHasError(true)}
      />
    );
  }

  if (targetKey === "ETH/USD" || targetKey === "ETHEREUM") {
    return (
      <Image
        src="/images/market-assets/ethereum.svg"
        alt=""
        width={34}
        height={34}
        className={`market-asset-image market-asset-image--logo ${className || ""}`}
        aria-hidden="true"
        onError={() => setHasError(true)}
      />
    );
  }

  // 5. MACRO INDICATORS
  if (targetKey === "SELIC" || targetKey === "IPCA") {
    return (
      <Image
        src="/images/market-assets/flag-br.svg"
        alt=""
        width={32}
        height={32}
        className={`market-asset-image market-asset-image--round ${className || ""}`}
        aria-hidden="true"
        onError={() => setHasError(true)}
      />
    );
  }

  // Default fallback
  return (
    <Image
      src="/images/market-assets/bitcoin.svg"
      alt=""
      width={34}
      height={34}
      className={`market-asset-image market-asset-image--logo ${className || ""}`}
      aria-hidden="true"
      onError={() => setHasError(true)}
    />
  );
}

// Backward compatibility export aliases
export function MarketAssetIcon(props: PremiumMarketIconProps) {
  return <PremiumMarketIcon {...props} />;
}

export function MarketIcon({ symbol, className }: { symbol: string; className?: string }) {
  return <PremiumMarketIcon symbol={symbol} className={className} />;
}
