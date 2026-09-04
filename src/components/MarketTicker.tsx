"use client";

import useSWR from "swr";
import { MarketResponse, MarketTickerItem } from "@/types/market";
import { Clock } from "lucide-react";

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

  const items: MarketTickerItem[] = data?.items || [];
  const fetchedAt: string | null = data?.fetchedAt || null;

  if (isLoading && !data) {
    return (
      <div className="w-full bg-[#080A0D] border-y border-white/[0.08] h-[34px] flex items-center justify-between px-5 md:px-8 text-[11px] text-[#9BA5B3] font-sans">
        <span>Carregando cotações ao vivo...</span>
        <span className="flex items-center gap-1 text-[10px]">
          <Clock className="h-3 w-3 text-[#147BFF]" />
          Aguardando resposta do servidor
        </span>
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

  // Duplicate items array to guarantee 0% to -50% seamless infinite loop without jumps
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className="w-full bg-[#080A0D] border-y border-white/[0.08] h-[34px] flex items-center select-none overflow-hidden ticker-mask relative z-20"
      aria-label="Esteira de preços de mercados ao vivo"
    >
      <div className="w-full overflow-x-auto scrollbar-none flex items-center justify-between">
        <div className="animate-marquee flex items-center">
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
                {item.isStale && (
                  <span
                    className="text-[9px] px-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    title="Cotação anterior"
                  >
                    Cotação anterior
                  </span>
                )}
                {!item.isStale && item.marketState === "closed" && (
                  <span
                    className="text-[9px] text-[#9BA5B3]/60 hidden md:inline"
                    title="Mercado fechado"
                  >
                    (Fechado)
                  </span>
                )}
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
