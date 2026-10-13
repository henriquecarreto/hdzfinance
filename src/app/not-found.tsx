import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#07090C] text-[#F5F7FA] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0F141C] border border-[#252A32] text-[#147BFF]">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="font-outfit font-extrabold text-3xl md:text-4xl text-[#F5F7FA]">
          Página não encontrada
        </h1>
        <p className="text-sm md:text-base text-[#9BA5B3] leading-relaxed">
          O conteúdo que você tentou acessar não foi encontrado ou mudou de endereço.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#147BFF] hover:bg-[#3A91FF] text-white text-sm font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o Início
          </Link>
        </div>
      </div>
    </main>
  );
}
