"use client";

import React, { useState } from "react";

export default function GlobalMarketsSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      id: "brasil",
      label: "Brasil",
      badge: "BRASIL · JUROS E CÂMBIO",
      title: "Selic e câmbio definem o ritmo do mercado brasileiro.",
      text: "Decisões do Banco Central, expectativas fiscais e fluxos internacionais influenciam o crédito, o real e os ativos locais. O Bitcoin também faz parte das escolhas dos investidores, mas seu comportamento depende de fatores globais e da demanda no mercado.",
      diagramSteps: [
        { num: "01", title: "Selic e expectativas", desc: "Decisões do BC & risco fiscal" },
        { num: "02", title: "Custo do crédito e câmbio", desc: "Taxas locais & cotação do Real" },
        { num: "03", title: "Decisões de investimento", desc: "Renda fixa, ações & ativos digitais" },
      ],
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="13" stroke="#168BFF" strokeOpacity="0.5" strokeDasharray="3 2" />
          <circle cx="16" cy="16" r="9" stroke="#168BFF" strokeWidth="1.5" />
          <text x="9.5" y="20" fill="#F59A18" fontSize="11" fontFamily="monospace" fontWeight="bold" stroke="none">R$</text>
        </svg>
      ),
    },
    {
      id: "usa",
      label: "Estados Unidos",
      badge: "ESTADOS UNIDOS · FED E DÓLAR",
      title: "As decisões do Fed repercutem além dos Estados Unidos.",
      text: "Mudanças nas expectativas de juros influenciam o dólar e as condições financeiras globais. O apetite por risco pode mudar, com efeitos sobre ações, outros ativos e o mercado de Bitcoin.",
      diagramSteps: [
        { num: "01", title: "Fed e expectativas", desc: "Taxa de juros do Federal Reserve" },
        { num: "02", title: "Dólar e liquidez", desc: "Treasuries & câmbio global" },
        { num: "03", title: "Mercados globais", desc: "Ações, commodities & Bitcoin" },
      ],
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="6" stroke="#F59A18" fill="#F59A18" fillOpacity="0.2" />
          <text x="13" y="20" fill="#F59A18" fontSize="12" fontFamily="monospace" fontWeight="bold" stroke="none">$</text>
          <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="#168BFF" />
          <circle cx="16" cy="4" r="1.5" fill="#168BFF" />
          <circle cx="16" cy="28" r="1.5" fill="#168BFF" />
          <circle cx="4" cy="16" r="1.5" fill="#168BFF" />
          <circle cx="28" cy="16" r="1.5" fill="#168BFF" />
        </svg>
      ),
    },
    {
      id: "europa",
      label: "Europa",
      badge: "EUROPA · BCE E ATIVIDADE",
      title: "A Europa também altera a rota do capital.",
      text: "Juros, inflação e atividade econômica influenciam o euro, o crédito e a alocação internacional de recursos. Seus reflexos em outros mercados, inclusive no Bitcoin, são indiretos e dependem do contexto.",
      diagramSteps: [
        { num: "01", title: "BCE e economia", desc: "Política monetária europeia" },
        { num: "02", title: "Euro e crédito", desc: "Condições financeiras da Zona do Euro" },
        { num: "03", title: "Fluxos internacionais", desc: "Alocação global de capital" },
      ],
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="6" stroke="#F59A18" fill="#F59A18" fillOpacity="0.2" />
          <text x="12.5" y="20" fill="#F59A18" fontSize="12" fontFamily="monospace" fontWeight="bold" stroke="none">€</text>
          <path d="M7 7l5.5 5.5M25 7l-5.5 5.5M7 25l5.5-5.5M25 25l-5.5-5.5" stroke="#168BFF" strokeDasharray="2 2" />
          <circle cx="7" cy="7" r="1.5" fill="#168BFF" />
          <circle cx="25" cy="7" r="1.5" fill="#168BFF" />
          <circle cx="7" cy="25" r="1.5" fill="#168BFF" />
          <circle cx="25" cy="25" r="1.5" fill="#168BFF" />
        </svg>
      ),
    },
    {
      id: "ia",
      label: "IA & Infraestrutura",
      badge: "TECNOLOGIA · CAPITAL E INFRAESTRUTURA",
      title: "A infraestrutura digital disputa investimento e energia.",
      text: "Chips, centros de dados, redes e energia exigem capital de longo prazo. A expansão desses setores muda prioridades de empresas e investidores e cria novas conexões entre tecnologia e mercados.",
      diagramSteps: [
        { num: "01", title: "Investimento", desc: "Aporte de capital de longo prazo" },
        { num: "02", title: "Chips, dados e energia", desc: "Gargalos físicos & capacidade computacional" },
        { num: "03", title: "Expansão da infraestrutura", desc: "Novos polos de valor & produtividade" },
      ],
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="10" y="10" width="12" height="12" rx="2" stroke="#F59A18" fill="#F59A18" fillOpacity="0.2" />
          <rect x="13" y="13" width="6" height="6" fill="#F59A18" />
          <path d="M13 4v6M19 4v6M13 22v6M19 22v6M4 13h6M4 19h6M22 13h6M22 19h6" stroke="#168BFF" />
          <circle cx="13" cy="4" r="1" fill="#168BFF" />
          <circle cx="19" cy="4" r="1" fill="#168BFF" />
          <circle cx="4" cy="13" r="1" fill="#168BFF" />
          <circle cx="28" cy="13" r="1" fill="#168BFF" />
        </svg>
      ),
    },
  ];

  const current = tabs[activeTab];

  return (
    <section
      aria-label="O novo mapa do capital"
      className="relative isolate py-12 md:py-16 border-b border-[#22272E] bg-[#000000]"
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 space-y-8 md:space-y-10">
        {/* 1. CABEÇALHO EDITORIAL */}
        <div className="max-w-[820px] space-y-3.5">
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#168BFF] block">
            O NOVO MAPA DO CAPITAL
          </span>

          <h2 className="font-outfit font-extrabold text-[28px] sm:text-[34px] lg:text-[40px] text-[#F7F9FC] tracking-tight leading-[1.18]">
            O caminho do dinheiro, das decisões de juros ao Bitcoin.
          </h2>

          <p className="text-[14px] md:text-[15px] text-[#E5EAF0] leading-[1.6]">
            Quando o custo do dinheiro muda, investidores reavaliam moedas, renda fixa, ações e ativos digitais. Explore como Brasil, Estados Unidos, Europa e infraestrutura tecnológica entram nesse movimento.
          </p>
        </div>

        {/* 2. QUATRO OPÇÕES DE NAVEGAÇÃO COMPACTAS */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3"
          role="tablist"
          aria-label="Opções do mapa do capital"
        >
          {tabs.map((t, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={isSelected}
                aria-controls="panel-mapa"
                onClick={() => setActiveTab(idx)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    setActiveTab((idx + 1) % tabs.length);
                  } else if (e.key === "ArrowLeft") {
                    setActiveTab((idx - 1 + tabs.length) % tabs.length);
                  }
                }}
                className={`px-3.5 py-3 rounded-xl font-outfit font-semibold text-[13px] sm:text-[14px] flex items-center gap-3 transition-all duration-200 cursor-pointer text-left ${
                  isSelected
                    ? "bg-[#101726] text-[#F7F9FC] border border-[#168BFF] shadow-[0_0_15px_rgba(22,139,255,0.15)]"
                    : "bg-[#0A0C0F] text-[#C8D2DD] hover:text-[#F7F9FC] hover:bg-[#12161D] border border-[#22272E]"
                }`}
              >
                <div className="shrink-0 flex items-center justify-center">
                  {t.icon}
                </div>
                <span className="truncate">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3 & 4. PAINEL ÚNICO COM TEXTO À ESQUERDA E DIAGRAMA À DIREITA */}
        <div
          id="panel-mapa"
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="p-6 md:p-8 rounded-2xl bg-[#0A0C0F] border border-[#22272E] transition-all duration-200 min-h-[360px]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Esquerda: Texto Selecionado */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F59A18] bg-[#F59A18]/[0.12] px-3 py-1 rounded-full border border-[#F59A18]/30 inline-block">
                {current.badge}
              </span>

              <h3 className="font-outfit font-extrabold text-[22px] sm:text-[26px] text-[#F7F9FC] leading-[1.24]">
                {current.title}
              </h3>

              <p className="text-[14px] md:text-[15px] text-[#E5EAF0] leading-[1.65]">
                {current.text}
              </p>
            </div>

            {/* Direita: Diagrama Visual do Fluxo do Capital */}
            <div className="lg:col-span-5 p-5 md:p-6 rounded-xl bg-[#000000] border border-[#22272E] space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#22272E] pb-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#168BFF]">
                  FLUXO DE CAPITAL
                </span>
                <span className="text-[10px] font-mono font-semibold text-[#C8D2DD]">
                  SISTEMA INTEG
                </span>
              </div>

              {/* Passos do Diagrama Conectados */}
              <div className="space-y-3.5 relative">
                {/* Linha de conexão vertical sutil */}
                <div className="absolute left-[15px] top-[18px] bottom-[18px] w-[1.5px] bg-gradient-to-b from-[#168BFF] via-[#168BFF]/60 to-[#F59A18]" />

                {current.diagramSteps.map((step, i) => {
                  const isLast = i === current.diagramSteps.length - 1;
                  return (
                    <div key={i} className="relative z-10 flex items-start gap-3.5 pl-0.5">
                      <div
                        className={`w-[30px] h-[30px] rounded-full shrink-0 flex items-center justify-center font-mono text-[11px] font-bold transition-all ${
                          isLast
                            ? "bg-[#F59A18]/20 text-[#F59A18] border border-[#F59A18]"
                            : "bg-[#121926] text-[#168BFF] border border-[#168BFF]/60"
                        }`}
                      >
                        {step.num}
                      </div>

                      <div className="pt-0.5 space-y-0.5">
                        <span className="font-outfit font-bold text-[13.5px] text-[#F7F9FC] block leading-tight">
                          {step.title}
                        </span>
                        <span className="text-[11.5px] text-[#C8D2DD] block font-medium">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


