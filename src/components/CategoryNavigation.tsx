"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORY_LIST } from "@/data/categories";

export default function CategoryNavigation() {
  const pathname = usePathname();

  const allCategories = [
    { slug: "ultimas", name: "Últimas", href: "/" },
    ...CATEGORY_LIST.map((cat) => ({
      slug: cat.slug,
      name: cat.name,
      href: `/categoria/${cat.slug}`,
    })),
  ];

  return (
    <div className="w-full bg-[#050607] border-b border-white/[0.08]">
      <div className="max-w-[1360px] mx-auto px-5 md:px-8">
        <div className="flex items-center space-x-6 md:space-x-8 overflow-x-auto scrollbar-none py-3.5 text-xs md:text-sm font-medium">
          {allCategories.map((cat, idx) => {
            const isActive =
              cat.href === "/"
                ? pathname === "/"
                : pathname === cat.href || pathname.startsWith(`${cat.href}/`);

            return (
              <div key={cat.slug} className="flex items-center shrink-0">
                {idx > 0 && (
                  <span className="text-white/20 select-none mr-6 md:mr-8">•</span>
                )}
                <Link
                  href={cat.href}
                  className={`relative py-1 transition-colors duration-150 tracking-wide ${
                    isActive
                      ? "text-[#F5F7FA] font-semibold"
                      : "text-[#9BA5B3] hover:text-[#147BFF]"
                  }`}
                >
                  {cat.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#147BFF] rounded-full" />
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
