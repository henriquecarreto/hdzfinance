"use client";

import { useEffect, useState } from "react";
import { useMarketData } from "@/context/MarketDataContext";

export default function MarketDebugPanel() {
  const [isDebug, setIsDebug] = useState(false);
  const [uncaughtErrors, setUncaughtErrors] = useState<string[]>([]);
  const {
    snapshot,
    assets,
    items,
    loading,
    error,
    lastFetchedAt,
    initialSnapshotReceived,
    clientSnapshotReceived,
    lastFetchStatus,
    lastFetchTime,
    lastFetchError,
  } = useMarketData();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setIsDebug(searchParams.get("marketdebug") === "1");

      const handleGlobalError = (event: ErrorEvent) => {
        setUncaughtErrors((prev) => [
          ...prev.slice(-4),
          `Error: ${event.message || "Unknown"} (${event.filename || "inline"}:${event.lineno || 0})`,
        ]);
      };

      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        const reason = event.reason;
        const msg = reason?.message || String(reason) || "Unhandled promise rejection";
        setUncaughtErrors((prev) => [...prev.slice(-4), `Rejection: ${msg}`]);
      };

      window.addEventListener("error", handleGlobalError);
      window.addEventListener("unhandledrejection", handleUnhandledRejection);

      return () => {
        window.removeEventListener("error", handleGlobalError);
        window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      };
    }
  }, []);

  if (!isDebug) return null;

  const buildSha = process.env.NEXT_PUBLIC_BUILD_SHA || "v2.4.0-ssr-20261007";
  const tickerItems = items.filter(
    (item) => item.symbol !== "SELIC" && item.symbol !== "IPCA12M"
  );
  const isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
  const visibilityState = typeof document !== "undefined" ? document.visibilityState : "unknown";
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "SSR";

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 max-h-[60vh] overflow-y-auto bg-[#07090E]/95 backdrop-blur-md border-t-2 border-[#F59A18] p-4 text-[11px] font-mono text-[#E2E8F0] z-50 shadow-2xl space-y-3"
      aria-label="Painel de Diagnóstico de Market Data"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-bold text-[#F59A18] uppercase tracking-wider text-[12px]">
            MARKET DATA DEBUG PANEL (?marketdebug=1)
          </span>
        </div>
        <span className="bg-[#1E293B] text-[#94A3B8] px-2 py-0.5 rounded text-[10px]">
          SHA: {buildSha}
        </span>
      </div>

      {/* METRICAS CHAVE */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#0F172A] p-3 rounded border border-white/5">
        <div>
          <span className="text-[#94A3B8] block text-[10px]">SNAPSHOT ID</span>
          <span className="font-bold text-[#F5F7FA] truncate block">{snapshot?.snapshotId || "Nenhum"}</span>
        </div>
        <div>
          <span className="text-[#94A3B8] block text-[10px]">GENERATED AT (UTC)</span>
          <span className="font-bold text-[#F5F7FA] truncate block">{snapshot?.generatedAt || "Nenhum"}</span>
        </div>
        <div>
          <span className="text-[#94A3B8] block text-[10px]">INITIAL SNAPSHOT (SSR)?</span>
          <span className={`font-bold ${initialSnapshotReceived ? "text-[#10B981]" : "text-[#EF4444]"}`}>
            {initialSnapshotReceived ? "SIM (Recebido)" : "NÃO"}
          </span>
        </div>
        <div>
          <span className="text-[#94A3B8] block text-[10px]">CLIENT REVALIDATED?</span>
          <span className={`font-bold ${clientSnapshotReceived ? "text-[#10B981]" : "text-[#F59A18]"}`}>
            {clientSnapshotReceived ? "SIM" : "Aguardando / Falha"}
          </span>
        </div>
        <div>
          <span className="text-[#94A3B8] block text-[10px]">ASSETS TOTAL</span>
          <span className="font-bold text-[#F5F7FA]">{Object.keys(assets).length}</span>
        </div>
        <div>
          <span className="text-[#94A3B8] block text-[10px]">TICKER ITEMS</span>
          <span className="font-bold text-[#F5F7FA]">{tickerItems.length}</span>
        </div>
        <div>
          <span className="text-[#94A3B8] block text-[10px]">REDE / VISIBILIDADE</span>
          <span className="font-bold text-[#F5F7FA]">
            {isOnline ? "Online" : "Offline"} | {visibilityState}
          </span>
        </div>
        <div>
          <span className="text-[#94A3B8] block text-[10px]">ÚLTIMO FETCH STATUS</span>
          <span className={`font-bold ${lastFetchStatus === 200 ? "text-[#10B981]" : "text-[#EF4444]"}`}>
            {lastFetchStatus || "SSR Only"} ({lastFetchTime || "Sem fetch"})
          </span>
        </div>
      </div>

      {/* DETALHES DE ERROS */}
      {lastFetchError && (
        <div className="bg-[#451A03] border border-[#F59E0B]/30 p-2 rounded text-[#FDE68A]">
          <strong>ÚLTIMO ERRO DE FETCH:</strong> {lastFetchError}
        </div>
      )}

      {uncaughtErrors.length > 0 && (
        <div className="bg-[#450A0A] border border-[#EF4444]/30 p-2 rounded text-[#FCA5A5] space-y-1">
          <strong>EXCEÇÕES JAVASCRIPT CAPTURADAS ({uncaughtErrors.length}):</strong>
          {uncaughtErrors.map((err, idx) => (
            <div key={idx} className="text-[10px] font-mono break-all">• {err}</div>
          ))}
        </div>
      )}

      {/* USER AGENT */}
      <div className="text-[10px] text-[#64748B] truncate">
        <strong>User-Agent:</strong> {userAgent}
      </div>

      {/* TABELA DE ATIVOS */}
      <div className="space-y-1">
        <strong className="text-[#F59A18] block text-[11px]">TABELA DE ATIVOS ATUAIS:</strong>
        <div className="overflow-x-auto border border-white/10 rounded">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1E293B] text-[#94A3B8] text-[10px]">
                <th className="p-1.5 border-b border-white/10">SÍMBOLO</th>
                <th className="p-1.5 border-b border-white/10">NOME</th>
                <th className="p-1.5 border-b border-white/10">PREÇO</th>
                <th className="p-1.5 border-b border-white/10">VAR %</th>
                <th className="p-1.5 border-b border-white/10">STATUS</th>
                <th className="p-1.5 border-b border-white/10">FONTE</th>
                <th className="p-1.5 border-b border-white/10">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(assets).map((asset) => (
                <tr key={asset.symbol} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-1.5 font-bold text-[#F5F7FA]">{asset.symbol}</td>
                  <td className="p-1.5 text-[#94A3B8]">{asset.name}</td>
                  <td className="p-1.5 font-bold text-[#38BDF8]">{asset.formattedPrice}</td>
                  <td className="p-1.5">
                    {asset.changePercent !== null ? `${asset.changePercent}%` : "—"}
                  </td>
                  <td className="p-1.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold ${
                        asset.quoteStatus === "realtime"
                          ? "bg-[#10B981]/20 text-[#10B981]"
                          : asset.quoteStatus === "delayed"
                          ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                          : asset.quoteStatus === "reference"
                          ? "bg-[#3B82F6]/20 text-[#3B82F6]"
                          : "bg-[#EF4444]/20 text-[#EF4444]"
                      }`}
                    >
                      {asset.quoteStatus}
                    </span>
                  </td>
                  <td className="p-1.5 text-[#94A3B8] truncate max-w-[120px]">{asset.source}</td>
                  <td className="p-1.5 text-[#64748B] text-[10px]">{asset.sourceTimestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </aside>
  );
}
