import React from "react";
import HdzPictogram from "@/components/ui/HdzPictogram";
import { ArrowRight, ArrowDown, Activity } from "lucide-react";

export default function MethodSection() {
  const steps = [
    {
      badge: "01",
      title: "O fato",
      text: "O que aconteceu, quando aconteceu e qual é a fonte?",
      pictogram: "fact" as const,
      colorScheme: "gold" as const,
    },
    {
      badge: "02",
      title: "A causa",
      text: "Juros, política, liquidez, energia, tecnologia ou confiança iniciaram o movimento?",
      pictogram: "cause" as const,
      colorScheme: "cyan" as const,
    },
    {
      badge: "03",
      title: "A transmissão",
      text: "Como o efeito alcança moedas, títulos, empresas, bolsas e consumidores?",
      pictogram: "transmission" as const,
      colorScheme: "blue" as const,
    },
    {
      badge: "04",
      title: "Os sinais",
      text: "Quais dados podem confirmar, enfraquecer ou alterar essa interpretação?",
      pictogram: "signals" as const,
      colorScheme: "green" as const,
    },
  ];

  const impactNodes = [
    { label: "Juros americanos mais altos", accent: "border-[#F59A18] text-[#F59A18] bg-[#F59A18]/10" },
    { label: "Títulos dos EUA mais atrativos", accent: "border-[#18C6D8] text-[#18C6D8] bg-[#18C6D8]/10" },
    { label: "Dólar mais forte", accent: "border-[#168BFF] text-[#168BFF] bg-[#168BFF]/10" },
    { label: "Pressão sobre moedas emergentes", accent: "border-[#8277FF] text-[#8277FF] bg-[#8277FF]/10" },
    { label: "Mudança no crédito e nas importações", accent: "border-[#EEF4FA] text-[#EEF4FA] bg-[#EEF4FA]/10" },
  ];

  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28 border-b border-white/[0.08] bg-[#0B1118]">
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-8 space-y-12">
        {/* Header Block */}
        <div className="max-w-[780px] space-y-5">
          <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-[#F59A18] block">
            COMO A HDZ EXPLICA
          </span>

          <h2 className="font-outfit font-extrabold text-[32px] md:text-[42px] lg:text-[46px] text-[#EEF4FA] tracking-tight leading-[1.18]">
            Notícia informa. Contexto mostra por que ela importa.
          </h2>

          <div className="space-y-3.5 text-[16px] md:text-[17px] text-[#D5DDE6] leading-[1.65] font-normal">
            <p>
              Todo conteúdo da HDZ deve responder a quatro perguntas: o que mudou, o que iniciou o movimento, por onde o efeito se espalha e quais sinais merecem acompanhamento.
            </p>
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="market-card p-6 md:p-7 flex flex-col justify-between space-y-4 bg-[#070D14]/90 backdrop-blur-md rounded-[14px] border border-white/10 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <HdzPictogram type={step.pictogram} colorScheme={step.colorScheme} />
                  <span className="font-mono text-[13px] font-bold text-[#F59A18]">
                    {step.badge}
                  </span>
                </div>

                <h3 className="font-outfit font-bold text-[19px] md:text-[20px] text-[#EEF4FA] leading-snug">
                  {step.title}
                </h3>

                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Proprietary Block: MAPA DE IMPACTO HDZ */}
        <div className="p-6 md:p-10 rounded-2xl bg-[#080E17] border border-white/10 space-y-6">
          <div className="flex items-center gap-2.5 text-[#F59A18] font-outfit font-extrabold text-[13px] md:text-[14px] uppercase tracking-widest">
            <Activity className="w-4.5 h-4.5 shrink-0" aria-hidden="true" />
            <span>MAPA DE IMPACTO HDZ</span>
          </div>

          {/* Desktop Flow (Horizontal Nodes with Colors & Arrows) */}
          <div className="hidden lg:flex items-center justify-between gap-2.5 pt-2">
            {impactNodes.map((node, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`flex-1 p-4 rounded-xl border text-center font-outfit font-semibold text-[13px] leading-snug ${node.accent}`}
                >
                  {node.label}
                </div>
                {idx < impactNodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-[#9BA5B3] shrink-0" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile & Tablet Flow (Vertical Sequential Nodes) */}
          <div className="lg:hidden space-y-3 pt-2">
            {impactNodes.map((node, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`p-4 rounded-xl border text-left font-outfit font-semibold text-[14px] flex items-center justify-between ${node.accent}`}
                >
                  <span className="font-mono text-[12px] opacity-70 mr-3">0{idx + 1}</span>
                  <span className="flex-1">{node.label}</span>
                </div>
                {idx < impactNodes.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown className="w-4 h-4 text-[#9BA5B3]" aria-hidden="true" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
