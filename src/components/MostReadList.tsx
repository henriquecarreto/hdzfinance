import Link from "next/link";
import { Article } from "@/types";
import { ANALYSES } from "@/data/analyses";

interface MostReadListProps {
  articles: Article[];
}

export default function MostReadList({ articles }: MostReadListProps) {
  const displayItems = articles.length > 0 ? articles.map((a) => ({
    id: a.id,
    slug: a.slug,
    categoryName: a.categoryName,
    title: a.title,
    href: `/noticias/${a.slug}`,
  })) : ANALYSES.map((a) => ({
    id: a.id,
    slug: a.slug,
    categoryName: a.categoryName,
    title: a.title,
    href: `/materias/${a.slug}`,
  }));

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-white/[0.08]">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9BA5B3]">
          Mais Lidas na HDZ
        </span>
      </div>

      <div className="divide-y divide-white/[0.08]">
        {displayItems.slice(0, 5).map((article, index) => (
          <Link
            key={article.id}
            href={article.href}
            className="flex items-start space-x-4 py-4 first:pt-0 last:pb-0 group"
          >
            <span className="font-outfit font-extrabold text-2xl text-[#147BFF] shrink-0 w-7 select-none">
              0{index + 1}
            </span>

            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#147BFF] block">
                {article.categoryName}
              </span>
              <h3 className="font-outfit font-bold text-sm md:text-base text-[#F5F7FA] group-hover:text-[#3A91FF] transition-colors leading-snug line-clamp-2">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

