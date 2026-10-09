import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCtaSection() {
  return (
    <section
      aria-label="Conclusão HDZ Finance"
      className="relative isolate overflow-hidden py-12 md:py-16 border-b border-white/[0.08] bg-[#000000]"
    >


      <div className="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Container Principal Escuro/Translúcido - Proporção Horizontal */}
        <div className="p-6 sm:p-8 md:p-9 rounded-2xl bg-[#000000]/85 backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* COLUNA ESQUERDA: COPY EDITORIAL (58% aprox.) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              {/* Badge */}
              <span className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#F59A18] block">
                VÁ ALÉM DA MANCHETE
              </span>

              {/* Headline Principal */}
              <h2 className="font-outfit font-extrabold text-[26px] sm:text-[34px] md:text-[38px] lg:text-[40px] text-[#F7F9FC] tracking-tight leading-[1.18]">
                O preço chama atenção. <br className="hidden sm:inline" />
                Entender o que está por trás dele{" "}
                <span className="text-[#F59A18]">muda tudo.</span>
              </h2>

              {/* Parágrafo Único Curto */}
              <p className="text-[15px] sm:text-[16px] text-[#D0D7E1] leading-[1.6]">
                Notícias mostram o que aconteceu. Fundamentos ajudam a entender por quê. Sem compreender dinheiro, Bitcoin, ciclos e custódia, é fácil continuar dependendo da interpretação dos outros.
              </p>

              {/* Frase de Transição Curta */}
              <div className="pl-3.5 border-l-3 border-[#F59A18] py-1.5 bg-[#F59A18]/[0.06] rounded-r-lg">
                <p className="text-[14.5px] sm:text-[15.5px] text-[#F7F9FC] font-medium leading-[1.55]">
                  Informação acompanha o mercado. Conhecimento muda a forma como você o interpreta.
                </p>
              </div>
            </div>

            {/* COLUNA DIREITA: BLOCO ESCURO COMPACTO DO TREINAMENTO (42% aprox.) */}
            <div className="lg:col-span-5">
              <div className="p-5 sm:p-6 rounded-xl bg-[#0D1420] border border-[#F59A18]/30 shadow-lg space-y-4 text-left">
                
                {/* Header & Selo do Treinamento */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F59A18]">
                      TREINAMENTO HDZ FINANCE
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#F59A18]/15 text-[#F59A18] border border-[#F59A18]/30">
                      +4 HORAS DE AULAS
                    </span>
                  </div>

                  <h3 className="font-outfit font-bold text-[18px] sm:text-[20px] text-[#F7F9FC] leading-[1.28]">
                    Comprar Bitcoin é fácil. <br className="hidden sm:inline" />
                    Saber o que fazer depois é outra história.
                  </h3>
                </div>

                {/* Copy Reduzida do Treinamento */}
                <p className="text-[13.5px] sm:text-[14px] text-[#A6B2C2] leading-[1.55]">
                  Mais de 4 horas de aulas para entender dinheiro, Bitcoin, ciclos de mercado, segurança, autocustódia e utilização prática. <span className="text-[#F7F9FC] font-medium block mt-1">Do fundamento à autonomia.</span>
                </p>

                {/* Linha Única de Temas */}
                <div className="text-[11px] sm:text-[12px] font-mono font-semibold text-[#F59A18] tracking-tight pt-1 border-t border-white/[0.08]">
                  DINHEIRO &bull; BITCOIN &bull; CICLOS &bull; SEGURANÇA &bull; AUTOCUSTÓDIA
                </div>

                {/* Área de Ação: Botão Horizontal Premium (100% largura) + Link Secundário Abaixo */}
                <div className="pt-3.5 space-y-3">
                  {/* Botão Principal CTA */}
                  <Link
                    href="/educacional/cursos"
                    className="group w-full min-h-[52px] px-6 py-3.5 rounded-lg bg-[#D97706] hover:bg-[#EA8508] text-[#FFF9ED] font-outfit font-extrabold text-[14.5px] sm:text-[15px] tracking-wide transition-all duration-200 flex items-center justify-between shadow-md hover:shadow-lg hover:shadow-[#D97706]/20 hover:-translate-y-[1px] focus-visible:outline-2 focus-visible:outline-[#D97706]"
                  >
                    <span className="whitespace-nowrap hidden sm:inline">QUERO CONHECER O TREINAMENTO</span>
                    <span className="whitespace-nowrap sm:hidden">CONHECER O TREINAMENTO</span>
                    <ArrowRight className="w-4 h-4 text-[#FFF9ED] shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>

                  {/* Link Secundário Posicionado Abaixo */}
                  <div className="text-center pt-0.5">
                    <Link
                      href="/noticias"
                      className="inline-flex items-center gap-1.5 text-[13.5px] font-outfit font-semibold text-[#18C6D8] hover:text-[#52F0FF] transition-colors py-1 px-2"
                    >
                      <span>Continuar nas notícias</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
