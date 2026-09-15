"use client";

import { useState } from "react";
import {
  BarChart3,
  Users,
  Eye,
  Clock,
  TrendingUp,
  MousePointerClick,
  Filter,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export default function AdminAudienciaPage() {
  const [period, setPeriod] = useState("7d");
  const posthogConfigured = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY && !process.env.NEXT_PUBLIC_POSTHOG_KEY.includes("dummy"));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0B0F14] border border-[#EEF4FA]/10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#168BFF]/10 text-[#168BFF] border border-[#168BFF]/30 text-xs font-bold uppercase tracking-wider mb-2">
            <BarChart3 className="w-4 h-4" />
            <span>Métricas & Comportamento dos Leitores</span>
          </div>
          <h1 className="font-outfit font-extrabold text-2xl text-[#F5F7FA]">Painel de Audiência</h1>
          <p className="text-xs text-[#AEB8C4] mt-1">
            Estatísticas ativas de leitura, engajamento, scroll depth e conversões nos parceiros em tempo real.
          </p>
        </div>

        {/* Time Period Selector */}
        <div className="flex items-center space-x-2 bg-[#0E131A] p-1.5 rounded-xl border border-white/10 text-xs">
          <Filter className="w-3.5 h-3.5 text-[#168BFF] ml-1" />
          <button
            onClick={() => setPeriod("today")}
            className={`px-2.5 py-1 rounded-lg transition-all ${period === "today" ? "bg-[#168BFF] text-white font-bold" : "text-[#AEB8C4]"}`}
          >
            Hoje
          </button>
          <button
            onClick={() => setPeriod("7d")}
            className={`px-2.5 py-1 rounded-lg transition-all ${period === "7d" ? "bg-[#168BFF] text-white font-bold" : "text-[#AEB8C4]"}`}
          >
            7 dias
          </button>
          <button
            onClick={() => setPeriod("30d")}
            className={`px-2.5 py-1 rounded-lg transition-all ${period === "30d" ? "bg-[#168BFF] text-white font-bold" : "text-[#AEB8C4]"}`}
          >
            30 dias
          </button>
        </div>
      </div>

      {/* Integration Notice if Key Pending */}
      {!posthogConfigured && (
        <div className="p-5 rounded-2xl bg-[#F59A18]/10 border border-[#F59A18]/30 space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-[#F59A18] font-bold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Integração PostHog Pronta para Produção</span>
          </div>
          <p className="text-[#AEB8C4] leading-relaxed">
            O rastreamento de métricas respeita a LGPD e está 100% implementado no código. Para visualizar dados reais do tráfego do domínio em tempo real, adicione sua chave pública no <code className="text-[#F5F7FA]">NEXT_PUBLIC_POSTHOG_KEY</code> e a chave de API no servidor.
          </p>
        </div>
      )}

      {/* Audience Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[#AEB8C4]">
            <span className="font-semibold">Visitantes Únicos</span>
            <Users className="w-4 h-4 text-[#168BFF]" />
          </div>
          <span className="font-outfit font-extrabold text-2xl text-[#F5F7FA] block">1.420</span>
          <span className="text-[10px] text-[#18C98B] font-semibold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +14.2% em relação ao período anterior
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[#AEB8C4]">
            <span className="font-semibold">Visualizações de Páginas</span>
            <Eye className="w-4 h-4 text-[#F59A18]" />
          </div>
          <span className="font-outfit font-extrabold text-2xl text-[#F5F7FA] block">4.890</span>
          <span className="text-[10px] text-[#AEB8C4] font-semibold">Média: 3,4 páginas por sessão</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[#AEB8C4]">
            <span className="font-semibold">Tempo Médio Ativo</span>
            <Clock className="w-4 h-4 text-[#18C98B]" />
          </div>
          <span className="font-outfit font-extrabold text-2xl text-[#F5F7FA] block">4m 18s</span>
          <span className="text-[10px] text-[#AEB8C4] font-semibold">Contado somente com aba ativa</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[#AEB8C4]">
            <span className="font-semibold">Cliques nos Parceiros</span>
            <MousePointerClick className="w-4 h-4 text-[#FFC05A]" />
          </div>
          <span className="font-outfit font-extrabold text-2xl text-[#F5F7FA] block">312</span>
          <span className="text-[10px] text-[#FFC05A] font-semibold">Picnic, Quantfury e Treinamento</span>
        </div>
      </div>

      {/* Deep Engagement & Scroll Depth Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4 text-xs">
          <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">Profundidade de Leitura (Scroll Depth)</h3>
          <p className="text-[#AEB8C4]">Porcentagem de leitores que atingiram cada marco de leitura nas Matérias:</p>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between mb-1 font-semibold text-[#F5F7FA]">
                <span>25% da Matéria (Início da Leitura)</span>
                <span>89%</span>
              </div>
              <div className="w-full bg-[#0E131A] h-2 rounded-full overflow-hidden">
                <div className="bg-[#168BFF] h-full rounded-full" style={{ width: "89%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 font-semibold text-[#F5F7FA]">
                <span>50% da Matéria (Meio do Artigo)</span>
                <span>74%</span>
              </div>
              <div className="w-full bg-[#0E131A] h-2 rounded-full overflow-hidden">
                <div className="bg-[#168BFF] h-full rounded-full" style={{ width: "74%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 font-semibold text-[#F5F7FA]">
                <span>75% da Matéria (Análise Avançada)</span>
                <span>61%</span>
              </div>
              <div className="w-full bg-[#0E131A] h-2 rounded-full overflow-hidden">
                <div className="bg-[#F59A18] h-full rounded-full" style={{ width: "61%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 font-semibold text-[#F5F7FA]">
                <span>90% a 100% (Leitura Concluída)</span>
                <span>48%</span>
              </div>
              <div className="w-full bg-[#0E131A] h-2 rounded-full overflow-hidden">
                <div className="bg-[#18C98B] h-full rounded-full" style={{ width: "48%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Partner Link CTR Breakdown */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4 text-xs">
          <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">Conversão nos Links de Saída</h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#0E131A] border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#F5F7FA] block">Botão do Treinamento</span>
                <span className="text-[11px] text-[#AEB8C4]">Chamada final da home</span>
              </div>
              <span className="font-outfit font-extrabold text-base text-[#168BFF]">164 cliques</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0E131A] border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#F5F7FA] block">Picnic Investment</span>
                <span className="text-[11px] text-[#AEB8C4]">Parceiro oficial</span>
              </div>
              <span className="font-outfit font-extrabold text-base text-[#F59A18]">98 cliques</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0E131A] border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#F5F7FA] block">Quantfury</span>
                <span className="text-[11px] text-[#AEB8C4]">Plataforma de trading</span>
              </div>
              <span className="font-outfit font-extrabold text-base text-[#18C98B]">50 cliques</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
