import React from "react";
import Image from "next/image";
import { ExternalLink, Percent, CalendarCheck, CreditCard, Globe } from "lucide-react";

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
      className="relative isolate overflow-hidden py-20 md:py-24 border-b border-[#22272E] bg-[#050607]"
    >
      {/* Background Image Layer (Old Site Style: ecosystem-bg.png) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/backgrounds/ecosystem-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 brightness-110 saturate-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050607]/60 via-[#050607]/30 to-[#050607]/80" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8 space-y-10 md:space-y-12">
        {/* 1. TOPO: ETIQUETA, TÍTULO E INTRODUÇÃO */}
        <div className="space-y-3.5 max-w-[860px]">
          <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#18C6D8] block">
            DINHEIRO EM TRANSFORMAÇÃO
          </span>

          <h2 className="font-outfit font-extrabold text-[32px] sm:text-[38px] lg:text-[44px] text-[#F7F9FC] tracking-tight leading-[1.16]">
            Dinheiro digital: quem emite e o que você realmente possui?
          </h2>

          <p className="text-[15.5px] md:text-[17px] text-[#E5EAF0] leading-[1.65] font-normal">
            Podem parecer semelhantes na tela. A diferença está em quem emite e no direito que cada forma de dinheiro representa.
          </p>
        </div>

        {/* 2. TRÊS FAIXAS HORIZONTAIS DE COMPARAÇÃO (EDITORIAL CONTÍNUO, SEM CARDS) */}
        <div className="space-y-0 divide-y divide-[#22272E] border-t border-b border-[#22272E]">
          {faixas.map((f) => (
            <div
              key={f.id}
              className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center transition-colors hover:bg-[#0A0C0F] px-2 sm:px-4 rounded-lg"
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

        {/* 3. PARCERIA DESTAQUE: PICNIC */}
        <div className="pt-4 border-t-2 border-[#F59A18]/60">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 p-6 sm:p-7 rounded-2xl bg-[#0A0C0F] border border-[#F59A18]/40 hover:border-[#F59A18]/70 transition-colors shadow-2xl relative overflow-hidden group">
            {/* Detalhe visual de brilho sutil */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59A18]/[0.03] rounded-full blur-3xl pointer-events-none select-none" />

            {/* Coluna Esquerda: Tag Publicidade + Logo + Título Picnic + Chamada + Descrição */}
            <div className="space-y-3 flex-1 min-w-0 relative z-10">
              <div className="flex items-center space-x-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-[11px] font-bold uppercase tracking-widest">
                  PUBLICIDADE · LINK DE AFILIADO
                </span>
              </div>

              <div className="flex items-center space-x-3.5 pt-0.5">
                <div className="relative w-10 h-10 shrink-0 bg-[#0E1620] border border-white/[0.12] rounded-xl p-1 flex items-center justify-center shadow-inner">
                  <Image
                    src="/brands/picnic-symbol.svg"
                    alt="Símbolo oficial Picnic"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-outfit font-bold text-2xl text-[#F7F9FC]">
                  Picnic
                </h3>
              </div>

              <h4 className="font-outfit font-bold text-lg sm:text-[19px] text-[#F7F9FC] leading-snug">
                Seu dólar, pronto para acompanhar seus planos.
              </h4>

              <p className="text-[13.5px] sm:text-[14.5px] text-[#E5EAF0] leading-[1.6] max-w-3xl">
                Tenha uma conta internacional com cartão Visa aceito em mais de 180 países e gerencie seus dólares com praticidade e controle pelo aplicativo da Picnic.
              </p>
            </div>

            {/* Coluna Direita: 4 Benefícios em Grid + Botão CTA */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-4 shrink-0 justify-between relative z-10 pt-2 lg:pt-0">
              {/* Grid 2x2 dos 4 Benefícios */}
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#EEF4FA]">
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03]">
                  <Percent className="h-3.5 w-3.5 text-[#F59A18] shrink-0" />
                  <span>Sem IOF</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03]">
                  <CalendarCheck className="h-3.5 w-3.5 text-[#F59A18] shrink-0" />
                  <span>Sem anuidade</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03]">
                  <CreditCard className="h-3.5 w-3.5 text-[#F59A18] shrink-0" />
                  <span>Cartão Visa</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03]">
                  <Globe className="h-3.5 w-3.5 text-[#F59A18] shrink-0" />
                  <span>Aceito em +180 países</span>
                </div>
              </div>

              {/* Botão de Ação */}
              <a
                href="https://promo.usepicnic.com/8pQU/HDZ"
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                aria-label="Conhecer a Picnic (link de afiliado externo)"
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-[#F59A18] hover:bg-[#FFAC36] text-[#090B0E] font-bold text-sm transition-all shadow-md shrink-0 whitespace-nowrap"
              >
                <span>Conhecer a Picnic</span>
                <ExternalLink className="h-4 w-4 shrink-0 text-[#090B0E]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




