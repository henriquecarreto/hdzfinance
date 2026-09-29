import React from "react";

export default function DigitalDollarSection() {
  const faixas = [
    {
      id: "stablecoin",
      nome: "Stablecoin",
      chamada: "Uma promessa de manter valor.",
      explicacao:
        "Token que busca acompanhar um valor de referência, como o dólar. Suas condições de resgate dependem do emissor e das regras do produto.",
      emissor: "EMISSOR · Entidade privada",
      accentColor: "#18C6D8", // Cyan
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="#18C6D8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Entidade privada de resgate conectada ao valor de referência */}
          <rect x="4" y="10" width="10" height="12" rx="2" stroke="#18C6D8" fill="#18C6D8" fillOpacity="0.15" />
          <path d="M9 14v4M7 16h4" stroke="#18C6D8" />
          <path d="M14 16h5" stroke="#18C6D8" strokeDasharray="2 2" />
          <circle cx="23" cy="16" r="5" stroke="#18C6D8" fill="#18C6D8" fillOpacity="0.2" />
          <path d="M23 13.5v5M21.5 16h3" stroke="#18C6D8" />
        </svg>
      ),
    },
    {
      id: "deposito-tokenizado",
      nome: "Depósito tokenizado",
      chamada: "Seu depósito em formato digital.",
      explicacao:
        "Representação de um depósito mantido em banco. A tecnologia de registro muda; a relação do cliente continua ligada à instituição bancária.",
      emissor: "EMISSOR · Banco",
      accentColor: "#168BFF", // Electric Blue
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="#168BFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Estrutura de registro bancário com camada digital */}
          <path d="M4 22h24M6 14v8M12 14v8M18 14v8M24 14v8" stroke="#168BFF" />
          <path d="M16 4L4 12h24L16 4z" stroke="#168BFF" fill="#168BFF" fillOpacity="0.15" />
          <circle cx="22" cy="10" r="4" stroke="#168BFF" fill="#000000" />
          <path d="M22 8v4M20 10h4" stroke="#168BFF" />
        </svg>
      ),
    },
    {
      id: "cbdc",
      nome: "Moeda digital de banco central",
      chamada: "Emissão da autoridade monetária.",
      explicacao:
        "Forma digital de moeda emitida por um banco central. Seu acesso e funcionamento dependem do modelo adotado em cada país.",
      emissor: "EMISSOR · Banco central",
      accentColor: "#F59A18", // Amber
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="#F59A18"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Núcleo monetário soberano em arco institucional */}
          <path d="M16 4c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4z" stroke="#F59A18" strokeDasharray="3 2" strokeOpacity="0.6" />
          <polygon points="16 9 22 16 16 23 10 16" fill="#F59A18" fillOpacity="0.2" stroke="#F59A18" />
          <circle cx="16" cy="16" r="2" fill="#F59A18" />
        </svg>
      ),
    },
  ];

  return (
    <section
      aria-label="Dinheiro em transformação"
      className="relative isolate overflow-hidden py-12 md:py-16 border-b border-[#22272E] bg-[#000000]"
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 space-y-10 md:space-y-12">
        {/* 1. TOPO: ETIQUETA, TÍTULO E INTRODUÇÃO */}
        <div className="space-y-3.5 max-w-[760px]">
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#18C6D8] block">
            DINHEIRO EM TRANSFORMAÇÃO
          </span>

          <h2 className="font-outfit font-extrabold text-[30px] sm:text-[36px] lg:text-[42px] text-[#F7F9FC] tracking-tight leading-[1.16]">
            Dinheiro digital: quem emite e o que você realmente possui?
          </h2>

          <p className="text-[15px] md:text-[16px] text-[#E5EAF0] leading-[1.6]">
            Podem parecer semelhantes na tela. A diferença está em quem emite e no direito que cada forma de dinheiro representa.
          </p>
        </div>

        {/* 2. TRÊS FAIXAS HORIZONTAIS DE COMPARAÇÃO (EDITORIAL CONTÍNUO, SEM CARDS) */}
        <div className="space-y-0 divide-y divide-[#22272E] border-t border-b border-[#22272E]">
          {faixas.map((f) => (
            <div
              key={f.id}
              className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center transition-colors hover:bg-[#0A0C0F]"
            >
              {/* Esquerda: Símbolo Vetorial */}
              <div className="md:col-span-1 flex items-center shrink-0">
                <div className="w-11 h-11 rounded-lg bg-[#0A0C0F] border border-[#22272E] flex items-center justify-center">
                  {f.icon}
                </div>
              </div>

              {/* Centro: Nome e Chamada */}
              <div className="md:col-span-5 space-y-1">
                <h3 className="font-outfit font-bold text-[18px] md:text-[20px] text-[#F7F9FC] leading-snug">
                  {f.nome}
                </h3>
                <p className="text-[14px] md:text-[15px] font-semibold text-[#18C6D8]">
                  {f.chamada}
                </p>
              </div>

              {/* Direita: Explicação e Identificação Curta */}
              <div className="md:col-span-6 space-y-2 flex flex-col justify-between">
                <p className="text-[13.5px] md:text-[14px] text-[#E5EAF0] leading-[1.55]">
                  {f.explicacao}
                </p>
                <div className="pt-1">
                  <span className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-wider text-[#C8D2DD] block">
                    {f.emissor}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. FAIXA DE TRANSIÇÃO (BITCOIN) */}
        <div className="pt-6 border-t-2 border-[#F59A18]/60">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-5 sm:p-6 rounded-xl bg-[#0A0C0F] border border-[#F59A18]/30 relative overflow-hidden">
            {/* Detalhe de fundo com ₿ sutil */}
            <div className="absolute right-4 bottom-[-10px] text-[80px] font-bold text-[#F59A18]/[0.05] select-none pointer-events-none font-mono">
              ₿
            </div>

            <div className="space-y-1.5 max-w-[820px] relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-bold text-[#F59A18] font-mono">₿</span>
                <h3 className="font-outfit font-bold text-[18px] md:text-[20px] text-[#F7F9FC]">
                  E o Bitcoin?
                </h3>
              </div>
              <p className="text-[13.5px] md:text-[14.5px] text-[#E5EAF0] leading-[1.55]">
                Ele segue outra lógica: não representa um depósito bancário nem promete manter paridade com uma moeda. Sua emissão e validação obedecem às regras da própria rede.
              </p>
            </div>

            <div className="shrink-0 relative z-10">
              <a
                href="#bitcoin-section"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F59A18]/15 hover:bg-[#F59A18]/25 border border-[#F59A18]/50 text-[#F59A18] font-outfit font-bold text-[13.5px] transition-all duration-200"
              >
                <span>Entenda a diferença</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




