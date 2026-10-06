import Image from "next/image";
import { ExternalLink, BookOpen } from "lucide-react";
import { Book } from "@/data/books";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="bg-[#0D1117] border border-white/[0.08] hover:border-[#F59A18]/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-md hover:shadow-xl group">
      <div className="space-y-4 flex-1 flex flex-col">
        {/* Cover Image Area - Uniform height, centered, object-contain */}
        <div className="relative w-full h-64 md:h-72 rounded-xl overflow-hidden bg-[#080B10] border border-white/[0.06] flex items-center justify-center p-4 shrink-0">
          {book.image ? (
            <Image
              src={book.image}
              alt={`Capa do livro ${book.title} — ${book.author}`}
              fill
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F59A18]/10 border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18]">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-[#9BA5B3] max-w-[160px] line-clamp-2">
                {book.title}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="space-y-2 flex-1 flex flex-col">
          {/* Category Tag */}
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
              {book.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-outfit font-bold text-base md:text-lg text-[#F5F7FA] leading-snug line-clamp-2 min-h-[2.75rem]">
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-xs text-[#9BA5B3] font-medium">
            {book.author}
          </p>

          {/* Description */}
          <p className="text-xs text-[#9BA5B3]/80 leading-relaxed line-clamp-3 min-h-[3.375rem]">
            {book.description}
          </p>
        </div>
      </div>

      {/* Action Button - Only button is clickable */}
      <div className="pt-4 mt-auto">
        <a
          href={book.purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="product-card-action group/btn inline-flex items-center justify-center space-x-2 text-xs md:text-sm font-bold w-full focus-visible:outline-2 focus-visible:outline-[#147BFF]"
          aria-label={`Comprar o livro ${book.title} em nova aba`}
        >
          <span>COMPRAR LIVRO</span>
          <ExternalLink className="w-3.5 h-3.5 ml-1 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </article>
  );
}
