import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { Clock, Calendar } from "lucide-react";

interface FeaturedArticleProps {
  mainArticle: Article;
  secondaryArticles: Article[];
}

export default function FeaturedArticle({
  mainArticle,
  secondaryArticles,
}: FeaturedArticleProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Select 2 secondary articles for the side column
  const sideArticles = secondaryArticles.slice(0, 2);

  return (
    <section className="relative mt-12 md:mt-16">
      {/* Subtle Ambient Radial Glow (Non-neon, low opacity) */}
      <div className="absolute -top-10 -left-20 w-96 h-96 bg-[#147BFF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[#F59A18]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 relative z-10">
        {/* Main Headline (Dominant 8 columns on desktop) */}
        <div className="lg:col-span-8 flex flex-col group">
          <Link
            href={`/noticias/${mainArticle.slug}`}
            className="relative block w-full h-[420px] md:h-[500px] lg:h-[540px] rounded-[20px] overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#147BFF]"
          >
            {/* Broad Editorial Image */}
            <Image
              src={mainArticle.coverImage}
              alt={mainArticle.coverAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-[#050607]/60 to-transparent z-10" />

            {/* Overlaid Headline & Metadata Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 space-y-3.5">
              <div className="flex items-center space-x-3 text-xs text-[#9BA5B3]">
                <span className="px-3 py-1 rounded font-bold uppercase tracking-wider bg-[#147BFF] text-white text-[11px]">
                  {mainArticle.categoryName}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-[#147BFF]" />
                  {formatDate(mainArticle.publishDate)}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1 text-[#147BFF]" />
                  {mainArticle.readTimeMinutes} min de leitura
                </span>
              </div>

              <h1 className="font-outfit font-extrabold text-2xl md:text-4xl lg:text-[46px] xl:text-[52px] text-[#F5F7FA] group-hover:text-[#3A91FF] transition-colors leading-[1.1] tracking-tight">
                {mainArticle.title}
              </h1>

              <p className="text-sm md:text-base text-[#9BA5B3] line-clamp-2 max-w-3xl font-normal leading-relaxed">
                {mainArticle.subtitle}
              </p>
            </div>
          </Link>
        </div>

        {/* Side Column (4 columns - Exactly 2 Secondary News Items) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9BA5B3]">
              Em Destaque
            </span>
          </div>

          <div className="space-y-6 flex-1 flex flex-col justify-around">
            {sideArticles.map((item, idx) => (
              <div key={item.id} className="space-y-4">
                {idx > 0 && <div className="h-[1px] bg-white/[0.08] my-4" />}
                <Link
                  href={`/noticias/${item.slug}`}
                  className="block space-y-3 group"
                >
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0D1117]">
                    <Image
                      src={item.coverImage}
                      alt={item.coverAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-[11px] text-[#9BA5B3]">
                      <span className="font-semibold text-[#147BFF] uppercase tracking-wider">
                        {item.categoryName}
                      </span>
                      <span>•</span>
                      <span>{formatDate(item.publishDate)}</span>
                      <span>•</span>
                      <span>{item.readTimeMinutes} min</span>
                    </div>

                    <h2 className="font-outfit font-bold text-lg md:text-xl text-[#F5F7FA] group-hover:text-[#3A91FF] transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
