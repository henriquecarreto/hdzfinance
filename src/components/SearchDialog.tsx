"use client";

import { useState, useEffect, useTransition } from "react";
import { Search, X, ArrowRight, FileText, BookOpen, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ARTICLES } from "@/data/articles";
import { ANALYSES } from "@/data/analyses";
import { LEARNING_PATHS } from "@/data/learning";
import { PRODUCTS } from "@/data/products";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [, startTransition] = useTransition();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredArticles = query.trim()
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          a.categoryName.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  const filteredAnalyses = query.trim()
    ? ANALYSES.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.subtitle.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 2)
    : [];

  const filteredLearning = query.trim()
    ? LEARNING_PATHS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 2)
    : [];

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 2)
    : [];

  const totalResults =
    filteredArticles.length +
    filteredAnalyses.length +
    filteredLearning.length +
    filteredProducts.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 pt-16 md:pt-24 transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Busca de notícias e conteúdos"
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-[#252A32] bg-[#0B0D10] shadow-2xl overflow-hidden text-[#F5F7FA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="relative flex items-center border-b border-[#252A32] px-4 py-3">
          <Search className="h-5 w-5 text-[#147BFF] shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => startTransition(() => setQuery(e.target.value))}
            placeholder="Buscar notícias, análises, cursos ou guias..."
            className="w-full bg-transparent text-[#F5F7FA] placeholder-[#A7AFBA] focus:outline-none text-base md:text-lg"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-[#A7AFBA] hover:text-[#F5F7FA] transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-[#147BFF]"
            aria-label="Fechar busca"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!query.trim() && (
            <div className="text-center py-8">
              <p className="text-sm text-[#A7AFBA]">
                Digite um termo para pesquisar em todo o portal HDZ Finance.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {["Selic", "Bitcoin", "Renda Fixa", "Orçamento", "Bolsa de Valores"].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs px-3 py-1.5 rounded-full border border-[#252A32] bg-[#11151A] text-[#A7AFBA] hover:text-[#147BFF] hover:border-[#147BFF] transition-all"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {query.trim() && totalResults === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-[#A7AFBA]">
                Nenhum resultado encontrado para &quot;<span className="text-[#F5F7FA]">{query}</span>&quot;.
              </p>
            </div>
          )}

          {/* Articles */}
          {filteredArticles.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-[#147BFF] mb-2">
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                Notícias
              </div>
              <div className="space-y-2">
                {filteredArticles.map((art) => (
                  <Link
                    key={art.id}
                    href={`/noticias/${art.slug}`}
                    onClick={onClose}
                    className="block p-3 rounded-lg border border-transparent hover:border-[#252A32] hover:bg-[#11151A] transition-all"
                  >
                    <span className="text-xs font-semibold text-[#147BFF] block">
                      {art.categoryName}
                    </span>
                    <h4 className="text-sm font-medium text-[#F5F7FA] line-clamp-1">
                      {art.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Analyses */}
          {filteredAnalyses.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-[#147BFF] mb-2">
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                Análises
              </div>
              <div className="space-y-2">
                {filteredAnalyses.map((ana) => (
                  <Link
                    key={ana.id}
                    href={`/noticias/${ana.slug}`}
                    onClick={onClose}
                    className="block p-3 rounded-lg border border-transparent hover:border-[#252A32] hover:bg-[#11151A] transition-all"
                  >
                    <span className="text-xs font-semibold text-[#147BFF] block">
                      Análise HDZ
                    </span>
                    <h4 className="text-sm font-medium text-[#F5F7FA] line-clamp-1">
                      {ana.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Learning */}
          {filteredLearning.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-[#147BFF] mb-2">
                <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                Aprenda (Educação)
              </div>
              <div className="space-y-2">
                {filteredLearning.map((path) => (
                  <Link
                    key={path.id}
                    href={`/aprenda/${path.slug}`}
                    onClick={onClose}
                    className="block p-3 rounded-lg border border-transparent hover:border-[#252A32] hover:bg-[#11151A] transition-all"
                  >
                    <span className="text-xs font-semibold text-[#147BFF] block">
                      Trilha • {path.level}
                    </span>
                    <h4 className="text-sm font-medium text-[#F5F7FA] line-clamp-1">
                      {path.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Products */}
          {filteredProducts.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-[#F59A18] mb-2">
                <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                Cursos & Guias
              </div>
              <div className="space-y-2">
                {filteredProducts.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/produtos/${prod.slug}`}
                    onClick={onClose}
                    className="block p-3 rounded-lg border border-transparent hover:border-[#F59A18]/30 hover:bg-[#11151A] transition-all"
                  >
                    <span className="text-xs font-semibold text-[#F59A18] block">
                      {prod.type}
                    </span>
                    <h4 className="text-sm font-medium text-[#F5F7FA] line-clamp-1">
                      {prod.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        {query.trim() && (
          <div className="border-t border-[#252A32] bg-[#11151A] px-4 py-2.5 flex items-center justify-between text-xs text-[#A7AFBA]">
            <span>{totalResults} resultado(s) encontrado(s)</span>
            <Link
              href={`/busca?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="text-[#147BFF] hover:underline flex items-center font-medium"
            >
              Ver todos os resultados
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
