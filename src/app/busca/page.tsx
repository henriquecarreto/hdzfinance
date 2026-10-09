"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Search, FileText, BookOpen, ShoppingBag } from "lucide-react";
import { ARTICLES } from "@/data/articles";
import { ANALYSES } from "@/data/analyses";
import { LEARNING_PATHS } from "@/data/learning";
import { PRODUCTS } from "@/data/products";
import NewsCard from "@/components/NewsCard";
import AnalysisCard from "@/components/AnalysisCard";
import LearningCard from "@/components/LearningCard";
import ProductCard from "@/components/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const filteredArticles = query.trim()
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          a.categoryName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredAnalyses = query.trim()
    ? ANALYSES.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredLearning = query.trim()
    ? LEARNING_PATHS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const totalResults =
    filteredArticles.length +
    filteredAnalyses.length +
    filteredLearning.length +
    filteredProducts.length;

  return (
    <div className="space-y-8">
      {/* Search Input Box */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0B0D10] border border-[#252A32] space-y-4">
        <h1 className="font-outfit font-extrabold text-2xl md:text-3xl text-[#F5F7FA]">
          Pesquisar no Portal HDZ Finance
        </h1>

        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-[#147BFF]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite palavras-chave (ex: Selic, Bitcoin, Orçamento, Renda Fixa)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#000000] border border-[#252A32] text-[#F5F7FA] placeholder-[#A7AFBA] focus:outline-none focus:border-[#147BFF] text-sm md:text-base"
          />
        </div>
      </div>

      {/* Results stats */}
      {query.trim() && (
        <div className="text-xs text-[#A7AFBA] border-b border-[#252A32] pb-3">
          Exibindo <strong className="text-[#F5F7FA]">{totalResults}</strong> resultados para &quot;<span className="text-[#147BFF]">{query}</span>&quot;:
        </div>
      )}

      {/* No query */}
      {!query.trim() && (
        <div className="text-center py-12 p-8 rounded-xl bg-[#0B0D10] border border-[#252A32] text-[#A7AFBA] text-sm">
          Digite algum termo na barra acima para pesquisar entre notícias, análises, aulas e cursos.
        </div>
      )}

      {/* No results */}
      {query.trim() && totalResults === 0 && (
        <div className="text-center py-12 p-8 rounded-xl bg-[#0B0D10] border border-[#252A32] text-[#A7AFBA] text-sm">
          Nenhum conteúdo publicado encontrado para esta busca.
        </div>
      )}

      {/* Articles */}
      {filteredArticles.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-outfit font-bold text-lg text-[#F5F7FA] flex items-center gap-2 border-b border-[#252A32] pb-2">
            <FileText className="h-4 w-4 text-[#147BFF]" />
            Notícias Encontradas ({filteredArticles.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <NewsCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}

      {/* Analyses */}
      {filteredAnalyses.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-outfit font-bold text-lg text-[#F5F7FA] flex items-center gap-2 border-b border-[#252A32] pb-2">
            <FileText className="h-4 w-4 text-[#147BFF]" />
            Análises Encontradas ({filteredAnalyses.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnalyses.map((ana) => (
              <AnalysisCard key={ana.id} analysis={ana} />
            ))}
          </div>
        </section>
      )}

      {/* Learning */}
      {filteredLearning.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-outfit font-bold text-lg text-[#F5F7FA] flex items-center gap-2 border-b border-[#252A32] pb-2">
            <BookOpen className="h-4 w-4 text-[#147BFF]" />
            Trilhas Educacionais Encontradas ({filteredLearning.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLearning.map((path) => (
              <LearningCard key={path.id} path={path} />
            ))}
          </div>
        </section>
      )}

      {/* Products */}
      {filteredProducts.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-outfit font-bold text-lg text-[#F59A18] flex items-center gap-2 border-b border-[#252A32] pb-2">
            <ShoppingBag className="h-4 w-4 text-[#F59A18]" />
            Cursos & Guias Encontrados ({filteredProducts.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-black text-[#F5F7FA] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-12 text-[#A7AFBA]">Carregando busca...</div>}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
