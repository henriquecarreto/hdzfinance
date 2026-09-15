"use client";

import { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Lock,
} from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/SocialIcons";

// Configurable Ebook Bundle Sales State
const ebookBundle = {
  pageStatus: "draft",
  collectionName: "Combo com 2 E-books",
  ebookOne: {
    title: null,
    subject: null,
    description: null,
    coverImage: null,
    pages: null,
    format: null,
  },
  ebookTwo: {
    title: null,
    subject: null,
    description: null,
    coverImage: null,
    pages: null,
    format: null,
  },
  price: null,
  originalPrice: null,
  installments: null,
  checkoutUrl: null,
  guaranteeEnabled: false,
  guaranteeDays: null,
  offerReady: false,
};

export default function EbookBundleSalesPage() {
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

  // FAQ Items: Only render confirmed Q&As (status !== 'draft')
  const allFaqItems = [
    {
      status: "published",
      question: "O que está incluído na coleção?",
      answer:
        "A coleção será formada por dois e-books digitais vendidos juntos como um único produto.",
    },
    {
      status: "published",
      question: "Os e-books serão vendidos separadamente?",
      answer:
        "Não. A estrutura atual da oferta foi desenvolvida para comercializar os dois e-books juntos.",
    },
    {
      status: "published",
      question: "A compra será finalizada pela Wiapy?",
      answer:
        "Sim. Quando a oferta estiver disponível, o botão da página direcionará para o checkout oficial configurado na plataforma Wiapy.",
    },
    {
      status: "draft",
      question: "Quais assuntos serão abordados?",
      answer: null,
    },
    {
      status: "draft",
      question: "Em qual formato os e-books serão entregues?",
      answer: null,
    },
    {
      status: "draft",
      question: "Como receberei o acesso?",
      answer: null,
    },
    {
      status: "draft",
      question: "Existe garantia?",
      answer: null,
    },
  ];

  const visibleFaqItems = allFaqItems.filter(
    (item) => item.status === "published" && item.answer !== null
  );

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
                <span>COLEÇÃO DIGITAL HDZ FINANCE</span>
              </div>

              {/* Título Principal */}
              <h1 className="font-outfit font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-white leading-[1.12] tracking-tight">
                Dois e-books para transformar informações dispersas em uma leitura clara e conectada
              </h1>

              {/* Texto de Apresentação */}
              <div className="space-y-3.5 text-sm sm:text-base text-[#D5DDE6] leading-[1.7] font-normal">
                <p>
                  Alguns assuntos exigem mais do que explicações rápidas. Exigem contexto, organização e uma sequência capaz de transformar diferentes informações em conhecimento.
                </p>
                <p>
                  Esta coleção reunirá dois e-books em uma única jornada de leitura, desenvolvida para apresentar os conteúdos com clareza, profundidade e uma estrutura que facilite a compreensão.
                </p>
              </div>

              {/* Indicação de Público */}
              <div className="p-4 rounded-xl bg-[#0D1117] border border-white/10 text-xs sm:text-sm text-[#AEB8C4] leading-relaxed">
                <strong className="text-[#F5F7FA]">Indicado para:</strong> Para quem prefere compreender um assunto por inteiro, construir uma base consistente e consultar o conteúdo sempre que precisar.
              </div>

              {/* Faixa de Destaque */}
              <div className="px-4 py-2.5 rounded-lg bg-[#0E131A] border-l-4 border-[#F59A18] text-xs font-bold uppercase tracking-wider text-[#F59A18]">
                DOIS E-BOOKS DIGITAIS REUNIDOS EM UMA ÚNICA COLEÇÃO
              </div>

              {/* 4 Pontos Principais */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#E2EAF2]">
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0 mt-0.5" />
                  <span>Dois conteúdos reunidos em um único produto.</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#E2EAF2]">
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0 mt-0.5" />
                  <span>Leitura organizada em uma sequência clara.</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#E2EAF2]">
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0 mt-0.5" />
                  <span>Material digital desenvolvido para estudo e consulta.</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#E2EAF2]">
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0 mt-0.5" />
                  <span>Conteúdo que poderá ser revisitado sempre que necessário.</span>
                </div>
              </div>

              {/* Botão Principal & Microcopy */}
              <div className="pt-4 space-y-3">
                <button
                  type="button"
                  onClick={() => scrollToSection("ebooks")}
                  className="w-full sm:w-auto min-h-[52px] px-8 inline-flex items-center justify-center gap-3 rounded-xl border border-[#FFC05A] bg-gradient-to-r from-[#FFB12B] via-[#F59A18] to-[#E98508] text-[#080B0F] font-outfit font-extrabold text-sm uppercase tracking-wider shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_28px_rgba(245,154,24,0.24)] hover:brightness-[1.07] hover:-translate-y-[2px] transition-all duration-200"
                >
                  <span>CONHECER A COLEÇÃO</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-[11px] text-[#9BA5B3]">
                  Dois e-books • Uma única coleção • Conteúdo digital
                </p>
              </div>
            </div>

            {/* Right Side Visual Area (Dark abstract placeholder surface) */}
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
      {/* SEÇÃO 2: PRÉVIAS DOS E-BOOKS                                              */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#070A0F]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#168BFF]/10 text-[#42A5FF] border border-[#168BFF]/30">
              PRÉVIAS DA COLEÇÃO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Veja como o conteúdo será apresentado ao longo dos dois e-books
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              Uma experiência de leitura construída para organizar conceitos, destacar informações importantes e facilitar a consulta dos assuntos abordados.
            </p>
          </div>

          {/* 10 Visual Empty Space Grid */}
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
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-tight uppercase">
              MAIS DO QUE DOIS ARQUIVOS, UMA EXPERIÊNCIA DE LEITURA ORGANIZADA
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              A coleção foi pensada para transformar o estudo em uma jornada mais clara, permitindo que cada conceito seja compreendido dentro de uma sequência lógica.
            </p>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Card 1 */}
            <div className="editorial-principle-card p-6 md:p-7 flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-3">
                <span className="text-[11px] font-extrabold text-[#F59A18] uppercase tracking-wider block">CARD 01</span>
                <h3 className="font-outfit font-bold text-lg text-white leading-snug">
                  ENCONTRE UMA LINHA DE RACIOCÍNIO
                </h3>
                <p className="text-xs md:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                  Acompanhe o desenvolvimento dos assuntos sem depender de informações soltas ou explicações desconectadas.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="editorial-principle-card p-6 md:p-7 flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-3">
                <span className="text-[11px] font-extrabold text-[#168BFF] uppercase tracking-wider block">CARD 02</span>
                <h3 className="font-outfit font-bold text-lg text-white leading-snug">
                  APROFUNDE A COMPREENSÃO
                </h3>
                <p className="text-xs md:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                  Avance além de definições rápidas e entenda como os conceitos apresentados se relacionam.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="editorial-principle-card p-6 md:p-7 flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-3">
                <span className="text-[11px] font-extrabold text-[#F59A18] uppercase tracking-wider block">CARD 03</span>
                <h3 className="font-outfit font-bold text-lg text-white leading-snug">
                  ESTUDE NO SEU PRÓPRIO RITMO
                </h3>
                <p className="text-xs md:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                  Leia, retorne aos pontos mais importantes e organize o aprendizado de acordo com a sua rotina.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="editorial-principle-card p-6 md:p-7 flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-3">
                <span className="text-[11px] font-extrabold text-[#168BFF] uppercase tracking-wider block">CARD 04</span>
                <h3 className="font-outfit font-bold text-lg text-white leading-snug">
                  TENHA UM MATERIAL PARA CONSULTAR
                </h3>
                <p className="text-xs md:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                  Mantenha os dois conteúdos reunidos para revisitar conceitos sempre que surgir uma dúvida.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => scrollToSection("ebooks")}
              className="px-8 min-h-[50px] inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-[#0E131A] hover:bg-[#121824] text-white font-outfit font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>CONHECER OS DOIS E-BOOKS</span>
              <ArrowRight className="h-4 w-4 text-[#F59A18]" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 4: EXPERIÊNCIA DE LEITURA                                          */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#070A0F]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
              EXPERIÊNCIA DE LEITURA
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Uma estrutura visual criada para tornar a leitura mais clara e agradável
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              Cada parte da coleção será organizada para facilitar a identificação dos conceitos, a continuidade da leitura e a consulta posterior.
            </p>
          </div>

          {/* 8 Visual Empty Space Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(8)].map((_, idx) => (
              <div
                key={`reading-exp-slot-${idx}`}
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
      {/* SEÇÃO 5: PARA QUEM É A COLEÇÃO                                            */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#050607]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#168BFF]/10 text-[#42A5FF] border border-[#168BFF]/30">
              PARA QUEM FOI DESENVOLVIDA
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Para quem esta coleção foi desenvolvida?
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              Dois e-books reunidos para diferentes perfis que valorizam uma leitura organizada, acessível e construída com propósito.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-7 rounded-2xl bg-[#0E131A] border border-white/10 space-y-4">
              <h3 className="font-outfit font-bold text-xl text-white">
                Para quem busca uma explicação mais clara
              </h3>
              <p className="text-xs sm:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                Uma coleção para quem deseja compreender os assuntos sem depender de conteúdos fragmentados.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Leitura organizada</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Conteúdo digital</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-2xl bg-[#0E131A] border border-white/10 space-y-4">
              <h3 className="font-outfit font-bold text-xl text-white">
                Para quem prefere aprender com sequência
              </h3>
              <p className="text-xs sm:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                Os assuntos serão apresentados de maneira progressiva para facilitar a construção do conhecimento.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Aprendizado progressivo</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Conteúdo digital</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-2xl bg-[#0E131A] border border-white/10 space-y-4">
              <h3 className="font-outfit font-bold text-xl text-white">
                Para quem estuda de forma independente
              </h3>
              <p className="text-xs sm:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                Um material que poderá acompanhar a rotina de quem prefere ler, revisar e avançar no próprio ritmo.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Autonomia para estudar</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Conteúdo digital</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-7 rounded-2xl bg-[#0E131A] border border-white/10 space-y-4">
              <h3 className="font-outfit font-bold text-xl text-white">
                Para quem valoriza materiais de consulta
              </h3>
              <p className="text-xs sm:text-sm text-[#D5DDE6] leading-relaxed font-normal">
                Dois e-books reunidos para permitir que informações importantes sejam revisitadas quando necessário.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Estudo e consulta</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#111620] text-[#A7AFBA] border border-white/10">Conteúdo digital</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 6: APRESENTAÇÃO DOS DOIS E-BOOKS                                    */}
      {/* ========================================================================= */}
      <section id="ebooks" className="py-16 md:py-24 border-b border-white/[0.08] bg-[#070A0F]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
              CONTEÚDO DA COLEÇÃO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Conheça os dois e-books que formam esta coleção
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              Os dois conteúdos serão vendidos juntos e farão parte de uma única proposta de leitura.
            </p>

            <div className="pt-2">
              <span className="inline-block px-4 py-2 rounded-xl bg-[#0E131A] border border-white/10 text-xs font-bold text-[#F59A18]">
                2 e-books digitais reunidos em uma única coleção
              </span>
            </div>
          </div>

          {/* Grupo 1: PRIMEIRO E-BOOK */}
          <div className="space-y-6">
            <div className="border-l-4 border-[#F59A18] pl-4 space-y-1">
              <h3 className="font-outfit font-bold text-xl md:text-2xl text-white">
                PRIMEIRO E-BOOK
              </h3>
              <p className="text-xs sm:text-sm text-[#9BA5B3]">
                O primeiro volume ocupará este espaço assim que seu título, tema e descrição forem definidos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Estrutural 01 */}
              <div className="p-6 md:p-8 rounded-xl bg-[#0E131A] border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F59A18]">E-BOOK 01</span>
                  <span className="px-2.5 py-0.5 rounded bg-[#111620] text-[#A7AFBA] font-semibold text-[10px] uppercase">
                    COLEÇÃO DIGITAL
                  </span>
                </div>
                {/* Structural Image Space Prepared */}
                <div
                  aria-hidden="true"
                  className="aspect-[3/4] w-full max-w-[220px] mx-auto rounded-lg border border-white/10 bg-gradient-to-b from-[#121824] to-[#070A0F] shadow-inner select-none relative overflow-hidden flex flex-col justify-end p-4"
                >
                  <div className="w-12 h-1.5 rounded bg-[#F59A18]/50 mb-2" />
                  <div className="w-3/4 h-2 rounded bg-white/20 mb-1" />
                  <div className="w-1/2 h-2 rounded bg-white/15" />
                </div>
                {ebookBundle.ebookOne.title ? (
                  <div className="space-y-2 pt-2">
                    <h4 className="font-outfit font-bold text-lg text-white">{ebookBundle.ebookOne.title}</h4>
                    <p className="text-xs text-[#D5DDE6] leading-relaxed">{ebookBundle.ebookOne.description}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Grupo 2: SEGUNDO E-BOOK */}
          <div className="space-y-6 pt-4">
            <div className="border-l-4 border-[#168BFF] pl-4 space-y-1">
              <h3 className="font-outfit font-bold text-xl md:text-2xl text-white">
                SEGUNDO E-BOOK
              </h3>
              <p className="text-xs sm:text-sm text-[#9BA5B3]">
                O segundo volume ocupará este espaço assim que seu título, tema e descrição forem definidos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Estrutural 02 */}
              <div className="p-6 md:p-8 rounded-xl bg-[#0E131A] border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#168BFF]">E-BOOK 02</span>
                  <span className="px-2.5 py-0.5 rounded bg-[#111620] text-[#A7AFBA] font-semibold text-[10px] uppercase">
                    COLEÇÃO DIGITAL
                  </span>
                </div>
                {/* Structural Image Space Prepared */}
                <div
                  aria-hidden="true"
                  className="aspect-[3/4] w-full max-w-[220px] mx-auto rounded-lg border border-white/10 bg-gradient-to-b from-[#121824] to-[#070A0F] shadow-inner select-none relative overflow-hidden flex flex-col justify-end p-4"
                >
                  <div className="w-12 h-1.5 rounded bg-[#168BFF]/50 mb-2" />
                  <div className="w-3/4 h-2 rounded bg-white/20 mb-1" />
                  <div className="w-1/2 h-2 rounded bg-white/15" />
                </div>
                {ebookBundle.ebookTwo.title ? (
                  <div className="space-y-2 pt-2">
                    <h4 className="font-outfit font-bold text-lg text-white">{ebookBundle.ebookTwo.title}</h4>
                    <p className="text-xs text-[#D5DDE6] leading-relaxed">{ebookBundle.ebookTwo.description}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Bloco Final da Seção 6 */}
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#0E131A] via-[#080B10] to-[#070A0F] border border-white/10 text-center space-y-4">
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
              DOIS CONTEÚDOS EM UMA ÚNICA EXPERIÊNCIA
            </span>
            <h3 className="font-outfit font-extrabold text-xl md:text-2xl text-white max-w-2xl mx-auto">
              Uma coleção criada para transformar leitura em compreensão
            </h3>
            <p className="text-xs md:text-sm text-[#9BA5B3] max-w-xl mx-auto leading-relaxed">
              Os dois e-books estarão reunidos em um único produto digital, permitindo uma jornada de leitura mais organizada e conectada.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => scrollToSection("oferta")}
                className="min-h-[50px] px-8 inline-flex items-center justify-center gap-2 rounded-xl border border-[#FFC05A] bg-gradient-to-r from-[#FFB12B] via-[#F59A18] to-[#E98508] text-[#080B0F] font-outfit font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all"
              >
                <span>CONHECER A COLEÇÃO COMPLETA</span>
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
              ACESSO À COLEÇÃO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Receba os dois e-books em uma única compra
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              O valor, as condições de pagamento e o acesso serão apresentados aqui assim que a oferta estiver definida.
            </p>
          </div>

          {/* Offer Card Container */}
          <div className="max-w-xl mx-auto p-8 md:p-10 rounded-2xl bg-[#0E131A] border border-white/10 text-center space-y-6 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A7AFBA]">Coleção de E-books</span>
              <h3 className="font-outfit font-extrabold text-2xl text-white">
                COMBO COM 2 E-BOOKS
              </h3>
              <p className="text-xs sm:text-sm text-[#D5DDE6] pt-1">
                Dois conteúdos digitais vendidos juntos como uma única coleção.
              </p>
            </div>

            <div className="py-6 border-y border-white/10 space-y-2">
              <span className="text-xs text-[#9BA5B3] block">Status Comercial</span>
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#111620] border border-white/10 text-xs font-bold text-[#F59A18]">
                <Lock className="h-4 w-4 text-[#F59A18]" />
                <span>OFERTA EM PREPARAÇÃO</span>
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
              EXPERIÊNCIAS DE LEITURA
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Conhecimento ganha valor quando começa a fazer sentido
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              Esta área será destinada às experiências reais de leitores que adquirirem e utilizarem os dois e-books.
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
      {ebookBundle.guaranteeEnabled && (
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
              COMO VOCÊ RECEBERÁ OS E-BOOKS
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] font-normal leading-relaxed">
              Veja como funcionará o processo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Etapa 1 */}
            <div className="p-6 rounded-2xl bg-[#0E131A] border border-white/10 space-y-3">
              <span className="font-outfit font-extrabold text-2xl text-[#F59A18]">01</span>
              <h3 className="font-outfit font-bold text-lg text-white">Conheça a coleção</h3>
              <p className="text-xs text-[#D5DDE6] leading-relaxed font-normal">
                Confira a proposta dos dois e-books e verifique se os conteúdos correspondem ao conhecimento que você procura.
              </p>
            </div>

            {/* Etapa 2 */}
            <div className="p-6 rounded-2xl bg-[#0E131A] border border-white/10 space-y-3">
              <span className="font-outfit font-extrabold text-2xl text-[#168BFF]">02</span>
              <h3 className="font-outfit font-bold text-lg text-white">Acesse o checkout da Wiapy</h3>
              <p className="text-xs text-[#D5DDE6] leading-relaxed font-normal">
                Quando a oferta estiver disponível, utilize o botão oficial para entrar no ambiente de pagamento.
              </p>
            </div>

            {/* Etapa 3 */}
            <div className="p-6 rounded-2xl bg-[#0E131A] border border-white/10 space-y-3">
              <span className="font-outfit font-extrabold text-2xl text-[#F59A18]">03</span>
              <h3 className="font-outfit font-bold text-lg text-white">Conclua sua compra</h3>
              <p className="text-xs text-[#D5DDE6] leading-relaxed font-normal">
                Preencha as informações solicitadas e finalize a aquisição utilizando as opções apresentadas pela plataforma.
              </p>
            </div>

            {/* Etapa 4 */}
            <div className="p-6 rounded-2xl bg-[#0E131A] border border-white/10 space-y-3">
              <span className="font-outfit font-extrabold text-2xl text-[#168BFF]">04</span>
              <h3 className="font-outfit font-bold text-lg text-white">Siga as orientações de acesso</h3>
              <p className="text-xs text-[#D5DDE6] leading-relaxed font-normal">
                Após a confirmação, utilize as instruções fornecidas pela plataforma para acessar os dois e-books.
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
              Respostas para as principais dúvidas sobre a coleção de e-books.
            </p>
          </div>

          <div className="space-y-4">
            {visibleFaqItems.map((faq, idx) => {
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

      {/* ========================================================================= */}
      {/* RODAPÉ DA PÁGINA (INSTITUCIONAL HDZ FINANCE)                               */}
      {/* ========================================================================= */}
      <footer className="py-12 md:py-16 bg-[#040506] text-xs text-[#9BA5B3] border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2 max-w-lg">
              <span className="font-outfit font-extrabold text-xl tracking-tight text-white block">
                HDZ <span className="text-[#F59A18]">FINANCE</span>
              </span>
              <p className="leading-relaxed">
                Coleção digital formada por dois e-books desenvolvidos para oferecer uma experiência de leitura clara, organizada e construída para estudo e consulta.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-white uppercase tracking-wider block">Atendimento & Suporte</span>
              <a
                href="mailto:contato@hdzfinance.com.br"
                className="text-[#F59A18] hover:underline font-semibold block"
              >
                contato@hdzfinance.com.br
              </a>

              <div className="flex items-center space-x-3 pt-2">
                <a
                  href="https://instagram.com/hdzfinance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#0E131A] border border-white/10 hover:border-[#F59A18] text-white transition-colors"
                  aria-label="Instagram da HDZ Finance"
                >
                  <InstagramIcon className="h-4 w-4 text-[#F59A18]" />
                </a>
                <a
                  href="https://youtube.com/@hdzfinance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#0E131A] border border-white/10 hover:border-[#EF4444] text-white transition-colors"
                  aria-label="YouTube da HDZ Finance"
                >
                  <YoutubeIcon className="h-4 w-4 text-[#EF4444]" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="leading-relaxed text-[#8994A3]">
              <strong>Aviso Legal:</strong> Este produto possui finalidade exclusivamente educacional. Nenhum conteúdo deve ser interpretado como promessa de resultado ou garantia de benefício financeiro.
            </p>
            <p className="text-center md:text-left text-[#6C7685]">
              © 2026 HDZ Finance. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
