"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import SearchDialog from "./SearchDialog";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  if (pathname === "/educacional/fundamentos-do-dinheiro-bitcoin-criptomoedas") {
    return (
      <header className="relative w-full">
        {/* Top Special Offer Bar (Dark Navy Blue) */}
        <div className="w-full bg-[#0B2545] text-white py-2.5 px-4 text-center text-xs md:text-sm font-extrabold tracking-wide flex items-center justify-center gap-2 select-none border-b border-[#1E3A5F]">
          <span className="text-[#FFC05A] text-sm md:text-base">⚡</span>
          <span className="uppercase tracking-wider">OFERTA ESPECIAL DISPONÍVEL APENAS HOJE</span>
        </div>

        {/* Off-White Logo Header */}
        <div className="w-full h-[74px] md:h-[76px] bg-[#FAF7F2] border-b border-[#E2E8F0]">
          <div className="max-w-[1360px] mx-auto px-5 md:px-8 h-full flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#F59A18] rounded-md p-1"
              aria-label="HDZ Finance - Página Inicial"
            >
              <div className="relative w-9 h-9 md:w-[40px] md:h-[40px] shrink-0 overflow-hidden">
                <Image
                  src="/assets/hdz-symbol.png"
                  alt="Símbolo HDZ Finance"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // Sequence: 1. Notícias (/noticias), 2. Matérias (/materias), 3. Mercados (/mercados), 4. Sobre (/sobre), 5. Educacional (/educacional)
  const navLinks = [
    { name: "Notícias", href: "/noticias", isCommercial: false },
    { name: "Matérias", href: "/materias", isCommercial: false },
    { name: "Mercados", href: "/mercados", isCommercial: false },
    { name: "Sobre", href: "/sobre", isCommercial: false },
    { name: "Educacional", href: "/educacional", isCommercial: true },
  ];

  const isActive = (href: string) => {
    if (href === "/noticias") {
      return pathname === "/noticias" || pathname.startsWith("/noticias/");
    }
    if (href === "/materias") {
      return pathname.startsWith("/materias") || pathname.startsWith("/analises");
    }
    if (href === "/educacional") {
      return pathname.startsWith("/educacional") || pathname.startsWith("/cursos-e-guias") || pathname.startsWith("/aprenda");
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="relative w-full h-[74px] md:h-[76px] bg-[#050607] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 h-full flex items-center justify-between">
          {/* Logo (Points to Homepage /) */}
          <Link
            href="/"
            className="flex items-center space-x-3.5 group focus:outline-none focus:ring-2 focus:ring-[#147BFF] rounded-md p-1"
            aria-label="HDZ Finance - Página Inicial"
          >
            <div className="relative w-9 h-9 md:w-[40px] md:h-[40px] shrink-0 overflow-hidden">
              <Image
                src="/assets/hdz-symbol.png"
                alt="Símbolo HDZ Finance"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-outfit font-extrabold text-xl md:text-2xl tracking-tight select-none">
              <span className="text-[#FFFFFF]">HDZ</span>{" "}
              <span className="text-[#F59A18]">FINANCE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-[14px]">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 font-medium tracking-wide transition-colors duration-150 text-[14px] ${
                    link.isCommercial
                      ? active
                        ? "text-[#F59A18] font-semibold"
                        : "text-[#F59A18] hover:text-[#FFAC36]"
                      : active
                      ? "text-[#F5F7FA] font-semibold"
                      : "text-[#9BA5B3] hover:text-[#147BFF]"
                  }`}
                >
                  {link.name}
                  {active && !link.isCommercial && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#147BFF] rounded-full" />
                  )}
                  {active && link.isCommercial && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F59A18] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Aligned Search & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-[#9BA5B3] hover:text-[#F5F7FA] hover:bg-[#0D1117] transition-all text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#147BFF]"
              aria-label="Abrir pesquisa"
            >
              <Search className="h-4 w-4 text-[#147BFF]" />
              <span className="hidden md:inline text-[13px] text-[#9BA5B3] hover:text-[#F5F7FA]">
                Buscar
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#9BA5B3] hover:text-[#F5F7FA] hover:bg-[#0D1117] transition-all focus:outline-none focus:ring-2 focus:ring-[#147BFF]"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-[#F5F7FA]" />
              ) : (
                <Menu className="h-6 w-6 text-[#F5F7FA]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer (Positioned absolutely over top, z-[70]) */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-[74px] md:top-[76px] left-0 right-0 z-[70] border-b border-white/[0.08] bg-[#080A0D] px-5 py-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      link.isCommercial
                        ? "text-[#F59A18] bg-[#F59A18]/10 hover:bg-[#F59A18]/20"
                        : active
                        ? "text-[#F5F7FA] bg-[#0D1117] border-l-2 border-[#147BFF]"
                        : "text-[#9BA5B3] hover:text-[#F5F7FA] hover:bg-[#0D1117]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-[#9BA5B3] hover:text-[#F5F7FA] hover:bg-[#0D1117] text-left"
              >
                <Search className="h-5 w-5 text-[#147BFF]" />
                <span>Buscar</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
