"use client";

import { useState } from "react";
import NewsListItem from "@/components/NewsListItem";
import MostReadList from "@/components/MostReadList";
import { ARTICLES } from "@/data/articles";
import { CATEGORY_LIST } from "@/data/categories";
import { Filter, Newspaper } from "lucide-react";

export default function NoticiasPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const filteredArticles = ARTICLES.filter((art) => {
    if (selectedCategory === "todas") return true;
    return art.category === selectedCategory;
  });

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-8 md:py-12">
      <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-10">
        {/* Header Hero */}
        <div className="p-6 md:p-10 rounded-2xl bg-[#0B0D10] border border-white/[0.08] space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#147BFF]/10 text-[#147BFF] border border-[#147BFF]/30 text-xs font-bold uppercase tracking-wider">
            <Newspaper className="h-3.5 w-3.5" />
            <span>Arquivo Completo de Notícias</span>
          </div>

          <h1 className="font-outfit font-extrabold text-3xl md:text-5xl text-[#F5F7FA] tracking-tight">
            Notícias & Cobertura Diária
          </h1>

          <p className="text-sm md:text-base text-[#9BA5B3] max-w-3xl leading-relaxed">
            Cobertura em tempo real dos acontecimentos que movimentam a economia global, finanças pessoais, mercados tradicionais e tecnologia financeira.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2 border-b border-white/[0.08]">
          <Filter className="h-4 w-4 text-[#147BFF] shrink-0 mr-2" />
          <button
            onClick={() => setSelectedCategory("todas")}
            className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === "todas"
                ? "bg-[#147BFF] text-white"
                : "bg-[#0D1117] text-[#9BA5B3] border border-white/[0.08] hover:text-[#F5F7FA]"
            }`}
          >
            Todas as Notícias
          </button>

          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.slug
                  ? "bg-[#147BFF] text-white"
                  : "bg-[#0D1117] text-[#9BA5B3] border border-white/[0.08] hover:text-[#F5F7FA]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid Feed: Left Feed (8 cols) + Right Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-8 space-y-6">
            {filteredArticles.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-[#0D1117] border border-white/[0.08] space-y-4 my-4">
                <p className="text-[#9BA5B3] text-sm">
                  Nenhuma notícia disponível nesta categoria no momento.
                </p>
                <a
                  href="/materias"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#147BFF] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3A91FF] transition-all"
                >
                  <span>Explorar Matérias HDZ</span>
                </a>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.08]">
                {filteredArticles.slice(0, visibleCount).map((article) => (
                  <NewsListItem key={article.id} article={article} />
                ))}
              </div>
            )}

            {visibleCount < filteredArticles.length && (
              <div className="text-center pt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3.5 rounded-xl bg-[#0D1117] hover:bg-[#121720] border border-white/[0.08] hover:border-[#147BFF]/40 text-xs uppercase tracking-wider font-outfit font-bold text-[#F5F7FA] transition-all"
                >
                  Carregar mais notícias
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <MostReadList articles={ARTICLES} />
          </div>
        </div>
      </div>
    </div>
  );
}
