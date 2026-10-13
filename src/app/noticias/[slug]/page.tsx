import ArticleClientFallback from "@/components/ArticleClientFallback";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    return {
      title: "Notícia | HDZ Finance",
    };
  } catch {
    return {
      title: "HDZ Finance",
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  return <ArticleClientFallback slug={slug} />;
}
