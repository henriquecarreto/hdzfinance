"use client";

import { useEffect, useState } from "react";
import { Article } from "@/types";
import { ARTICLES } from "@/data/articles";
import { cmsStore } from "@/lib/cms-store";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleBody from "@/components/ArticleBody";
import RelatedArticles from "@/components/RelatedArticles";
import ReadingProgressBar from "@/components/ReadingProgressBar";

interface ArticleViewProps {
  initialArticle: Article;
}

export default function ArticleView({ initialArticle }: ArticleViewProps) {
  const [article, setArticle] = useState<Article>(initialArticle);

  useEffect(() => {
    const syncFromCms = () => {
      const cmsItem =
        cmsStore.getItemBySlug(initialArticle.slug) ||
        cmsStore.getItemById(initialArticle.id) ||
        cmsStore
          .getItems("noticia")
          .find((n) => n.slug === initialArticle.slug || n.id === initialArticle.id);

      if (cmsItem && cmsItem.bodyHtml) {
        setArticle((prev) => ({
          ...prev,
          title: cmsItem.title || prev.title,
          subtitle: cmsItem.subtitle || cmsItem.excerpt || prev.subtitle,
          content: cmsItem.bodyHtml,
          coverImage: cmsItem.coverImagePath || prev.coverImage,
          coverAlt: cmsItem.coverImageAlt || prev.coverAlt,
          category: cmsItem.category || prev.category,
          categoryName: cmsItem.categoryName || prev.categoryName,
          tags: cmsItem.tags && cmsItem.tags.length > 0 ? cmsItem.tags : prev.tags,
          sources: [],
        }));
      }
    };

    // Initial sync on mount
    syncFromCms();

    // Listen for storage changes across tabs or custom event from admin panel
    const handleUpdate = () => syncFromCms();
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("hdz_cms_updated", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("hdz_cms_updated", handleUpdate);
    };
  }, [initialArticle.slug, initialArticle.id]);

  return (
    <>
      <ReadingProgressBar />

      <div className="min-h-screen bg-black text-[#F5F7FA] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Article Header */}
          <ArticleHeader article={article} />

          {/* Article Body */}
          <ArticleBody article={article} />

          {/* Related Articles */}
          <RelatedArticles
            currentArticleId={article.id}
            articles={ARTICLES}
          />
        </div>
      </div>
    </>
  );
}
