"use client";
import React, { useState } from "react";
import HdzPictogram, { PictogramType } from "@/components/ui/HdzPictogram";
import { CheckCircle2, Link2, ArrowRight } from "lucide-react";

export default function GlobalMarketsSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs: {
    id: string;
    label: string;
    pictogram: PictogramType;
    colorScheme: "green" | "blue" | "gold" | "cyan";
    title: string;
    text: string;
    factors: string[];
    connection: string[];
    regionBadge: string;
    visualGradient: string;
  }[] = [
    {
      id: "brasil",
      label: "Brasil",
      pictogram: "flag-brasil",
      colorScheme: "green",
      title: "Juros, câmbio e commodities no mesmo tabuleiro.",
      text: "Selic, cenário fiscal, crédito e ciclo de exportações ajudam a explicar o risco, o financiamento e o interesse pelos ativos brasileiros.",
      factors: [
        "Política monetária",
        "Fiscal e prêmio de risco",
        "Real e fluxo estrangeiro",
        "Commodities e atividade",
      ],
      connection: [
        "Selic",
        "Renda fixa",
        "Fluxo de capital",
        "Câmbio",
        "Crédito e consumo",
      ],
      regionBadge: "Mercado Brasileiro • B3 / Banco Central",
      visualGradient: "from-[#0D2818] via-[#051A10] to-[#08121C]",
    },
    {
      id: "usa",
      label: "Estados Unidos",
      pictogram: "flag-usa",
      colorScheme: "blue",
      title: "Wall Street influencia o custo do dinheiro no mundo.",
      text: "As decisões do Fed, os títulos do Tesouro, os lucros corporativos e a concentração tecnológica orientam a liquidez em dólar e o apetite global por risco.",
      factors: [
        "Fed e inflação",
        "Títulos do Tesouro",
        "S&P 500 e Nasdaq",
        "Lucros corporativos",
      ],
      connection: [
        "Juros dos Treasuries",
        "Carteiras globais",
        "Dólar",
        "Mercados emergentes",
      ],
      regionBadge: "Mercado Global • Wall Street / Federal Reserve",
      visualGradient: "from-[#0F2342] via-[#08152B] to-[#08121C]",
    },
    {
      id: "europa",
      label: "Europa",
      pictogram: "flag-europe",
      colorScheme: "gold",
      title: "A Europa equilibra juros, energia e competitividade.",
      text: "BCE, euro, custos de energia e política industrial influenciam o crescimento e a capacidade das empresas europeias de competir.",
      factors: [
        "BCE e euro",
        "Energia",
        "Indústria",
        "Regulação",
      ],
      connection: [
        "Energia",
        "Custos empresariais",
        "Inflação",
        "Decisões do BCE",
      ],
      regionBadge: "Mercado Europeu • BCE / Frankfurt & Londres",
      visualGradient: "from-[#2A1D08] via-[#171004] to-[#08121C]",
    },
    {
      id: "ia",
      label: "IA e infraestrutura",
      pictogram: "chip-ai",
      colorScheme: "cyan",
      title: "A corrida da inteligência artificial acontece fora da tela.",
      text: "Chips, data centers, energia, nuvem e segurança transformam avanço tecnológico em investimento, custos e pressão sobre a infraestrutura.",
      factors: [
        "Semicondutores",
        "Data centers e nuvem",
        "Energia",
        "Produtividade e segurança",
      ],
      connection: [
        "Mais capacidade computacional",
        "Mais investimento e energia",
        "Novos custos e gargalos",
        "Mudanças na competitividade",
      ],
      regionBadge: "Infraestrutura Macro • Semicondutores & Energia",
      visualGradient: "from-[#0A262C] via-[#05161A] to-[#08121C]",
    },
  ];

  const current = tabs[activeTab];

  return (
    <section className="relative isolate py-20 md:py-28 border-b border-white/[0.08] bg-[#08121C]">
      {/* Background Subtle Grid & Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#168BFF 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-8 space-y-10">
        {/* Header Block */}
        <div className="max-w-[780px] space-y-5">
          <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-[#168BFF] block">
            O NOVO MAPA DO CAPITAL
          </span>

          <h2 className="font-outfit font-extrabold text-[32px] md:text-[42px] lg:text-[46px] text-[#EEF4FA] tracking-tight leading-[1.18]">
            O dinheiro cruza fronteiras antes de aparecer nos preços.
          </h2>

          <div className="space-y-3.5 text-[16px] md:text-[17px] text-[#D5DDE6] leading-[1.65] font-normal">
            <p>
              Uma decisão do Fed, do BCE ou do Banco Central do Brasil pode atravessar juros, moedas, bolsas e empresas em sequência. Energia, chips e inteligência artificial criam novas rotas para esse movimento.
            </p>
            <p>
              Explore cada região para entender o que move o capital e como os efeitos chegam à economia brasileira.
            </p>
          </div>
        </div>

        {/* 4 Standard Equal-Width Tabs */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-white/10 pb-4"
          role="tablist"
          aria-label="O novo mapa do capital"
        >
          {tabs.map((t, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${t.id}`}
                onClick={() => setActiveTab(idx)}
                className={`min-h-[52px] px-4 py-3 rounded-xl font-outfit font-bold text-[15px] flex items-center justify-center gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0E1C2E] text-white border border-[#168BFF]/50 shadow-lg shadow-[#168BFF]/10"
                    : "bg-[#0A1422]/60 text-[#9BA5B3] hover:text-white hover:bg-[#0E1C2E]/50 border border-white/[0.05]"
                }`}
              >
                <HdzPictogram type={t.pictogram} colorScheme={t.colorScheme} className="!w-7 !h-7 !min-w-[28px]" />
                <span className="truncate">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Unified Standard Tab Panel Display (Full Width Grid 2-Columns) */}
        <div
          id={`panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="market-card capital-panel p-6 md:p-10 rounded-2xl bg-[#0B1524] border border-white/10 space-y-8 min-h-[420px]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Title, Text, 4 Factors */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9BA5B3] bg-white/[0.05] px-3 py-1 rounded-full border border-white/10 inline-block">
                  {current.regionBadge}
                </span>

                <h3 className="font-outfit font-extrabold text-[24px] md:text-[28px] text-[#EEF4FA] leading-tight">
                  {current.title}
                </h3>

                <p className="text-[16px] md:text-[17px] text-[#D5DDE6] leading-[1.65]">
                  {current.text}
                </p>
              </div>

              {/* 4 Short Factors Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {current.factors.map((factor, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0E1B2C] border border-white/[0.06] text-[14px] text-[#EEF4FA] font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#168BFF] shrink-0" aria-hidden="true" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Component Panel */}
            <div
              className={`lg:col-span-5 rounded-xl border border-white/10 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br ${current.visualGradient} relative overflow-hidden`}
            >
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <HdzPictogram type={current.pictogram} colorScheme={current.colorScheme} />
                  <span className="font-outfit font-bold text-[18px] text-white">
                    {current.label}
                  </span>
                </div>
                <p className="text-[14px] text-[#C7CDD4] leading-[1.6]">
                  A dinâmica de fluxo entre moedas, taxas e ativos altera a precificação de riscos globais.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9BA5B3] block mb-1">
                  Radar HDZ
                </span>
                <span className="text-[13px] text-[#EEF4FA] font-semibold">
                  Monitoramento contínuo das rotas de capital
                </span>
              </div>
            </div>
          </div>

          {/* Internal Footer: Conexão HDZ Chain */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[#168BFF] font-outfit font-extrabold text-[12px] uppercase tracking-wider">
              <Link2 className="w-4 h-4" aria-hidden="true" />
              <span>CONEXÃO HDZ</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[14px] md:text-[15px] font-outfit font-semibold text-[#EEF4FA]">
              {current.connection.map((step, idx) => (
                <React.Fragment key={idx}>
                  <span className="px-3 py-1.5 rounded-lg bg-[#0E1C2E] border border-white/10">
                    {step}
                  </span>
                  {idx < current.connection.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-[#168BFF] shrink-0" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
