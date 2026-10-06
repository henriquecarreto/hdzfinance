import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Library, ArrowLeft } from "lucide-react";
import ReadingRecommendationsClient from "@/components/books/ReadingRecommendationsClient";

export const metadata: Metadata = {
  title: "Recomendações de Leitura | HDZ Finance",
  description:
    "Uma seleção de livros recomendados pela HDZ Finance sobre economia, dinheiro, filosofia, mentalidade, história e tomada de decisão.",
};

export default function RecomendacoesDeLeituraPage() {
  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-8 md:py-14">
      <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/educacional"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-[#9BA5B3] hover:text-[#147BFF] transition-colors focus-visible:outline-2 focus-visible:outline-[#147BFF]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para Produtos Educacionais</span>
        </Link>

        {/* HERO / Header Section */}
        <div className="relative isolate overflow-hidden p-6 md:p-10 rounded-2xl bg-[#0D1117] border border-[#F59A18]/30 space-y-6">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <Image
              src="/backgrounds/hdz-education.webp"
              alt=""
              fill
              aria-hidden="true"
              className="select-none object-contain object-right opacity-40 brightness-125 filter"
              priority
              sizes="100vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/80 to-transparent"
            />
          </div>

          <div className="relative z-10 space-y-4 max-w-4xl">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-xs font-bold uppercase tracking-wider">
              <Library className="h-3.5 w-3.5" />
              <span>BIBLIOTECA HDZ</span>
            </div>

            {/* H1 Title */}
            <h1 className="font-outfit font-extrabold text-3xl md:text-5xl text-[#F5F7FA] tracking-tight">
              Recomendações de Leitura
            </h1>

            {/* Introductory Paragraphs */}
            <div className="text-sm md:text-base text-[#9BA5B3] leading-relaxed space-y-3 font-normal">
              <p>
                Pensar melhor exige repertório. Esta seleção reúne livros sobre economia, dinheiro, comportamento, filosofia, história, mentalidade e tomada de decisão. Obras com abordagens diferentes, escolhidas para ampliar perspectivas e ajudar na construção de um pensamento mais crítico e independente.
              </p>
              <p>
                A proposta não é apresentar uma única visão de mundo, mas incentivar o leitor a confrontar ideias, questionar premissas e reduzir vieses antes de formar suas próprias conclusões.
              </p>
              <p className="font-medium text-[#C7CDD4]">
                Leia perspectivas diferentes. Compare argumentos. Questione certezas.
              </p>
            </div>

            {/* Highlighted Quote Box */}
            <div className="pt-2">
              <div className="p-4 md:p-5 rounded-xl bg-[#050607]/80 border-l-4 border-[#F59A18] border-y border-r border-white/[0.06] text-[#F5F7FA]">
                <p className="font-outfit font-bold text-sm md:text-base italic leading-relaxed text-[#F5F7FA]">
                  “Conhecimento não serve para dizer o que pensar. Serve para melhorar a forma como pensamos.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Books Library Client (Filters + Grid) */}
        <ReadingRecommendationsClient />

        {/* Final Editorial Section */}
        <section className="p-6 md:p-8 rounded-2xl bg-[#0D1117] border border-white/[0.08] space-y-3">
          <h2 className="font-outfit font-extrabold text-xl md:text-2xl text-[#F5F7FA] tracking-tight">
            Leia além da sua própria visão.
          </h2>
          <p className="text-xs md:text-sm text-[#9BA5B3] leading-relaxed max-w-3xl">
            Uma boa formação intelectual não acontece apenas quando encontramos autores com os quais concordamos. Ela também acontece quando somos capazes de compreender argumentos diferentes dos nossos. Use estas recomendações como ponto de partida. Leia, compare, questione e construa suas próprias conclusões.
          </p>
        </section>

        {/* External Links Note */}
        <div className="pt-2 pb-6 border-t border-white/[0.06]">
          <p className="text-xs text-[#9BA5B3]/70 leading-relaxed text-center max-w-4xl mx-auto">
            As recomendações apresentadas nesta página possuem caráter educacional. A compra dos livros é realizada em plataformas externas, sendo preços, disponibilidade, entrega e demais condições de responsabilidade do respectivo vendedor.
          </p>
        </div>
      </div>
    </div>
  );
}
