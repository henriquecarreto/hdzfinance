import { ARTICLES } from "@/data/articles";
import { ANALYSES } from "@/data/analyses";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleBody from "@/components/ArticleBody";
import RelatedArticles from "@/components/RelatedArticles";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

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
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    const materia = ANALYSES.find((a) => a.slug === slug || a.legacyId === slug);
    if (materia) {
      return {
        title: `${materia.title} | HDZ Finance`,
      };
    }
    return {
      title: "Artigo Não Encontrado | HDZ Finance",
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
  const materia = ANALYSES.find((a) => a.slug === slug || a.legacyId === slug);
  if (materia) {
    redirect(`/materias/${materia.slug}`);
  }

  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
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
