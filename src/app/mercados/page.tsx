"use client";

import { useEffect, useState, useCallback } from "react";
import { MarketTickerItem, MarketResponse } from "@/types/market";
import { MacroDataResponse } from "@/lib/macro-provider";
import { MarketIcon } from "@/components/MarketIcons";
import TradingViewAdvancedChart from "@/components/TradingViewAdvancedChart";
import MarketPartnerships from "@/components/MarketPartnerships";
import { TrendingUp, TrendingDown, Clock, ShieldCheck } from "lucide-react";

export default function MarketsPage() {
  const [marketItems, setMarketItems] = useState<MarketTickerItem[]>([]);
  const [tickerFetchedAt, setTickerFetchedAt] = useState<string | null>(null);
  const [tickerLoading, setTickerLoading] = useState(true);

  const [macroData, setMacroData] = useState<MacroDataResponse | null>(null);
  const [macroLoading, setMacroLoading] = useState(true);

  // Fetch Macro Indicators (/api/market/macro)
  const fetchMacro = useCallback(() => {
    fetch("/api/market/macro")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: MacroDataResponse | null) => {
        if (data && data.selic && data.ipca12m) {
          setMacroData(data);
        }
        setMacroLoading(false);
      })
      .catch(() => setMacroLoading(false));
  }, []);

  // Fetch Market Ticker Quotes (/api/markets)
  const fetchTicker = useCallback(() => {
    fetch("/api/markets")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: MarketResponse | null) => {
        if (data && data.items) {
          setMarketItems(data.items);
          if (data.fetchedAt) {
            setTickerFetchedAt(data.fetchedAt);
          }
        }
        setTickerLoading(false);
      })
      .catch(() => setTickerLoading(false));
  }, []);

  useEffect(() => {
    fetchMacro();
    fetchTicker();

    // Controlled polling intervals
    const tickerInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchTicker();
      }
    }, 15000); // 15s controlled polling

    const macroInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchMacro();
      }
    }, 3600000); // 1 hr controlled polling for macro

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchTicker();
        fetchMacro();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(tickerInterval);
      clearInterval(macroInterval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fetchMacro, fetchTicker]);

  // Order definitions
  const traditionalSymbolsOrder = ["USD/BRL", "IBOV", "S&P 500", "NASDAQ", "VIX", "XAU/USD"];
  const traditionalIndicators = traditionalSymbolsOrder
    .map((sym) => marketItems.find((m) => m.symbol === sym))
    .filter((item): item is MarketTickerItem => Boolean(item));

  const cryptoSymbolsOrder = ["BTC/USD", "ETH/USD"];
  const cryptoIndicators = cryptoSymbolsOrder
    .map((sym) => marketItems.find((m) => m.symbol === sym))
    .filter((item): item is MarketTickerItem => Boolean(item));

  const headerTimestamp = macroData?.fetchedAt || tickerFetchedAt;

  return (
    <div className="markets-page py-10 md:py-16 font-sans">
      <div className="w-[calc(100%-32px)] md:w-[min(1200px,calc(100%-48px))] max-w-[1240px] mx-auto space-y-14 md:space-y-16">
        
        {/* ==================== 1. PAINEL DE ABERTURA ==================== */}
        <header className="market-header-panel p-8 md:p-10 space-y-4 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/[0.08] pb-5">
            <div className="flex items-center space-x-2.5">
              <div className="w-1.5 h-5 bg-[#F59A18] rounded-full" aria-hidden="true" />
              <span className="text-[12px] md:text-[13px] font-bold text-[#F59A18] uppercase tracking-widest block">
                PAINEL DE MERCADOS
              </span>
            </div>

            {headerTimestamp && (
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#10151C]/80 text-[#B8C5D1] border border-white/[0.10] text-[12px] md:text-[13px] self-start sm:self-auto backdrop-blur-md">
                <Clock className="h-3.5 w-3.5 text-[#168BFF] shrink-0" aria-hidden="true" />
                <span>
                  Atualizado em <strong className="text-[#EEF4FA]">{headerTimestamp}</strong> (horário de Brasília)
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-1">
            <h1 className="font-outfit font-bold text-[34px] sm:text-[40px] md:text-[46px] text-[#EEF4FA] tracking-tight leading-[1.15]">
              Mercados & Conjuntura Econômica
            </h1>

            <p className="text-[16px] md:text-[18px] text-[#B8C5D1] max-w-3xl leading-relaxed">
              Acompanhe os principais indicadores econômicos oficiais, índices globais, moedas, commodities e criptoativos em um único painel.
            </p>
          </div>
        </header>

        {/* ==================== 2. CARTÕES DOS INDICADORES ==================== */}
        <div className="space-y-14">
          
          {/* GRUPO 1: INDICADORES ECONÔMICOS OFICIAIS (BCB & IBGE) */}
          <section className="space-y-5 text-left">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-[#F59A18] rounded-full" aria-hidden="true" />
                <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#EEF4FA] tracking-tight">
                  Indicadores econômicos
                </h2>
              </div>
              <div className="w-12 h-[2px] bg-[#F59A18]/40 rounded-full mt-1 ml-4" />
            </div>

            {macroLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {[1, 2].map((idx) => (
                  <div key={idx} className="market-card p-6 min-h-[132px] animate-pulse space-y-4">
                    <div className="h-4 w-32 bg-[#10151C] rounded" />
                    <div className="h-8 w-40 bg-[#10151C] rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {/* SELIC CARD */}
                <div className="market-card p-6 min-h-[132px] flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3.5">
                      <MarketIcon symbol="SELIC" />
                      <div>
                        <span className="text-[12px] font-bold text-[#B8C5D1] uppercase tracking-wider block">
                          SELIC
                        </span>
                        <h3 className="font-outfit font-bold text-[16px] md:text-[18px] text-[#EEF4FA]">
                          Taxa Selic
                        </h3>
                      </div>
                    </div>

                    {macroData?.selic.status === "official" ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#13D69C] bg-[#13D69C]/10 border border-[#13D69C]/30 rounded">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Oficial BCB
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#F59A18] bg-[#F59A18]/10 border border-[#F59A18]/30 rounded">
                        Atualização pendente
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between border-t border-white/[0.08] pt-3.5">
                    <div className="flex items-baseline space-x-1.5">
                      <span className="font-mono font-bold text-[28px] md:text-[34px] text-[#EEF4FA] tabular-nums">
                        {macroData?.selic.formattedValue || "14,00%"}
                      </span>
                      <span className="text-[13px] font-mono text-[#B8C5D1]">a.a.</span>
                    </div>

                    <span className="text-[13px] font-mono font-medium text-[#B8C5D1] px-3 py-1 rounded-lg bg-[#10151C] border border-white/[0.08] tabular-nums">
                      Vigente desde {macroData?.selic.referenceDate || "06/08/2026"}
                    </span>
                  </div>
                </div>

                {/* IPCA CARD */}
                <div className="market-card p-6 min-h-[132px] flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3.5">
                      <MarketIcon symbol="IPCA" />
                      <div>
                        <span className="text-[12px] font-bold text-[#B8C5D1] uppercase tracking-wider block">
                          IPCA
                        </span>
                        <h3 className="font-outfit font-bold text-[16px] md:text-[18px] text-[#EEF4FA]">
                          IPCA acumulado em 12 meses
                        </h3>
                      </div>
                    </div>

                    {macroData?.ipca12m.status === "official" ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#13D69C] bg-[#13D69C]/10 border border-[#13D69C]/30 rounded">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Oficial IBGE
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#F59A18] bg-[#F59A18]/10 border border-[#F59A18]/30 rounded">
                        Atualização pendente
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between border-t border-white/[0.08] pt-3.5">
                    <span className="font-mono font-bold text-[28px] md:text-[34px] text-[#EEF4FA] tabular-nums">
                      {macroData?.ipca12m.formattedValue || "4,44%"}
                    </span>

                    <span className="text-[13px] font-mono font-medium text-[#B8C5D1] px-3 py-1 rounded-lg bg-[#10151C] border border-white/[0.08] tabular-nums">
                      Referência: {macroData?.ipca12m.referenceMonth || "Jul/2026"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* GRUPO 2: MERCADOS E CÂMBIO */}
          <section className="space-y-5 text-left">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-[#168BFF] rounded-full" aria-hidden="true" />
                <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#EEF4FA] tracking-tight">
                  Mercados e câmbio
                </h2>
              </div>
              <div className="w-12 h-[2px] bg-[#168BFF]/40 rounded-full mt-1 ml-4" />
            </div>

            {tickerLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="market-card p-6 min-h-[142px] animate-pulse space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-[42px] h-[42px] rounded-xl bg-[#10151C]" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-16 bg-[#10151C] rounded" />
                        <div className="h-4 w-28 bg-[#10151C] rounded" />
                      </div>
                    </div>
                    <div className="h-8 w-36 bg-[#10151C] rounded mt-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {traditionalIndicators.map((item) => {
                  const isVix = item.symbol === "VIX";
                  const isPositive = (item.changePercent ?? 0) > 0;
                  const isNegative = (item.changePercent ?? 0) < 0;

                  const changeColor = isVix
                    ? isPositive
                      ? "text-[#FF5964]"
                      : "text-[#13D69C]"
                    : isPositive
                    ? "text-[#13D69C]"
                    : isNegative
                    ? "text-[#FF5964]"
                    : "text-[#B8C5D1]";

                  const displaySymbol = item.symbol === "NASDAQ" ? "IXIC" : item.symbol === "S&P 500" ? "SPX" : item.symbol;

                  return (
                    <div
                      key={item.symbol}
                      className="market-card p-6 min-h-[142px] flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3.5">
                          <MarketIcon symbol={item.symbol} />
                          <div>
                            <span className="text-[12px] font-bold text-[#B8C5D1] uppercase tracking-wider block">
                              {displaySymbol}
                            </span>
                            <h3 className="font-outfit font-bold text-[16px] md:text-[18px] text-[#EEF4FA]">
                              {item.name}
                            </h3>
                          </div>
                        </div>

                        {item.isStale && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold text-[#F59A18] bg-[#F59A18]/10 border border-[#F59A18]/30 rounded">
                            Com atraso
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline justify-between border-t border-white/[0.08] pt-3.5">
                        <span className="font-mono font-bold text-[28px] md:text-[34px] text-[#EEF4FA] tabular-nums">
                          {item.formattedPrice}
                        </span>

                        {item.changePercent !== null ? (
                          <span className={`inline-flex items-center text-[13px] md:text-[14px] font-mono font-bold tabular-nums ${changeColor}`}>
                            {isPositive ? (
                              <TrendingUp className="h-3.5 w-3.5 mr-1 shrink-0" aria-hidden="true" />
                            ) : isNegative ? (
                              <TrendingDown className="h-3.5 w-3.5 mr-1 shrink-0" aria-hidden="true" />
                            ) : null}
                            {isPositive ? "+" : ""}
                            {item.changePercent.toFixed(2).replace(".", ",")}%
                          </span>
                        ) : (
                          <span className="text-[12px] font-mono text-[#B8C5D1]">Indisponível</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* GRUPO 3: CRIPTOATIVOS */}
          <section className="space-y-5 text-left">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-[#13D69C] rounded-full" aria-hidden="true" />
                <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#EEF4FA] tracking-tight">
                  Criptoativos
                </h2>
              </div>
              <div className="w-12 h-[2px] bg-[#13D69C]/40 rounded-full mt-1 ml-4" />
            </div>

            {tickerLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {[1, 2].map((idx) => (
                  <div key={idx} className="market-card p-6 min-h-[142px] animate-pulse space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-[42px] h-[42px] rounded-xl bg-[#10151C]" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-16 bg-[#10151C] rounded" />
                        <div className="h-4 w-28 bg-[#10151C] rounded" />
                      </div>
                    </div>
                    <div className="h-8 w-36 bg-[#10151C] rounded mt-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {cryptoIndicators.map((item) => {
                  const isPositive = (item.changePercent ?? 0) > 0;
                  const isNegative = (item.changePercent ?? 0) < 0;
                  const changeColor = isPositive ? "text-[#13D69C]" : isNegative ? "text-[#FF5964]" : "text-[#B8C5D1]";

                  return (
                    <div
                      key={item.symbol}
                      className="market-card p-6 min-h-[142px] flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3.5">
                          <MarketIcon symbol={item.symbol} />
                          <div>
                            <span className="text-[12px] font-bold text-[#B8C5D1] uppercase tracking-wider block">
                              {item.symbol}
                            </span>
                            <h3 className="font-outfit font-bold text-[16px] md:text-[18px] text-[#EEF4FA]">
                              {item.name}
                            </h3>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#13D69C] bg-[#13D69C]/10 border border-[#13D69C]/30 rounded">
                          24/7
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between border-t border-white/[0.08] pt-3.5">
                        <span className="font-mono font-bold text-[28px] md:text-[34px] text-[#EEF4FA] tabular-nums">
                          {item.formattedPrice}
                        </span>

                        {item.changePercent !== null ? (
                          <span className={`inline-flex items-center text-[13px] md:text-[14px] font-mono font-bold tabular-nums ${changeColor}`}>
                            {isPositive ? (
                              <TrendingUp className="h-3.5 w-3.5 mr-1 shrink-0" aria-hidden="true" />
                            ) : isNegative ? (
                              <TrendingDown className="h-3.5 w-3.5 mr-1 shrink-0" aria-hidden="true" />
                            ) : null}
                            {isPositive ? "+" : ""}
                            {item.changePercent.toFixed(2).replace(".", ",")}%
                          </span>
                        ) : (
                          <span className="text-[12px] font-mono text-[#B8C5D1]">Indisponível</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

        </div>

        {/* ==================== 3. SUPERGRÁFICO TRADINGVIEW ==================== */}
        <section className="space-y-6 text-left pt-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <div className="w-1.5 h-6 bg-[#F59A18] rounded-full" aria-hidden="true" />
              <h2 className="font-outfit font-bold text-[24px] md:text-[28px] text-[#EEF4FA] tracking-tight">
                Supergráfico do mercado
              </h2>
            </div>
            <p className="text-[15px] md:text-[17px] text-[#B8C5D1] max-w-3xl leading-relaxed ml-4">
              Explore a movimentação dos principais índices, moedas, commodities e criptoativos em diferentes períodos.
            </p>
            <div className="w-12 h-[2px] bg-[#F59A18]/40 rounded-full mt-1 ml-4" />
          </div>

          <TradingViewAdvancedChart />
        </section>

        {/* ==================== 4. PARCERIAS COMERCIAIS ==================== */}
        <MarketPartnerships />

      </div>
    </div>
  );
}
