"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function EducacionalPage() {
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
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-8 md:py-12">
      <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-8">
        {/* Header Hero with hdz-education.webp Background (Bright, Object Contain) */}
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
              <span>Área Comercial & Produtos Educacionais</span>
            </div>

            <h1 className="font-outfit font-extrabold text-3xl md:text-5xl text-[#F5F7FA] tracking-tight">
              Educacional HDZ | Cursos, Guias & Ferramentas
            </h1>

            <p className="text-sm md:text-base text-[#9BA5B3] max-w-3xl leading-relaxed font-normal">
              Formações aprofundadas, e-books, manuais de segurança, planilhas e produtos digitais desenvolvidos pela equipe HDZ Finance para ajudar você a estruturar métodos claros de investimento e organização patrimonial.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#C7CDD4]">
              <span className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1.5 text-[#F59A18]" />
                Metodologia sólida sem promessas irrealistas
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1.5 text-[#F59A18]" />
                Acesso imediato pós-confirmação
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1.5 text-[#F59A18]" />
                Ferramentas de suporte e planilhas integradas
              </span>
            </div>
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2 border-b border-white/[0.08]">
          <span className="text-xs text-[#9BA5B3] mr-2 shrink-0 font-medium">Filtrar por categoria:</span>
          {types.map((t) => (
            <button
              key={t.slug}
              onClick={() => setSelectedType(t.slug)}
              className={`shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedType === t.slug
                  ? "bg-[#F59A18] text-[#000000] shadow-sm font-bold"
                  : "bg-[#0D1117] text-[#9BA5B3] border border-white/[0.08] hover:text-[#F5F7FA]"
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
