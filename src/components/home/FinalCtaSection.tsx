import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

export default function FinalCtaSection() {
  return (
    <section
      aria-label="Conclusão HDZ Finance"
      className="relative isolate overflow-hidden py-16 md:py-24 border-b border-white/[0.08] bg-[#050607]"
    >
      {/* Background Image Layer: Preservada conforme especificação */}
      <div className="absolute top-0 left-0 right-0 h-full z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/backgrounds/final-cta-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[75%_top] md:object-center opacity-85 brightness-110 saturate-[1.1]"
          priority
        />
        {/* Soft Vignette & Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050607]/40 via-[#050607]/70 to-[#050607] md:from-[#050607]/50 md:via-[#050607]/40 md:to-[#050607]/70" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Container Principal Escuro/Translúcido */}
        <div className="max-w-[920px] mx-auto space-y-6 sm:space-y-8 text-left p-6 sm:p-8 md:p-10 rounded-2xl bg-[#050607]/80 backdrop-blur-md border border-white/10 shadow-2xl">
          
          {/* 1. BADGE */}
          <span className="text-[12px] md:text-[13px] font-extrabold uppercase tracking-[0.15em] text-[#F59A18] block">
            VÁ ALÉM DA MANCHETE
          </span>

          {/* 2. HEADLINE PRINCIPAL */}
          <h2 className="font-outfit font-extrabold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] text-[#F7F9FC] tracking-tight leading-[1.18]">
            O preço chama atenção. <br className="hidden sm:inline" />
            Entender o que está por trás dele{" "}
            <span className="text-[#F59A18]">muda tudo.</span>
          </h2>

          {/* 3. COPY EDITORIAL */}
          <div className="space-y-4 text-[15.5px] sm:text-[16.5px] md:text-[17.5px] text-[#E5EAF0] leading-[1.65]">
            <p>
              Todos os dias surgem novas previsões, quedas, altas, indicadores e opiniões sobre Bitcoin. O problema é que acompanhar informação não significa necessariamente compreender o que está acontecendo.
            </p>
            <p>
              Sem fundamentos, é fácil confundir volatilidade com mudança de tendência, opinião com análise e euforia com oportunidade.
            </p>
          </div>

          {/* 4. FRASE DE TRANSIÇÃO DE IMPACTO */}
          <div className="pl-4 sm:pl-5 border-l-4 border-[#F59A18] py-3 px-4 bg-[#F59A18]/[0.08] rounded-r-xl">
            <p className="text-[16px] sm:text-[17.5px] md:text-[18.5px] text-[#F7F9FC] font-semibold leading-[1.6]">
              E quando existe dinheiro envolvido, depender apenas da interpretação de outras pessoas pode custar caro.
            </p>
          </div>

          {/* 5. CARD CLARO DO TREINAMENTO (#F7F3E8) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F3E8] border border-[#E3D7BE] text-[#08182E] shadow-md space-y-6">
            
            {/* Header do Card */}
            <div className="space-y-1.5">
              <span className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#D97706] block">
                TREINAMENTO HDZ FINANCE
              </span>
              <h3 className="font-outfit font-bold text-[21px] sm:text-[25px] md:text-[27px] text-[#08182E] leading-[1.25]">
                Comprar Bitcoin é fácil. <br className="hidden sm:inline" />
                Saber o que fazer depois é outra história.
              </h3>
            </div>

            {/* Copy do Treinamento */}
            <div className="space-y-3 text-[14.5px] sm:text-[15.5px] text-[#4F5964] leading-[1.6]">
              <p>
                O treinamento HDZ Finance foi desenvolvido para quem quer deixar de apenas acompanhar o mercado e começar a compreender seus fundamentos.
              </p>
              <p>
                Você vai estudar{" "}
                <strong className="text-[#08182E] font-bold">DINHEIRO</strong>,{" "}
                <strong className="text-[#08182E] font-bold">BITCOIN</strong>,{" "}
                <strong className="text-[#08182E] font-bold">CICLOS DE MERCADO</strong>, indicadores,{" "}
                <strong className="text-[#08182E] font-bold">SEGURANÇA</strong>,{" "}
                <strong className="text-[#08182E] font-bold">AUTOCUSTÓDIA</strong> e gerenciamento, avançando da compreensão do ativo até formas práticas de proteger e utilizar aquilo que é seu.
              </p>
            </div>

            {/* 3 Benefícios */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#E3D7BE]/80">
              <div className="flex items-center space-x-2 text-[13.5px] sm:text-[14px] font-bold text-[#08182E]">
                <Check className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>Entenda antes de investir</span>
              </div>
              <div className="flex items-center space-x-2 text-[13.5px] sm:text-[14px] font-bold text-[#08182E]">
                <Check className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>Aprenda a interpretar o mercado</span>
              </div>
              <div className="flex items-center space-x-2 text-[13.5px] sm:text-[14px] font-bold text-[#08182E]">
                <Check className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>Conheça segurança e autocustódia</span>
              </div>
            </div>

            {/* Duração */}
            <div className="pt-2 text-xs sm:text-sm text-[#4F5964] font-medium border-t border-[#E3D7BE]/80">
              <span className="font-extrabold text-[#D97706] tracking-wide">
                +4 HORAS DE AULAS EM VÍDEO
              </span>{" "}
              — <span className="italic">Do dinheiro à autocustódia.</span>
            </div>

            {/* CTAs no Rodapé do Card */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5">
              {/* Botão Principal */}
              <Link
                href="/educacional/cursos"
                className="px-7 py-3.5 sm:py-4 rounded-xl bg-[#F59A18] hover:bg-[#E0880D] text-[#05080D] font-outfit font-extrabold text-[15px] sm:text-[16px] transition-all duration-200 inline-flex items-center justify-center gap-2.5 shadow-md hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-[#D97706]"
              >
                <span>QUERO CONHECER O TREINAMENTO</span>
                <ArrowRight className="w-4 h-4 text-[#05080D]" aria-hidden="true" />
              </Link>

              {/* Link Secundário */}
              <Link
                href="/noticias"
                className="inline-flex items-center justify-center gap-2 text-[14px] sm:text-[15px] font-outfit font-bold text-[#147BFF] hover:text-[#0056B3] transition-colors py-2 px-3 focus-visible:outline-2 focus-visible:outline-[#147BFF]"
              >
                <span>Continuar nas notícias</span>
                <span>→</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
