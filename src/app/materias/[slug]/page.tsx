import { ANALYSES } from "@/data/analyses";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleBody from "@/components/ArticleBody";
import RelatedArticles from "@/components/RelatedArticles";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import MateriaClientFallback from "@/components/MateriaClientFallback";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

interface MateriaPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ANALYSES.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: MateriaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ANALYSES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Matéria | HDZ Finance",
      description: "Artigo aprofundado e análise de mercado HDZ Finance.",
    };
  }

  const canonicalUrl = `https://hdzfinance.com.br/materias/${slug}`;
  const safeOgImage =
    article.coverImage && !article.coverImage.startsWith("data:")
      ? article.coverImage
      : "https://hdzfinance.com.br/assets/hdz-symbol.png";

  return {
    title: `${article.title} | HDZ Finance`,
    description: article.subtitle,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.subtitle,
      url: canonicalUrl,
      type: "article",
      publishedTime: article.publishDate,
      modifiedTime: article.updateDate,
      authors: [article.author.name],
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
}

export default async function MateriaPage({ params }: MateriaPageProps) {
  const { slug } = await params;
  const article = ANALYSES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // JSON-LD Article / BlogPosting Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.subtitle,
    image: [article.coverImage],
    datePublished: article.publishDate,
    dateModified: article.updateDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://hdzfinance.com.br/materias/${slug}`,
    },
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
      <ReadingProgressBar />

      <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Article Header */}
          <ArticleHeader article={article} />

          {/* Article Body */}
          <ArticleBody article={article} />

          {/* Related Matérias */}
          <RelatedArticles
            currentArticleId={article.id}
            articles={ANALYSES as any}
          />
        </div>
      </div>
    </>
  );
}
