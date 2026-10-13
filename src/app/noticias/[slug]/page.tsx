import { ARTICLES } from "@/data/articles";
import { ANALYSES } from "@/data/analyses";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleBody from "@/components/ArticleBody";
import RelatedArticles from "@/components/RelatedArticles";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ArticleView from "@/components/ArticleView";
import ArticleClientFallback from "@/components/ArticleClientFallback";
import { getArticleBySlug, getMateriaBySlug } from "@/lib/content-service";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;
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
  try {
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

    const safeOgImage =
      article.coverImage && !article.coverImage.startsWith("data:")
        ? article.coverImage
        : "https://hdzfinance.com.br/assets/hdz-symbol.png";

    return {
      title: `${article.title} | HDZ Finance`,
      description: article.subtitle,
      openGraph: {
        title: article.title,
        description: article.subtitle,
        type: "article",
        publishedTime: article.publishDate,
        modifiedTime: article.updateDate,
        authors: [article.author?.name || "Produção HDZ Finance"],
        images: [
          {
            url: safeOgImage,
            alt: article.coverAlt || article.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.subtitle,
        images: [safeOgImage],
      },
    };
  } catch (err) {
    console.warn("[generateMetadata caught error]:", err);
    return {
      title: "HDZ Finance | Notícia",
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  let resolvedSlug = "";
  try {
    const { slug } = await params;
    resolvedSlug = slug;

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
    const safeSchemaImage =
      article.coverImage && !article.coverImage.startsWith("data:")
        ? article.coverImage
        : "https://hdzfinance.com.br/assets/hdz-symbol.png";

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.title,
      description: article.subtitle,
      image: [safeSchemaImage],
      datePublished: article.publishDate,
      dateModified: article.updateDate,
      author: [
        {
          "@type": "Person",
          name: article.author?.name || "Produção HDZ Finance",
          jobTitle: article.author?.role || "Redação",
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
  } catch (err: any) {
    if (
      err?.digest?.startsWith("NEXT_REDIRECT") ||
      err?.digest?.startsWith("NEXT_NOT_FOUND") ||
      err?.message === "NEXT_REDIRECT" ||
      err?.message === "NEXT_NOT_FOUND"
    ) {
      throw err;
    }
    console.warn("[ArticlePage caught error, falling back to client fetch]:", err);
    return <ArticleClientFallback slug={resolvedSlug} />;
  }
}
