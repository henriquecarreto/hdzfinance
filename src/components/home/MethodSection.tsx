import React from "react";
import Image from "next/image";
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
      badgeColor: "text-[#F59A18]",
      borderColor: "border-[#F59A18]/40 hover:border-[#F59A18]",
    },
    {
      badge: "02",
      title: "A causa",
      text: "Juros, política, liquidez, energia, tecnologia ou confiança iniciaram o movimento?",
      pictogram: "cause" as const,
      colorScheme: "cyan" as const,
      badgeColor: "text-[#18C6D8]",
      borderColor: "border-[#18C6D8]/40 hover:border-[#18C6D8]",
    },
    {
      badge: "03",
      title: "A transmissão",
      text: "Como o efeito alcança moedas, títulos, empresas, bolsas e consumidores?",
      pictogram: "transmission" as const,
      colorScheme: "blue" as const,
      badgeColor: "text-[#168BFF]",
      borderColor: "border-[#168BFF]/40 hover:border-[#168BFF]",
    },
    {
      badge: "04",
      title: "Os sinais",
      text: "Quais dados podem confirmar, enfraquecer ou alterar essa interpretação?",
      pictogram: "signals" as const,
      colorScheme: "green" as const,
      badgeColor: "text-[#10B981]",
      borderColor: "border-[#10B981]/40 hover:border-[#10B981]",
    },
  ];

  const impactNodes = [
    { label: "Juros americanos mais altos", accent: "border-[#F59A18] text-[#F7F9FC] bg-[#F59A18]/15" },
    { label: "Títulos dos EUA mais atrativos", accent: "border-[#18C6D8] text-[#F7F9FC] bg-[#18C6D8]/15" },
    { label: "Dólar mais forte", accent: "border-[#168BFF] text-[#F7F9FC] bg-[#168BFF]/15" },
    { label: "Pressão sobre moedas emergentes", accent: "border-[#9D8CFF] text-[#F7F9FC] bg-[#9D8CFF]/15" },
    { label: "Mudança no crédito e nas importações", accent: "border-[#34D399] text-[#F7F9FC] bg-[#34D399]/15" },
  ];

  return (
    <section className="relative isolate overflow-hidden py-20 md:py-24 border-b border-[#22272E] bg-[#050607]">
      {/* Background Image Layer: COMO A HDZ EXPLICA */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/backgrounds/method-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-85 brightness-110 saturate-[1.1]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050607]/40 via-transparent to-[#050607]/60" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8 space-y-10 md:space-y-12">
        {/* Header Block */}
        <div className="max-w-[860px] space-y-3.5">
          <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#F59A18] block">
            COMO A HDZ EXPLICA
          </span>

          <h2 className="font-outfit font-extrabold text-[32px] sm:text-[38px] lg:text-[44px] text-[#F7F9FC] tracking-tight leading-[1.16]">
            Notícia informa. Contexto mostra por que ela importa.
          </h2>

          <p className="text-[15.5px] md:text-[17px] text-[#E5EAF0] leading-[1.65] font-normal">
            Todo conteúdo da HDZ deve responder a quatro perguntas: o que mudou, o que iniciou o movimento, por onde o efeito se espalha e quais sinais merecem acompanhamento.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-6 md:p-7 flex flex-col justify-between space-y-4 bg-[#0A0C0F] rounded-[16px] border ${step.borderColor} transition-all duration-200`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <HdzPictogram type={step.pictogram} colorScheme={step.colorScheme} />
                  <span className={`font-mono text-[13px] font-bold ${step.badgeColor}`}>
                    {step.badge}
                  </span>
                </div>

                <h3 className="font-outfit font-bold text-[18px] md:text-[20px] text-[#F7F9FC] leading-snug">
                  {step.title}
                </h3>

                <p className="text-[13.5px] md:text-[14px] text-[#E5EAF0] leading-[1.55]">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Proprietary Block: MAPA DE IMPACTO HDZ */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0A0C0F] border border-[#22272E] space-y-6">
          <div className="flex items-center gap-2.5 text-[#F59A18] font-outfit font-extrabold text-[12px] md:text-[13px] uppercase tracking-widest">
            <Activity className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>MAPA DE IMPACTO HDZ</span>
          </div>

          {/* Desktop Flow (Horizontal Nodes with Colors & High Contrast Arrows) */}
          <div className="hidden lg:flex items-center justify-between gap-3 pt-1">
            {impactNodes.map((node, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`flex-1 p-3.5 rounded-xl border text-center font-outfit font-semibold text-[13px] leading-snug transition-all ${node.accent}`}
                >
                  {node.label}
                </div>
                {idx < impactNodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-[#C8D2DD] shrink-0" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile & Tablet Flow (Vertical Sequential Nodes) */}
          <div className="lg:hidden space-y-3 pt-1">
            {impactNodes.map((node, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`p-3.5 rounded-xl border text-left font-outfit font-semibold text-[13.5px] flex items-center justify-between ${node.accent}`}
                >
                  <span className="font-mono text-[11px] text-[#C8D2DD] font-bold mr-3">0{idx + 1}</span>
                  <span className="flex-1">{node.label}</span>
                </div>
                {idx < impactNodes.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown className="w-4 h-4 text-[#C8D2DD]" aria-hidden="true" />
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

