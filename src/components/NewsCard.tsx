import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { Clock, Calendar } from "lucide-react";

interface NewsCardProps {
  article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <article className="flex flex-col h-full group">
      <Link href={`/noticias/${article.slug}`} className="block space-y-3.5">
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0D1117]">
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-xs text-[#9BA5B3]">
            <span className="font-semibold uppercase tracking-wider text-[#147BFF]">
              {article.categoryName}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-[#147BFF]" />
              {formatDate(article.publishDate)}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-[#147BFF]" />
              {article.readTimeMinutes} min
            </span>
          </div>

          <h3 className="font-outfit font-bold text-base md:text-lg text-[#F5F7FA] group-hover:text-[#3A91FF] transition-colors leading-snug line-clamp-2">
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
