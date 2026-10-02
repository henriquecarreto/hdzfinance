"use client";

import { useEffect, useRef, useState, memo } from "react";
import { ExternalLink, RefreshCw, WifiOff } from "lucide-react";

interface SymbolOption {
  symbol: string;
  label: string;
  shortLabel: string;
}

const AVAILABLE_SYMBOLS: SymbolOption[] = [
  { symbol: "FX_IDC:USDBRL", label: "Dólar (USD/BRL)", shortLabel: "USD/BRL" },
  { symbol: "FX_IDC:EURBRL", label: "Euro (EUR/BRL)", shortLabel: "EUR/BRL" },
  { symbol: "FX_IDC:GBPBRL", label: "Libra (GBP/BRL)", shortLabel: "GBP/BRL" },
  { symbol: "OANDA:XAUUSD", label: "Ouro (XAU/USD)", shortLabel: "Ouro" },
  { symbol: "BMFBOVESPA:IBOV", label: "Ibovespa (IBOV)", shortLabel: "Ibovespa" },
  { symbol: "BITSTAMP:BTCUSD", label: "Bitcoin (BTC/USD)", shortLabel: "Bitcoin" },
  { symbol: "BITSTAMP:ETHUSD", label: "Ethereum (ETH/USD)", shortLabel: "Ethereum" },
];

function TradingViewAdvancedChartComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartWrapperRef = useRef<HTMLDivElement>(null);

  const [activeSymbol, setActiveSymbol] = useState<string>("BITSTAMP:BTCUSD");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  // 1. Intersection Observer with 800px rootMargin to pre-load chart before reaching viewport
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // 2. Track online/offline status & visibility tab changes
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (hasError) {
        setReloadKey((prev) => prev + 1);
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && hasError && !isOffline) {
        setReloadKey((prev) => prev + 1);
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hasError, isOffline]);

  // 3. Mount TradingView Advanced Widget with Watchdog (12s) & Strict Mode cleanup
  useEffect(() => {
    if (!isVisible) return;
    if (typeof window !== "undefined" && !navigator.onLine) {
      setIsOffline(true);
    }

    const wrapper = chartWrapperRef.current;
    if (!wrapper) return;

    setIsLoaded(false);
    setHasError(false);

    // Clean previous widget DOM safely
    wrapper.innerHTML = "";

    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container__widget w-full h-full";
    wrapper.appendChild(widgetContainer);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;

    // Configuration with 4-hour interval for candles (240 minutes)
    const widgetConfig = {
      autosize: true,
      symbol: activeSymbol,
      interval: "240",
      timezone: "America/Sao_Paulo",
      theme: "dark",
      style: "1",
      locale: "br",
      backgroundColor: "#080B0F",
      gridColor: "rgba(255,255,255,0.05)",
      hide_top_toolbar: false,
      hide_side_toolbar: false,
      hide_legend: false,
      allow_symbol_change: true,
      save_image: false,
      calendar: false,
      withdateranges: true,
      support_host: "https://www.tradingview.com",
    };

    script.innerHTML = JSON.stringify(widgetConfig);

    // 12-second watchdog timer to verify iframe/widget mount
    let watchdogTimer: NodeJS.Timeout | null = null;

    const checkWidgetLoaded = () => {
      const iframe = wrapper.querySelector("iframe");
      if (iframe || wrapper.children.length > 0) {
        setIsLoaded(true);
      } else if (retryCount < 3 && navigator.onLine) {
        // Auto retry with backoff: 2s, 5s, 10s
        const backoffMs = retryCount === 0 ? 2000 : retryCount === 1 ? 5000 : 10000;
        setRetryCount((prev) => prev + 1);
        watchdogTimer = setTimeout(() => {
          setReloadKey((prev) => prev + 1);
        }, backoffMs);
      } else {
        setHasError(true);
        setIsLoaded(true);
      }
    };

    watchdogTimer = setTimeout(checkWidgetLoaded, 12000);

    script.onload = () => {
      setIsLoaded(true);
      if (watchdogTimer) clearTimeout(watchdogTimer);
    };

    script.onerror = () => {
      if (watchdogTimer) clearTimeout(watchdogTimer);
      if (retryCount < 3 && navigator.onLine) {
        const backoffMs = retryCount === 0 ? 2000 : retryCount === 1 ? 5000 : 10000;
        setRetryCount((prev) => prev + 1);
        setTimeout(() => setReloadKey((prev) => prev + 1), backoffMs);
      } else {
        setHasError(true);
        setIsLoaded(true);
      }
    };

    wrapper.appendChild(script);

    return () => {
      if (watchdogTimer) clearTimeout(watchdogTimer);
      if (wrapper) {
        wrapper.innerHTML = "";
      }
    };
  }, [isVisible, activeSymbol, reloadKey]);

  const handleManualRetry = () => {
    setRetryCount(0);
    setReloadKey((prev) => prev + 1);
  };

  const activeSymbolObj = AVAILABLE_SYMBOLS.find((s) => s.symbol === activeSymbol);

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Symbol Selector Pills Header */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1.5 scrollbar-none">
        <div className="flex items-center space-x-2 shrink-0">
          {AVAILABLE_SYMBOLS.map((item) => {
            const isActive = item.symbol === activeSymbol;
            return (
              <button
                key={item.symbol}
                type="button"
                aria-selected={isActive}
                onClick={() => {
                  if (item.symbol !== activeSymbol) {
                    setActiveSymbol(item.symbol);
                    setRetryCount(0);
                  }
                }}
                aria-label={`Exibir gráfico de ${item.label}`}
                className="market-symbol-button shrink-0"
              >
                {item.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chart Container wrapped in Ice-White Metallic Card Frame (CLS Prevention) */}
      <div className="market-card p-3 md:p-3.5 rounded-[16px] overflow-hidden">
        <div className="relative w-full h-[480px] md:h-[560px] lg:h-[640px] rounded-xl bg-[#080B0F] overflow-hidden">
          {/* Skeleton Loader */}
          {(!isVisible || !isLoaded) && !hasError && (
            <div className="absolute inset-0 z-10 bg-[#080B0F] p-6 flex flex-col justify-between animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-6 w-48 bg-[#10151C] rounded-md" />
                <div className="h-6 w-32 bg-[#10151C] rounded-md" />
              </div>
              <div className="space-y-4 my-auto">
                <div className="h-40 w-full bg-[#10151C]/60 rounded-xl" />
                <div className="h-20 w-3/4 bg-[#10151C]/40 rounded-xl" />
              </div>
              <div className="h-4 w-64 bg-[#10151C] rounded-md mx-auto" />
            </div>
          )}

          {/* Fallback Error View */}
          {(hasError || isOffline) && (
            <div className="absolute inset-0 z-20 bg-[#080B0F] p-8 flex flex-col items-center justify-center text-center space-y-4">
              {isOffline ? (
                <>
                  <WifiOff className="h-10 w-10 text-[#F59A18]" aria-hidden="true" />
                  <p className="text-base text-[#EEF4FA] font-medium max-w-md">
                    Você está offline. A conexão será restabelecida automaticamente assim que a internet voltar.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base text-[#EEF4FA] font-medium max-w-md">
                    Não foi possível carregar o gráfico interativo no momento.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleManualRetry}
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#10151C] text-[#EEF4FA] hover:text-[#F59A18] border border-white/[0.12] text-sm font-medium transition-colors"
                      aria-label="Tentar recarregar gráfico"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Tentar novamente</span>
                    </button>
                    <a
                      href={`https://www.tradingview.com/symbols/${activeSymbol.replace(":", "-")}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#168BFF] text-white hover:bg-[#168BFF]/90 text-sm font-medium transition-colors"
                      aria-label={`Abrir ${activeSymbolObj?.label} no TradingView`}
                    >
                      <span>Ver no TradingView</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TradingView Widget Mounting Wrapper */}
          <div
            ref={chartWrapperRef}
            className="tradingview-widget-container w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

// Export memoized component to avoid re-renders when parent state updates
export default memo(TradingViewAdvancedChartComponent);
