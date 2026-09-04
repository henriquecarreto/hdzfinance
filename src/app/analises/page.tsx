"use client";

import { useState } from "react";
import { ANALYSES } from "@/data/analyses";
import AnalysisCard from "@/components/AnalysisCard";
import { BookOpen, Filter, ArrowUpDown } from "lucide-react";

export default function AnalysesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [sortOrder, setSortOrder] = useState<"recetes" | "antigas">("recetes");

  const categories = [
    { slug: "todas", name: "Todas as Categorias" },
    { slug: "economia", name: "Economia" },
    { slug: "criptomoedas", name: "Criptomoedas" },
    { slug: "investimentos", name: "Investimentos" },
    { slug: "mercados", name: "Mercados" },
  ];

  const filteredAnalyses = ANALYSES.filter((a) => {
    if (selectedCategory === "todas") return true;
    return a.category === selectedCategory;
  }).sort((a, b) => {
    const timeA = new Date(a.publishDate).getTime();
    const timeB = new Date(b.publishDate).getTime();
    return sortOrder === "recetes" ? timeB - timeA : timeA - timeB;
  });

  return (
    <div className="min-h-screen bg-black text-[#F5F7FA] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <div className="p-6 md:p-10 rounded-2xl bg-[#0B0D10] border border-[#252A32] space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#147BFF]/10 text-[#147BFF] border border-[#147BFF]/30 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Coluna Editorial</span>
          </div>

          <h1 className="font-outfit font-extrabold text-3xl md:text-5xl text-[#F5F7FA] tracking-tight">
            Análises HDZ Finance
          </h1>

          <p className="text-sm md:text-base text-[#A7AFBA] max-w-3xl leading-relaxed">
            Artigos aprofundados, opiniões fundamentadas, cenários macroeconômicos e análises de valor para quem busca interpretar os movimentos de mercado além da superfície.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0B0D10] border border-[#252A32]">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none py-1">
            <Filter className="h-4 w-4 text-[#147BFF] shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-[#147BFF] text-white"
                    : "bg-[#11151A] text-[#A7AFBA] border border-[#252A32] hover:text-[#F5F7FA]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 shrink-0 border-t sm:border-t-0 border-[#252A32] pt-3 sm:pt-0">
            <ArrowUpDown className="h-3.5 w-3.5 text-[#147BFF]" />
            <span className="text-xs text-[#A7AFBA]">Ordenar:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "recetes" | "antigas")}
              className="bg-[#11151A] border border-[#252A32] text-[#F5F7FA] text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#147BFF]"
            >
              <option value="recetes">Mais recentes</option>
              <option value="antigas">Mais antigas</option>
            </select>
          </div>
        </div>

        {/* Analyses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnalyses.map((analysis) => (
            <AnalysisCard key={analysis.id} analysis={analysis} />
          ))}
        </div>
      </div>
    </div>
  );
}
