"use client";

import { useState } from "react";
import { LEARNING_PATHS } from "@/data/learning";
import LearningCard from "@/components/LearningCard";
import { GraduationCap } from "lucide-react";

export default function LearnPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("todos");

  const levels = [
    { slug: "todos", name: "Todos os Níveis" },
    { slug: "Iniciante", name: "Iniciante" },
    { slug: "Intermediário", name: "Intermediário" },
    { slug: "Avançado", name: "Avançado" },
  ];

  const filteredPaths = LEARNING_PATHS.filter((path) => {
    if (selectedLevel === "todos") return true;
    return path.level === selectedLevel;
  });

  return (
    <div className="min-h-screen bg-black text-[#F5F7FA] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <div className="p-6 md:p-10 rounded-2xl bg-[#0B0D10] border border-[#252A32] space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="h-4 w-4" />
            <span>Educação Financeira 100% Gratuita</span>
          </div>

          <h1 className="font-outfit font-extrabold text-3xl md:text-5xl text-[#F5F7FA] tracking-tight">
            Aprenda a Decidir com Autonomia
          </h1>

          <p className="text-sm md:text-base text-[#A7AFBA] max-w-3xl leading-relaxed">
            Trilhas organizadas passo a passo, desde o orçamento básico até a compreensão de juros compostos, alocação de investimentos e segurança digital. Conteúdo isento e totalmente focado no aprendizado.
          </p>
        </div>

        {/* Level Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2 border-b border-[#252A32]">
          <span className="text-xs text-[#A7AFBA] mr-2 shrink-0 font-medium">Nível de conhecimento:</span>
          {levels.map((lvl) => (
            <button
              key={lvl.slug}
              onClick={() => setSelectedLevel(lvl.slug)}
              className={`shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedLevel === lvl.slug
                  ? "bg-[#147BFF] text-white shadow-sm"
                  : "bg-[#0B0D10] text-[#A7AFBA] border border-[#252A32] hover:text-[#F5F7FA]"
              }`}
            >
              {lvl.name}
            </button>
          ))}
        </div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map((path) => (
            <LearningCard key={path.id} path={path} />
          ))}
        </div>
      </div>
    </div>
  );
}
