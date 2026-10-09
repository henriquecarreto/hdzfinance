"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  ChevronDown,
  ArrowRight,
  Check,
  ZoomIn,
  X,
} from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/SocialIcons";

// Configurable Ebook Bundle Sales State
const ebookBundle = {
  pageStatus: "published",
  collectionName: "Combo com 2 E-books",
  ebookOne: {
    title: "Do Clique ao Bloco",
    subject: "Blockchain & Transações",
    description:
      "Entenda o caminho de uma transação na blockchain depois de clicar em enviar.",
    coverImage: null,
    pages: "72 páginas",
    format: "PDF Digital",
  },
  ebookTwo: {
    title: "Meu Primeiro Bitcoin",
    subject: "Fundamentos & Prática",
    description:
      "Um guia para compreender o essencial e dar seus primeiros passos no universo Bitcoin.",
    coverImage: null,
    pages: "64 páginas",
    format: "PDF Digital",
  },
  price: 49.9,
  originalPrice: 99.9,
  installments: null,
  checkoutUrl: null,
  guaranteeEnabled: true,
  guaranteeDays: 7,
  offerReady: true,
};

// Preview Carousel Slides Data
const previewSlides = [
  {
    id: 1,
    title: "Guia Visual — Bitcoin Fundamentos",
    subtitle: "10 Mapas Mentais • Entender as regras e funções da rede antes de discutir preço.",
    image: "/images/products/carousel/slide-1.jpg",
  },
  {
    id: 2,
    title: "Guia Visual — Educação Financeira",
    subtitle: "10 Mapas Mentais • Organizar, proteger e planejar o próprio dinheiro.",
    image: "/images/products/carousel/slide-2.jpg",
  },
  {
    id: 3,
    title: "Guia Visual — Tokenização & Ativos Digitais",
    subtitle: "10 Mapas Mentais • Representação digital, regras de emissão e análises de liquidez.",
    image: "/images/products/carousel/slide-3.jpg",
  },
  {
    id: 4,
    title: "Mundo Real (RWA) & Estruturação",
    subtitle: "Ativos e responsáveis, informação de dados e execução jurídica dos direitos.",
    image: "/images/products/carousel/slide-4.jpg",
  },
  {
    id: 5,
    title: "Direitos Econômicos & Regras de Uso",
    subtitle: "Análise de direitos econômicos, de decisão e tratamento jurídico aplicável.",
    image: "/images/products/carousel/slide-5.jpg",
  },
];

// Duplicated array for seamless 60fps infinite marquee loop
const marqueeItems = [...previewSlides, ...previewSlides];

// Style helper for white text with fine black stroke (same as training page CTA button)
const whiteButtonTextStroke = {
  color: "#FFFFFF",
  WebkitTextFillColor: "#FFFFFF",
  WebkitTextStroke: "0.7px #000000",
  paintOrder: "stroke fill",
};

