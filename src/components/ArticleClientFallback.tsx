"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Article } from "@/types";
import { AUTHORS, ARTICLES } from "@/data/articles";
import { cmsStore } from "@/lib/cms-store";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleBody from "@/components/ArticleBody";
import RelatedArticles from "@/components/RelatedArticles";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { Newspaper, ArrowLeft } from "lucide-react";

interface ArticleClientFallbackProps {
  slug: string;
}

export default function ArticleClientFallback({ slug }: ArticleClientFallbackProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check cmsStore (localStorage)
    const cmsItem = cmsStore.getItemBySlug(slug);

    if (cmsItem && cmsItem.status === "published") {
      const mapped: Article = {
        id: cmsItem.id,
        type: "noticia",
        slug: cmsItem.slug,
        title: cmsItem.title,
        subtitle: cmsItem.subtitle || cmsItem.excerpt || "",
        category: cmsItem.category,
        categoryName: cmsItem.categoryName || cmsItem.category,
        author: AUTHORS.editoria,
        publishDate: cmsItem.publishedAt,
        updateDate: cmsItem.updatedAt || cmsItem.publishedAt,
        readTimeMinutes: 3,
        coverImage: cmsItem.coverImagePath || "/images/materias/ciclos-de-mercado/cover.webp",
        coverAlt: cmsItem.coverImageAlt || cmsItem.title,
        content: cmsItem.bodyHtml,
        tags: cmsItem.tags || [],
        isFeatured: cmsItem.featured,
      };
      setArticle(mapped);
    }

    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-[#F5F7FA] py-20 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#147BFF] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-[#9BA5B3]">Carregando notícia...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-20 px-5 flex items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#0D1117] border border-white/[0.08] text-center space-y-6">
          <div className="inline-flex p-4 rounded-2xl bg-[#147BFF]/10 text-[#147BFF] border border-[#147BFF]/20">
            <Newspaper className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="font-outfit font-extrabold text-2xl text-[#F5F7FA]">
              Notícia Não Encontrada
            </h1>
            <p className="text-sm text-[#9BA5B3] leading-relaxed">
              A publicação solicitada não está disponível no momento ou foi alterada.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/noticias"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-[#147BFF] hover:bg-[#3A91FF] text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Ver Notícias</span>
            </Link>

            <Link
              href="/materias"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#121720] hover:bg-[#18202c] border border-white/[0.08] text-[#D5DDE6] text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <span>Ir para Matérias</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReadingProgressBar />
      <div className="min-h-screen bg-black text-[#F5F7FA] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ArticleHeader article={article} />
          <ArticleBody article={article} />
          <RelatedArticles currentArticleId={article.id} articles={ARTICLES} />
        </div>
      </div>
    </>
  );
}
