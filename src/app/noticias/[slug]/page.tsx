"use client";

import { use } from "react";
import ArticleClientFallback from "@/components/ArticleClientFallback";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = use(params);
  return <ArticleClientFallback slug={resolvedParams.slug} />;
}

