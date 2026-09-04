import { CATEGORIES, CATEGORY_LIST } from "@/data/categories";
import { ARTICLES } from "@/data/articles";
import { CategorySlug } from "@/types";
import NewsCard from "@/components/NewsCard";
import CategoryNavigation from "@/components/CategoryNavigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORY_LIST.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES[slug as CategorySlug];

  if (!category) {
    return {
      title: "Categoria Não Encontrada | HDZ Finance",
    };
  }

  return {
    title: `${category.name} - Notícias e Análises | HDZ Finance`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES[slug as CategorySlug];

  if (!category) {
    notFound();
  }

  const categoryArticles = ARTICLES.filter((a) => a.category === slug);

  return (
    <div className="min-h-screen bg-black text-[#F5F7FA]">
      <CategoryNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Category Header */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0B0D10] border border-[#252A32] space-y-3">
          <span className="text-xs font-bold text-[#147BFF] uppercase tracking-widest block">
            Editoria HDZ
          </span>
          <h1 className="font-outfit font-extrabold text-3xl md:text-4xl text-[#F5F7FA]">
            {category.name}
          </h1>
          <p className="text-sm md:text-base text-[#A7AFBA] max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Articles Grid */}
        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 p-8 rounded-xl bg-[#0B0D10] border border-[#252A32]">
            <p className="text-[#A7AFBA] text-sm">
              Nenhuma matéria encontrada recentemente nesta editoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
