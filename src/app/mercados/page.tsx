"use client";

import { useEffect, useState, useCallback } from "react";
import { MarketTickerItem, MarketResponse } from "@/types/market";
import { MacroDataResponse } from "@/lib/macro-provider";
import { PremiumMarketIcon } from "@/components/MarketIcons";
import TradingViewAdvancedChart from "@/components/TradingViewAdvancedChart";
import MarketPartnerships from "@/components/MarketPartnerships";
import { TrendingUp, TrendingDown, ShieldCheck } from "lucide-react";
import { useLiveCryptoPrices } from "@/context/CryptoMarketContext";
import { formatAssetValue, formatChangePercent } from "@/lib/formatters";

export default function MarketsPage() {
  const liveCrypto = useLiveCryptoPrices();
  const [marketItems, setMarketItems] = useState<MarketTickerItem[]>([]);
  const [macroData, setMacroData] = useState<MacroDataResponse | null>(null);
  const [macroLoading, setMacroLoading] = useState(true);
  const [tickerLoading, setTickerLoading] = useState(true);

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

  // Order definitions for Moedas e Proteção (4 cards) and Índices (4 cards)
  const currencySymbolsOrder = ["USD/BRL", "EUR/BRL", "GBP/BRL", "XAU/USD"];
  const indexSymbolsOrder = ["S&P 500", "NASDAQ", "IBOV", "DJI"];

  const currencyIndicators = currencySymbolsOrder
    .map((sym) => marketItems.find((m) => m.symbol === sym))
    .filter((item): item is MarketTickerItem => Boolean(item));

  const indexIndicators = indexSymbolsOrder
    .map((sym) => marketItems.find((m) => m.symbol === sym))
    .filter((item): item is MarketTickerItem => Boolean(item));

  // Crypto cards data definitions bound to single Bitstamp source
  const cryptoCards = [
    {
      symbol: "BTC/USD",
      name: "Bitcoin",
      quote: liveCrypto.BTC,
      fallbackItem: marketItems.find((m) => m.symbol === "BTC/USD"),
    },
    {
      symbol: "ETH/USD",
      name: "Ethereum",
      quote: liveCrypto.ETH,
      fallbackItem: marketItems.find((m) => m.symbol === "ETH/USD"),
    },
  ];

  const renderCompactCard = (item: MarketTickerItem) => {
    const isPositive = (item.changePercent ?? 0) > 0;
    const isNegative = (item.changePercent ?? 0) < 0;

    const changeColor = isPositive
      ? "text-[#19d3a2]"
      : isNegative
      ? "text-[#ff5967]"
      : "text-[#a9b4c2]";

    const displaySymbol =
      item.symbol === "NASDAQ"
        ? "IXIC"
        : item.symbol === "S&P 500"
        ? "SPX"
        : item.symbol;

    return (
      <div
        key={item.symbol}
        className="market-card--compact flex flex-col justify-between space-y-3.5"
      >
        <div className="flex items-center justify-between">
          <div className="market-card-header min-w-0 flex-1">
            <div className="market-card-brand">
              <PremiumMarketIcon symbol={item.symbol} />
            </div>
            <div className="market-card-identification">
              <span className="market-card-symbol text-[#A9B4C2] uppercase block tracking-wider">
                {displaySymbol}
              </span>
              <h3 className="font-outfit market-card-name text-[#F5F7FA] truncate">
                {item.name}
              </h3>
            </div>
          </div>

          {item.isStale && (
            <span className="px-1.5 py-0.5 text-[9px] font-semibold text-[#F59A18] bg-[#F59A18]/10 border border-[#F59A18]/30 rounded shrink-0 ml-2">
              Com atraso
            </span>
          )}
        </div>

        <div className="flex items-baseline justify-between border-t border-white/[0.08] pt-3">
          <span className="market-card-value text-[#F5F7FA]">
            {item.price !== null ? formatAssetValue(item.price, item.currency) : "—"}
          </span>

          {item.changePercent !== null ? (
            <span
              className={`inline-flex items-center market-card-change ${changeColor}`}
              aria-label={`Variação de ${formatChangePercent(item.changePercent)}`}
            >
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5 mr-0.5 shrink-0" aria-hidden="true" />
              ) : isNegative ? (
                <TrendingDown className="h-3.5 w-3.5 mr-0.5 shrink-0" aria-hidden="true" />
              ) : null}
              {formatChangePercent(item.changePercent)}
            </span>
          ) : (
            <span className="text-[11px] font-mono text-[#A9B4C2]">Dados indisponíveis</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="markets-page markets-main py-10 md:py-16 font-sans">
      <div className="markets-container space-y-14 md:space-y-16">
        
        {/* ==================== 1. PAINEL INTRODUTÓRIO ==================== */}
        <header className="markets-hero text-left">
          <div className="space-y-4 max-w-4xl">
            <span className="text-[12px] font-bold text-[#F59A18] uppercase tracking-widest block">
              PAINEL DE MERCADOS
            </span>

            <h1 className="font-outfit font-extrabold text-[28px] sm:text-[36px] md:text-[44px] text-[#F5F7FA] tracking-tight leading-[1.15]">
              Mercados em movimento. Contexto para enxergar além do preço.
            </h1>

            <p className="text-[15px] md:text-[17px] text-[#A9B4C2] leading-relaxed">
              Acompanhe os principais indicadores econômicos, moedas, índices, ouro e criptoativos em um painel desenvolvido para transformar números dispersos em uma leitura mais clara do cenário.
            </p>
          </div>
        </header>

        {/* ==================== 2. GRUPO 1: INDICADORES ECONÔMICOS ==================== */}
        <section className="space-y-5 text-left">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-5 bg-[#F59A18] rounded-full" aria-hidden="true" />
              <span className="text-[12px] font-bold text-[#F59A18] uppercase tracking-widest block">
                INDICADORES ECONÔMICOS
              </span>
            </div>

            <h2 className="font-outfit font-bold text-[22px] md:text-[25px] text-[#F5F7FA] tracking-tight">
              Indicadores que definem o cenário
            </h2>

            <p className="text-[14px] md:text-[15px] text-[#A9B4C2] leading-relaxed max-w-3xl">
              Juros e inflação ajudam a revelar o custo do dinheiro, o comportamento do consumo e os caminhos possíveis da economia.
            </p>
          </div>

          {macroLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {[1, 2].map((idx) => (
                <div key={idx} className="market-card p-6 min-h-[132px] animate-pulse space-y-4">
                  <div className="h-4 w-32 bg-[#0E1620] rounded" />
                  <div className="h-8 w-40 bg-[#0E1620] rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {/* SELIC CARD */}
              <div className="market-card p-6 min-h-[132px] flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <PremiumMarketIcon symbol="SELIC" />
                    <div>
                      <span className="text-[12px] font-bold text-[#A9B4C2] uppercase tracking-wider block">
                        SELIC
                      </span>
                      <h3 className="font-outfit font-bold text-[16px] md:text-[18px] text-[#F5F7FA]">
                        Taxa Selic
                      </h3>
                    </div>
                  </div>

                  {macroData?.selic.status === "official" ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#19d3a2] bg-[#19d3a2]/10 border border-[#19d3a2]/30 rounded">
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
                    <span className="market-card-value text-[#F5F7FA]">
                      {macroData?.selic.value !== undefined ? `${macroData.selic.value.toFixed(2).replace(".", ",")}%` : "14,00%"}
                    </span>
                    <span className="text-[13px] font-mono text-[#A9B4C2]">a.a.</span>
                  </div>

                  <span className="text-[12px] font-mono font-medium text-[#A9B4C2] px-3 py-1 rounded-lg bg-[#0E1620] border border-white/[0.08] tabular-nums">
                    Vigente desde {macroData?.selic.referenceDate || "06/08/2026"}
                  </span>
                </div>
              </div>

              {/* IPCA CARD */}
              <div className="market-card p-6 min-h-[132px] flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <PremiumMarketIcon symbol="IPCA" />
                    <div>
                      <span className="text-[12px] font-bold text-[#A9B4C2] uppercase tracking-wider block">
                        IPCA
                      </span>
                      <h3 className="font-outfit font-bold text-[16px] md:text-[18px] text-[#F5F7FA]">
                        IPCA acumulado em 12 meses
                      </h3>
                    </div>
                  </div>

                  {macroData?.ipca12m.status === "official" ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#19d3a2] bg-[#19d3a2]/10 border border-[#19d3a2]/30 rounded">
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
                  <span className="market-card-value text-[#F5F7FA]">
                    {macroData?.ipca12m.value !== undefined ? `${macroData.ipca12m.value.toFixed(2).replace(".", ",")}%` : "4,44%"}
                  </span>

                  <span className="text-[12px] font-mono font-medium text-[#A9B4C2] px-3 py-1 rounded-lg bg-[#0E1620] border border-white/[0.08] tabular-nums">
                    Referência: {macroData?.ipca12m.referenceMonth || "Jul/2026"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ==================== 3. GRUPO 2: MERCADOS E CÂMBIO ==================== */}
        <section className="space-y-6 text-left">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-5 bg-[#258dff] rounded-full" aria-hidden="true" />
              <span className="text-[12px] font-bold text-[#258dff] uppercase tracking-widest block">
                MERCADOS E CÂMBIO
              </span>
            </div>

            <h2 className="font-outfit font-bold text-[22px] md:text-[25px] text-[#F5F7FA] tracking-tight">
              Câmbio e mercados globais
            </h2>

            <p className="text-[14px] md:text-[15px] text-[#A9B4C2] leading-relaxed max-w-3xl">
              Uma leitura objetiva dos principais ativos que influenciam o ambiente financeiro brasileiro e internacional.
            </p>
          </div>

          {/* LINE 1: MOEDAS E PROTEÇÃO */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-[#A9B4C2] uppercase tracking-widest block">
              MOEDAS E PROTEÇÃO
            </span>

            {tickerLoading ? (
              <div className="market-assets-grid">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="market-card--compact p-4 min-h-[126px] animate-pulse space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-xl bg-[#0E1620]" />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-3 w-12 bg-[#0E1620] rounded" />
                        <div className="h-4 w-24 bg-[#0E1620] rounded" />
                      </div>
                    </div>
                    <div className="h-7 w-28 bg-[#0E1620] rounded mt-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="market-assets-grid">
                {currencyIndicators.map(renderCompactCard)}
              </div>
            )}
          </div>

          {/* LINE 2: ÍNDICES */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-bold text-[#A9B4C2] uppercase tracking-widest block">
              ÍNDICES
            </span>

            {tickerLoading ? (
              <div className="market-assets-grid">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="market-card--compact p-4 min-h-[126px] animate-pulse space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-xl bg-[#0E1620]" />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-3 w-12 bg-[#0E1620] rounded" />
                        <div className="h-4 w-24 bg-[#0E1620] rounded" />
                      </div>
                    </div>
                    <div className="h-7 w-28 bg-[#0E1620] rounded mt-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="market-assets-grid">
                {indexIndicators.map(renderCompactCard)}
              </div>
            )}
          </div>
        </section>

        {/* ==================== 4. GRUPO 3: CRIPTOATIVOS ==================== */}
        <section className="space-y-5 text-left">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-5 bg-[#19d3a2] rounded-full" aria-hidden="true" />
              <span className="text-[12px] font-bold text-[#19d3a2] uppercase tracking-widest block">
                CRIPTOATIVOS
              </span>
            </div>

            <h2 className="font-outfit font-bold text-[22px] md:text-[25px] text-[#F5F7FA] tracking-tight">
              Criptoativos em tempo real
            </h2>

            <p className="text-[14px] md:text-[15px] text-[#A9B4C2] leading-relaxed max-w-3xl">
              Acompanhe Bitcoin e Ethereum com cotações sincronizadas entre o painel, o ticker e a fonte utilizada no gráfico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {cryptoCards.map(({ symbol, name, quote, fallbackItem }) => {
              const price = quote?.price ?? fallbackItem?.price ?? null;
              const changePercent = quote?.change24h ?? fallbackItem?.changePercent ?? null;
              const isStale = quote?.status === "stale" || (fallbackItem?.isStale ?? false);

              const isPositive = (changePercent ?? 0) > 0;
              const isNegative = (changePercent ?? 0) < 0;
              const changeColor = isPositive ? "text-[#19d3a2]" : isNegative ? "text-[#ff5967]" : "text-[#a9b4c2]";

              return (
                <div
                  key={symbol}
                  className="market-card p-6 min-h-[142px] flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3.5">
                      <PremiumMarketIcon symbol={symbol} />
                      <div>
                        <span className="text-[12px] font-bold text-[#A9B4C2] uppercase tracking-wider block">
                          {symbol}
                        </span>
                        <h3 className="font-outfit font-bold text-[16px] md:text-[18px] text-[#F5F7FA]">
                          {name}
                        </h3>
                      </div>
                    </div>

                    {isStale ? (
                      <span className="px-2 py-0.5 text-[10px] font-semibold text-[#F59A18] bg-[#F59A18]/10 border border-[#F59A18]/30 rounded">
                        Com atraso
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#19d3a2] bg-[#19d3a2]/10 border border-[#19d3a2]/30 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#19d3a2] animate-pulse" aria-hidden="true" />
                        <span>Bitstamp 24/7</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between border-t border-white/[0.08] pt-3.5">
                    {price !== null && !isNaN(price) ? (
                      <span className="market-card-value text-[#F5F7FA]">
                        {formatAssetValue(price, "USD")}
                      </span>
                    ) : (
                      <div className="h-9 w-36 bg-[#0E1620] rounded animate-pulse" />
                    )}

                    {changePercent !== null && !isNaN(changePercent) ? (
                      <span
                        className={`inline-flex items-center text-[13px] md:text-[14px] font-mono font-bold tabular-nums ${changeColor}`}
                        aria-label={`Variação de ${formatChangePercent(changePercent)}`}
                      >
                        {isPositive ? (
                          <TrendingUp className="h-3.5 w-3.5 mr-1 shrink-0" aria-hidden="true" />
                        ) : isNegative ? (
                          <TrendingDown className="h-3.5 w-3.5 mr-1 shrink-0" aria-hidden="true" />
                        ) : null}
                        {formatChangePercent(changePercent)}
                      </span>
                    ) : (
                      <span className="text-[12px] font-mono text-[#A9B4C2]">—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================== 5. SUPERGRÁFICO TRADINGVIEW ==================== */}
        <section className="space-y-5 text-left pt-2">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-5 bg-[#F59A18] rounded-full" aria-hidden="true" />
              <span className="text-[12px] font-bold text-[#F59A18] uppercase tracking-widest block">
                ANÁLISE DE MERCADO
              </span>
            </div>

            <h2 className="font-outfit font-bold text-[22px] md:text-[25px] text-[#F5F7FA] tracking-tight">
              Explore cada movimento com mais profundidade
            </h2>

            <p className="text-[14px] md:text-[15px] text-[#A9B4C2] leading-relaxed max-w-3xl">
              Selecione um ativo, altere o período e acompanhe tendências, volatilidade e comportamento de preço em um único ambiente de análise.
            </p>
          </div>

          <TradingViewAdvancedChart />
        </section>

        {/* ==================== 6. PLATAFORMAS PARCEIRAS ==================== */}
        <MarketPartnerships />

      </div>
    </div>
  );
}
