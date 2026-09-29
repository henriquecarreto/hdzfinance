"use client";

import Link from "next/link";
import Image from "next/image";
import { YoutubeIcon, InstagramIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-[#F5F7FA] relative py-10 md:py-12">
      <div className="w-[calc(100%-48px)] max-w-[1200px] mx-auto space-y-8 md:space-y-10">
        {/* Top 4-Column Grid: 1. Marca, 2. Conteúdo, 3. Institucional, 4. Educacional e redes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 items-start">
          {/* GROUP 1 — MARCA */}
          <div className="space-y-3.5 text-left">
            <Link
              href="/"
              className="inline-flex items-center space-x-3 group focus:outline-none focus:ring-1 focus:ring-[#147BFF] rounded p-0.5"
              aria-label="HDZ Finance - Página Inicial"
            >
              <div className="relative w-9 h-9 md:w-[38px] md:h-[38px] shrink-0 overflow-hidden">
                <Image
                  src="/assets/hdz-symbol.png"
                  alt="Símbolo HDZ Finance"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-outfit font-extrabold text-[22px] md:text-[24px] tracking-tight select-none">
                <span className="text-[#FFFFFF]">HDZ</span>{" "}
                <span className="text-[#F59A18]">FINANCE</span>
              </span>
            </Link>

            <p className="font-sans font-normal text-[14px] md:text-[15px] text-[#C8D2DD] leading-relaxed max-w-xs">
              Informação para entender. Educação para decidir.
            </p>
          </div>

          {/* GROUP 2 — CONTEÚDO */}
          <div className="space-y-3.5 text-left">
            <h4 className="font-outfit font-bold text-[13px] uppercase tracking-[0.05em] text-[#F59A18]">
              CONTEÚDO
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/noticias"
                  className="text-[14px] text-[#C8D2DD] hover:text-[#FFFFFF] focus:text-[#FFFFFF] transition-colors inline-block font-normal"
                >
                  Notícias
                </Link>
              </li>
              <li>
                <Link
                  href="/materias"
                  className="text-[14px] text-[#C8D2DD] hover:text-[#FFFFFF] focus:text-[#FFFFFF] transition-colors inline-block font-normal"
                >
                  Matérias
                </Link>
              </li>
              <li>
                <Link
                  href="/mercados"
                  className="text-[14px] text-[#C8D2DD] hover:text-[#FFFFFF] focus:text-[#FFFFFF] transition-colors inline-block font-normal"
                >
                  Mercados
                </Link>
              </li>
            </ul>
          </div>

          {/* GROUP 3 — INSTITUCIONAL */}
          <div className="space-y-3.5 text-left">
            <h4 className="font-outfit font-bold text-[13px] uppercase tracking-[0.05em] text-[#F59A18]">
              INSTITUCIONAL
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/sobre"
                  className="text-[14px] text-[#C8D2DD] hover:text-[#FFFFFF] focus:text-[#FFFFFF] transition-colors inline-block font-normal"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-[14px] text-[#C8D2DD] hover:text-[#FFFFFF] focus:text-[#FFFFFF] transition-colors inline-block font-normal"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/diretrizes"
                  className="text-[14px] text-[#C8D2DD] hover:text-[#FFFFFF] focus:text-[#FFFFFF] transition-colors inline-block font-normal"
                >
                  Diretrizes
                </Link>
              </li>
            </ul>
          </div>

          {/* GROUP 4 — EDUCACIONAL E REDES */}
          <div className="space-y-3.5 text-left">
            <h4 className="font-outfit font-bold text-[13px] uppercase tracking-[0.05em] text-[#F59A18]">
              EDUCACIONAL E REDES
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/educacional/cursos"
                  className="text-[14px] text-[#C8D2DD] hover:text-[#FFFFFF] focus:text-[#FFFFFF] transition-colors inline-block font-normal"
                >
                  Cursos
                </Link>
              </li>
              <li>
                <Link
                  href="/educacional/ebooks"
                  className="text-[14px] text-[#C8D2DD] hover:text-[#FFFFFF] focus:text-[#FFFFFF] transition-colors inline-block font-normal"
                >
                  E-books
                </Link>
              </li>
            </ul>

            {/* Redes sociais compactas na mesma linha */}
            <div className="flex items-center space-x-4 pt-1">
              <a
                href="https://instagram.com/hdzfinance"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da HDZ Finance"
                className="inline-flex items-center space-x-1.5 text-[14px] text-[#C8D2DD] hover:text-[#FFFFFF] focus:text-[#FFFFFF] transition-colors font-normal group"
              >
                <InstagramIcon className="w-4 h-4 text-[#C8D2DD] group-hover:text-[#FFFFFF] transition-colors shrink-0" />
                <span>Instagram</span>
              </a>
              <a
                href="https://youtube.com/@hdzfinance"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube da HDZ Finance"
                className="inline-flex items-center space-x-1.5 text-[14px] text-[#C8D2DD] hover:text-[#FFFFFF] focus:text-[#FFFFFF] transition-colors font-normal group"
              >
                <YoutubeIcon className="w-4 h-4 text-[#C8D2DD] group-hover:text-[#FFFFFF] transition-colors shrink-0" />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean Copyright, single placement */}
        <div className="pt-4 md:pt-6 text-[13px] md:text-[14px] text-[#9EAAB8] text-left">
          <p>© 2026 HDZ Finance. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
