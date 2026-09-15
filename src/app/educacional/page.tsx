import Image from "next/image";
import { EDUCATIONAL_PRODUCTS } from "@/data/products";
import EducationalProductCard from "@/components/EducationalProductCard";
import { Sparkles, CheckCircle2 } from "lucide-react";
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
              src="/backgrounds/hdz-education.webp"
              alt=""
              fill
              aria-hidden="true"
              className="select-none object-contain object-right opacity-70 brightness-125 filter"
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
      </div>
    </div>
  );
}
