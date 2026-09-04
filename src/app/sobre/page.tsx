import Image from "next/image";
import { ShieldCheck, Award, Eye, Compass, HeartHandshake } from "lucide-react";
import { TwitterIcon, LinkedinIcon, YoutubeIcon, InstagramIcon } from "@/components/SocialIcons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre a HDZ Finance | Nossa História e Princípios Editoriais",
  description:
    "Conheça o portal HDZ Finance, nossa missão de educação financeira, independência editorial e compromisso com o investidor consciente.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-[#F5F7FA] py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Hero Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center space-x-3 justify-center mb-2">
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src="/assets/hdz-symbol.png"
                alt="Símbolo HDZ Finance"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-outfit font-extrabold text-3xl md:text-4xl tracking-tight">
              <span className="text-[#FFFFFF]">HDZ</span>{" "}
              <span className="text-[#F59A18]">FINANCE</span>
            </span>
          </div>

          <h1 className="font-outfit font-extrabold text-3xl md:text-5xl text-[#F5F7FA] tracking-tight leading-tight">
            Informação para entender. <br className="hidden sm:inline" />
            <span className="text-[#147BFF]">Educação para decidir.</span>
          </h1>

          <p className="text-base md:text-lg text-[#A7AFBA] max-w-2xl mx-auto leading-relaxed">
            Nascemos com o propósito de transformar a relação das pessoas com o dinheiro, substituindo a especulação rasa por clareza analítica e visão de longo prazo.
          </p>
        </div>

        {/* Highlight Banner Quote */}
        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[#0B0D10] via-[#11151A] to-[#0B0D10] border border-[#147BFF]/40 text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Compass className="h-64 w-64 text-[#147BFF]" />
          </div>

          <span className="text-xs font-bold text-[#147BFF] uppercase tracking-widest block">
            Manifesto HDZ Finance
          </span>

          <blockquote className="font-outfit font-extrabold text-2xl md:text-4xl text-[#F5F7FA] leading-tight">
            &quot;O dinheiro mudou. A maioria das pessoas ainda não percebeu.&quot;
          </blockquote>

          <p className="text-sm md:text-base text-[#C7CDD4] max-w-2xl mx-auto leading-relaxed font-lora italic pt-2">
            A expansão monetária global, a consolidação dos ativos digitais e a evolução da inteligência artificial transformaram a mecânica do sistema financeiro. Quem insiste em modelos ultrapassados perde poder de compra todos os dias.
          </p>
        </div>

        {/* History & Position Statement */}
        <div className="space-y-6 text-sm md:text-base text-[#C7CDD4] leading-relaxed font-lora">
          <h2 className="font-outfit font-extrabold text-2xl text-[#F5F7FA] font-sans">
            A Evolução da Marca HDZ Finance
          </h2>

          <p>
            A HDZ Finance surgiu inicialmente imersa nas transformações trazidas pela tecnologia blockchain e pelos ativos digitais. No entanto, o avanço do mercado e o amadurecimento dos nossos leitores exigiram uma expansão natural de horizonte.
          </p>

          <p>
            Deixamos de ser uma marca concentrada exclusivamente em criptomoedas para nos tornarmos um portal completo de notícias, análises macroeconômicas, finanças pessoais, renda fixa e alocação estratégica de investimentos.
          </p>

          <div className="p-6 rounded-xl bg-[#0B0D10] border border-[#252A32] space-y-3 font-sans my-6">
            <h3 className="font-outfit font-bold text-lg text-[#F59A18] flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              O que NÃO Fazemos na HDZ Finance
            </h3>
            <p className="text-xs md:text-sm text-[#A7AFBA] leading-relaxed">
              O portal HDZ Finance <strong>não é</strong> uma plataforma de apostas, não fornece sinais de trading, não atua como corretora e jamais fará promessas irrealistas de enriquecimento rápido. Todo o nosso conteúdo possui caráter rigorosamente informativo, jornalístico e educacional.
            </p>
          </div>
        </div>

        {/* Core Principles Grid */}
        <div className="space-y-6">
          <h2 className="font-outfit font-extrabold text-2xl text-[#F5F7FA] text-center">
            Nossos Princípios Editoriais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#0B0D10] border border-[#252A32] space-y-3">
              <div className="p-3 rounded-lg bg-[#11151A] text-[#147BFF] w-fit border border-[#252A32]">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-outfit font-bold text-lg text-[#F5F7FA]">
                Credibilidade & Rigor
              </h3>
              <p className="text-xs text-[#A7AFBA] leading-relaxed">
                Checagem rigorosa de dados oficiais, relatórios de Bancos Centrais e estatísticas consolidadas antes de qualquer publicação.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0B0D10] border border-[#252A32] space-y-3">
              <div className="p-3 rounded-lg bg-[#11151A] text-[#147BFF] w-fit border border-[#252A32]">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="font-outfit font-bold text-lg text-[#F5F7FA]">
                Independência Editorial
              </h3>
              <p className="text-xs text-[#A7AFBA] leading-relaxed">
                Opiniões analíticas isentas de conflitos de interesse ou pressões comerciais. Transparência total com o leitor.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0B0D10] border border-[#252A32] space-y-3">
              <div className="p-3 rounded-lg bg-[#11151A] text-[#147BFF] w-fit border border-[#252A32]">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="font-outfit font-bold text-lg text-[#F5F7FA]">
                Visão de Longo Prazo
              </h3>
              <p className="text-xs text-[#A7AFBA] leading-relaxed">
                Incentivo constante à disciplina, diversificação inteligente e foco na construção de patrimônio sustentável.
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="p-8 rounded-2xl bg-[#0B0D10] border border-[#252A32] text-center space-y-6">
          <h2 className="font-outfit font-extrabold text-xl text-[#F5F7FA]">
            Acompanhe a HDZ Finance nas Redes Sociais
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#11151A] border border-[#252A32] text-[#F5F7FA] hover:border-[#147BFF] hover:text-[#147BFF] transition-all text-xs font-semibold"
            >
              <TwitterIcon className="h-4 w-4 text-[#147BFF]" />
              <span>Twitter / X</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#11151A] border border-[#252A32] text-[#F5F7FA] hover:border-[#147BFF] hover:text-[#147BFF] transition-all text-xs font-semibold"
            >
              <LinkedinIcon className="h-4 w-4 text-[#147BFF]" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#11151A] border border-[#252A32] text-[#F5F7FA] hover:border-[#147BFF] hover:text-[#147BFF] transition-all text-xs font-semibold"
            >
              <YoutubeIcon className="h-4 w-4 text-[#147BFF]" />
              <span>YouTube</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#11151A] border border-[#252A32] text-[#F5F7FA] hover:border-[#147BFF] hover:text-[#147BFF] transition-all text-xs font-semibold"
            >
              <InstagramIcon className="h-4 w-4 text-[#147BFF]" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
