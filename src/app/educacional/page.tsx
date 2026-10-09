import Image from "next/image";
import { EDUCATIONAL_PRODUCTS } from "@/data/products";
import EducationalProductCard from "@/components/EducationalProductCard";
import { Sparkles, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos Educacionais | HDZ Finance",
  description: "Treinamentos, guias visuais e recomendações de leitura desenvolvidos pela equipe HDZ Finance.",
};

export default function EducacionalPage() {
  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-8 md:py-14 font-sans antialiased">
      <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-10">
        
        {/* Header Hero Banner */}
        <div className="relative isolate overflow-hidden p-6 md:p-10 rounded-2xl bg-[#0D1117] border border-[#FFB020]/30 shadow-xl">
          {/* Fundo com imagem + gradiente escuro sobreposto */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <Image
              src="/backgrounds/training-bg.png"
              alt=""
              fill
              aria-hidden="true"
              className="select-none object-cover object-right opacity-60 brightness-110 saturate-[1.1]"
              priority
              sizes="100vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(5, 10, 18, 0.94) 0%, rgba(5, 10, 18, 0.84) 65%, rgba(5, 10, 18, 0.72) 100%)",
              }}
            />
          </div>

          <div className="relative z-10 space-y-5 max-w-4xl">
            {/* Etiqueta Superior */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#FFB020]/10 text-[#FFB020] border border-[#FFB020]/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-[#FFB020]" />
              <span>📚 CONTEÚDOS EDUCACIONAIS HDZ FINANCE</span>
            </div>

            {/* Título Principal */}
            <h1 className="font-outfit font-extrabold text-[28px] md:text-[40px] leading-[1.15] tracking-tight">
              <span className="text-[#FFFFFF]">Pare de decidir no escuro.<br className="hidden sm:block" /> </span>
              <span className="text-[#FFB020]">Entenda seu dinheiro </span>
              <span className="text-[#FFFFFF]">e invista com mais consciência.</span>
            </h1>

            {/* Texto explicativo */}
            <p className="text-[16px] md:text-[18px] text-[#F1F5F9] font-medium leading-[1.55] max-w-3xl">
              Entenda como os <strong className="font-bold text-[#FFB020]">juros</strong> pesam no seu bolso, como a <strong className="font-bold text-[#FFB020]">inflação</strong> reduz seu poder de compra e como os <strong className="font-bold text-[#FFB020]">investimentos</strong> funcionam. Explore nossos guias visuais em PDF, o treinamento sobre dinheiro, Bitcoin e criptomoedas e as recomendações de leitura da HDZ Finance.
            </p>

            {/* Pequenos destaques (2 linhas) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1 text-[14px] md:text-[15px] text-[#FFFFFF] font-semibold">
              <div className="flex items-center">
                <CheckCircle2 className="h-4.5 w-4.5 mr-2 text-[#00A859] shrink-0" />
                <span>Educação financeira, economia e investimentos.</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-4.5 w-4.5 mr-2 text-[#00A859] shrink-0" />
                <span>Bitcoin, criptomoedas e fundamentos dos ativos digitais.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean 3 Educational Products Grid */}
        <div className="educational-products-grid">
          {EDUCATIONAL_PRODUCTS.map((product) => (
            <EducationalProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

