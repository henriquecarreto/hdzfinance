import Link from "next/link";
import Image from "next/image";
import { AnalysisArticle } from "@/types";
import { Clock, ArrowRight } from "lucide-react";

interface AnalysisCardProps {
  analysis: AnalysisArticle;
}

export default function AnalysisCard({ analysis }: AnalysisCardProps) {
  return (
    <Link
      href={`/materias/${analysis.slug}`}
      className="flex flex-col rounded-2xl bg-[#0D1117] hover:bg-[#121720] border border-white/[0.08] hover:border-[#147BFF]/40 transition-all duration-300 overflow-hidden group h-full justify-between"
    >
      <div className="space-y-4">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#050607]">
          <Image
            src={analysis.coverImage}
            alt={analysis.coverAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#147BFF] text-white">
              Análise HDZ
            </span>
          </div>
        </div>

        <div className="p-6 pt-2 space-y-3">
          <div className="flex items-center space-x-2 text-xs text-[#9BA5B3]">
            <span>Por {analysis.author.name}</span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-[#147BFF]" />
              {analysis.readTimeMinutes} min de leitura
            </span>
          </div>

          <h3 className="font-outfit font-extrabold text-lg md:text-xl text-[#F5F7FA] group-hover:text-[#3A91FF] transition-colors leading-snug">
            {analysis.title}
          </h3>

          <p className="text-xs md:text-sm text-[#9BA5B3] line-clamp-3 leading-relaxed font-normal">
            {analysis.subtitle}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold text-[#147BFF] group-hover:text-[#3A91FF]">
          <span>Ler análise completa</span>
          <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
