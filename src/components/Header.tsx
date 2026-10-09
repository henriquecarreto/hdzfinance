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

  const isTrainingPage = pathname === "/educacional/fundamentos-do-dinheiro-bitcoin-criptomoedas";
  const isComboPage =
    pathname === "/educacional/guia-visual-financas" ||
    pathname === "/educacional/combo-ebooks";

  if (isTrainingPage || isComboPage) {
    return (
      <header className="sticky top-0 z-50 w-full bg-[#0B1F3A] border-b border-[#0B1F3A] shadow-md">
        <div className="max-w-[1360px] mx-auto px-4 md:px-8 min-h-[52px] py-2 flex items-center justify-between relative">
          {/* Left Aligned HDZ Symbol Icon */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#E9991C] rounded-md p-0.5 shrink-0 z-10"
            aria-label="HDZ Finance - Página Inicial"
          >
            <div className="relative w-8 h-8 md:w-9 md:h-9 shrink-0 overflow-hidden">
              <Image
                src="/assets/hdz-symbol.png"
                alt="Símbolo HDZ Finance"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Centered Top Banner Message */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center text-center select-none z-0 px-2 max-w-[75vw]">
            <div className="flex flex-wrap items-center justify-center gap-x-1 text-[11px] md:text-[12px] font-outfit font-bold tracking-wide text-white leading-tight">
              {isComboPage ? (
                <span className="text-[#E9991C] font-extrabold">
                  📚 90 MAPAS MENTAIS SOBRE EDUCAÇÃO FINANCEIRA, INVESTIMENTOS E ECONOMIA.
                </span>
              ) : (
                <>
                  <span
                    style={{
                      color: "#FFFFFF",
                      WebkitTextFillColor: "#FFFFFF",
                      WebkitTextStroke: "0.5px #000000",
                      paintOrder: "stroke fill",
                    }}
                  >
                    ⚡ TREINAMENTO COMPLETO COM MAIS DE 4 HORAS DE VIDEOAULAS E TUTORIAIS.
                  </span>
                  <span
                    style={{
                      color: "#E9991C",
                      WebkitTextFillColor: "#E9991C",
                      WebkitTextStroke: "0.5px #000000",
                      paintOrder: "stroke fill",
                    }}
                  >
                    APROVEITE A OFERTA.
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Right Spacer for Flex Symmetry */}
          <div className="w-8 md:w-9 shrink-0 opacity-0 pointer-events-none" />
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
      <header className="relative w-full h-[74px] md:h-[76px] bg-[#000000] border-b border-white/[0.08]">
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
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-[16px]">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const isEducacional = link.isCommercial;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 font-semibold tracking-wide transition-colors duration-150 text-[16px] ${
                    isEducacional
                      ? active
                        ? "text-[#F59A18] font-bold"
                        : "text-[#F59A18] hover:text-[#FFAC36]"
                      : active
                      ? "text-[#FFB020] font-bold"
                      : "text-[#FFFFFF] hover:text-[#FFB020]"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                        isEducacional ? "bg-[#F59A18]" : "bg-[#FFB020]"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Aligned Search & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-[#FFFFFF] hover:text-[#FFB020] hover:bg-[#0D1117] transition-colors duration-150 text-[16px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#147BFF]"
              aria-label="Abrir pesquisa"
            >
              <Search className="h-4 w-4 text-[#147BFF] shrink-0" />
              <span className="hidden md:inline text-[16px] font-semibold text-[#FFFFFF] hover:text-[#FFB020] transition-colors duration-150">
                Buscar
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#FFFFFF] hover:text-[#FFB020] hover:bg-[#0D1117] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#147BFF]"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-[#FFFFFF]" />
              ) : (
                <Menu className="h-6 w-6 text-[#FFFFFF]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer (Positioned absolutely over top, z-[70]) */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-[74px] md:top-[76px] left-0 right-0 z-[70] border-b border-white/[0.08] bg-[#000000] px-5 py-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const isEducacional = link.isCommercial;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-[16px] transition-colors duration-150 ${
                      isEducacional
                        ? active
                          ? "text-[#F59A18] font-bold bg-[#F59A18]/10 border-l-2 border-[#F59A18]"
                          : "text-[#F59A18] font-semibold hover:text-[#FFAC36] hover:bg-[#F59A18]/10"
                        : active
                        ? "text-[#FFB020] font-bold bg-[#0D1117] border-l-2 border-[#FFB020]"
                        : "text-[#FFFFFF] font-semibold hover:text-[#FFB020] hover:bg-[#0D1117]"
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
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[16px] font-semibold text-[#FFFFFF] hover:text-[#FFB020] hover:bg-[#0D1117] text-left transition-colors duration-150"
              >
                <Search className="h-5 w-5 text-[#147BFF] shrink-0" />
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
