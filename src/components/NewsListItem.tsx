import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { Calendar } from "lucide-react";

interface NewsListItemProps {
  article: Article;
}

export default function NewsListItem({ article }: NewsListItemProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <article className="py-5 first:pt-0 border-b border-white/[0.08] last:border-b-0">
      <Link
        href={`/noticias/${article.slug}`}
        className="flex flex-col sm:flex-row items-start gap-5 md:gap-6 group"
      >
        {/* Editorial Image (~240x150px) */}
        <div className="relative w-full sm:w-[240px] h-[160px] sm:h-[150px] shrink-0 rounded-xl overflow-hidden bg-[#0D1117]">
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex-1 space-y-2.5">
          <div className="flex items-center space-x-3 text-xs text-[#9BA5B3]">
            <span className="font-semibold uppercase tracking-wider text-[#147BFF]">
              {article.categoryName}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-[#147BFF]" />
              {formatDate(article.publishDate)}
            </span>
          </div>

          <h3 className="font-outfit font-bold text-lg md:text-xl text-[#F5F7FA] group-hover:text-[#3A91FF] transition-colors leading-snug">
            {article.title}
          </h3>

          <p className="text-xs md:text-sm text-[#9BA5B3] line-clamp-2 leading-relaxed font-normal">
            {article.subtitle}
          </p>
        </div>
      </Link>
    </article>
  );
}
