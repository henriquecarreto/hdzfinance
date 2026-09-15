import Link from "next/link";
import Image from "next/image";
import { Compass, ArrowRight } from "lucide-react";
import FeaturedHomeSection from "@/components/FeaturedHomeSection";
import ForcesSection from "@/components/home/ForcesSection";
import DigitalDollarSection from "@/components/home/DigitalDollarSection";
import BitcoinSection from "@/components/home/BitcoinSection";
import GlobalMarketsSection from "@/components/home/GlobalMarketsSection";
import MethodSection from "@/components/home/MethodSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] selection:bg-[#147BFF] selection:text-white">
      {/* 1. SEÇÃO HERO: NOTÍCIAS E MATÉRIAS (EM DESTAQUE - PRESERVADO SEM ALTERAÇÕES) */}
      <FeaturedHomeSection />

      {/* 2. SEÇÃO: AS FORÇAS QUE MOVEM O DINHEIRO */}
      <ForcesSection />

      {/* 3. SEÇÃO: DÓLAR DIGITAL E INFRAESTRUTURA FINANCEIRA */}
      <DigitalDollarSection />

      {/* 4. SEÇÃO: BITCOIN E DESCENTRALIZAÇÃO (ÚNICA SEÇÃO DE BITCOIN NA PÁGINA) */}
      <BitcoinSection />

      {/* 5. SEÇÃO: MERCADOS GLOBAIS E TECNOLOGIA */}
      <GlobalMarketsSection />

      {/* 6. SEÇÃO: MÉTODO EDITORIAL HDZ */}
      <MethodSection />

      {/* 7. SEÇÃO: CHAMADA FINAL (APROVADA - PRESERVADA INTEGRALMENTE) */}
      <section className="final-cta-section py-24 md:py-32">
        {/* Background Image: Full visibility with localized central radial dark overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/backgrounds/hdz-final-money-evolution.jpg"
            alt="Evolução do dinheiro das moedas ao sistema digital global"
            fill
            aria-hidden="true"
            className="select-none object-cover object-center brightness-105 filter"
            sizes="100vw"
            priority
          />
        </div>

        <div className="final-cta-content max-w-[1100px] mx-auto px-6 md:px-8 text-center space-y-8">
          <span className="final-cta-eyebrow block">
            HDZ FINANCE
          </span>

          <h2 className="font-outfit font-extrabold text-[30px] sm:text-[38px] md:text-[46px] lg:text-[50px] max-w-[850px] mx-auto tracking-tight leading-[1.18]">
            Você não precisa prever o próximo movimento. Precisa entender as forças que podem provocá-lo.
          </h2>

          <div className="space-y-3.5 max-w-[740px] mx-auto">
            <p>
              Acompanhe notícias, matérias e conteúdos educacionais sobre economia, mercados, Bitcoin, dinheiro e tecnologia.
            </p>
            <p>
              Comece pelo assunto que mais desperta sua curiosidade e descubra como diferentes acontecimentos estão conectados.
            </p>
          </div>

          {/* 3 Action Buttons with refined hierarchy */}
          <div className="final-cta-actions">
            <Link
              href="/educacional/cursos"
              className="training-cta"
            >
              <span>Descobrir o treinamento</span>
              <Compass className="h-4 w-4 text-[#090B0E] shrink-0" aria-hidden="true" />
            </Link>

            <Link
              href="/noticias"
              className="news-cta"
            >
              <span>Acompanhar as notícias</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#F5F8FC] shrink-0" aria-hidden="true" />
            </Link>

            <Link
              href="/materias"
              className="articles-cta"
            >
              <span>Explorar matérias</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#F5F8FC] shrink-0" aria-hidden="true" />
            </Link>
          </div>

          <p className="final-cta-tagline pt-6">
            Informação para compreender. Conhecimento para decidir.
          </p>
        </div>
      </section>
    </div>
  );
}
