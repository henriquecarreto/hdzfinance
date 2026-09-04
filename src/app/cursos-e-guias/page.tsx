"use client";

import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function CoursesAndGuidesPage() {
  const [selectedType, setSelectedType] = useState<string>("todos");

  const types = [
    { slug: "todos", name: "Todos os Produtos" },
    { slug: "Curso", name: "Cursos" },
    { slug: "E-book & Guia", name: "E-books & Guias" },
    { slug: "Planilha & Ferramenta", name: "Planilhas & Ferramentas" },
    { slug: "Material Especial", name: "Materiais Especiais" },
  ];

  const filteredProducts = PRODUCTS.filter((prod) => {
    if (selectedType === "todos") return true;
    return prod.type === selectedType;
  });

  return (
    <div className="min-h-screen bg-black text-[#F5F7FA] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <div className="p-6 md:p-10 rounded-2xl bg-[#0B0D10] border border-[#F59A18]/30 space-y-4 relative overflow-hidden">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Área Comercial HDZ</span>
          </div>

          <h1 className="font-outfit font-extrabold text-3xl md:text-5xl text-[#F5F7FA] tracking-tight">
            Cursos, Guias & Ferramentas Práticas
          </h1>

          <p className="text-sm md:text-base text-[#A7AFBA] max-w-3xl leading-relaxed">
            Formações aprofundadas, manuais de segurança e ferramentas práticas desenvolvidas pela equipe HDZ Finance para ajudar você a estruturar métodos claros de investimento e organização patrimonial.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#C7CDD4]">
            <span className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-1.5 text-[#F59A18]" />
              Metodologia sem promessas irrealistas
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-1.5 text-[#F59A18]" />
              Acesso imediato pós-confirmação
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-1.5 text-[#F59A18]" />
              Suporte em área de alunos
            </span>
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2 border-b border-[#252A32]">
          <span className="text-xs text-[#A7AFBA] mr-2 shrink-0 font-medium">Filtrar por tipo:</span>
          {types.map((t) => (
            <button
              key={t.slug}
              onClick={() => setSelectedType(t.slug)}
              className={`shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedType === t.slug
                  ? "bg-[#F59A18] text-[#000000] shadow-sm font-bold"
                  : "bg-[#0B0D10] text-[#A7AFBA] border border-[#252A32] hover:text-[#F5F7FA]"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
