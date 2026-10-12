"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { cmsStore, CMSContentItem } from "@/lib/cms-store";
import { ANALYSES } from "@/data/analyses";
import { ARTICLES } from "@/data/articles";

const DEFAULT_MATERIA: CMSContentItem = {
  id: ANALYSES[0]?.id || "materia-default",
  type: "materia",
  status: "published",
  title: ANALYSES[0]?.title || "",
  subtitle: ANALYSES[0]?.subtitle || "",
  excerpt: ANALYSES[0]?.subtitle || "",
  slug: ANALYSES[0]?.slug || "",
  bodyHtml: "",
  category: ANALYSES[0]?.category || "criptomoedas",
  categoryName: ANALYSES[0]?.categoryName || "Criptomoedas",
  tags: [],
  authorName: "Produção HDZ Finance",
  coverImagePath: ANALYSES[0]?.coverImage || "/images/materias/ciclos-de-mercado/cover.webp",
  featured: true,
  featuredOrder: 1,
  publishedAt: ANALYSES[0]?.publishDate || "",
  createdAt: ANALYSES[0]?.publishDate || "",
  updatedAt: ANALYSES[0]?.publishDate || "",
};

const DEFAULT_NOTICIAS: CMSContentItem[] = ARTICLES.slice(0, 4).map((art) => ({
  id: art.id,
  type: "noticia",
  status: "published",
  title: art.title,
  subtitle: art.subtitle,
  excerpt: art.subtitle,
  slug: art.slug,
  bodyHtml: art.content,
  category: art.category,
  categoryName: art.categoryName,
  tags: art.tags || [],
  authorName: art.author.name,
  coverImagePath: art.coverImage,
  coverImageAlt: art.coverAlt,
  featured: art.isFeatured || false,
  featuredOrder: 1,
  publishedAt: art.publishDate,
  createdAt: art.publishDate,
  updatedAt: art.updateDate || art.publishDate,
}));

