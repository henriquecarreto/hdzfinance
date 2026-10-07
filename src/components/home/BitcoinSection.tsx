import React from "react";
import Image from "next/image";
import HdzPictogram from "@/components/ui/HdzPictogram";

export default function BitcoinSection() {
  const fundamentals = [
    {
      number: "01",
      title: "Emissão previsível",
      text: "A criação de novas unidades segue regras conhecidas pelo mercado e não depende de decisões discricionárias de uma empresa ou governo.",
      pictogram: "predictable-issuance" as const,
      colorScheme: "gold" as const,
      borderColor: "border-[#F59A18]/40 hover:border-[#F59A18]",
    },
    {
      number: "02",
      title: "Validação distribuída",
      text: "Participantes independentes verificam transações e mantêm cópias das regras e do histórico da rede.",
      pictogram: "distributed-validation" as const,
      colorScheme: "blue" as const,
      borderColor: "border-[#168BFF]/40 hover:border-[#168BFF]",
    },
    {
      number: "03",
      title: "Propriedade e custódia",
      text: "O controle das chaves permite a posse direta do ativo, mas também transfere ao usuário responsabilidades de segurança.",
      pictogram: "keys-custody" as const,
      colorScheme: "cyan" as const,
      borderColor: "border-[#18C6D8]/40 hover:border-[#18C6D8]",
    },
    {
      number: "04",
      title: "Risco sem simplificação",
      text: "Volatilidade, custódia, regulação, liquidez e concentração continuam sendo fatores relevantes para qualquer análise responsável.",
      pictogram: "risk-shield" as const,
      colorScheme: "violet" as const,
      borderColor: "border-[#8277FF]/40 hover:border-[#8277FF]",
    },
  ];

  return (
    <section id="bitcoin-section" className="relative isolate overflow-hidden py-20 md:py-24 border-b border-white/[0.08] bg-[#050607]">
      {/* Background Image Layer: DESCENTRALIZAÇÃO NA PRÁTICA */}
      <div className="absolute top-0 left-0 right-0 h-[clamp(480px,110vw,720px)] md:h-full z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/backgrounds/bitcoin-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[80%_top] md:object-center opacity-90 brightness-110 saturate-[1.1]"
          priority
        />
        {/* Soft Vignette & Mobile Fade Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050607]/30 via-[#050607]/65 via-65% to-[#050607] md:from-[#050607]/40 md:via-transparent md:to-[#050607]/60" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8 space-y-10 md:space-y-12">
        {/* Header Block with Localized Backdrop Blur */}
        <div className="max-w-[860px] space-y-3.5 p-6 md:p-8 rounded-2xl bg-[#050607]/75 backdrop-blur-md border border-white/10 shadow-2xl">
          <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#F59A18] block">
            DESCENTRALIZAÇÃO NA PRÁTICA
          </span>

          <h2 className="font-outfit font-extrabold text-[32px] sm:text-[38px] lg:text-[44px] text-[#EEF4FA] tracking-tight leading-[1.16]">
            Bitcoin não é um dólar digital. É outra arquitetura de confiança.
          </h2>

          <div className="section-copy space-y-3 text-[15.5px] md:text-[17px] text-[#EEF3F8] leading-[1.65] font-normal">
            <p>
              Enquanto moedas digitais vinculadas ao sistema financeiro dependem de emissores e instituições identificáveis, o Bitcoin utiliza regras públicas, validação distribuída e uma oferta definida pelo protocolo.
            </p>
            <p>
              Isso não elimina riscos nem garante valorização. Apenas muda a forma como emissão, transferência, custódia e verificação são organizadas.
            </p>
          </div>
        </div>

        {/* 4 Refined Fundamentals Cards Grid */}
        <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {fundamentals.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 md:p-7 flex flex-col justify-between space-y-4 bg-[#0A0C0F]/85 backdrop-blur-md rounded-xl border ${item.borderColor} transition-all duration-200 cursor-default group shadow-xl`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <HdzPictogram type={item.pictogram} colorScheme={item.colorScheme} />
                  <span className="font-outfit font-extrabold text-[22px] text-[#F59A18]">
                    {item.number}
                  </span>
                </div>

                <h3 className="font-outfit font-bold text-[19px] md:text-[20px] text-[#EEF4FA] leading-snug">
                  {item.title}
                </h3>

                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Callout with Glassmorphism */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0A0C0F]/85 backdrop-blur-md border border-[#F59A18]/40 text-center max-w-[860px] mx-auto shadow-2xl">
          <p className="font-outfit font-bold text-[18px] md:text-[21px] text-[#EEF4FA] tracking-tight">
            “Antes de comparar preços, compare as regras.”
          </p>
        </div>
      </div>
    </section>
  );
}
