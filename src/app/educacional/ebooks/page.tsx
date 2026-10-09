import Link from "next/link";
import { EDUCATIONAL_PRODUCTS } from "@/data/products";
import EducationalProductCard from "@/components/EducationalProductCard";
import { BookOpen, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-books e Combos | HDZ Finance",
  description: "E-books e materiais especiais da HDZ Finance.",
};

export default function EbooksPage() {
  const ebooks = EDUCATIONAL_PRODUCTS.filter((p) => p.category === "Guias Visuais Fáceis" || p.category === "Combo de E-books" || p.category === "Planilhas e Ferramentas");

  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-8 md:py-14">
      <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-8">
        <Link
          href="/educacional"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-[#9BA5B3] hover:text-[#147BFF] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para Produtos Educacionais</span>
        </Link>

        <div className="p-6 md:p-10 rounded-2xl bg-[#0D1117] border border-white/[0.08] space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5" />
            <span>E-books & Combos HDZ</span>
          </div>
          <h1 className="font-outfit font-extrabold text-3xl md:text-5xl text-[#F5F7FA]">
            Combos de E-books & Guias Práticos
          </h1>
          <p className="text-sm md:text-base text-[#9BA5B3] max-w-3xl leading-relaxed font-normal">
            Materiais de consulta rápida, guias de autocustódia, manuais e ferramentas de planejamento.
          </p>
        </div>

        <div className="educational-products-grid">
          {ebooks.map((product) => (
            <EducationalProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
