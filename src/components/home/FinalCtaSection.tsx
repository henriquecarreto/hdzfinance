import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FinalCtaSection() {
  return (
    <section
      aria-label="Conclusão HDZ Finance"
      className="relative isolate overflow-hidden py-16 md:py-24 border-b border-[#22272E] bg-[#000000]"
    >
      {/* Imagem de Fundo Editorial Original de Alta Resolução */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="/backgrounds/hdz_final_section_bg.jpg"
          alt=""
          fill
          quality={95}
          className="object-cover object-right select-none opacity-85"
          sizes="100vw"
        />

        {/* Gradiente de suavização da esquerda (preto limpo para leitura) para a direita */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Conteúdo Alinhado à Esquerda */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#F59A18] block">
              VÁ ALÉM DA MANCHETE
            </span>

            <h2 className="font-outfit font-extrabold text-[32px] sm:text-[38px] lg:text-[44px] text-[#F7F9FC] tracking-tight leading-[1.16] max-w-[760px]">
              O preço chama atenção. Entender o Bitcoin muda a leitura.
            </h2>

            <div className="space-y-4 max-w-[680px]">
              <p className="text-[15px] md:text-[16px] text-[#E5EAF0] leading-[1.6]">
                Uma alta, uma queda, uma nova previsão: as manchetes se sucedem, mas raramente explicam o quadro inteiro. Sem conhecer os fundamentos, é fácil confundir ruído com mudança real.
              </p>

              {/* Segundo Parágrafo com Destaque Visual */}
              <div className="pl-4 border-l-2 border-[#F59A18] py-1 bg-[#F59A18]/[0.03] rounded-r-lg">
                <p className="text-[15.5px] md:text-[16.5px] text-[#F7F9FC] font-medium leading-[1.6]">
                  É para ir além dessa leitura fragmentada que existe o treinamento da HDZ Finance. Aprofunde seu estudo do Bitcoin e ganhe repertório para interpretar notícias e argumentos com mais clareza.
                </p>
              </div>
            </div>

            {/* Ações e Links com Hierarquia Clara */}
            <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Botão Principal com Destaque Máximo */}
              <Link
                href="/educacional/cursos"
                className="px-6 py-3.5 rounded-xl bg-[#F59A18] hover:bg-[#FFB03A] text-[#05080D] font-outfit font-extrabold text-[14.5px] transition-all duration-200 inline-flex items-center gap-2.5 shadow-[0_2px_14px_rgba(245,154,24,0.25)] hover:scale-[1.01]"
              >
                <span>Quero conhecer o treinamento</span>
                <ArrowRight className="w-4 h-4 text-[#05080D]" aria-hidden="true" />
              </Link>

              {/* Link Secundário */}
              <Link
                href="/noticias"
                className="inline-flex items-center gap-1.5 text-[14px] font-outfit font-semibold text-[#18C6D8] hover:text-[#52F0FF] transition-colors py-2"
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