export default function FeaturedHomeSection() {
  const [mainMateria, setMainMateria] = useState<CMSContentItem | null>(DEFAULT_MATERIA);
  const [publishedNoticias, setPublishedNoticias] = useState<CMSContentItem[]>(DEFAULT_NOTICIAS);

  useEffect(() => {
    const loadFeatured = () => {
      // 1. Fetch main featured Matéria (strictly type === "materia" & status === "published")
      const materias = cmsStore.getItems("materia").filter((item) => item.status === "published");
      
      let selectedMateria: CMSContentItem | null = null;

      if (materias.length > 0) {
        const featuredMaterias = materias.filter((m) => m.featured);
        if (featuredMaterias.length > 0) {
          featuredMaterias.sort((a, b) => (a.featuredOrder || 1) - (b.featuredOrder || 1));
          selectedMateria = featuredMaterias[0];
        } else {
          materias.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
          selectedMateria = materias[0];
        }
      }

      if (!selectedMateria) {
        selectedMateria = DEFAULT_MATERIA;
      }

      setMainMateria(selectedMateria);

      // 2. Fetch published Notícias ONLY (strictly type === "noticia" & status === "published")
      const noticias = cmsStore
        .getItems("noticia")
        .filter((item) => item.status === "published")
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

      // Ensure at least 4 items using fallback to ARTICLES if needed
      const mergedNoticias = [...noticias];
      for (const art of ARTICLES) {
        if (!mergedNoticias.some((n) => n.slug === art.slug || n.id === art.id)) {
          mergedNoticias.push({
            id: art.id,
            type: "noticia",
            status: "published",
            title: art.title,
            subtitle: art.subtitle,
            excerpt: art.subtitle,
            slug: art.slug,
            bodyHtml: art.content,
            category: art.category,
            categoryName: art.categoryName,
            tags: art.tags || [],
            authorName: art.author.name,
            coverImagePath: art.coverImage,
            coverImageAlt: art.coverAlt,
            featured: art.isFeatured || false,
            featuredOrder: 1,
            publishedAt: art.publishDate,
            createdAt: art.publishDate,
            updatedAt: art.updateDate || art.publishDate,
          });
        }
      }

      setPublishedNoticias(mergedNoticias.slice(0, 4));
    };

    loadFeatured();
    window.addEventListener("hdz_cms_updated", loadFeatured);
    window.addEventListener("storage", loadFeatured);

    return () => {
      window.removeEventListener("hdz_cms_updated", loadFeatured);
      window.removeEventListener("storage", loadFeatured);
    };
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!mainMateria) {
    return null;
  }

  return (
    <section className="relative isolate overflow-hidden pt-8 md:pt-12 pb-20 md:pb-24 border-b border-white/[0.08] bg-transparent">
      <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8 space-y-6">
        {/* Header Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
          {/* Left Group: EM DESTAQUE label + VER TODAS AS MATÉRIAS button */}
          <div className="flex items-center space-x-3 flex-wrap gap-y-2">
            <span className="featured-label min-h-[42px] px-4 inline-flex items-center border border-[#168BFF]/60 rounded-[9px] bg-[#000000] text-[#42A5FF] text-[12px] font-extrabold tracking-[0.09em] uppercase cursor-default select-none">
              EM DESTAQUE
            </span>

            <Link
              href="/materias"
              className="all-materials-button min-h-[42px] px-5 inline-flex items-center justify-center gap-2 border border-[#FFC05A] rounded-[9px] bg-gradient-to-r from-[#FFB12B] via-[#F59A18] to-[#E98508] text-[#080B0F] text-[12px] font-[850] tracking-[0.05em] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_8px_22px_rgba(245,154,24,0.19)] hover:-translate-y-[2px] hover:brightness-[1.07] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.42),0_12px_28px_rgba(245,154,24,0.28)] transition-all duration-200"
            >
              <span>VER TODAS AS MATÉRIAS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Group: VER TODAS AS NOTÍCIAS button */}
          <div>
            <Link
              href="/noticias"
              className="all-news-button min-h-[42px] px-5 inline-flex items-center justify-center gap-2 border border-[#168BFF]/60 rounded-[9px] bg-[#000000] text-[#F5F8FC] text-[12px] font-extrabold tracking-[0.05em] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_8px_22px_rgba(0,0,0,0.28)] hover:-translate-y-[2px] hover:border-[#46A9FF] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_12px_26px_rgba(22,139,255,0.18)] transition-all duration-200"
            >
              <span>VER TODAS AS NOTÍCIAS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#168BFF]" />
            </Link>
          </div>
        </div>

        {/* Featured Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Main Featured Matéria Column (8 cols): Shorter Matéria + 2 News Cards underneath */}
          <div className="lg:col-span-8 flex flex-col justify-between min-w-0">
            {/* Reduced height featured Matéria card */}
            <Link
              href={`/materias/${mainMateria.slug}`}
              className="featured-main-card relative flex flex-col justify-end w-full min-h-[260px] sm:min-h-[290px] lg:min-h-[310px] rounded-[18px] overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#168BFF] shadow-2xl border border-white/10"
            >
              {/* Background Cover Image */}
              <Image
                src={mainMateria.coverImagePath || "/images/materias/ciclos-de-mercado/cover.webp"}
                alt={mainMateria.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                priority
                unoptimized={Boolean(mainMateria.coverImagePath?.startsWith("data:"))}
              />

              {/* Gradient overlay for crisp readability */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.25) 30%, rgba(0, 0, 0, 0.72) 70%, rgba(0, 0, 0, 0.96) 100%)",
                }}
              />

              {/* Bottom Anchored Editorial Content */}
              <div className="relative z-20 p-5 sm:p-6 md:p-8 space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-3 text-xs text-[#AEB8C4] flex-wrap gap-y-1">
                  <span className="px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider bg-[#168BFF] text-white text-[10px] sm:text-[11px]">
                    {mainMateria.categoryName || mainMateria.category}
                  </span>
                  <span className="flex items-center text-[11px]">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-[#168BFF]" />
                    {formatDate(mainMateria.publishedAt)}
                  </span>
                </div>

                <h2
                  className="font-outfit font-extrabold text-lg sm:text-2xl md:text-3xl lg:text-[28px] text-white leading-[1.2] tracking-tight group-hover:text-[#3A91FF] transition-colors"
                  style={{
                    textShadow: "0 3px 14px rgba(0, 0, 0, 0.88), 0 1px 3px rgba(0, 0, 0, 0.75)",
                  }}
                >
                  {mainMateria.title}
                </h2>

                {(mainMateria.subtitle || mainMateria.excerpt) && (
                  <p
                    className="text-xs sm:text-sm text-[#DCE3EB] leading-[1.5] line-clamp-2 max-w-2xl font-normal"
                    style={{
                      textShadow: "0 2px 10px rgba(0, 0, 0, 0.92)",
                    }}
                  >
                    {mainMateria.subtitle || mainMateria.excerpt}
                  </p>
                )}
              </div>
            </Link>

            {/* News cards placed underneath the Matéria */}
            {publishedNoticias.length > 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                {publishedNoticias.slice(2, 4).map((noticia) => (
                  <NewsCardItem key={noticia.id} noticia={noticia} formatDate={formatDate} />
                ))}
              </div>
            )}
          </div>

          {/* Right Side Column (4 cols): 2 News Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-4 sm:gap-6 min-w-0 justify-between">
            {publishedNoticias.slice(0, 2).map((noticia) => (
              <NewsCardItem key={noticia.id} noticia={noticia} formatDate={formatDate} className="flex-1" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsCardItem({
  noticia,
  formatDate,
  className = "",
}: {
  noticia: CMSContentItem;
  formatDate: (date?: string) => string;
  className?: string;
}) {
  return (
    <Link
      href={`/noticias/${noticia.slug}`}
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-[18px] bg-[#000000] border border-white/10 hover:border-[#168BFF]/50 transition-all duration-300 shadow-xl overflow-hidden min-h-[220px] sm:min-h-[250px] ${className}`}
    >
      <div className="relative aspect-[16/9] w-full rounded-[12px] overflow-hidden bg-[#000000] border border-white/10 mb-3 shrink-0">
        <Image
          src={noticia.coverImagePath || "/images/materias/ciclos-de-mercado/cover.webp"}
          alt={noticia.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized={Boolean(noticia.coverImagePath?.startsWith("data:"))}
        />
      </div>

      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div className="flex items-center space-x-2 text-[11px] text-[#AEB8C4]">
          <span className="font-bold text-[#168BFF] uppercase tracking-wider">
            {noticia.categoryName || noticia.category}
          </span>
          <span>•</span>
          <span>{formatDate(noticia.publishedAt)}</span>
        </div>

        <h3 className="font-outfit font-bold text-base md:text-lg text-[#F5F7FA] group-hover:text-[#3A91FF] transition-colors leading-snug line-clamp-2">
          {noticia.title}
        </h3>
      </div>
    </Link>
  );
}

