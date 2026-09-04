import { LEARNING_PATHS } from "@/data/learning";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, Clock, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface LearnDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LEARNING_PATHS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: LearnDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = LEARNING_PATHS.find((p) => p.slug === slug);

  if (!path) {
    return {
      title: "Trilha Não Encontrada | HDZ Finance",
    };
  }

  return {
    title: `${path.title} | Aprenda HDZ Finance`,
    description: path.description,
  };
}

export default async function LearnDetailPage({ params }: LearnDetailPageProps) {
  const { slug } = await params;
  const path = LEARNING_PATHS.find((p) => p.slug === slug);

  if (!path) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-[#F5F7FA] py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation back */}
        <Link
          href="/aprenda"
          className="inline-flex items-center text-xs text-[#A7AFBA] hover:text-[#147BFF] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Voltar para todas as trilhas educacionais
        </Link>

        {/* Track Header */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0B0D10] border border-[#252A32] space-y-4">
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-0.5 rounded font-semibold bg-[#147BFF]/10 text-[#147BFF] border border-[#147BFF]/30">
              Trilha {path.level}
            </span>
            <span className="text-[#A7AFBA]">•</span>
            <span className="text-[#A7AFBA]">{path.category}</span>
          </div>

          <h1 className="font-outfit font-extrabold text-2xl md:text-4xl text-[#F5F7FA]">
            {path.title}
          </h1>

          <p className="text-sm md:text-base text-[#A7AFBA] leading-relaxed">
            {path.description}
          </p>

          <div className="flex items-center space-x-6 text-xs text-[#A7AFBA] pt-2 border-t border-[#252A32]">
            <span className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1.5 text-[#147BFF]" />
              {path.lessonCount} aulas disponíveis
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5 text-[#147BFF]" />
              Duração total estimada: {path.totalDuration}
            </span>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-6">
          <h2 className="font-outfit font-bold text-xl text-[#F5F7FA] uppercase tracking-wider">
            Aulas da Trilha
          </h2>

          <div className="space-y-4">
            {path.lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="p-6 rounded-xl bg-[#0B0D10] border border-[#252A32] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-outfit font-black text-lg text-[#147BFF] bg-[#11151A] px-3 py-1 rounded-md border border-[#252A32]">
                      Aula 0{index + 1}
                    </span>
                    <h3 className="font-outfit font-bold text-lg text-[#F5F7FA]">
                      {lesson.title}
                    </h3>
                  </div>

                  <span className="text-xs text-[#A7AFBA] flex items-center shrink-0">
                    <Clock className="h-3.5 w-3.5 mr-1 text-[#147BFF]" />
                    {lesson.durationMinutes} min
                  </span>
                </div>

                <p className="text-xs md:text-sm text-[#A7AFBA]">
                  {lesson.summary}
                </p>

                <div
                  className="pt-4 border-t border-[#252A32] font-lora text-sm md:text-base text-[#F5F7FA] leading-relaxed space-y-3 [&>p]:leading-relaxed [&>h3]:font-outfit [&>h3]:font-bold [&>h3]:text-base [&>h3]:text-[#147BFF]"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
