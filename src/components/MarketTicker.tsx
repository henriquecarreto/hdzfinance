"use client";

import { usePathname } from "next/navigation";
import { Clock } from "lucide-react";
import { useMarketData } from "@/context/MarketDataContext";

export default function MarketTicker() {
  const pathname = usePathname();
  const { items, lastFetchedAt, error } = useMarketData();

  if (
    pathname?.startsWith("/admin") ||
    pathname === "/educacional/fundamentos-do-dinheiro-bitcoin-criptomoedas"
  ) {
    return null;
  }

  // Filter items for marquee display (standard tickers)
  const tickerItems = items.filter(
    (item) => item.symbol !== "SELIC" && item.symbol !== "IPCA12M"
  );

  const displayItems = tickerItems.length > 0 ? tickerItems : [];
  // Quadruple array for 100% smooth infinite marquee on mobile and high-res displays
  const duplicatedItems = [
    ...displayItems,
    ...displayItems,
    ...displayItems,
    ...displayItems,
  ];

  return (
    <div
      className="w-full bg-[#000000] border-y border-white/[0.08] h-[34px] flex items-center select-none overflow-hidden relative z-20"
      aria-label="Esteira de preços de mercados ao vivo"
    >
      <div className="w-full flex items-center justify-between overflow-hidden">
        <div className="animate-marquee flex items-center transform-gpu">
          {duplicatedItems.map((item, index) => {
            const isVix = item.symbol === "VIX";
            const isPositive = (item.changePercent ?? 0) > 0;
            const isNegative = (item.changePercent ?? 0) < 0;

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
                key={`${item.symbol}-${index}`}
                className="flex items-center space-x-2.5 px-4 md:px-5 py-1 shrink-0 border-r border-white/[0.08] text-[11px] md:text-[12px] font-sans"
              >
                {/* Name / Symbol */}
                <span className="text-[#9BA5B3] uppercase tracking-wider font-medium">
                  <span className="hidden sm:inline">{item.name}</span>
                  <span className="sm:hidden">{item.symbol}</span>
                </span>

                {/* Price */}
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
              </div>
            );
          })}
        </div>

        {/* Brasilia Time Indicator & Status Badge */}
        <div className="hidden lg:flex items-center shrink-0 space-x-2 px-4 bg-[#080A0D] border-l border-white/[0.08] text-[10px] text-[#9BA5B3] z-10 h-full">
          {error && (
            <span className="text-amber-400 font-medium">Reconectando...</span>
          )}
          {lastFetchedAt && (
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3 text-[#147BFF]" />
              <span>Atualizado às {lastFetchedAt}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
