import Link from "next/link";
import { LearningPath } from "@/types";
import { Clock, BookOpen, ArrowRight, Compass, PieChart, TrendingUp, Layers, ShieldCheck, AlertTriangle } from "lucide-react";

interface LearningCardProps {
  path: LearningPath;
}

const iconMap: Record<string, React.ElementType> = {
  Compass,
  PieChart,
  TrendingUp,
  Layers,
  ShieldCheck,
  AlertTriangle,
};

export default function LearningCard({ path }: LearningCardProps) {
  const IconComponent = iconMap[path.iconName] || BookOpen;

  const levelColor =
    path.level === "Iniciante"
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : path.level === "Intermediário"
      ? "bg-[#147BFF]/10 text-[#147BFF] border-[#147BFF]/20"
      : "bg-purple-500/10 text-purple-400 border-purple-500/20";

  return (
    <Link
      href={`/aprenda/${path.slug}`}
      className="flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-[#0D1117] hover:bg-[#121720] border border-white/[0.08] hover:border-[#147BFF]/40 transition-all duration-300 group h-full"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-[#050607] text-[#147BFF] border border-white/[0.08] group-hover:border-[#147BFF]/30 transition-colors">
            <IconComponent className="h-5 w-5" />
          </div>
          <span
            className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${levelColor}`}
          >
            {path.level}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="font-outfit font-bold text-lg md:text-xl text-[#F5F7FA] group-hover:text-[#3A91FF] transition-colors leading-snug">
            {path.title}
          </h3>

          <p className="text-xs md:text-sm text-[#9BA5B3] line-clamp-3 leading-relaxed font-normal">
            {path.description}
          </p>
        </div>
      </div>

      <div className="pt-5 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#9BA5B3]">
        <div className="flex items-center space-x-3">
          <span className="flex items-center">
            <BookOpen className="h-3.5 w-3.5 mr-1 text-[#147BFF]" />
            {path.lessonCount} aulas
          </span>
          <span className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1 text-[#147BFF]" />
            {path.totalDuration}
          </span>
        </div>

        <span className="font-semibold text-[#147BFF] group-hover:text-[#3A91FF] flex items-center">
          Acessar trilha
          <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
