"use client";

import { use } from "react";
import { ANALYSES } from "@/data/analyses";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleBody from "@/components/ArticleBody";
import RelatedArticles from "@/components/RelatedArticles";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import MateriaClientFallback from "@/components/MateriaClientFallback";

interface MateriaPageProps {
  params: Promise<{ slug: string }>;
}

export default function MateriaPage({ params }: MateriaPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const article = ANALYSES.find((a) => a.slug === slug);

  if (!article) {
    return <MateriaClientFallback slug={slug} />;
  }

  return (
    <>
      <ReadingProgressBar />
      <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ArticleHeader article={article} />
          <ArticleBody article={article} />
          <RelatedArticles
            currentArticleId={article.id}
            articles={ANALYSES as any}
          />
        </div>
      </div>
    </>
  );
}

