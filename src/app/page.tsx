import FeaturedHomeSection from "@/components/FeaturedHomeSection";
import ForcesSection from "@/components/home/ForcesSection";
import DigitalDollarSection from "@/components/home/DigitalDollarSection";
import BitcoinSection from "@/components/home/BitcoinSection";
import MethodSection from "@/components/home/MethodSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#F5F7FA] selection:bg-[#147BFF] selection:text-white">
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
  );
}

