"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Lock,
  Layers,
  HelpCircle,
  ArrowUpRight,
} from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/SocialIcons";

// Configurable Sales Offer State
const trainingOffer = {
  offerReady: false,
  price: null,
  originalPrice: null,
  installments: null,
  checkoutUrl: null,
  accessDuration: null,
  certificate: null,
  guaranteeEnabled: false,
  guaranteeDays: null,
};

export default function BitcoinCourseSalesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const faqItems = [
    {
      question: "O treinamento é indicado para iniciantes?",
      answer:
        "Sim. O conteúdo começa pelos fundamentos do dinheiro e avança progressivamente até Bitcoin, Ethereum, criptomoedas e ciclos de mercado.",
    },
    {
      question: "Preciso ter conhecimento prévio sobre economia ou criptomoedas?",
      answer:
        "Não. A proposta é construir uma base organizada desde os conceitos iniciais, conectando história, economia e tecnologia ao longo da jornada.",
    },
    {
      question: "Quais assuntos são abordados?",
      answer:
        "O treinamento aborda dinheiro, história monetária, Gold Standard, inflação, Escola Austríaca, criptografia, Bitcoin, mentalidade bitcoiner, Ethereum, criptomoedas, dólar digital e ciclos de mercado.",
    },
    {
      question: "O treinamento fala apenas sobre o preço do Bitcoin?",
      answer:
        "Não. O foco está nos fundamentos econômicos, históricos e tecnológicos que ajudam a compreender por que o Bitcoin surgiu e como sua proposta se diferencia de outros ativos.",
    },
    {
      question: "A Escola Austríaca faz parte do conteúdo?",
      answer:
        "Sim. O treinamento apresenta conceitos da Escola Austríaca que contribuem para a compreensão de moeda, valor, escolhas individuais e ciclos econômicos.",
    },
    {
      question: "O treinamento ensina a prever o mercado?",
      answer:
        "Não. A proposta não é prometer previsões, mas apresentar fundamentos que permitam interpretar o mercado com mais contexto e menos dependência de narrativas momentâneas.",
    },
    {
      question: "O conteúdo representa recomendação de investimento?",
      answer:
        "Não. O treinamento possui finalidade exclusivamente educacional e não constitui recomendação de compra, venda ou manutenção de qualquer ativo.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] selection:bg-[#147BFF] selection:text-white font-sans">
      
      {/* ========================================================================= */}
      {/* SEÇÃO 1: HERO PRINCIPAL                                                   */}
      {/* ========================================================================= */}
      <section className="relative isolate overflow-hidden pt-10 md:pt-16 pb-16 md:pb-24 border-b border-white/[0.08] bg-[#050607]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Main Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge Superior */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-md bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-xs font-extrabold uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" />
                <span>TREINAMENTO HDZ FINANCE</span>
              </div>

              {/* Título Principal */}
              <h1 className="font-outfit font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-white leading-[1.12] tracking-tight">
                Entenda o dinheiro antes de tentar entender o Bitcoin
              </h1>

              {/* Texto de Apresentação */}
              <div className="space-y-3.5 text-sm sm:text-base text-[#D5DDE6] leading-[1.7] font-normal">
                <p>
                  A história do dinheiro ajuda a explicar a inflação, as transformações do sistema financeiro e o surgimento de tecnologias que desafiam a maneira como o valor é criado, armazenado e transferido.
                </p>
                <p>
                  Neste treinamento, conceitos que normalmente aparecem separados são organizados em uma jornada que conecta dinheiro, padrão ouro, Escola Austríaca, criptografia, Bitcoin, Ethereum, dólar digital e ciclos de mercado.
                </p>
              </div>

              {/* Indicação de Público */}
              <div className="p-4 rounded-xl bg-[#0D1117] border border-white/10 text-xs sm:text-sm text-[#AEB8C4] leading-relaxed">
                <strong className="text-[#F5F7FA]">Indicado para:</strong> Para quem deseja compreender o que existe por trás das moedas, dos preços e das transformações tecnológicas que estão redefinindo o sistema financeiro.
              </div>

              {/* Faixa de Destaque */}
              <div className="px-4 py-2.5 rounded-lg bg-[#0E131A] border-l-4 border-[#F59A18] text-xs font-bold uppercase tracking-wider text-[#F59A18]">
                DINHEIRO, ECONOMIA, BITCOIN E CRIPTOATIVOS EM UMA JORNADA ESTRUTURADA
              </div>

              {/* 4 Pontos Principais */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#E2EAF2]">
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0 mt-0.5" />
                  <span>Entenda por que o dinheiro surgiu e como ele evoluiu.</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#E2EAF2]">
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0 mt-0.5" />
                  <span>Compreenda como a inflação afeta o poder de compra.</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#E2EAF2]">
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0 mt-0.5" />
                  <span>Descubra os fundamentos econômicos e tecnológicos do Bitcoin.</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#E2EAF2]">
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0 mt-0.5" />
                  <span>Analise criptomoedas e ciclos de mercado com mais clareza.</span>
                </div>
              </div>

              {/* Botão Principal & Microcopy */}
              <div className="pt-4 space-y-3">
                <button
                  type="button"
                  onClick={() => scrollToSection("oferta")}
                  className="w-full sm:w-auto min-h-[52px] px-8 inline-flex items-center justify-center gap-3 rounded-xl border border-[#FFC05A] bg-gradient-to-r from-[#FFB12B] via-[#F59A18] to-[#E98508] text-[#080B0F] font-outfit font-extrabold text-sm uppercase tracking-wider shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_28px_rgba(245,154,24,0.24)] hover:brightness-[1.07] hover:-translate-y-[2px] transition-all duration-200"
                >
                  <span>CONHECER O TREINAMENTO</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-[11px] text-[#9BA5B3]">
                  Conteúdo educacional • Sem promessas de ganhos • Sem sinais de compra ou venda
                </p>
              </div>
            </div>

            {/* Right Side Visual Area (Prepared placeholder, no images, no broken icon) */}
            <div className="lg:col-span-5">
              <div
                aria-hidden="true"
                className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-[#0E131A] via-[#080B10] to-[#141B26] select-none"
              >
                <div className="absolute inset-0 bg-[radial-gradient(#F59A18_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#070A0F]/90 border border-white/10 backdrop-blur-md space-y-2">
                  <div className="w-16 h-2 rounded bg-[#F59A18]/60" />
                  <div className="w-3/4 h-2.5 rounded bg-white/20" />
                  <div className="w-1/2 h-2.5 rounded bg-white/15" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 2: PRÉVIAS DO CONTEÚDO                                              */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#070A0F]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#168BFF]/10 text-[#42A5FF] border border-[#168BFF]/30">
              PRÉVIAS DO TREINAMENTO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Veja como os conceitos serão apresentados ao longo da jornada
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              Uma visão organizada dos fundamentos que conectam a história do dinheiro, a economia, a tecnologia e o surgimento dos principais ativos digitais.
            </p>
          </div>

          {/* 10 Visual Placeholder Grid (Prepared for future lesson previews) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, idx) => (
              <div
                key={`preview-slot-${idx}`}
                aria-hidden="true"
                className="aspect-[16/10] w-full rounded-xl border border-white/[0.08] bg-[#0E131A] shadow-md relative overflow-hidden select-none"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#121824] to-[#070A0F] opacity-90" />
                <div className="absolute bottom-3 left-3 right-3 space-y-1.5 opacity-40">
                  <div className="w-12 h-1.5 rounded bg-[#F59A18]" />
                  <div className="w-full h-1.5 rounded bg-white/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 3: BENEFÍCIOS CENTRAIS                                              */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#050607]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
              ENTENDA AS FORÇAS QUE TRANSFORMARAM O DINHEIRO E TORNARAM O BITCOIN POSSÍVEL
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              Construa uma linha de raciocínio capaz de conectar acontecimentos históricos, fundamentos econômicos e avanços tecnológicos sem depender de explicações fragmentadas.
            </p>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Card 1 */}
            <div className="editorial-principle-card p-6 md:p-7 flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-3">
                <span className="text-[11px] font-extrabold text-[#F59A18] uppercase tracking-wider block">CARD 01</span>
                <h3 className="font-outfit font-bold text-lg text-white leading-snug">
                  ENTENDA O DINHEIRO DESDE A ORIGEM
                </h3>
                <p className="text-xs md:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                  Descubra como confiança, escassez e aceitação transformaram diferentes bens em instrumentos de troca e reserva de valor.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="editorial-principle-card p-6 md:p-7 flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-3">
                <span className="text-[11px] font-extrabold text-[#168BFF] uppercase tracking-wider block">CARD 02</span>
                <h3 className="font-outfit font-bold text-lg text-white leading-snug">
                  COMPREENDA A INFLAÇÃO E O PODER DE COMPRA
                </h3>
                <p className="text-xs md:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                  Entenda por que a quantidade de dinheiro, os preços e as decisões monetárias podem modificar o valor que permanece no seu bolso.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="editorial-principle-card p-6 md:p-7 flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-3">
                <span className="text-[11px] font-extrabold text-[#F59A18] uppercase tracking-wider block">CARD 03</span>
                <h3 className="font-outfit font-bold text-lg text-white leading-snug">
                  DESCUBRA POR QUE O BITCOIN FOI CRIADO
                </h3>
                <p className="text-xs md:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                  Conheça o contexto econômico e tecnológico que permitiu o surgimento de uma rede monetária digital baseada em regras verificáveis.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="editorial-principle-card p-6 md:p-7 flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-3">
                <span className="text-[11px] font-extrabold text-[#168BFF] uppercase tracking-wider block">CARD 04</span>
                <h3 className="font-outfit font-bold text-lg text-white leading-snug">
                  ANALISE CRIPTOATIVOS E CICLOS COM MAIS CLAREZA
                </h3>
                <p className="text-xs md:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                  Aprenda a separar fundamentos, tecnologia, comportamento e narrativa ao observar Bitcoin, Ethereum e o mercado de criptomoedas.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => scrollToSection("conteudo")}
              className="px-8 min-h-[50px] inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-[#0E131A] hover:bg-[#121824] text-white font-outfit font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>CONHECER O CONTEÚDO DO TREINAMENTO</span>
              <ArrowRight className="h-4 w-4 text-[#F59A18]" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 4: JORNADA DE APRENDIZADO                                           */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#070A0F]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
              JORNADA DE APRENDIZADO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Veja como temas aparentemente distantes passam a fazer parte da mesma história
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              O treinamento organiza os conceitos em uma sequência progressiva para mostrar como dinheiro, inflação, economia, criptografia e ativos digitais se conectam.
            </p>
          </div>

          {/* 8 Visual Placeholder Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(8)].map((_, idx) => (
              <div
                key={`journey-slot-${idx}`}
                aria-hidden="true"
                className="aspect-[16/10] w-full rounded-xl border border-white/[0.08] bg-[#0E131A] shadow-md relative overflow-hidden select-none"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#121824] to-[#070A0F] opacity-90" />
                <div className="absolute bottom-3 left-3 right-3 space-y-1.5 opacity-40">
                  <div className="w-10 h-1.5 rounded bg-[#168BFF]" />
                  <div className="w-full h-1.5 rounded bg-white/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 5: PARA QUEM É O TREINAMENTO                                        */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#050607]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#168BFF]/10 text-[#42A5FF] border border-[#168BFF]/30">
              PARA QUEM FOI DESENVOLVIDO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Para quem este treinamento foi desenvolvido?
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              Uma formação introdutória e estruturada para diferentes perfis que desejam compreender o dinheiro e as transformações do sistema financeiro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-7 rounded-2xl bg-[#0E131A] border border-white/10 space-y-4">
              <h3 className="font-outfit font-bold text-xl text-white">
                Para quem quer entender o dinheiro
              </h3>
              <p className="text-xs sm:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                Compreenda o que caracteriza o dinheiro, como ele surgiu, por que assumiu diferentes formas e quais forças modificam seu poder de compra.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Base conceitual e histórica</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Conteúdo educacional</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-2xl bg-[#0E131A] border border-white/10 space-y-4">
              <h3 className="font-outfit font-bold text-xl text-white">
                Para quem quer compreender o Bitcoin além do preço
              </h3>
              <p className="text-xs sm:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                Conheça os fundamentos econômicos e tecnológicos do Bitcoin para entender sua proposta antes de observar apenas sua cotação.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Fundamentos antes da especulação</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Conteúdo educacional</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-2xl bg-[#0E131A] border border-white/10 space-y-4">
              <h3 className="font-outfit font-bold text-xl text-white">
                Para quem acompanha criptomoedas e tecnologia
              </h3>
              <p className="text-xs sm:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                Entenda conceitos ligados à criptografia, ao Ethereum, às criptomoedas e ao avanço das moedas digitais.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Economia conectada à tecnologia</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Conteúdo educacional</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-7 rounded-2xl bg-[#0E131A] border border-white/10 space-y-4">
              <h3 className="font-outfit font-bold text-xl text-white">
                Para quem busca uma visão econômica mais sólida
              </h3>
              <p className="text-xs sm:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                Conheça conceitos da Escola Austríaca e desenvolva uma leitura mais crítica sobre inflação, moeda, ciclos e decisões individuais.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Clareza para formar uma visão própria</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Conteúdo educacional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 6: CONTEÚDO DO TREINAMENTO (11 TEMAS REAIS)                         */}
      {/* ========================================================================= */}
      <section id="conteudo" className="py-16 md:py-24 border-b border-white/[0.08] bg-[#070A0F]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
              CONTEÚDO DO TREINAMENTO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Conheça os fundamentos que formam esta jornada
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              Os conteúdos foram organizados para começar pelas bases do dinheiro e avançar até o Bitcoin, as criptomoedas e os movimentos do mercado.
            </p>

            <div className="pt-2">
              <span className="inline-block px-4 py-2 rounded-xl bg-[#0E131A] border border-white/10 text-xs font-bold text-[#F59A18]">
                11 temas conectados em uma formação sobre dinheiro, economia e tecnologia
              </span>
            </div>
          </div>

          {/* Grupo 1: FUNDAMENTOS DO DINHEIRO */}
          <div className="space-y-6">
            <div className="border-l-4 border-[#F59A18] pl-4 space-y-1">
              <h3 className="font-outfit font-bold text-xl md:text-2xl text-white">
                GRUPO 1: FUNDAMENTOS DO DINHEIRO
              </h3>
              <p className="text-xs sm:text-sm text-[#9BA5B3]">
                A base histórica e econômica necessária para compreender como o dinheiro funciona e por que ele se transforma.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tema 01 */}
              <div className="p-6 rounded-xl bg-[#0E131A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F59A18]">TEMA 01</span>
                  <span className="px-2 py-0.5 rounded bg-[#111620] text-[#A7AFBA] font-semibold text-[10px] uppercase">FUNDAMENTOS</span>
                </div>
                <h4 className="font-outfit font-bold text-lg text-white">Fundamentos do Dinheiro</h4>
                <p className="text-xs text-[#D5DDE6] leading-relaxed">
                  Entenda as funções do dinheiro, a construção da confiança e as características que permitem que algo seja utilizado como meio de troca e reserva de valor.
                </p>
              </div>

              {/* Tema 02 */}
              <div className="p-6 rounded-xl bg-[#0E131A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F59A18]">TEMA 02</span>
                  <span className="px-2 py-0.5 rounded bg-[#111620] text-[#A7AFBA] font-semibold text-[10px] uppercase">HISTÓRIA</span>
                </div>
                <h4 className="font-outfit font-bold text-lg text-white">História do Dinheiro</h4>
                <p className="text-xs text-[#D5DDE6] leading-relaxed">
                  Acompanhe a evolução das formas de dinheiro e perceba como necessidades econômicas, políticas e tecnológicas modificaram sua utilização.
                </p>
              </div>

              {/* Tema 03 */}
              <div className="p-6 rounded-xl bg-[#0E131A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F59A18]">TEMA 03</span>
                  <span className="px-2 py-0.5 rounded bg-[#111620] text-[#A7AFBA] font-semibold text-[10px] uppercase">SISTEMAS MONETÁRIOS</span>
                </div>
                <h4 className="font-outfit font-bold text-lg text-white">Gold Standard</h4>
                <p className="text-xs text-[#D5DDE6] leading-relaxed">
                  Compreenda o funcionamento do padrão ouro, suas características, suas limitações e sua importância na história monetária.
                </p>
              </div>

              {/* Tema 04 */}
              <div className="p-6 rounded-xl bg-[#0E131A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F59A18]">TEMA 04</span>
                  <span className="px-2 py-0.5 rounded bg-[#111620] text-[#A7AFBA] font-semibold text-[10px] uppercase">ECONOMIA</span>
                </div>
                <h4 className="font-outfit font-bold text-lg text-white">Inflação e Poder de Compra</h4>
                <p className="text-xs text-[#D5DDE6] leading-relaxed">
                  Entenda como a expansão monetária e a elevação dos preços afetam o valor do dinheiro ao longo do tempo.
                </p>
              </div>

              {/* Tema 05 */}
              <div className="p-6 rounded-xl bg-[#0E131A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F59A18]">TEMA 05</span>
                  <span className="px-2 py-0.5 rounded bg-[#111620] text-[#A7AFBA] font-semibold text-[10px] uppercase">PENSAMENTO ECONÔMICO</span>
                </div>
                <h4 className="font-outfit font-bold text-lg text-white">Conceitos da Escola Austríaca</h4>
                <p className="text-xs text-[#D5DDE6] leading-relaxed">
                  Conheça ideias sobre valor, escolhas individuais, moeda, ciclos econômicos e coordenação descentralizada.
                </p>
              </div>
            </div>
          </div>

          {/* Grupo 2: BITCOIN, CRIPTOMOEDAS E MERCADO */}
          <div className="space-y-6 pt-4">
            <div className="border-l-4 border-[#168BFF] pl-4 space-y-1">
              <h3 className="font-outfit font-bold text-xl md:text-2xl text-white">
                GRUPO 2: BITCOIN, CRIPTOMOEDAS E MERCADO
              </h3>
              <p className="text-xs sm:text-sm text-[#9BA5B3]">
                Os fundamentos tecnológicos e comportamentais necessários para compreender os ativos digitais além das oscilações de preço.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tema 06 */}
              <div className="p-6 rounded-xl bg-[#0E131A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#168BFF]">TEMA 06</span>
                  <span className="px-2 py-0.5 rounded bg-[#111620] text-[#A7AFBA] font-semibold text-[10px] uppercase">TECNOLOGIA</span>
                </div>
                <h4 className="font-outfit font-bold text-lg text-white">Criptografia</h4>
                <p className="text-xs text-[#D5DDE6] leading-relaxed">
                  Conheça os princípios que permitem proteger informações, validar transações e construir sistemas digitais baseados em verificação.
                </p>
              </div>

              {/* Tema 07 */}
              <div className="p-6 rounded-xl bg-[#0E131A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#168BFF]">TEMA 07</span>
                  <span className="px-2 py-0.5 rounded bg-[#111620] text-[#A7AFBA] font-semibold text-[10px] uppercase">BITCOIN</span>
                </div>
                <h4 className="font-outfit font-bold text-lg text-white">Fundamentos do Bitcoin</h4>
                <p className="text-xs text-[#D5DDE6] leading-relaxed">
                  Entenda a proposta do Bitcoin, sua emissão programada, sua rede descentralizada e as regras que sustentam seu funcionamento.
                </p>
              </div>

              {/* Tema 08 */}
              <div className="p-6 rounded-xl bg-[#0E131A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#168BFF]">TEMA 08</span>
                  <span className="px-2 py-0.5 rounded bg-[#111620] text-[#A7AFBA] font-semibold text-[10px] uppercase">COMPORTAMENTO</span>
                </div>
                <h4 className="font-outfit font-bold text-lg text-white">Mentalidade Bitcoiner</h4>
                <p className="text-xs text-[#D5DDE6] leading-relaxed">
                  Compreenda a visão de longo prazo, a responsabilidade individual e as mudanças de perspectiva associadas à proposta do Bitcoin.
                </p>
              </div>

              {/* Tema 09 */}
              <div className="p-6 rounded-xl bg-[#0E131A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#168BFF]">TEMA 09</span>
                  <span className="px-2 py-0.5 rounded bg-[#111620] text-[#A7AFBA] font-semibold text-[10px] uppercase">CRIPTOMOEDAS</span>
                </div>
                <h4 className="font-outfit font-bold text-lg text-white">Ethereum e o Ecossistema de Criptoativos</h4>
                <p className="text-xs text-[#D5DDE6] leading-relaxed">
                  Conheça as diferenças fundamentais entre Bitcoin, Ethereum e outros projetos que utilizam redes e ativos digitais.
                </p>
              </div>

              {/* Tema 10 */}
              <div className="p-6 rounded-xl bg-[#0E131A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#168BFF]">TEMA 10</span>
                  <span className="px-2 py-0.5 rounded bg-[#111620] text-[#A7AFBA] font-semibold text-[10px] uppercase">MOEDAS DIGITAIS</span>
                </div>
                <h4 className="font-outfit font-bold text-lg text-white">Dólar Digital</h4>
                <p className="text-xs text-[#D5DDE6] leading-relaxed">
                  Entenda como a digitalização das moedas tradicionais se relaciona com tecnologia, controle, pagamentos e novos modelos financeiros.
                </p>
              </div>

              {/* Tema 11 */}
              <div className="p-6 rounded-xl bg-[#0E131A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#168BFF]">TEMA 11</span>
                  <span className="px-2 py-0.5 rounded bg-[#111620] text-[#A7AFBA] font-semibold text-[10px] uppercase">MERCADO</span>
                </div>
                <h4 className="font-outfit font-bold text-lg text-white">Ciclos de Mercado</h4>
                <p className="text-xs text-[#D5DDE6] leading-relaxed">
                  Compreenda como expectativas, liquidez, comportamento coletivo e narrativas influenciam diferentes fases do mercado.
                </p>
              </div>
            </div>
          </div>

          {/* Bloco Final da Seção 6 */}
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#0E131A] via-[#080B10] to-[#070A0F] border border-white/10 text-center space-y-4">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
              UMA BASE PARA ENTENDER O PRESENTE
            </span>
            <h3 className="font-outfit font-extrabold text-xl md:text-2xl text-white max-w-2xl mx-auto">
              Compreenda o dinheiro que existe hoje e as tecnologias que podem transformar o que ele será amanhã
            </h3>
            <p className="text-xs md:text-sm text-[#9BA5B3] max-w-xl mx-auto leading-relaxed">
              Reúna história, economia e tecnologia em uma única linha de aprendizado para desenvolver uma visão mais clara sobre Bitcoin e criptomoedas.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => scrollToSection("oferta")}
                className="min-h-[50px] px-8 inline-flex items-center justify-center gap-2 rounded-xl border border-[#FFC05A] bg-gradient-to-r from-[#FFB12B] via-[#F59A18] to-[#E98508] text-[#080B0F] font-outfit font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all"
              >
                <span>CONHECER O TREINAMENTO COMPLETO</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 7: OFERTA E CONDIÇÕES DE ACESSO                                    */}
      {/* ========================================================================= */}
      <section id="oferta" className="py-16 md:py-24 border-b border-white/[0.08] bg-[#050607]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#168BFF]/10 text-[#42A5FF] border border-[#168BFF]/30">
              ACESSO AO TREINAMENTO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Comece pelos fundamentos que conectam dinheiro, Bitcoin e tecnologia
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              As condições de acesso e o investimento serão adicionados após a definição final da oferta.
            </p>
          </div>

          {/* Offer Card Container */}
          <div className="max-w-xl mx-auto p-8 md:p-10 rounded-2xl bg-[#0E131A] border border-white/10 text-center space-y-6 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A7AFBA]">Modalidade de Treinamento</span>
              <h3 className="font-outfit font-extrabold text-2xl text-white">
                Fundamentos do Bitcoin, Dinheiro e Criptomoedas
              </h3>
            </div>

            <div className="py-6 border-y border-white/10 space-y-2">
              <span className="text-xs text-[#9BA5B3] block">Status Comercial</span>
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#111620] border border-white/10 text-xs font-bold text-[#F59A18]">
                <Lock className="h-4 w-4 text-[#F59A18]" />
                <span>OFERTA EM FASE DE PREPARAÇÃO</span>
              </div>
            </div>

            {/* Action Button Disabled */}
            <div className="pt-2">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="w-full min-h-[52px] px-6 inline-flex items-center justify-center gap-2 rounded-xl border border-[#F59A18]/30 bg-[#F59A18]/10 text-[#F5F7FA]/60 font-outfit font-bold text-sm uppercase tracking-wider cursor-not-allowed select-none"
              >
                <span>ACESSO EM PREPARAÇÃO</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 8: EXPERIÊNCIAS E DEPOIMENTOS                                       */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#070A0F]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
              EXPERIÊNCIAS DE APRENDIZADO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              A compreensão muda quando os conceitos finalmente se conectam
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              Esta área será destinada às experiências reais de alunos que concluírem o treinamento.
            </p>
          </div>

          {/* 3 Prepared Testimonial Placeholder Cards (No fake reviews) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div
                key={`testimonial-slot-${num}`}
                aria-hidden="true"
                className="p-7 rounded-2xl bg-[#0E131A] border border-white/10 space-y-4 shadow-md select-none"
              >
                <div className="w-10 h-10 rounded-full bg-[#111620] border border-white/10 flex items-center justify-center text-xs font-bold text-[#A7AFBA]">
                  0{num}
                </div>
                <div className="space-y-2 opacity-30">
                  <div className="w-full h-2 rounded bg-white/20" />
                  <div className="w-4/5 h-2 rounded bg-white/20" />
                  <div className="w-3/5 h-2 rounded bg-white/20" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 9: GARANTIA                                                         */}
      {/* ========================================================================= */}
      {trainingOffer.guaranteeEnabled && (
        <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#050607]">
          <div className="max-w-3xl mx-auto px-5 text-center space-y-4">
            <h2 className="font-outfit font-bold text-2xl text-white">Garantia Incondicional</h2>
            <p className="text-sm text-[#9BA5B3]">Condições comerciais de garantia serão ativadas no lançamento.</p>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 10: COMO FUNCIONARÁ O ACESSO                                       */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#050607]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#168BFF]/10 text-[#42A5FF] border border-[#168BFF]/30">
              PASSO A PASSO DO ACESSO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              COMO VOCÊ ACESSARÁ O TREINAMENTO
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              Veja como funcionará o processo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Etapa 1 */}
            <div className="p-6 rounded-2xl bg-[#0E131A] border border-white/10 space-y-3">
              <span className="font-outfit font-extrabold text-2xl text-[#F59A18]">01</span>
              <h3 className="font-outfit font-bold text-lg text-white">Conheça a proposta</h3>
              <p className="text-xs text-[#D5DDE6] leading-relaxed font-normal">
                Analise o conteúdo do treinamento e verifique se a jornada está alinhada ao conhecimento que você deseja construir.
              </p>
            </div>

            {/* Etapa 2 */}
            <div className="p-6 rounded-2xl bg-[#0E131A] border border-white/10 space-y-3">
              <span className="font-outfit font-extrabold text-2xl text-[#168BFF]">02</span>
              <h3 className="font-outfit font-bold text-lg text-white">Acesse o checkout da Wiapy</h3>
              <p className="text-xs text-[#D5DDE6] leading-relaxed font-normal">
                Quando a oferta estiver disponível, utilize o botão oficial para acessar o ambiente de pagamento da plataforma.
              </p>
            </div>

            {/* Etapa 3 */}
            <div className="p-6 rounded-2xl bg-[#0E131A] border border-white/10 space-y-3">
              <span className="font-outfit font-extrabold text-2xl text-[#F59A18]">03</span>
              <h3 className="font-outfit font-bold text-lg text-white">Conclua sua inscrição</h3>
              <p className="text-xs text-[#D5DDE6] leading-relaxed font-normal">
                Preencha as informações solicitadas e finalize a compra utilizando as opções disponibilizadas no checkout.
              </p>
            </div>

            {/* Etapa 4 */}
            <div className="p-6 rounded-2xl bg-[#0E131A] border border-white/10 space-y-3">
              <span className="font-outfit font-extrabold text-2xl text-[#168BFF]">04</span>
              <h3 className="font-outfit font-bold text-lg text-white">Siga as orientações de acesso</h3>
              <p className="text-xs text-[#D5DDE6] leading-relaxed font-normal">
                Após a confirmação, utilize as instruções apresentadas pela plataforma para acessar o treinamento.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="px-8 min-h-[50px] inline-flex items-center justify-center gap-2 rounded-xl border border-[#F59A18]/30 bg-[#F59A18]/10 text-[#F5F7FA]/60 font-outfit font-bold text-xs uppercase tracking-wider cursor-not-allowed select-none"
            >
              <span>ACESSO EM PREPARAÇÃO</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 11: PERGUNTAS FREQUENTES (FAQ ACCORDION)                            */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#070A0F]">
        <div className="max-w-4xl mx-auto px-5 md:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
              TIRE SUAS DÚVIDAS
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Perguntas Frequentes
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              Respostas para as principais dúvidas sobre o conteúdo e a proposta do treinamento.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#0E131A] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 font-outfit font-bold text-base md:text-lg text-white hover:text-[#F59A18] transition-colors focus:outline-none focus:ring-2 focus:ring-[#168BFF]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#F59A18] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 md:px-6 pb-6 text-xs md:text-sm text-[#D5DDE6] leading-relaxed font-normal border-t border-white/[0.06] pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