export default function EbookBundleSalesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

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

  // FAQ Items
  const allFaqItems = [
    {
      status: "published",
      question: "O que está incluído na coleção?",
      answer:
        "A coleção é formada por dois e-books digitais ('Do Clique ao Bloco' e 'Meu Primeiro Bitcoin') entregues juntos em formato PDF digital.",
    },
    {
      status: "published",
      question: "Os e-books serão vendidos separadamente?",
      answer:
        "Nesta oferta especial do combo, os dois e-books são disponibilizados juntos como um conjunto completo de leitura.",
    },
    {
      status: "published",
      question: "Em qual formato os e-books são entregues?",
      answer:
        "Os materiais são entregues em formato PDF de alta qualidade, otimizados para leitura em celulares, tablets, leitores digitais e computadores.",
    },
    {
      status: "published",
      question: "Como receberei o acesso após o pagamento?",
      answer:
        "Assim que a compra for confirmada, você receberá um e-mail automático com os links diretos para download imediato dos dois materiais.",
    },
    {
      status: "published",
      question: "Existe garantia de reembolso?",
      answer:
        "Sim! Oferecemos 7 dias de garantia incondicional. Se por qualquer motivo você achar que o conteúdo não é para você, basta solicitar o reembolso integral.",
    },
  ];

  const visibleFaqItems = allFaqItems.filter(
    (item) => item.status === "published" && item.answer !== null
  );

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1F2937] font-sans antialiased selection:bg-[#00A859]/20 selection:text-[#0B1F3A] overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* SEÇÃO 1: HERO PRINCIPAL (FUNDO BRANCO #FFFFFF)                            */}
      {/* ========================================================================= */}
      <section className="relative py-10 md:py-16 bg-[#FFFFFF] border-b border-[#D5BE97]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 space-y-8">
          
          {/* ETIQUETA EMOJI */}
          <div className="text-center">
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#EFF6FF] text-[#005ECC] border border-[#BFDBFE] text-xs font-bold uppercase tracking-widest shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              <span>COLEÇÃO DIGITAL HDZ FINANCE</span>
            </span>
          </div>

          {/* TÍTULO PRINCIPAL REORGANIZADO EM AZUL E LARANJA */}
          <h1 className="font-outfit font-extrabold text-[26px] sm:text-[36px] md:text-[44px] lg:text-[48px] text-center tracking-tight leading-[1.18] max-w-[920px] mx-auto">
            <span className="text-[#0072FC]">Dois e-books para </span>
            <span className="text-[#D96F00]">transformar informações </span>
            <span className="text-[#0072FC]">em conhecimento </span>
            <br className="hidden sm:inline" />
            <span className="text-[#D96F00]">claro e conectado.</span>
          </h1>

          {/* TEXTO DE APOIO */}
          <p className="text-[15px] sm:text-[17px] md:text-[18px] text-[#0B1F3A] text-center leading-[1.55] max-w-[760px] mx-auto font-normal">
            Alguns assuntos exigem mais do que explicações rápidas. Esta coleção reúne{" "}
            <span className="text-[#0072FC] font-bold">
              Do Clique ao Bloco
            </span>{" "}
            e{" "}
            <span className="text-[#D96F00] font-bold">
              Meu Primeiro Bitcoin
            </span>{" "}
            em uma jornada organizada para facilitar a sua leitura e consulta.
          </p>

          {/* INDICAÇÃO DE PÚBLICO */}
          <div className="max-w-2xl mx-auto text-center pt-1">
            <p className="text-xs sm:text-sm md:text-base font-outfit font-extrabold text-[#0B1F3A] tracking-wide leading-snug">
              👥 Indicado para quem prefere compreender um assunto por inteiro, construir uma base consistente e consultar o conteúdo sempre que precisar.
            </p>
          </div>

          {/* FAIXA DE DESTAQUE */}
          <div className="max-w-xl mx-auto px-4 py-2.5 rounded-xl bg-[#FFF3E6] border border-[#FE9409]/40 text-center text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#B85C00]">
            📚 DOIS E-BOOKS DIGITAIS REUNIDOS EM UMA ÚNICA COLEÇÃO
          </div>

          {/* IMAGEM PRINCIPAL DOS E-BOOKS DO COMBO */}
          <div className="pt-2">
            <div className="relative w-full max-w-[380px] sm:max-w-[520px] md:max-w-[620px] lg:max-w-[680px] mx-auto rounded-2xl p-3 sm:p-4 bg-[#FFFFFF] border-2 border-[#FE9409] shadow-lg">
              <Image
                src="/images/products/combo-ebooks-cover.jpg"
                alt="Combo de E-Books HDZ Finance"
                width={680}
                height={800}
                priority
                className="w-full h-auto object-contain rounded-xl block"
                sizes="(max-width: 640px) 380px, (max-width: 1024px) 520px, 680px"
              />
            </div>
          </div>

          {/* 4 PONTOS PRINCIPAIS */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
            <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#D5BE97] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#0072FC]/30 flex items-center justify-center text-[#0072FC] shrink-0 font-bold">
                ✓
              </div>
              <span className="text-xs sm:text-sm text-[#0B1F3A] font-bold leading-snug">
                Dois conteúdos reunidos em um único produto digital.
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#D5BE97] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#FFF3E6] border border-[#FE9409]/30 flex items-center justify-center text-[#D96F00] shrink-0 font-bold">
                ✓
              </div>
              <span className="text-xs sm:text-sm text-[#0B1F3A] font-bold leading-snug">
                Leitura organizada em uma sequência clara.
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#D5BE97] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#0072FC]/30 flex items-center justify-center text-[#0072FC] shrink-0 font-bold">
                ✓
              </div>
              <span className="text-xs sm:text-sm text-[#0B1F3A] font-bold leading-snug">
                Material em PDF desenvolvido para estudo e consulta.
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#D5BE97] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#FFF3E6] border border-[#FE9409]/30 flex items-center justify-center text-[#D96F00] shrink-0 font-bold">
                ✓
              </div>
              <span className="text-xs sm:text-sm text-[#0B1F3A] font-bold leading-snug">
                Acesso vitalício para ler no seu próprio ritmo.
              </span>
            </div>
          </div>

          {/* BOTÃO PRINCIPAL & MICROCOPY */}
          <div className="pt-4 text-center space-y-3">
            <button
              type="button"
              onClick={() => scrollToSection("oferta")}
              className="w-full sm:w-auto min-h-[52px] px-8 sm:px-10 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#00A859] hover:bg-[#008A54] focus:bg-[#008A54] text-white font-outfit font-extrabold text-sm sm:text-base uppercase tracking-wide shadow-md active:scale-[0.99] transition-all cursor-pointer"
            >
              <span style={whiteButtonTextStroke}>CONHECER O COMBO DE E-BOOKS</span>
              <ArrowRight className="h-5 w-5 text-white shrink-0" style={{ filter: "drop-shadow(-0.6px 0 0 #000000) drop-shadow(0.6px 0 0 #000000) drop-shadow(0 -0.6px 0 #000000) drop-shadow(0 0.6px 0 #000000)" }} />
            </button>

            <p className="text-xs text-[#1F2937]/70 font-medium">
              Dois e-books • Uma única coleção • Download em PDF imediato
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 1.5: CARROSSEL MARQUEE INFINITO (INFINITE AUTO-SCROLL CAROUSEL)    */}
      {/* ========================================================================= */}
      <section className="py-14 md:py-20 bg-[#FAF7F2] border-b border-[#D5BE97] overflow-hidden">
        <div className="max-w-[1360px] mx-auto space-y-8">
          
          {/* CABEÇALHO DO CARROSSEL */}
          <div className="text-center max-w-3xl mx-auto px-4 space-y-3">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#EFF6FF] text-[#005ECC] border border-[#BFDBFE]">
              <span>🔍 PRÉVIAS DOS GUIAS VISUAIS</span>
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A] tracking-tight">
              Veja uma prévia da organização das páginas
            </h2>
            <p className="text-sm md:text-base text-[#1F2937] font-normal leading-relaxed">
              Passe o mouse ou toque para pausar o carrossel. Clique em qualquer página para ampliar.
            </p>
          </div>

          {/* CARROSSEL MARQUEE INFINITO CONTÍNUO (PAUSE ON HOVER + LIGHTBOX) */}
          <div className="relative w-full overflow-hidden py-4 ticker-mask">
            <div className="flex w-max animate-marquee gap-6 sm:gap-8 hover:[animation-play-state:paused]">
              {marqueeItems.map((slide, idx) => (
                <div
                  key={`marquee-slide-${slide.id}-${idx}`}
                  onClick={() => setZoomedImage(slide.image)}
                  className="group relative w-[320px] sm:w-[400px] md:w-[460px] lg:w-[520px] shrink-0 rounded-2xl bg-[#FFFFFF] border-2 border-[#FE9409]/40 p-2.5 sm:p-3.5 shadow-lg hover:shadow-2xl hover:border-[#FE9409] transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-[3/4.3] w-full rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#D5BE97]/40 shadow-xs flex items-center justify-center">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={600}
                      height={850}
                      className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.015]"
                    />
                    
                    {/* EFEITO HOVER COM LUPA LIGHTBOX */}
                    <div className="absolute inset-0 bg-[#0B1F3A]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                      <div className="bg-[#0B1F3A] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-xl border border-[#F5B700]/60">
                        <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B700]" />
                        <span>Clique para Ampliar</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL ZOOM LIGHTBOX (BACKDROP BLUR TELAS FULL)                            */}
      {/* ========================================================================= */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 bg-[#0B1F3A]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              type="button"
              onClick={() => setZoomedImage(null)}
              className="absolute -top-12 right-0 sm:right-2 text-white hover:text-[#F5B700] p-2 rounded-full transition-colors cursor-pointer"
              aria-label="Fechar ampliação"
            >
              <X className="w-8 h-8" />
            </button>
            <Image
              src={zoomedImage}
              alt="Prévia ampliada"
              width={800}
              height={1100}
              className="w-auto h-auto max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl border-2 border-white/20"
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 2: BENEFÍCIOS CENTRAIS (FUNDO BRANCO #FFFFFF)                       */}
      {/* ========================================================================= */}
      <section className="py-14 md:py-20 bg-[#FFFFFF] border-b border-[#D5BE97]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#EFF6FF] text-[#005ECC] border border-[#BFDBFE]">
              EXPERIÊNCIA DE LEITURA
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A] tracking-tight">
              Mais do que dois arquivos, uma jornada organizada
            </h2>
            <p className="text-sm md:text-base text-[#1F2937] font-normal leading-relaxed">
              A coleção foi pensada para transformar o estudo em uma jornada mais clara, permitindo que cada conceito seja compreendido dentro de uma sequência lógica.
            </p>
          </div>

          {/* 4 CARDS DE BENEFÍCIOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#D5BE97] shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <span className="text-xs font-extrabold text-[#D96F00] uppercase tracking-wider block">01. CONEXÃO</span>
                <h3 className="font-outfit font-bold text-lg text-[#0B1F3A] leading-snug">
                  Linha de raciocínio contínua
                </h3>
                <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed font-normal">
                  Acompanhe o desenvolvimento dos assuntos sem depender de informações soltas ou explicações desconectadas.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#D5BE97] shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <span className="text-xs font-extrabold text-[#0072FC] uppercase tracking-wider block">02. CLAREZA</span>
                <h3 className="font-outfit font-bold text-lg text-[#0B1F3A] leading-snug">
                  Aprofunde a compreensão
                </h3>
                <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed font-normal">
                  Avance além de definições rápidas e entenda como os conceitos apresentados se relacionam na prática.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#D5BE97] shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <span className="text-xs font-extrabold text-[#D96F00] uppercase tracking-wider block">03. RITMO</span>
                <h3 className="font-outfit font-bold text-lg text-[#0B1F3A] leading-snug">
                  Estude no seu tempo
                </h3>
                <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed font-normal">
                  Leia, retorne aos pontos mais importantes e organize o aprendizado de acordo com a sua rotina.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#D5BE97] shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <span className="text-xs font-extrabold text-[#0072FC] uppercase tracking-wider block">04. CONSULTA</span>
                <h3 className="font-outfit font-bold text-lg text-[#0B1F3A] leading-snug">
                  Material permanente
                </h3>
                <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed font-normal">
                  Mantenha os dois conteúdos salvos para revisitar os conceitos sempre que surgir qualquer dúvida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 3: APRESENTAÇÃO DOS DOIS E-BOOKS (FUNDO SUAVE #FAF7F2)               */}
      {/* ========================================================================= */}
      <section id="ebooks" className="py-14 md:py-20 bg-[#FAF7F2] border-b border-[#D5BE97]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#FFF3E6] text-[#B85C00] border border-[#FE9409]/40">
              CONTEÚDO DA COLEÇÃO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A] tracking-tight">
              Os dois e-books incluídos no seu combo
            </h2>
            <p className="text-sm md:text-base text-[#1F2937] font-normal leading-relaxed">
              Conheça os detalhes dos dois materiais oferecidos nesta oferta promocional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* E-BOOK 01 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#0072FC]/30 shadow-md space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-[#EFF6FF] text-[#0072FC] text-xs font-extrabold border border-[#BFDBFE] uppercase">
                    E-Book 01
                  </span>
                  <span className="text-xs font-bold text-[#1F2937]/70">PDF Digital</span>
                </div>
                
                <h3 className="font-outfit font-extrabold text-xl sm:text-2xl text-[#0B1F3A]">
                  📘 {ebookBundle.ebookOne.title}
                </h3>
                <p className="text-sm text-[#1F2937] leading-relaxed">
                  {ebookBundle.ebookOne.description}
                </p>

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D5BE97]/50 space-y-2 text-xs sm:text-sm text-[#1F2937]">
                  <div className="flex items-center justify-between font-medium">
                    <span>Assunto principal:</span>
                    <span className="font-bold text-[#0B1F3A]">Blockchain & Transações</span>
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <span>Formato de entrega:</span>
                    <span className="font-bold text-[#0B1F3A]">PDF para download</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#D5BE97]/40 flex items-center justify-between text-xs text-[#0B1F3A] font-bold">
                <span>✓ Incluso no combo</span>
                <span>Acesso Imediato</span>
              </div>
            </div>

            {/* E-BOOK 02 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#FE9409]/40 shadow-md space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-[#FFF3E6] text-[#D96F00] text-xs font-extrabold border border-[#FE9409]/30 uppercase">
                    E-Book 02
                  </span>
                  <span className="text-xs font-bold text-[#1F2937]/70">PDF Digital</span>
                </div>
                
                <h3 className="font-outfit font-extrabold text-xl sm:text-2xl text-[#0B1F3A]">
                  📙 {ebookBundle.ebookTwo.title}
                </h3>
                <p className="text-sm text-[#1F2937] leading-relaxed">
                  {ebookBundle.ebookTwo.description}
                </p>

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D5BE97]/50 space-y-2 text-xs sm:text-sm text-[#1F2937]">
                  <div className="flex items-center justify-between font-medium">
                    <span>Assunto principal:</span>
                    <span className="font-bold text-[#0B1F3A]">Fundamentos & Prática</span>
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <span>Formato de entrega:</span>
                    <span className="font-bold text-[#0B1F3A]">PDF para download</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#D5BE97]/40 flex items-center justify-between text-xs text-[#0B1F3A] font-bold">
                <span>✓ Incluso no combo</span>
                <span>Acesso Imediato</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 4: SEÇÃO DE OFERTA CENTRALIZADA (#oferta - CARD ÚNICO)             */}
      {/* ========================================================================= */}
      <section id="oferta" className="py-14 md:py-18 bg-[#FFFFFF] border-b border-[#D5BE97]">
        <div className="max-w-[780px] mx-auto px-3 sm:px-6 relative">
          
          {/* ETIQUETA SUPERIOR SOBREPOSTA À BORDA DO CARD */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-24px)] max-w-max flex justify-center">
            <span className="inline-flex items-center justify-center space-x-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#F5B700] text-[#0B1F3A] font-extrabold text-[10px] xs:text-xs sm:text-sm uppercase tracking-wider shadow-xs border border-[#0B1F3A]/10 text-center leading-tight">
              <span>📚 2 E-BOOKS DIGITAIS + 🎁 COLEÇÃO COMPLETA</span>
            </span>
          </div>

          {/* SINGLE CARD CENTRALIZADO */}
          <div className="rounded-3xl bg-[#FFFFFF] border border-[#F5B700] p-4 sm:p-8 md:p-10 text-left space-y-5 sm:space-y-6 shadow-xl relative pt-7 sm:pt-10">
            
            {/* TÍTULO E DESCRIÇÃO */}
            <div className="space-y-2">
              <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0B1F3A] tracking-tight">
                COMBO DE E-BOOKS DIGITAIS
              </h2>
              <p className="text-sm sm:text-base text-[#1F2937] leading-relaxed font-normal">
                Dois conteúdos para transformar informações dispersas em uma leitura clara e conectada. Receba os dois e-books em arquivo PDF digital com download imediato.
              </p>
            </div>

            {/* PREÇO ANTERIOR E PROMOCIONAL */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs sm:text-sm font-medium text-[#0B1F3A] block">
                Combo completo com 2 e-books
              </span>
              
              {/* PREÇO ANTERIOR RISCADO */}
              <div className="text-sm sm:text-base font-bold text-[#D72638] line-through decoration-[#D72638] decoration-2">
                De R$ 99,90
              </div>

              {/* PREÇO PROMOCIONAL GRANDE */}
              <div className="flex items-baseline space-x-2">
                <span className="text-xs sm:text-sm font-extrabold text-[#0B1F3A]">POR</span>
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-[#00B56A]">
                  R$ 49,90
                </span>
              </div>

              {/* ETIQUETA PAGAMENTO ÚNICO */}
              <div>
                <span className="inline-block px-3 py-1 rounded-md bg-[#ECFDF5] text-[#00B56A] text-xs font-bold border border-[#A7F3D0]">
                  Pagamento único
                </span>
              </div>
            </div>

            {/* CONTEÚDO INCLUÍDO E BÔNUS (CARD ÚNICO EMBUTIDO) */}
            <div className="pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFBEF] border border-[#F5B700]/50 space-y-5">
                {/* PARTE 1: E-BOOKS INCLUÍDOS */}
                <div className="space-y-3">
                  <span className="font-extrabold text-[#0B1F3A] block text-xs sm:text-sm uppercase tracking-wider">
                    📚 TUDO O QUE ESTÁ INCLUÍDO NO SEU COMBO:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#1F2937]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#00A859] flex items-center justify-center text-[#FFFFFF] shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>E-book 1: Do Clique ao Bloco</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#00A859] flex items-center justify-center text-[#FFFFFF] shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>E-book 2: Meu Primeiro Bitcoin</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#00A859] flex items-center justify-center text-[#FFFFFF] shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>Arquivos digitais em formato PDF</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#00A859] flex items-center justify-center text-[#FFFFFF] shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>Leitura otimizada para cel e tablet</span>
                    </div>
                  </div>
                </div>

                {/* DIVISÓRIA INTERNA */}
                <div className="border-t border-[#F5B700]/30 pt-4 space-y-3">
                  <span className="font-extrabold text-[#0B1F3A] block text-xs sm:text-sm uppercase tracking-wider">
                    🎁 BENEFÍCIOS DO SEU ACESSO:
                  </span>
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <p className="font-extrabold text-[#0B1F3A] flex items-center gap-1.5">
                        <span>⚡</span>
                        <span>Download Imediato</span>
                      </p>
                      <p className="text-[#1F2937] leading-relaxed pl-6">
                        “Receba o acesso direto no seu e-mail assim que a compra for confirmada.”
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-extrabold text-[#0B1F3A] flex items-center gap-1.5">
                        <span>♾️</span>
                        <span>Acesso Vitalício</span>
                      </p>
                      <p className="text-[#1F2937] leading-relaxed pl-6">
                        “Guarde os e-books nos seus dispositivos para consultar sempre que precisar.”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÃO DE COMPRA VERDE */}
            <div className="pt-3 space-y-4 text-center">
              <a
                href={ebookBundle.checkoutUrl || "#"}
                target={ebookBundle.checkoutUrl ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-8 py-4 sm:py-5 rounded-2xl bg-[#00A859] hover:bg-[#008A54] focus:bg-[#008A54] active:scale-[0.99] transition-all shadow-md group cursor-pointer"
              >
                <span style={whiteButtonTextStroke} className="font-extrabold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide text-center leading-tight">
                  ACESSAR COMBO DE E-BOOKS
                </span>
                <ArrowRight
                  className="w-4 h-4 sm:w-6 sm:h-6 ml-1 text-[#FFFFFF] shrink-0"
                  style={{
                    filter:
                      "drop-shadow(-0.6px 0 0 #000000) drop-shadow(0.6px 0 0 #000000) drop-shadow(0 -0.6px 0 #000000) drop-shadow(0 0.6px 0 #000000)",
                  }}
                />
              </a>

              {/* ECONOMIA EM VERMELHO */}
              <div>
                <span className="inline-block border-2 border-[#D72638] text-[#D72638] bg-[#FFFFFF] px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-extrabold text-[11px] sm:text-xs md:text-sm uppercase tracking-wide shadow-xs text-center">
                  VOCÊ ECONOMIZA R$ 50,00
                </span>
              </div>

              {/* INFORMAÇÕES DE PAGAMENTO E GARANTIA */}
              <div className="pt-2 text-xs text-[#1F2937] space-y-1 text-center font-medium">
                <p className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-[11px] sm:text-xs">
                  <span>🔒 Pagamento seguro</span>
                  <span>•</span>
                  <span>💠 Pix</span>
                  <span>•</span>
                  <span>💳 Cartão de crédito</span>
                </p>
                <p className="text-[11px] sm:text-xs text-[#1F2937]/80">
                  7 dias de garantia incondicional. Risco zero para você.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 5: PASSO A PASSO DO ACESSO (FUNDO SUAVE #FAF7F2)                     */}
      {/* ========================================================================= */}
      <section className="py-14 md:py-20 bg-[#FAF7F2] border-b border-[#D5BE97]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#EFF6FF] text-[#005ECC] border border-[#BFDBFE]">
              PASSO A PASSO DO ACESSO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A] tracking-tight">
              Como você receberá o seu combo
            </h2>
            <p className="text-sm md:text-base text-[#1F2937] font-normal leading-relaxed">
              Veja como funciona o processo simples de aquisição e leitura
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Etapa 1 */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#D5BE97] shadow-xs space-y-3">
              <span className="font-outfit font-extrabold text-2xl text-[#D96F00]">01</span>
              <h3 className="font-outfit font-bold text-lg text-[#0B1F3A]">Escolha o combo</h3>
              <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed font-normal">
                Clique no botão de acesso para ser direcionado à página segura de checkout.
              </p>
            </div>

            {/* Etapa 2 */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#D5BE97] shadow-xs space-y-3">
              <span className="font-outfit font-extrabold text-2xl text-[#0072FC]">02</span>
              <h3 className="font-outfit font-bold text-lg text-[#0B1F3A]">Pagamento Seguro</h3>
              <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed font-normal">
                Preencha seus dados com privacidade e escolha Pix ou Cartão de crédito.
              </p>
            </div>

            {/* Etapa 3 */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#D5BE97] shadow-xs space-y-3">
              <span className="font-outfit font-extrabold text-2xl text-[#D96F00]">03</span>
              <h3 className="font-outfit font-bold text-lg text-[#0B1F3A]">Receba o E-mail</h3>
              <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed font-normal">
                Assim que aprovado, você recebe instantaneamente os links para baixar os e-books.
              </p>
            </div>

            {/* Etapa 4 */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#D5BE97] shadow-xs space-y-3">
              <span className="font-outfit font-extrabold text-2xl text-[#0072FC]">04</span>
              <h3 className="font-outfit font-bold text-lg text-[#0B1F3A]">Boa Leitura</h3>
              <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed font-normal">
                Faça o download nos seus dispositivos e leia onde e quando quiser.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 6: PERGUNTAS FREQUENTES (FAQ ACCORDION)                              */}
      {/* ========================================================================= */}
      <section className="py-14 md:py-20 bg-[#FFFFFF] border-b border-[#D5BE97]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#FFF3E6] text-[#B85C00] border border-[#FE9409]/40">
              TIRE SUAS DÚVIDAS
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A] tracking-tight">
              Perguntas Frequentes
            </h2>
            <p className="text-sm md:text-base text-[#1F2937] font-normal leading-relaxed">
              Respostas para as principais dúvidas sobre o combo de e-books.
            </p>
          </div>

          <div className="space-y-3">
            {visibleFaqItems.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#FFFFFF] border border-[#D5BE97] overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 font-outfit font-bold text-base md:text-lg text-[#0B1F3A] hover:text-[#0072FC] transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#E9991C] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 md:px-6 pb-6 text-xs sm:text-sm text-[#1F2937] leading-relaxed font-normal border-t border-[#D5BE97]/40 pt-4 bg-[#FAF7F2]/60">
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
      {/* RODAPÉ INSTITUCIONAL HDZ FINANCE                                         */}
      {/* ========================================================================= */}
      <footer className="py-12 md:py-16 bg-[#0B1F3A] text-xs text-[#D5DDE6] border-t border-[#D5BE97]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2 max-w-lg">
              <span className="font-outfit font-extrabold text-xl tracking-tight text-white block">
                HDZ <span className="text-[#E9991C]">FINANCE</span>
              </span>
              <p className="leading-relaxed text-[#D5DDE6]/90">
                Coleção digital formada por dois e-books desenvolvidos para oferecer uma experiência de leitura clara, organizada e construída para estudo e consulta.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-white uppercase tracking-wider block">Atendimento & Suporte</span>
              <a
                href="mailto:contato@hdzfinance.com.br"
                className="text-[#E9991C] hover:underline font-semibold block text-sm"
              >
                contato@hdzfinance.com.br
              </a>

              <div className="flex items-center space-x-3 pt-2">
                <a
                  href="https://instagram.com/hdzfinance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/10 border border-white/10 hover:border-[#E9991C] text-white transition-colors"
                  aria-label="Instagram da HDZ Finance"
                >
                  <InstagramIcon className="h-4 w-4 text-[#E9991C]" />
                </a>
                <a
                  href="https://youtube.com/@hdzfinance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/10 border border-white/10 hover:border-[#EF4444] text-white transition-colors"
                  aria-label="YouTube da HDZ Finance"
                >
                  <YoutubeIcon className="h-4 w-4 text-[#EF4444]" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="leading-relaxed text-[#D5DDE6]/80">
              <strong>Aviso Legal:</strong> Este produto possui finalidade exclusivamente educacional. Nenhum conteúdo deve ser interpretado como promessa de resultado ou garantia de benefício financeiro.
            </p>
            <p className="text-center md:text-left text-[#D5DDE6]/60">
              © 2026 HDZ Finance. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
