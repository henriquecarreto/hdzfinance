import Link from "next/link";
import Image from "next/image";
import { YoutubeIcon, InstagramIcon } from "./SocialIcons";

type SocialLinkItem = {
  label: string;
  handle?: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

const socialLinks: Record<string, SocialLinkItem> = {
  instagram: {
    label: "Instagram",
    handle: "@hdzfinance",
    url: "https://instagram.com/hdzfinance",
    icon: InstagramIcon,
  },
  youtube: {
    label: "YouTube",
    url: "https://youtube.com/@hdzfinance",
    icon: YoutubeIcon,
  },
};

export default function Footer() {
  return (
    <footer className="bg-[#050607] text-[#F5F7FA] relative border-t border-white/[0.08]">
      <div className="w-full pt-12 md:pt-14 pb-6 md:pb-8 space-y-8 md:space-y-10">
        {/* Top 4-Column Grid: 1. Marca, 2. Conteúdo, 3. Institucional, 4. Educacional */}
        <div className="w-[calc(100%-48px)] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(260px,1.35fr)_repeat(3,minmax(160px,1fr))] gap-y-10 gap-x-10 lg:gap-x-14 items-start">
          {/* COLUNA 1 — MARCA */}
          <div className="space-y-4 text-left">
            <Link
              href="/"
              className="inline-flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-[#147BFF] rounded-md p-1"
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

            <p className="font-sans font-medium text-[15px] text-[#F5F7FA] leading-snug">
              Informação para entender. Educação para decidir.
            </p>

            <p className="text-[14px] text-[#A7AFBA] leading-[1.6] max-w-sm font-normal">
              Notícias, matérias e educação financeira para compreender economia, mercados, tecnologia e dinheiro com mais clareza.
            </p>
          </div>

          {/* COLUNA 2 — CONTEÚDO */}
          <div className="space-y-4 text-left">
            <h4 className="font-outfit font-bold text-[13px] uppercase tracking-[0.04em] text-[#F59A18]">
              CONTEÚDO
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/noticias"
                  className="text-[15px] text-[#A7AFBA] hover:text-[#147BFF] transition-colors leading-[1.9] block font-medium"
                >
                  Notícias
                </Link>
              </li>
              <li>
                <Link
                  href="/materias"
                  className="text-[15px] text-[#A7AFBA] hover:text-[#147BFF] transition-colors leading-[1.9] block font-medium"
                >
                  Matérias
                </Link>
              </li>
              <li>
                <Link
                  href="/mercados"
                  className="text-[15px] text-[#A7AFBA] hover:text-[#147BFF] transition-colors leading-[1.9] block font-medium"
                >
                  Mercados
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-[15px] text-[#A7AFBA] hover:text-[#147BFF] transition-colors leading-[1.9] block font-medium"
                >
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 3 — INSTITUCIONAL */}
          <div className="space-y-4 text-left">
            <h4 className="font-outfit font-bold text-[13px] uppercase tracking-[0.04em] text-[#F59A18]">
              INSTITUCIONAL
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contato"
                  className="text-[15px] text-[#A7AFBA] hover:text-[#147BFF] transition-colors leading-[1.9] block font-medium"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-editorial"
                  className="text-[15px] text-[#A7AFBA] hover:text-[#147BFF] transition-colors leading-[1.9] block font-medium"
                >
                  Política Editorial
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="text-[15px] text-[#A7AFBA] hover:text-[#147BFF] transition-colors leading-[1.9] block font-medium"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-[15px] text-[#A7AFBA] hover:text-[#147BFF] transition-colors leading-[1.9] block font-medium"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/aviso-legal"
                  className="text-[15px] text-[#A7AFBA] hover:text-[#147BFF] transition-colors leading-[1.9] block font-medium"
                >
                  Aviso Legal
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 4 — EDUCACIONAL + REDES SOCIAIS */}
          <div className="space-y-4 text-left">
            <h4 className="font-outfit font-bold text-[13px] uppercase tracking-[0.04em] text-[#F59A18]">
              EDUCACIONAL
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/educacional/cursos"
                  className="text-[15px] text-[#A7AFBA] hover:text-[#147BFF] transition-colors leading-[1.9] block font-medium"
                >
                  Cursos
                </Link>
              </li>
              <li>
                <Link
                  href="/educacional/ebooks"
                  className="text-[15px] text-[#A7AFBA] hover:text-[#147BFF] transition-colors leading-[1.9] block font-medium"
                >
                  E-books
                </Link>
              </li>
            </ul>

            {/* REDES SOCIAIS Section below E-books */}
            <div className="pt-3 md:pt-4">
              <h4 className="font-outfit font-bold text-[13px] uppercase tracking-[0.04em] text-[#F59A18] mb-3">
                REDES SOCIAIS
              </h4>
              <div className="flex flex-col space-y-2">
                {Object.entries(socialLinks).map(([key, item]) => {
                  if (!item.url || item.url.trim() === "") return null;
                  const IconComponent = item.icon;
                  const isInstagram = key === "instagram";

                  return (
                    <a
                      key={key}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Siga a HDZ Finance no ${item.label}`}
                      className="min-h-[38px] px-3 rounded-lg bg-[#0D1117] hover:bg-[#121720] border border-white/[0.06] hover:border-[#147BFF]/40 text-[#F5F7FA] hover:text-[#147BFF] transition-all flex items-center space-x-2.5 text-[13.5px] md:text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-[#147BFF] w-full"
                    >
                      <IconComponent className="h-[18px] w-[18px] text-[#147BFF] shrink-0" />
                      <span>
                        {item.label}
                        {isInstagram && item.handle && (
                          <span className="text-[#A7AFBA] font-normal ml-1">
                            — {item.handle}
                          </span>
                        )}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-[calc(100%-48px)] max-w-[1200px] mx-auto h-[1px] bg-white/[0.08] mt-8" />

        {/* Centralized & White/Bold Legal Notice & Copyright Area */}
        <div className="w-[calc(100%-48px)] max-w-[1100px] mx-auto text-center space-y-3 py-4 md:py-6">
          <p className="text-[13px] font-bold text-[#FFFFFF] tracking-wide text-center">
            © 2026 HDZ Finance. Todos os direitos reservados.
          </p>

          <p className="text-[13px] md:text-[14px] text-[#FFFFFF] font-bold leading-[1.6] text-center max-w-[1100px] mx-auto">
            Aviso legal: Os conteúdos da HDZ Finance possuem finalidade exclusivamente informativa e educacional e não constituem oferta, recomendação ou solicitação de compra ou venda de ativos, nem aconselhamento financeiro. Investimentos envolvem riscos. O tratamento de dados pessoais segue a{" "}
            <Link
              href="/privacidade"
              className="text-[#FFFFFF] font-bold underline underline-offset-3 hover:text-[#F59A18] transition-colors"
            >
              Política de Privacidade
            </Link>{" "}
            e a Lei nº 13.709/2018 (LGPD).{" "}
            <Link
              href="/aviso-legal"
              className="text-[#FFFFFF] font-bold underline underline-offset-3 hover:text-[#F59A18] transition-colors ml-1"
            >
              Consulte o Aviso Legal
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
