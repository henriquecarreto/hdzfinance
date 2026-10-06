"use client";

import { BOOK_CATEGORIES, BookCategory } from "@/data/books";

interface BookFiltersProps {
  activeCategory: BookCategory;
  onSelectCategory: (category: BookCategory) => void;
}

export default function BookFilters({ activeCategory, onSelectCategory }: BookFiltersProps) {
  return (
    <nav
      aria-label="Filtros por categoria da biblioteca"
      className="w-full overflow-x-auto scrollbar-none py-1"
    >
      <div
        role="tablist"
        aria-label="Categorias de recomendações de leitura"
        className="flex flex-wrap items-center gap-2 min-w-max md:min-w-0"
      >
        {BOOK_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold tracking-wide transition-all duration-180 focus-visible:outline-2 focus-visible:outline-[#147BFF] select-none ${
                isActive
                  ? "bg-[#F59A18] text-[#050607] border border-[#F59A18] shadow-sm font-extrabold"
                  : "bg-[#0D1117] text-[#9BA5B3] hover:text-[#F5F7FA] hover:bg-[#121720] border border-white/[0.08]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
