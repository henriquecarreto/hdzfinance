import React from "react";
import HdzPictogram, { PictogramType } from "@/components/ui/HdzPictogram";

export default function ForcesSection() {
  const cards: {
    number: string;
    title: string;
    text: string;
    pictogram: PictogramType;
    colorScheme: "gold" | "blue" | "violet" | "green";
    topLineColor: string;
    borderColor: string;
    innerGlow: string;
  }[] = [
    {
      number: "01",
      title: "O preço do tempo",
      text: "Juros definem quanto custa antecipar consumo, financiar empresas e carregar dívidas. Quando eles mudam, toda a economia recalcula o futuro.",
      pictogram: "time-clock",
      colorScheme: "gold",
      topLineColor: "border-t-[#F59A18]",
      borderColor: "border-[#F59A18]/40 hover:border-[#F59A18]",
      innerGlow: "radial-gradient(ellipse at 50% 0%, rgba(245, 154, 24, 0.08) 0%, transparent 70%)",
    },
    {
      number: "02",
      title: "O elo entre economias",
      text: "Dólar, euro e real traduzem diferenças de juros, comércio e confiança. O câmbio leva decisões globais até os preços locais.",
      pictogram: "currencies-exchange",
      colorScheme: "blue",
      topLineColor: "border-t-[#168BFF]",
      borderColor: "border-[#168BFF]/40 hover:border-[#168BFF]",
      innerGlow: "radial-gradient(ellipse at 50% 0%, rgba(22, 139, 255, 0.08) 0%, transparent 70%)",
    },
    {
      number: "03",
      title: "Para onde o dinheiro vai",
      text: "O capital procura retorno, liquidez e proteção. Por isso se desloca entre títulos, ações, moedas, ouro e mercados emergentes.",
      pictogram: "capital-flow",
      colorScheme: "violet",
      topLineColor: "border-t-[#8277FF]",
      borderColor: "border-[#8277FF]/40 hover:border-[#8277FF]",
      innerGlow: "radial-gradient(ellipse at 50% 0%, rgba(130, 119, 255, 0.08) 0%, transparent 70%)",
    },
    {
      number: "04",
      title: "A infraestrutura do crescimento",
      text: "IA, chips, energia e redes de pagamento deixaram de ser apenas tecnologia. Hoje, determinam custos, escala e competitividade.",
      pictogram: "tech-infrastructure",
      colorScheme: "green",
      topLineColor: "border-t-[#13D69C]",
      borderColor: "border-[#13D69C]/40 hover:border-[#13D69C]",
      innerGlow: "radial-gradient(ellipse at 50% 0%, rgba(19, 214, 156, 0.08) 0%, transparent 70%)",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden py-20 md:py-24 border-b border-white/[0.08] bg-[#050607]">


      <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8 space-y-10 md:space-y-12">
        {/* Header Block with Localized Backdrop Blur */}
        <div className="max-w-[860px] space-y-3.5 p-6 md:p-8 rounded-2xl bg-[#050607]/75 backdrop-blur-md border border-white/10 shadow-2xl">
          <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#F59A18] block">
            ALÉM DAS MANCHETES
          </span>

          <h2 className="font-outfit font-extrabold text-[32px] sm:text-[38px] lg:text-[44px] text-[#EEF4FA] tracking-tight leading-[1.16]">
            O mercado começa a mudar antes de virar manchete.
          </h2>

          <div className="section-copy space-y-3 text-[15.5px] md:text-[17px] text-[#EEF3F8] leading-[1.65] font-normal">
            <p>
              Uma decisão sobre juros altera o crédito. Uma mudança no dólar afeta custos e investimentos. Energia e tecnologia transformam empresas, produtividade e países.
            </p>
            <p>
              Aprender a conectar esses movimentos é o primeiro passo para interpretar a economia com mais clareza.
            </p>
          </div>
        </div>

        {/* 4 Refined Cards Grid */}
        <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`p-6 md:p-7 flex flex-col justify-between space-y-5 bg-[#0A0C0F]/85 backdrop-blur-md rounded-xl border ${card.borderColor} transition-all duration-200 cursor-default group shadow-xl`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <HdzPictogram type={card.pictogram} colorScheme={card.colorScheme} />
                  <span className="font-mono text-[13px] font-bold text-[#9BA5B3] opacity-60">
                    {card.number}
                  </span>
                </div>

                <h3 className="font-outfit font-bold text-[19px] md:text-[20px] text-[#EEF4FA] leading-snug">
                  {card.title}
                </h3>

                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
