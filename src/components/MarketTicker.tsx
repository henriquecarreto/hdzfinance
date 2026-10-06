"use client";

import useSWR from "swr";
import { MarketResponse, MarketTickerItem } from "@/types/market";
import { usePathname } from "next/navigation";
import { Clock } from "lucide-react";
import { useLiveCryptoPrices, formatUsdPrice } from "@/context/CryptoMarketContext";

const fetcher = async (url: string): Promise<MarketResponse> => {
  const separator = url.includes("?") ? "&" : "?";

  const response = await fetch(`${url}${separator}timestamp=${Date.now()}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar mercado: ${response.status}`);
  }

  return response.json();
};

export default function MarketTicker() {
  const pathname = usePathname();
  const liveCrypto = useLiveCryptoPrices();

  if (
    pathname?.startsWith("/admin") ||
    pathname === "/educacional/fundamentos-do-dinheiro-bitcoin-criptomoedas"
  ) {
    return null;
  }

  const { data, error, isLoading } = useSWR<MarketResponse>(
    "/api/markets",
    fetcher,
    {
      refreshInterval: 60_000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      dedupingInterval: 10_000,
      keepPreviousData: true,
    }
  );

  const DEFAULT_ITEMS: MarketTickerItem[] = [
    { symbol: "USD/BRL", name: "Dólar Comercial", price: 5.68, formattedPrice: "R$ 5,68", currency: "BRL", changePercent: 0.24, direction: "up", lastUpdated: "Agora", marketState: "open", isStale: false, source: "Base" },
    { symbol: "IBOV", name: "Ibovespa", price: 131250, formattedPrice: "131.250,00", currency: "POINTS", changePercent: 0.28, direction: "up", lastUpdated: "Agora", marketState: "open", isStale: false, source: "Base" },
    { symbol: "BTC/USD", name: "Bitcoin", price: 96450, formattedPrice: "US$ 96.450,00", currency: "USD", changePercent: 1.85, direction: "up", lastUpdated: "Agora", marketState: "open", isStale: false, source: "Base" },
    { symbol: "ETH/USD", name: "Ethereum", price: 3420, formattedPrice: "US$ 3.420,00", currency: "USD", changePercent: 2.10, direction: "up", lastUpdated: "Agora", marketState: "open", isStale: false, source: "Base" },
    { symbol: "S&P 500", name: "S&P 500", price: 5920.4, formattedPrice: "5.920,40", currency: "POINTS", changePercent: 0.35, direction: "up", lastUpdated: "Agora", marketState: "open", isStale: false, source: "Base" },
    { symbol: "EUR/BRL", name: "Euro", price: 6.15, formattedPrice: "R$ 6,15", currency: "BRL", changePercent: 0.18, direction: "up", lastUpdated: "Agora", marketState: "open", isStale: false, source: "Base" },
    { symbol: "XAU/USD", name: "Ouro", price: 2685.5, formattedPrice: "US$ 2.685,50", currency: "USD", changePercent: 0.45, direction: "up", lastUpdated: "Agora", marketState: "open", isStale: false, source: "Base" },
    { symbol: "VIX", name: "VIX", price: 14.8, formattedPrice: "14,80", currency: "POINTS", changePercent: -1.2, direction: "down", lastUpdated: "Agora", marketState: "open", isStale: false, source: "Base" },
  ];

  const rawItems: MarketTickerItem[] = (data?.items && data.items.length > 0) ? data.items : DEFAULT_ITEMS;
  const fetchedAt: string | null = data?.fetchedAt || null;

  // Merge live crypto prices from central CryptoMarketProvider
  const items: MarketTickerItem[] = rawItems.map((item) => {
    if (item.symbol === "BTC/USD" && liveCrypto.BTC) {
      return {
        ...item,
        price: liveCrypto.BTC.price,
        formattedPrice: formatUsdPrice(liveCrypto.BTC.price),
        changePercent: liveCrypto.BTC.change24h,
        direction: liveCrypto.BTC.change24h > 0 ? "up" : liveCrypto.BTC.change24h < 0 ? "down" : "neutral",
        isStale: liveCrypto.BTC.status === "stale",
        source: "Bitstamp",
      };
    }
    if (item.symbol === "ETH/USD" && liveCrypto.ETH) {
      return {
        ...item,
        price: liveCrypto.ETH.price,
        formattedPrice: formatUsdPrice(liveCrypto.ETH.price),
        changePercent: liveCrypto.ETH.change24h,
        direction: liveCrypto.ETH.change24h > 0 ? "up" : liveCrypto.ETH.change24h < 0 ? "down" : "neutral",
        isStale: liveCrypto.ETH.status === "stale",
        source: "Bitstamp",
      };
    }
    return item;
  });

  // Duplicate items array to guarantee 0% to -50% seamless infinite loop without jumps
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className="w-full bg-[#080A0D] border-y border-white/[0.08] h-[34px] flex items-center select-none overflow-hidden ticker-mask relative z-20"
      aria-label="Esteira de preços de mercados ao vivo"
    >
      <div className="w-full flex items-center justify-between overflow-hidden">
        <div className="animate-marquee flex items-center transform-gpu">
          {duplicatedItems.map((item, index) => {
            const copyIndex = index < items.length ? 1 : 2;
            const isVix = item.symbol === "VIX";
            const isPositive = (item.changePercent ?? 0) > 0;
            const isNegative = (item.changePercent ?? 0) < 0;

            // Specific VIX color interpretation: rising VIX = Red/Orange (higher market volatility/risk)
            const changeColor = isVix
              ? isPositive
                ? "text-[#EF4444]"
                : isNegative
                ? "text-[#10B981]"
                : "text-[#C7CDD4]"
              : isPositive
              ? "text-[#10B981]"
              : isNegative
              ? "text-[#EF4444]"
              : "text-[#C7CDD4]";

            const arrowSymbol = isVix
              ? isPositive
                ? "▲"
                : isNegative
                ? "▼"
                : "—"
              : isPositive
              ? "▲"
              : isNegative
              ? "▼"
              : "—";

            return (
              <div
                key={`${item.symbol}-${copyIndex}`}
                className="flex items-center space-x-2.5 px-5 py-1 shrink-0 border-r border-white/[0.08] text-[11px] md:text-[12px] font-sans"
              >
                {/* Name / Symbol (Desktop: Name, Mobile: Symbol) */}
                <span className="text-[#9BA5B3] uppercase tracking-wider font-medium">
                  <span className="hidden sm:inline">{item.name}</span>
                  <span className="sm:hidden">{item.symbol}</span>
                </span>

                {/* Price (Weight 600) */}
                <span className="font-semibold text-[#F5F7FA] font-mono tracking-tight">
                  {item.formattedPrice}
                </span>

                {/* Arrow & Percentage */}
                {item.changePercent !== null ? (
                  <span className={`font-mono font-semibold flex items-center gap-1 ${changeColor}`}>
                    <span>{arrowSymbol}</span>
                    <span>
                      {isPositive ? "+" : ""}
                      {item.changePercent.toFixed(2).replace(".", ",")}%
                    </span>
                  </span>
                ) : (
                  <span className="font-mono text-[#9BA5B3]">—</span>
                )}

                {/* Market State or Stale Status Badges */}
              </div>
            );
          })}
        </div>

        {/* Brasilia Time Indicator & Error Badge */}
        <div className="hidden lg:flex items-center shrink-0 space-x-2 px-4 bg-[#080A0D] border-l border-white/[0.08] text-[10px] text-[#9BA5B3] z-10 h-full">
          {error && (
            <span className="text-amber-400 font-medium">Falha na atualização</span>
          )}
          {fetchedAt && (
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3 text-[#147BFF]" />
              <span>Atualizado às {fetchedAt}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
