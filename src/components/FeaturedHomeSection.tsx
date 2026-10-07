"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { cmsStore, CMSContentItem } from "@/lib/cms-store";
import { ANALYSES } from "@/data/analyses";

export default function FeaturedHomeSection() {
  const [mainMateria, setMainMateria] = useState<CMSContentItem | null>(null);
  const [publishedNoticias, setPublishedNoticias] = useState<CMSContentItem[]>([]);

  useEffect(() => {
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

    // Fallback to ANALYSES[0] if cmsStore has no published materias yet
    if (!selectedMateria && ANALYSES.length > 0) {
      const firstAnalysis = ANALYSES[0];
      selectedMateria = {
        id: firstAnalysis.id,
        type: "materia",
        status: "published",
        title: firstAnalysis.title,
        subtitle: firstAnalysis.subtitle,
        excerpt: firstAnalysis.subtitle,
        slug: firstAnalysis.slug,
        bodyHtml: "",
        category: firstAnalysis.category,
        categoryName: firstAnalysis.categoryName,
        tags: [],
        authorName: "Produção HDZ Finance",
        coverImagePath: firstAnalysis.coverImage,
        featured: true,
        featuredOrder: 1,
        publishedAt: firstAnalysis.publishDate,
        createdAt: firstAnalysis.publishDate,
        updatedAt: firstAnalysis.publishDate,
      };
    }

    setMainMateria(selectedMateria);

    // 2. Fetch published Notícias ONLY (strictly type === "noticia" & status === "published")
    const noticias = cmsStore
      .getItems("noticia")
      .filter((item) => item.status === "published")
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 2);

    setPublishedNoticias(noticias);
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
    <section className="relative isolate overflow-hidden pt-8 md:pt-12 pb-20 md:pb-24 border-b border-white/[0.08] bg-[#050607]">
      {/* Background Image Layer (Old Site Style: hero-bg.png) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/backgrounds/hero-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[70%_top] md:object-center opacity-30 brightness-110 saturate-[1.1]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050607]/70 via-[#050607]/40 to-[#050607]/90" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8 space-y-6">
        {/* Header Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
          {/* Left Group: EM DESTAQUE label + VER TODAS AS MATÉRIAS button */}
          <div className="flex items-center space-x-3 flex-wrap gap-y-2">
            <span className="featured-label min-h-[42px] px-4 inline-flex items-center border border-[#168BFF]/60 rounded-[9px] bg-[#071422]/90 text-[#42A5FF] text-[12px] font-extrabold tracking-[0.09em] uppercase cursor-default select-none">
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
              className="all-news-button min-h-[42px] px-5 inline-flex items-center justify-center gap-2 border border-[#168BFF]/60 rounded-[9px] bg-gradient-to-r from-[#0B1F33]/98 to-[#07121F]/98 text-[#F5F8FC] text-[12px] font-extrabold tracking-[0.05em] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_8px_22px_rgba(0,0,0,0.28)] hover:-translate-y-[2px] hover:border-[#46A9FF] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_12px_26px_rgba(22,139,255,0.18)] transition-all duration-200"
            >
              <span>VER TODAS AS NOTÍCIAS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#168BFF]" />
            </Link>
          </div>
        </div>

        {/* Featured Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Main Featured Matéria Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col min-w-0 h-full">
            <Link
              href={`/materias/${mainMateria.slug}`}
              className="featured-main-card relative flex flex-col justify-end w-full h-full min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] rounded-[18px] overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#168BFF] shadow-2xl border border-white/10"
            >
              {/* Background Cover Image filling 100% of card bounds */}
              <Image
                src={mainMateria.coverImagePath || "/images/materias/ciclos-de-mercado/cover.webp"}
                alt={mainMateria.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                priority
              />

              {/* Full height gradient overlay for crisp text readability */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(3, 6, 9, 0.05) 0%, rgba(3, 6, 9, 0.20) 35%, rgba(3, 6, 9, 0.70) 70%, rgba(3, 6, 9, 0.96) 100%)",
                }}
              />

              {/* Bottom Anchored Editorial Content */}
              <div className="relative z-20 p-6 md:p-10 space-y-4">
                <div className="flex items-center space-x-3 text-xs text-[#AEB8C4] flex-wrap gap-y-1">
                  <span className="px-3 py-1 rounded-md font-bold uppercase tracking-wider bg-[#168BFF] text-white text-[11px]">
                    {mainMateria.categoryName || mainMateria.category}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-[#168BFF]" />
                    {formatDate(mainMateria.publishedAt)}
                  </span>
                </div>

                <h2
                  className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white leading-[1.1] tracking-tight group-hover:text-[#3A91FF] transition-colors"
                  style={{
                    textShadow: "0 3px 14px rgba(0, 0, 0, 0.88), 0 1px 3px rgba(0, 0, 0, 0.75)",
                  }}
                >
                  {mainMateria.title}
                </h2>

                {(mainMateria.subtitle || mainMateria.excerpt) && (
                  <p
                    className="text-sm md:text-base lg:text-[16px] text-[#DCE3EB] leading-[1.6] line-clamp-3 max-w-3xl font-normal"
                    style={{
                      textShadow: "0 2px 10px rgba(0, 0, 0, 0.92)",
                    }}
                  >
                    {mainMateria.subtitle || mainMateria.excerpt}
                  </p>
                )}
              </div>
            </Link>
          </div>

          {/* Right Side Column (4 cols): 2 News Cards or Discrete Empty Placeholders */}
          <div className="lg:col-span-4 flex flex-col gap-6 min-w-0 h-full justify-between">
            {[0, 1].map((slotIdx) => {
              const noticia = publishedNoticias[slotIdx];

              if (noticia) {
                return (
                  <Link
                    key={noticia.id}
                    href={`/noticias/${noticia.slug}`}
                    className="flex-1 group relative flex flex-col justify-between p-5 rounded-[18px] bg-[#0E131A] border border-white/10 hover:border-[#168BFF]/50 transition-all duration-300 shadow-xl overflow-hidden min-h-[250px]"
                  >
                    <div className="relative aspect-[16/9] w-full rounded-[12px] overflow-hidden bg-[#050709] border border-white/10 mb-3 shrink-0">
                      <Image
                        src={noticia.coverImagePath || "/images/materias/ciclos-de-mercado/cover.webp"}
                        alt={noticia.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
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

              return (
                <div
                  key={`empty-news-slot-${slotIdx}`}
                  aria-hidden="true"
                  className="news-empty-slot flex-1 w-full min-h-[250px] rounded-[18px] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_16px_34px_rgba(0,0,0,0.24)] pointer-events-none select-none transition-all duration-300"
                  style={{
                    background: "linear-gradient(145deg, rgba(14, 19, 26, 0.72), rgba(6, 9, 13, 0.92))",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
