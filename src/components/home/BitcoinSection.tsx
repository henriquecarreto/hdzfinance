import React from "react";
import HdzPictogram from "@/components/ui/HdzPictogram";

export default function BitcoinSection() {
  const fundamentals = [
    {
      number: "01",
      title: "Emissão previsível",
      text: "A criação de novas unidades segue regras conhecidas pelo mercado e não depende de decisões discricionárias de uma empresa ou governo.",
      pictogram: "predictable-issuance" as const,
      colorScheme: "gold" as const,
    },
    {
      number: "02",
      title: "Validação distribuída",
      text: "Participantes independentes verificam transações e mantêm cópias das regras e do histórico da rede.",
      pictogram: "distributed-validation" as const,
      colorScheme: "blue" as const,
    },
    {
      number: "03",
      title: "Propriedade e custódia",
      text: "O controle das chaves permite a posse direta do ativo, mas também transfere ao usuário responsabilidades de segurança.",
      pictogram: "keys-custody" as const,
      colorScheme: "cyan" as const,
    },
    {
      number: "04",
      title: "Risco sem simplificação",
      text: "Volatilidade, custódia, regulação, liquidez e concentração continuam sendo fatores relevantes para qualquer análise responsável.",
      pictogram: "risk-shield" as const,
      colorScheme: "violet" as const,
    },
  ];

  return (
    <section className="bitcoin-section relative isolate py-20 md:py-28 border-b border-white/[0.08] bg-[#05080d]">
      {/* Background Image: Escassez Digital Institucional (Preservada) */}
      <div className="bitcoin-section__background" aria-hidden="true" />

      {/* Localized Dark Protection Overlay */}
      <div className="bitcoin-section__overlay" aria-hidden="true" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-8 space-y-12">
        {/* Header Block */}
        <div className="max-w-[780px] space-y-5">
          <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-[#F59A18] block">
            DESCENTRALIZAÇÃO NA PRÁTICA
          </span>

          <h2 className="font-outfit font-extrabold text-[32px] md:text-[42px] lg:text-[46px] text-[#EEF4FA] tracking-tight leading-[1.18]">
            Bitcoin não é um dólar digital. É outra arquitetura de confiança.
          </h2>

          <div className="section-copy space-y-3.5 text-[16px] md:text-[17px] text-[#EEF3F8] leading-[1.65] font-medium">
            <p>
              Enquanto moedas digitais vinculadas ao sistema financeiro dependem de emissores e instituições identificáveis, o Bitcoin utiliza regras públicas, validação distribuída e uma oferta definida pelo protocolo.
            </p>
            <p>
              Isso não elimina riscos nem garante valorização. Apenas muda a forma como emissão, transferência, custódia e verificação são organizadas.
            </p>
          </div>
        </div>

        {/* 4 Refined Fundamentals Cards Grid with Dedicated Pictograms */}
        <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {fundamentals.map((item, idx) => (
            <div
              key={idx}
              className="market-card editorial-card p-6 md:p-7 flex flex-col justify-between space-y-5 cursor-default group hover:-translate-y-1 transition-all duration-200 bg-[#070D14]/90 backdrop-blur-md rounded-[14px] border border-white/[0.12]"
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

        {/* Featured Callout (Preservado) */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0A0E15]/90 border border-[#F59A18]/30 backdrop-blur-md text-center max-w-[800px] mx-auto">
          <p className="font-outfit font-bold text-[18px] md:text-[21px] text-[#EEF4FA] tracking-tight">
            “Antes de comparar preços, compare as regras.”
          </p>
        </div>
      </div>
    </section>
  );
}
