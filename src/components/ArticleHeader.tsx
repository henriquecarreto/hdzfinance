"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { Calendar, Share2, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ArticleHeaderProps {
  article: Article;
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <header className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav
        aria-label="Navegação em migalhas de pão"
        className="flex items-center space-x-2 text-xs text-[#A7AFBA]"
      >
        <Link
          href={article.type === "materia" ? "/materias" : "/noticias"}
          className="hover:text-[#147BFF] transition-colors"
        >
          {article.type === "materia" ? "Matérias" : "Notícias"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#252A32]" />
        <Link
          href={`/categoria/${article.category}`}
          className="hover:text-[#147BFF] transition-colors uppercase font-semibold text-[#147BFF]"
        >
          {article.categoryName}
        </Link>
      </nav>

      {/* Category Badge */}
      <div>
        <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#147BFF] text-white">
          {article.categoryName}
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <h1 className="font-outfit font-extrabold text-3xl md:text-4xl lg:text-5xl text-[#F5F7FA] leading-tight">
        {article.title}
      </h1>

      <p className="text-lg md:text-xl text-[#A7AFBA] leading-relaxed font-normal">
        {article.subtitle}
      </p>

      {/* Author & Metadata Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-[#252A32] text-xs text-[#A7AFBA]">
        <div>
          <span className="font-semibold text-[#F5F7FA] block text-sm">
            Produção HDZ Finance
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3.5 w-3.5 text-[#147BFF]" />
            <span>Publicado em {formatDate(article.publishDate)}</span>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#0B0D10] border border-[#252A32] hover:border-[#147BFF] text-[#F5F7FA] transition-all focus:outline-none focus:ring-2 focus:ring-[#147BFF]"
            aria-label="Compartilhar matéria"
          >
            <Share2 className="h-3.5 w-3.5 text-[#147BFF]" />
            <span>{copied ? "Link Copiado!" : "Compartilhar"}</span>
          </button>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#11151A] border border-[#252A32]">
        <Image
          src={article.coverImage}
          alt={article.coverAlt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </header>
  );
}
