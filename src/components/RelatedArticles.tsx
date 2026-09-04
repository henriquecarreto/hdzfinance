import { Article } from "@/types";
import NewsCard from "./NewsCard";

interface RelatedArticlesProps {
  currentArticleId: string;
  articles: Article[];
}

export default function RelatedArticles({
  currentArticleId,
  articles,
}: RelatedArticlesProps) {
  const related = articles
    .filter((a) => a.id !== currentArticleId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto pt-10 border-t border-[#252A32] space-y-6">
      <h2 className="font-outfit font-extrabold text-xl md:text-2xl text-[#F5F7FA] uppercase tracking-wide">
        Leia Também na HDZ Finance
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((item) => (
          <NewsCard key={item.id} article={item} />
        ))}
      </div>
    </section>
  );
}
