"use client";

import { useState } from "react";
import { Book, RECOMMENDED_BOOKS, BookCategory } from "@/data/books";
import BookFilters from "@/components/books/BookFilters";
import BookCard from "@/components/books/BookCard";

export default function ReadingRecommendationsClient() {
  const [activeCategory, setActiveCategory] = useState<BookCategory>("Todos");

  const filteredBooks = RECOMMENDED_BOOKS.filter((book) => {
    if (activeCategory === "Todos") return true;
    return book.category === activeCategory;
  });

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <BookFilters
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#0D1117] border border-white/[0.08] text-[#9BA5B3]">
          <p className="text-sm md:text-base font-medium">
            Nenhum livro encontrado para a categoria selecionada.
          </p>
        </div>
      )}
    </div>
  );
}
