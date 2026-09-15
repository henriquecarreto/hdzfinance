import React from "react";
import HdzPictogram from "@/components/ui/HdzPictogram";

export default function DigitalDollarSection() {
  const editorialRules = [
    { num: "1", label: "Quem emite" },
    { num: "2", label: "O que sustenta o valor" },
    { num: "3", label: "Quem supervisiona" },
    { num: "4", label: "Qual risco permanece" },
  ];

  const cards = [
    {
      title: "Tokens privados ligados ao dólar",
      text: "Empresas privadas emitem tokens que procuram acompanhar o valor do dólar. A segurança depende das reservas, da liquidez, do resgate e da regulação.",
      pictogram: "dollar-reserves" as const,
      colorScheme: "cyan" as const,
      details: [
        { key: "Emissor", value: "empresa privada" },
        { key: "Referência", value: "dólar" },
        { key: "Atenção", value: "lastro e resgate" },
      ],
    },
    {
      title: "Depósitos tokenizados",
      text: "Bancos podem representar depósitos em plataformas programáveis, mantendo a relação com a instituição financeira e suas regras.",
      pictogram: "bank-ledger" as const,
      colorScheme: "blue" as const,
      details: [
        { key: "Emissor", value: "instituição financeira" },
        { key: "Base", value: "depósito bancário" },
        { key: "Atenção", value: "acesso e interoperabilidade" },
      ],
    },
    {
      title: "Moedas de bancos centrais",
      text: "Iniciativas como Drex e euro digital testam diferentes modelos de liquidação e pagamento. Elas não são equivalentes ao Bitcoin ou às stablecoins privadas.",
      pictogram: "central-bank-signal" as const,
      colorScheme: "gold" as const,
      details: [
        { key: "Emissor", value: "sistema público" },
        { key: "Base", value: "moeda oficial" },
        { key: "Atenção", value: "modelo, acesso e privacidade" },
      ],
    },
    {
      title: "Mercados programáveis",
      text: "Dinheiro e ativos podem compartilhar uma mesma infraestrutura, reduzindo etapas entre negociação, registro e liquidação.",
      pictogram: "programmable-layers" as const,
      colorScheme: "green" as const,
      details: [
        { key: "Função", value: "integrar operações" },
        { key: "Potencial", value: "reduzir etapas" },
        { key: "Atenção", value: "governança e segurança" },
      ],
    },
  ];

  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28 border-b border-white/[0.08] bg-[#07101a]">
      {/* Visual Background Layers */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#18C6D8 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-8 space-y-12">
        {/* Header Block in 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-[#18C6D8] block">
              DINHEIRO EM TRANSFORMAÇÃO
            </span>

            <h2 className="font-outfit font-extrabold text-[32px] md:text-[42px] lg:text-[46px] text-[#EEF4FA] tracking-tight leading-[1.18]">
              Chamamos tudo de dólar digital. Mas as regras não são as mesmas.
            </h2>

            <div className="space-y-3.5 text-[16px] md:text-[17px] text-[#D5DDE6] leading-[1.65] font-normal">
              <p>
                Stablecoins, depósitos tokenizados e moedas digitais de bancos centrais podem movimentar valor por estruturas digitais, mas não funcionam do mesmo jeito.
              </p>
              <p>
                Muda quem emite, o que sustenta o valor, quem supervisiona a operação e qual risco cada participante assume.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 p-7 rounded-2xl bg-[#0B1524] border border-[#18C6D8]/30 space-y-3 text-center lg:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#18C6D8]">
              Princípio Fundamental
            </span>
            <p className="font-outfit font-bold text-[20px] md:text-[22px] text-[#EEF4FA] leading-snug">
              “Antes de olhar para a velocidade, observe a estrutura.”
            </p>
          </div>
        </div>

        {/* Régua Editorial Única: EM TODA ANÁLISE, OBSERVE */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0A1320] border border-white/10 space-y-4">
          <span className="text-[12px] font-extrabold uppercase tracking-widest text-[#9BA5B3] block text-center md:text-left">
            EM TODA ANÁLISE, OBSERVE
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {editorialRules.map((rule, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#0F1B2B] border border-white/[0.06]"
              >
                <span className="font-outfit font-extrabold text-[22px] text-[#18C6D8]">
                  {rule.num}
                </span>
                <span className="font-outfit font-bold text-[14px] md:text-[15px] text-[#EEF4FA]">
                  {rule.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Grade 2x2 de Cards Maiores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="market-card p-7 md:p-8 flex flex-col justify-between space-y-6 bg-[#0B1524] border border-white/10 rounded-[14px] hover:-translate-y-1 transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <HdzPictogram type={card.pictogram} colorScheme={card.colorScheme} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#9BA5B3] bg-white/[0.04] px-3 py-1 rounded-full border border-white/10">
                    Infraestrutura Digital
                  </span>
                </div>

                <h3 className="font-outfit font-bold text-[21px] md:text-[22px] text-[#EEF4FA] leading-snug">
                  {card.title}
                </h3>

                <p className="text-[15px] text-[#D5DDE6] leading-[1.65]">
                  {card.text}
                </p>
              </div>

              {/* Informações Curtas */}
              <div className="pt-4 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[13px]">
                {card.details.map((detail, i) => (
                  <div key={i} className="space-y-0.5">
                    <span className="text-[#9BA5B3] text-[11px] font-bold uppercase block">
                      {detail.key}
                    </span>
                    <span className="text-[#EEF4FA] font-medium block">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
