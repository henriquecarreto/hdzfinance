import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FinalCtaSection() {
  return (
    <section
      aria-label="Conclusão HDZ Finance"
      className="relative isolate overflow-hidden py-20 md:py-24 border-b border-white/[0.08] bg-[#050607]"
    >
      {/* Background Image Layer with Increased Luminosity & Clarity */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/backgrounds/final-cta-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-60 brightness-110 saturate-[1.1]"
          priority
        />
        {/* Soft Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050607]/50 via-transparent to-[#050607]/65" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8">
        <div className="max-w-[900px] space-y-6 text-left p-6 sm:p-8 md:p-10 rounded-2xl bg-[#050607]/75 backdrop-blur-md border border-white/10 shadow-2xl">
          <span className="text-[12px] md:text-[13px] font-extrabold uppercase tracking-[0.15em] text-[#F59A18] block">
            VÁ ALÉM DA MANCHETE
          </span>

          <h2 className="font-outfit font-extrabold text-[34px] sm:text-[42px] lg:text-[48px] text-[#F7F9FC] tracking-tight leading-[1.14]">
            O preço chama atenção. Entender o Bitcoin muda a leitura.
          </h2>

          <div className="space-y-4 text-[16px] md:text-[17.5px] text-[#E5EAF0] leading-[1.65]">
            <p>
              Uma alta, uma queda, uma nova previsão: as manchetes se sucedem, mas raramente explicam o quadro inteiro. Sem conhecer os fundamentos, é fácil confundir ruído com mudança real.
            </p>

            {/* Segundo Parágrafo com Destaque Visual */}
            <div className="pl-5 border-l-3 border-[#F59A18] py-2.5 bg-[#F59A18]/[0.04] rounded-r-xl">
              <p className="text-[16.5px] md:text-[18px] text-[#F7F9FC] font-medium leading-[1.65]">
                É para ir além dessa leitura fragmentada que existe o treinamento da HDZ Finance. Aprofunde seu estudo do Bitcoin e ganhe repertório para interpretar notícias e argumentos com mais clareza.
              </p>
            </div>
          </div>

          {/* Ações e Links com Hierarquia Clara */}
          <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Botão Principal com Destaque Máximo */}
            <Link
              href="/educacional/cursos"
              className="px-7 py-4 rounded-xl bg-[#F59A18] hover:bg-[#FFB03A] text-[#05080D] font-outfit font-extrabold text-[15.5px] transition-all duration-200 inline-flex items-center gap-2.5 shadow-[0_4px_20px_rgba(245,154,24,0.3)] hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-[#147BFF]"
            >
              <span>Quero conhecer o treinamento</span>
              <ArrowRight className="w-4 h-4 text-[#05080D]" aria-hidden="true" />
            </Link>

            {/* Link Secundário */}
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 text-[15px] font-outfit font-bold text-[#18C6D8] hover:text-[#52F0FF] transition-colors py-2 px-3 focus-visible:outline-2 focus-visible:outline-[#147BFF]"
            >
              <span>Continuar nas notícias</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
