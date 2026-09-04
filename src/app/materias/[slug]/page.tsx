import { ANALYSES } from "@/data/analyses";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleBody from "@/components/ArticleBody";
import RelatedArticles from "@/components/RelatedArticles";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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
      title: "Matéria Não Encontrada | HDZ Finance",
    };
  }

  const canonicalUrl = `https://hdzfinance.com.br/materias/${slug}`;

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
