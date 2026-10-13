import { ARTICLES } from "@/data/articles";
import { ANALYSES } from "@/data/analyses";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleBody from "@/components/ArticleBody";
import RelatedArticles from "@/components/RelatedArticles";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ArticleView from "@/components/ArticleView";
import ArticleClientFallback from "@/components/ArticleClientFallback";
import { getArticleBySlug, getMateriaBySlug } from "@/lib/content-service";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const dynamicParams = true;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    const materia = await getMateriaBySlug(slug);
    if (materia) {
      return {
        title: `${materia.title} | HDZ Finance`,
        description: materia.subtitle,
      };
    }
    return {
      title: "Notícia | HDZ Finance",
    };
  }

  return {
    title: `${article.title} | HDZ Finance`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: "article",
      publishedTime: article.publishDate,
      modifiedTime: article.updateDate,
      authors: [article.author.name],
      images: [
        {
          url: article.coverImage,
          alt: article.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.subtitle,
      images: [article.coverImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  // If this slug belongs to a Matéria or legacyId, redirect to /materias/[slug]
  const materia = await getMateriaBySlug(slug);
  if (materia) {
    redirect(`/materias/${materia.slug}`);
  }

  const article = await getArticleBySlug(slug);

  if (!article) {
    return <ArticleClientFallback slug={slug} />;
  }

  // JSON-LD NewsArticle Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.subtitle,
    image: [article.coverImage],
    datePublished: article.publishDate,
    dateModified: article.updateDate,
    author: [
      {
        "@type": "Person",
        name: article.author.name,
        jobTitle: article.author.role,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "HDZ Finance",
      logo: {
        "@type": "ImageObject",
        url: "https://hdzfinance.com.br/assets/hdz-symbol.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleView initialArticle={article} />
    </>
  );
}
