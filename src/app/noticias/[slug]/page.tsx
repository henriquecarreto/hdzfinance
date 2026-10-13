"use client";

import { useParams } from "next/navigation";
import ArticleClientFallback from "@/components/ArticleClientFallback";

export default function ArticlePage() {
  const params = useParams();
  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
      ? params.slug[0]
      : "";

  return <ArticleClientFallback slug={slug} />;
}
