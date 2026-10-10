import FeaturedHomeSection from "@/components/FeaturedHomeSection";
import ForcesSection from "@/components/home/ForcesSection";
import DigitalDollarSection from "@/components/home/DigitalDollarSection";
import BitcoinSection from "@/components/home/BitcoinSection";
import MethodSection from "@/components/home/MethodSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-[#F5F7FA] selection:bg-[#147BFF] selection:text-white">
      {/* CAMADA FIXA DE FUNDO: MAPA-MÚNDI DOURADO EM COVER PREENCHENDO A TELA INTEIRA */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none bg-[#000000] bg-no-repeat bg-center bg-cover select-none"
        style={{ backgroundImage: "url('/backgrounds/world-map-gold.jpg')" }}
        aria-hidden="true"
      />
      {/* CAMADA ÚNICA DE ESCURECIMENTO: GRADIENTE HORIZONTAL SUAVE */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none select-none" 
        style={{
          background: "linear-gradient(to right, rgba(0, 0, 0, 0.84) 0%, rgba(0, 0, 0, 0.88) 20%, rgba(0, 0, 0, 0.92) 35%, rgba(0, 0, 0, 0.92) 65%, rgba(0, 0, 0, 0.88) 80%, rgba(0, 0, 0, 0.84) 100%)"
        }}
        aria-hidden="true" 
      />

      {/* CONTEÚDO DAS SEÇÕES DA HOME */}
      <div className="relative z-10 bg-transparent">
        {/* 1. SEÇÃO HERO: NOTÍCIAS E MATÉRIAS */}
        <FeaturedHomeSection />

        {/* 2. SEÇÃO: AS FORÇAS QUE MOVEM O DINHEIRO */}
        <ForcesSection />

        {/* 3. SEÇÃO: DÓLAR DIGITAL E INFRAESTRUTURA FINANCEIRA */}
        <DigitalDollarSection />

        {/* 4. SEÇÃO: BITCOIN E DESCENTRALIZAÇÃO */}
        <BitcoinSection />

        {/* 5. SEÇÃO: MÉTODO EDITORIAL HDZ */}
        <MethodSection />

        {/* 6. SEÇÃO: FECHAMENTO EDITORIAL HDZ FINANCE */}
        <FinalCtaSection />
      </div>
    </div>
  );
}

