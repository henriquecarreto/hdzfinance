"use client";

import { useState } from "react";
import { ChevronDown, Database, Clock, AlertTriangle, ShieldCheck } from "lucide-react";

interface MarketDataSourcesAccordionProps {
  lastFetchedAt: string | null;
}

export default function MarketDataSourcesAccordion({ lastFetchedAt }: MarketDataSourcesAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-[16px] bg-[#0B0F14] border border-white/[0.09] overflow-hidden transition-all duration-200">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="market-data-sources-content"
        className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#10151C]/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF]"
      >
        <div className="flex items-center space-x-3">
          <Database className="h-5 w-5 text-[#F59A18] shrink-0" aria-hidden="true" />
          <span className="font-outfit font-bold text-[16px] md:text-[18px] text-[#F7F8FA]">
            Dados, fontes e atualização
          </span>
        </div>

        <ChevronDown
          className={`h-5 w-5 text-[#9AA4B2] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#F59A18]" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id="market-data-sources-content"
          className="p-5 md:p-6 pt-0 border-t border-white/[0.06] text-[14px] text-[#9AA4B2] leading-relaxed space-y-5 animate-in fade-in duration-200"
        >
          {/* Last Update Summary */}
          <div className="flex items-center space-x-2 text-[13px] text-[#F7F8FA] font-medium pt-4">
            <Clock className="h-4 w-4 text-[#1677FF] shrink-0" aria-hidden="true" />
            <span>
              Última consulta ao servidor:{" "}
              {lastFetchedAt ? `${lastFetchedAt} (Horário de Brasília)` : "Horário indisponível"}
            </span>
          </div>

          {/* Sources List */}
          <div className="space-y-3">
            <strong className="text-[#F7F8FA] text-[15px] block font-semibold">
              Provedores e Fontes Utilizadas:
            </strong>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-1">
              <li className="p-3 rounded-xl bg-[#10151C] border border-white/[0.06]">
                <span className="font-bold text-[#F7F8FA] block">Taxa Selic</span>
                <span>Meta oficial definida pelo COPOM / Banco Central do Brasil.</span>
              </li>
              <li className="p-3 rounded-xl bg-[#10151C] border border-white/[0.06]">
                <span className="font-bold text-[#F7F8FA] block">IPCA (12m)</span>
                <span>Índice oficial de inflação divulgado pelo IBGE.</span>
              </li>
              <li className="p-3 rounded-xl bg-[#10151C] border border-white/[0.06]">
                <span className="font-bold text-[#F7F8FA] block">Dólar Comercial & Ibovespa</span>
                <span>Consultados via brapi.dev com fallbacks AwesomeAPI e Yahoo Finance.</span>
              </li>
              <li className="p-3 rounded-xl bg-[#10151C] border border-white/[0.06]">
                <span className="font-bold text-[#F7F8FA] block">S&P 500, Nasdaq, VIX & Ouro</span>
                <span>Dados de mercado fornecidos via Twelve Data e Yahoo Finance.</span>
              </li>
              <li className="p-3 rounded-xl bg-[#10151C] border border-white/[0.06] md:col-span-2">
                <span className="font-bold text-[#F7F8FA] block">Criptoativos (Bitcoin & Ethereum)</span>
                <span>Cotações mundiais em tempo real via CoinGecko API (mercado 24/7).</span>
              </li>
            </ul>
          </div>

          {/* Technical and Legal Disclaimers */}
          <div className="space-y-2 border-t border-white/[0.06] pt-4">
            <div className="flex items-start space-x-2 text-[13px]">
              <AlertTriangle className="h-4 w-4 text-[#F59A18] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong>Atrasos e Indisponibilidade:</strong> Cotações de mercado de renda variável e índices internacionais podem apresentar atrasos de 15 a 20 minutos por exigência dos provedores. Em caso de falha temporária no provedor externo, o sistema mantém exibido o último valor válido registrado em memória.
              </span>
            </div>

            <div className="flex items-start space-x-2 text-[13px]">
              <ShieldCheck className="h-4 w-4 text-[#1677FF] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong>Finalidade Informativa:</strong> Todos os valores exibidos possuem caráter meramente informativo e educacional, não constituindo instrução, recomendação personalizada ou oferta de investimento.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
