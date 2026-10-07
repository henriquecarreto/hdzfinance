import Image from "next/image";
import Link from "next/link";
import { EDUCATIONAL_PRODUCTS } from "@/data/products";
import EducationalProductCard from "@/components/EducationalProductCard";
import { Sparkles, CheckCircle2, Library, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos Educacionais | HDZ Finance",
  description: "Cursos, guias, e-books e planilhas de controle financeiro desenvolvidos pela equipe HDZ Finance.",
};

export default function EducacionalPage() {
  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-8 md:py-14">
      <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-10">
        {/* Header Hero */}
        <div className="relative isolate overflow-hidden p-6 md:p-10 rounded-2xl bg-[#0D1117] border border-[#F59A18]/30 space-y-4">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <Image
              src="/backgrounds/training-bg.png"
              alt=""
              fill
              aria-hidden="true"
              className="select-none object-cover object-right opacity-50 brightness-110 saturate-[1.1]"
              priority
              sizes="100vw"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/60 to-transparent" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Produtos Educacionais HDZ Finance</span>
            </div>

            <h1 className="font-outfit font-extrabold text-3xl md:text-5xl text-[#F5F7FA] tracking-tight">
              Cursos, Combos de E-books & Ferramentas Práticas
            </h1>

            <p className="text-sm md:text-base text-[#9BA5B3] max-w-3xl leading-relaxed font-normal">
              Formações aprofundadas, guias e planilhas desenvolvidas para ajudar você a estruturar métodos claros de investimento, organização financeira e compreensão de mercado.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#C7CDD4]">
              <span className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1.5 text-[#F59A18]" />
                Metodologia sólida sem promessas irrealistas
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1.5 text-[#F59A18]" />
                Conteúdo 100% focado em autonomia e clareza
              </span>
            </div>
          </div>
        </div>

        {/* Clean 3 Educational Products Grid (Filters temporarily hidden) */}
        <div className="educational-products-grid">
          {EDUCATIONAL_PRODUCTS.map((product) => (
            <EducationalProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Reading Recommendations Banner Link */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0D1117] border border-[#F59A18]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
              <Library className="h-3 w-3" />
              <span>BIBLIOTECA HDZ</span>
            </div>
            <h2 className="font-outfit font-bold text-xl md:text-2xl text-[#F5F7FA]">
              Recomendações de Leitura
            </h2>
            <p className="text-xs md:text-sm text-[#9BA5B3] leading-relaxed">
              Uma seleção curada de livros sobre economia, dinheiro, filosofia, mentalidade e sociedade para ampliar perspectivas e fortalecer seu pensamento crítico.
            </p>
          </div>
          <Link
            href="/educacional/recomendacoes-de-leitura"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFB12B] via-[#F59A18] to-[#E98508] text-[#080B0F] font-extrabold text-sm hover:brightness-105 transition-all shadow-md shrink-0 focus-visible:outline-2 focus-visible:outline-[#147BFF]"
          >
            <span>Explorar Biblioteca</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

