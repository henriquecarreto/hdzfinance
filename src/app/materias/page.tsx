"use client";

import { useState, useEffect } from "react";
import { ANALYSES } from "@/data/analyses";
import AnalysisCard from "@/components/AnalysisCard";
import { cmsStore } from "@/lib/cms-store";
import { AnalysisArticle } from "@/types";
import { BookOpen, Filter, ArrowUpDown } from "lucide-react";

export default function MateriasPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [sortOrder, setSortOrder] = useState<"recentes" | "antigas">("recentes");
  const [allAnalyses, setAllAnalyses] = useState<AnalysisArticle[]>(ANALYSES);

  useEffect(() => {
    const loadMaterias = () => {
      const cmsMaterias = cmsStore
        .getItems("materia")
        .filter((item) => item.status === "published");

      const mappedCms: AnalysisArticle[] = cmsMaterias.map((item) => ({
        id: item.id,
        legacyId: item.legacyId,
        type: "materia",
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle || item.excerpt || "",
        category: item.category,
        categoryName: item.categoryName || item.category,
        author: {
          id: "autor-hdz",
          name: item.authorName || "Produção HDZ Finance",
          role: "Equipe Editorial HDZ",
          avatar: "/images/authors/hdz.jpg",
          bio: "Análise econômica e cobertura especializada HDZ Finance.",
        },
        publishDate: item.publishedAt,
        updateDate: item.updatedAt || item.publishedAt,
        readTimeMinutes: 5,
        coverImage: item.coverImagePath || "/images/materias/ciclos-de-mercado/cover.webp",
        coverAlt: item.coverImageAlt || item.title,
        content: item.bodyHtml,
        tags: item.tags || [],
        isFeatured: item.featured,
        keyTakeaways: [],
      }));

      const combined = [...ANALYSES];
      for (const cmsItem of mappedCms) {
        if (!combined.some((a) => a.slug === cmsItem.slug || a.id === cmsItem.id)) {
          combined.unshift(cmsItem);
        }
      }

      setAllAnalyses(combined);
    };

    loadMaterias();
    window.addEventListener("hdz_cms_updated", loadMaterias);
    window.addEventListener("storage", loadMaterias);

    return () => {
      window.removeEventListener("hdz_cms_updated", loadMaterias);
      window.removeEventListener("storage", loadMaterias);
    };
  }, []);

  const categories = [
    { slug: "todas", name: "Todas as Categorias" },
    { slug: "economia", name: "Economia" },
    { slug: "criptomoedas", name: "Criptomoedas" },
    { slug: "investimentos", name: "Investimentos" },
    { slug: "mercados", name: "Mercados" },
  ];

  const filteredAnalyses = allAnalyses
    .filter((a) => {
      if (selectedCategory === "todas") return true;
      const catNameSlug = (a.categoryName || "").toLowerCase().replace(/,/g, "").replace(/\s+/g, "-");
      return a.category === selectedCategory || catNameSlug === selectedCategory;
    })
    .sort((a, b) => {
      const timeA = new Date(a.publishDate).getTime();
      const timeB = new Date(b.publishDate).getTime();
      return sortOrder === "recentes" ? timeB - timeA : timeA - timeB;
    });

  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-8 md:py-12">
      <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-8">
        {/* Header Hero */}
        <div className="p-6 md:p-10 rounded-2xl bg-[#0B0D10] border border-white/[0.08] space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#147BFF]/10 text-[#147BFF] border border-[#147BFF]/30 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Coluna Editorial & Matérias Especializadas</span>
          </div>

          <h1 className="font-outfit font-extrabold text-3xl md:text-5xl text-[#F5F7FA] tracking-tight">
            Matérias & Análises HDZ Finance
          </h1>

          <p className="text-sm md:text-base text-[#9BA5B3] max-w-3xl leading-relaxed font-normal">
            Artigos aprofundados, reportagens especiais, cenários macroeconômicos e análises de valor para quem busca interpretar os movimentos de mercado além da superfície.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0D1117] border border-white/[0.08]">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none py-1">
            <Filter className="h-4 w-4 text-[#147BFF] shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-[#147BFF] text-white"
                    : "bg-[#050607] text-[#9BA5B3] border border-white/[0.08] hover:text-[#F5F7FA]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 shrink-0 border-t sm:border-t-0 border-white/[0.08] pt-3 sm:pt-0">
            <ArrowUpDown className="h-3.5 w-3.5 text-[#147BFF]" />
            <span className="text-xs text-[#9BA5B3]">Ordenar:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "recentes" | "antigas")}
              className="bg-[#050607] border border-white/[0.08] text-[#F5F7FA] text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#147BFF]"
            >
              <option value="recentes">Mais recentes</option>
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
