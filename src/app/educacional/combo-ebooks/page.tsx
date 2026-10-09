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
  FileText,
} from "lucide-react";

// =============================================================================
// CONFIGURAÇÕES COMERCIAIS DAS COLEÇÕES (Valores nulos até definição comercial)
// =============================================================================
const precoColecaoInicial: number | null = null;
const precoColecaoCompleta: number | null = null;
const checkoutColecaoInicial: string | null = null;
const checkoutColecaoCompleta: string | null = null;

// Configuração interna dos materiais da Coleção
const ebookBundle = {
  pageStatus: "published",
  collectionName: "Coleção Visual HDZ Finance",
  ebookOne: {
    title: "Do Clique ao Bloco",
    subject: "Blockchain & Transações",
    description:
      "Acompanhe o caminho de uma transação, do envio ao registro na blockchain.",
    coverImage: null,
    format: "E-book digital em PDF",
  },
  ebookTwo: {
    title: "Meu Primeiro Bitcoin",
    subject: "Introdução ao Bitcoin",
    description:
      "Uma leitura introdutória para compreender o essencial e contextualizar os primeiros passos no universo Bitcoin.",
    coverImage: null,
    format: "E-book digital em PDF",
  },
};

// Carrossel Marquee Infinito — Prévias dos Guias Visuais (10 Slides)
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
  {
    id: 6,
    title: "Como a Caderneta de Poupança Rende",
    subtitle: "Regras de remuneração, Meta Selic e efeito da data de aniversário.",
    image: "/images/products/carousel/slide-6.jpg",
  },
  {
    id: 7,
    title: "Fundos, ETFs e FIIs: Estruturas Diferentes",
    subtitle: "Políticas de investimento, negociação e riscos de cada estrutura.",
    image: "/images/products/carousel/slide-7.jpg",
  },
  {
    id: 8,
    title: "Escassez e Custo de Oportunidade",
    subtitle: "Como recursos limitados e decisões orientam escolhas financeiras.",
    image: "/images/products/carousel/slide-8.jpg",
  },
  {
    id: 9,
    title: "Oferta, Demanda e Preços",
    subtitle: "A interação entre oferta e demanda na definição dos preços.",
    image: "/images/products/carousel/slide-9.jpg",
  },
  {
    id: 10,
    title: "Retorno Nominal e Real",
    subtitle: "Entenda a diferença entre variação em dinheiro e poder de compra.",
    image: "/images/products/carousel/slide-10.jpg",
  },
];

// Array duplicado para loop infinito 60fps sem solavancos
const marqueeItems = [...previewSlides, ...previewSlides];

// Catálogo dos 9 Guias Visuais
const catalogGuias = [
  {
    number: "01",
    title: "Guia Visual Educação Financeira",
    description:
      "Compreenda orçamento, reserva de emergência, crédito, metas e hábitos e diferencie renda de patrimônio.",
    badge: "INICIAL E COMPLETA",
    type: "initial",
  },
  {
    number: "02",
    title: "Guia Visual Economia, Juros e Inflação",
    description:
      "Relacione escassez, preços, juros, inflação e câmbio e entenda a diferença entre retorno nominal e real.",
    badge: "INICIAL E COMPLETA",
    type: "initial",
  },
  {
    number: "03",
    title: "Guia Visual Investimentos",
    description:
      "Diferencie renda fixa, ações e formas de retorno e estude risco, liquidez, custos e diversificação.",
    badge: "INICIAL E COMPLETA",
    type: "initial",
  },
  {
    number: "04",
    title: "Guia Visual Fundamentos do Bitcoin",
    description:
      "Entenda emissão, halving, transações, nós, mineração e custódia antes de aprofundar a discussão sobre preço.",
    badge: "INICIAL E COMPLETA",
    type: "initial",
  },
  {
    number: "05",
    title: "Guia Visual Criptografia",
    description:
      "Entenda chaves, hashes, assinaturas e recuperação de carteiras e reconheça pontos de atenção em golpes e permissões.",
    badge: "COLEÇÃO COMPLETA",
    type: "complete",
  },
  {
    number: "06",
    title: "Guia Visual Dólar Digital",
    description:
      "Diferencie stablecoins e moedas digitais e examine os conceitos de reservas, paridade, resgate, câmbio e redes.",
    badge: "COLEÇÃO COMPLETA",
    type: "complete",
  },
  {
    number: "07",
    title: "Guia Visual Blockchain",
    description:
      "Compare mecanismos de consenso, modelos de registro, governança e bridges e entenda quando a tecnologia faz sentido.",
    badge: "COLEÇÃO COMPLETA",
    type: "complete",
  },
  {
    number: "08",
    title: "Guia Visual Tokenização",
    description:
      "Relacione tokens, NFTs e RWA aos direitos e ativos representados e conheça o ciclo de emissão, circulação e encerramento.",
    badge: "COLEÇÃO COMPLETA",
    type: "complete",
  },
  {
    number: "09",
    title: "Guia Visual Mentalidade Bitcoiner",
    description:
      "Um guia dedicado à mentalidade bitcoiner para complementar seus estudos sobre Bitcoin.",
    badge: "COLEÇÃO COMPLETA",
    type: "complete",
  },
];

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

  // FAQ Items (Ampliado para 9 perguntas conforme briefing)
  const allFaqItems = [
    {
      question: "O que está incluído em cada coleção?",
      answer:
        "A Coleção Inicial reúne quatro guias visuais (Educação Financeira; Economia, Juros e Inflação; Investimentos; Fundamentos do Bitcoin). A Coleção Completa inclui esses mesmos quatro guias, mais cinco guias adicionais (Criptografia, Dólar Digital, Blockchain, Tokenização e Mentalidade Bitcoiner) e dois e-books bônus (Do Clique ao Bloco e Meu Primeiro Bitcoin), somando 11 materiais.",
    },
    {
      question: "Em qual formato os materiais são entregues?",
      answer:
        "Todos os guias visuais e e-books bônus são entregues em formato PDF digital de alta resolução, otimizados para leitura e consulta em celulares, tablets, leitores digitais e computadores.",
    },
    {
      question: "Os guias e e-books são vendidos separadamente?",
      answer:
        "Nesta oferta, os materiais estão organizados em duas coleções fechadas (Inicial e Completa) para garantir uma sequência lógica de estudo com condições especiais.",
    },
    {
      question: "Como receberei o acesso após a compra?",
      answer:
        "Assim que a confirmação do pagamento for concluída, você receberá um e-mail com as orientações e os links diretos para download dos PDFs correspondentes ao seu plano.",
    },
    {
      question: "Existe garantia de reembolso?",
      answer:
        "Sim. Oferecemos 7 dias de garantia incondicional. Você pode baixar os arquivos, avaliar a organização do conteúdo e, se considerar que não atende às suas expectativas, solicitar o reembolso integral dentro do prazo.",
    },
    {
      question: "Qual a diferença entre os guias visuais e os e-books bônus?",
      answer:
        "Os guias visuais organizam conceitos fundamentais em mapas conceituais para consulta rápida. Os e-books bônus ('Do Clique ao Bloco' e 'Meu Primeiro Bitcoin') são leituras complementares em texto contínuo incluídas exclusivamente na Coleção Completa.",
    },
    {
      question: "Preciso de conhecimento prévio para estudar os guias?",
      answer:
        "Não. Os materiais foram desenvolvidos com linguagem didática e progressiva, partindo da organização financeira pessoal e do contexto econômico até os fundamentos do Bitcoin e ativos digitais.",
    },
    {
      question: "Posso imprimir os arquivos em PDF?",
      answer:
        "Sim. Os arquivos digitais em PDF podem ser salvos nos seus dispositivos e impressos para uso pessoal de estudo.",
    },
    {
      question: "Por quanto tempo terei acesso aos arquivos baixados?",
      answer:
        "Após realizar o download para o seu dispositivo, os arquivos em PDF ficam gravados localmente com você para consulta por tempo indeterminado.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1F2937] font-sans antialiased selection:bg-[#1D4ED8]/20 selection:text-[#0B1F3A] overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* FAIXA DE ALERTA SUPERIOR                                                   */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#0B1F3A] text-white py-2.5 px-4 text-center text-xs md:text-sm font-extrabold uppercase tracking-wider border-b border-[#E2E8F0]/20">
        <span>GUIAS VISUAIS PARA ENTENDER FINANÇAS, ECONOMIA E BITCOIN. CONHEÇA AS COLEÇÕES.</span>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO PRINCIPAL                                                         */}
      {/* ========================================================================= */}
      <section className="relative py-12 md:py-20 bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 space-y-8">
          
          {/* ETIQUETA / IDENTIFICADOR */}
          <div className="text-center">
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-[#EFF6FF] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" />
              <span>COLEÇÃO VISUAL HDZ FINANCE</span>
            </span>
          </div>

          {/* H1 PRINCIPAL */}
          <h1 className="font-outfit font-extrabold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] text-[#0B1F3A] text-center tracking-tight leading-[1.12] max-w-[960px] mx-auto">
            Entenda seu dinheiro, <span className="text-[#1D4ED8]">os investimentos e o Bitcoin</span> com mais clareza.
          </h1>

          {/* SUBTÍTULO */}
          <p className="text-[17px] sm:text-[18px] md:text-[20px] text-[#475569] text-center leading-[1.6] max-w-[820px] mx-auto font-normal">
            Guias visuais em PDF que conectam educação financeira, economia, investimentos e fundamentos do Bitcoin. Comece com quatro guias ou escolha a coleção completa com nove guias e dois e-books bônus.
          </p>

          {/* LINHA DE IDENTIFICAÇÃO DE PÚBLICO */}
          <div className="max-w-2xl mx-auto text-center pt-1">
            <p className="text-xs sm:text-sm md:text-base font-outfit font-semibold text-[#0B1F3A] tracking-wide leading-relaxed">
              Para quem quer organizar o conhecimento financeiro, compreender os principais conceitos e consultar o essencial no próprio ritmo.
            </p>
          </div>

          {/* BOTÃO PRINCIPAL HERÓICO ANTES DA IMAGEM */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => scrollToSection("oferta")}
              className="w-full sm:w-auto min-h-[52px] px-6 sm:px-8 py-3.5 rounded-[12px] bg-[#047857] hover:bg-[#065F46] focus:outline-none focus:ring-4 focus:ring-[#1D4ED8]/30 text-white font-outfit font-bold text-base uppercase tracking-wide shadow-md transition-all cursor-pointer"
            >
              ESCOLHER MINHA COLEÇÃO
            </button>
          </div>

          {/* SELO DE CONTAGEM */}
          <div className="max-w-md mx-auto px-4 py-2 rounded-full bg-[#FFFBEB] border border-[#F59E0B]/30 text-center text-xs font-bold uppercase tracking-wider text-[#B45309]">
            INICIAL: 4 GUIAS | COMPLETA: 9 GUIAS + 2 E-BOOKS BÔNUS
          </div>

          {/* IMAGEM PRINCIPAL PRESERVADA */}
          <div className="pt-2">
            <div className="relative w-full max-w-[380px] sm:max-w-[520px] md:max-w-[620px] lg:max-w-[680px] mx-auto rounded-[20px] p-3 sm:p-4 bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)]">
              <Image
                src="/images/products/combo-ebooks-cover.jpg"
                alt="Guias visuais HDZ Finance sobre finanças, economia, investimentos e Bitcoin."
                width={680}
                height={800}
                priority
                className="w-full h-auto object-contain rounded-xl block"
                sizes="(max-width: 640px) 380px, (max-width: 1024px) 520px, 680px"
              />
            </div>
          </div>

          {/* 4 BENEFÍCIOS CURTOS */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-left">
            <div className="flex items-center space-x-3 p-4 rounded-[16px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#EFF6FF] flex items-center justify-center text-[#1D4ED8] shrink-0 font-bold">
                ✓
              </div>
              <span className="text-sm text-[#1F2937] font-semibold leading-snug">
                Conceitos organizados por tema para estudar e consultar.
              </span>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-[16px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] border border-[#FFFBEB] flex items-center justify-center text-[#B45309] shrink-0 font-bold">
                ✓
              </div>
              <span className="text-sm text-[#1F2937] font-semibold leading-snug">
                Dinheiro, economia, investimentos e Bitcoin em uma sequência sugerida.
              </span>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-[16px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#EFF6FF] flex items-center justify-center text-[#1D4ED8] shrink-0 font-bold">
                ✓
              </div>
              <span className="text-sm text-[#1F2937] font-semibold leading-snug">
                Arquivos em PDF para acessar pelo celular, tablet ou computador.
              </span>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-[16px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] border border-[#FFFBEB] flex items-center justify-center text-[#B45309] shrink-0 font-bold">
                ✓
              </div>
              <span className="text-sm text-[#1F2937] font-semibold leading-snug">
                Materiais para baixar e revisitar no seu próprio ritmo.
              </span>
            </div>
          </div>

          {/* BOTÃO ABAIXO DA IMAGEM E BENEFÍCIOS */}
          <div className="pt-4 text-center space-y-2">
            <button
              type="button"
              onClick={() => scrollToSection("hdz-guias")}
              className="w-full sm:w-auto min-h-[52px] px-8 sm:px-10 inline-flex items-center justify-center gap-3 rounded-[12px] bg-[#047857] hover:bg-[#065F46] focus:outline-none focus:ring-4 focus:ring-[#1D4ED8]/30 text-white font-outfit font-bold text-base uppercase tracking-wide shadow-md transition-all cursor-pointer"
            >
              <span>CONHECER OS MATERIAIS</span>
              <ArrowRight className="h-5 w-5 text-white shrink-0" />
            </button>

            <p className="text-xs text-[#475569] font-medium">
              Materiais digitais em PDF. Confira o conteúdo de cada coleção antes de escolher.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CARROSSEL EXISTENTE COM COPY ATUALIZADA                                 */}
      {/* ========================================================================= */}
      <section className="py-12 md:py-20 bg-[#FAF7F2] border-b border-[#E2E8F0] overflow-hidden">
        <div className="max-w-[1360px] mx-auto space-y-8">
          
          {/* CABEÇALHO DO CARROSSEL */}
          <div className="text-center max-w-[760px] mx-auto px-5 space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest bg-[#EFF6FF] text-[#1D4ED8] border border-[#EFF6FF]">
              PRÉVIAS REAIS DOS GUIAS VISUAIS
            </span>
            <h2 className="font-outfit font-bold text-[28px] sm:text-[32px] md:text-[38px] text-[#0B1F3A] leading-[1.2]">
              Veja como os conceitos são apresentados por dentro.
            </h2>
            <p className="text-[16px] text-[#475569] leading-[1.65]">
              Explore capas e páginas da coleção. Cada guia organiza um tema em explicações visuais para facilitar o estudo e a consulta.
            </p>
            <div className="space-y-1 text-xs text-[#475569] pt-1 font-medium">
              <p>As prévias mostram materiais das duas coleções. Confira quais estão incluídos no plano escolhido.</p>
              <p className="text-[#1D4ED8] font-semibold">Passe o mouse ou toque para pausar o carrossel. Clique em qualquer página para ampliar.</p>
            </div>
          </div>

          {/* CARROSSEL MARQUEE INFINITO (PRESERVADO) */}
          <div className="relative w-full overflow-hidden py-4 ticker-mask">
            <div className="flex w-max animate-marquee gap-6 sm:gap-8 hover:[animation-play-state:paused]">
              {marqueeItems.map((slide, idx) => (
                <div
                  key={`marquee-slide-${slide.id}-${idx}`}
                  onClick={() => setZoomedImage(slide.image)}
                  className="group relative w-[320px] sm:w-[400px] md:w-[460px] lg:w-[520px] shrink-0 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] p-3 shadow-[0_8px_24px_rgba(11,31,58,0.06)] hover:shadow-xl hover:border-[#1D4ED8] transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-[3/4.3] w-full rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E2E8F0] shadow-xs flex items-center justify-center">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={600}
                      height={850}
                      className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.015]"
                    />
                    
                    {/* EFEITO HOVER COM LUPA LIGHTBOX */}
                    <div className="absolute inset-0 bg-[#0B1F3A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                      <div className="bg-[#0B1F3A] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xl border border-white/20">
                        <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B]" />
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

      {/* MODAL ZOOM LIGHTBOX PRESERVADO */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 bg-[#0B1F3A]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              type="button"
              onClick={() => setZoomedImage(null)}
              className="absolute -top-12 right-0 sm:right-2 text-white hover:text-[#F59E0B] p-2 rounded-full transition-colors cursor-pointer"
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
      {/* 3. EXPERIÊNCIA DE LEITURA EXISTENTE REESCRITA                            */}
      {/* ========================================================================= */}
      <section className="py-12 md:py-20 bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 space-y-10">
          <div className="text-center max-w-[760px] mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest bg-[#EFF6FF] text-[#1D4ED8] border border-[#EFF6FF]">
              CONHECIMENTO ORGANIZADO
            </span>
            <h2 className="font-outfit font-bold text-[28px] sm:text-[32px] md:text-[38px] text-[#0B1F3A] leading-[1.2]">
              Conecte os conceitos que aparecem na sua vida financeira.
            </h2>
            <p className="text-[16px] text-[#475569] leading-[1.65]">
              Você encontra termos sobre juros, inflação, investimentos e Bitcoin em muitos lugares. A coleção reúne uma base visual para estudar esses assuntos com uma ordem sugerida e voltar aos pontos que ainda geram dúvida.
            </p>
          </div>

          {/* 4 CARDS DE EXPERIÊNCIA DE LEITURA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Card 1 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[12px] font-bold text-[#B45309] uppercase tracking-wider block">01. BASE</span>
                <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                  Organize sua base financeira.
                </h3>
                <p className="text-[16px] text-[#475569] leading-[1.65]">
                  Compreenda orçamento, reserva, dívidas, metas e a diferença entre renda e patrimônio.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[12px] font-bold text-[#1D4ED8] uppercase tracking-wider block">02. CONTEXTO</span>
                <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                  Entenda o contexto dos números.
                </h3>
                <p className="text-[16px] text-[#475569] leading-[1.65]">
                  Relacione juros, inflação e poder de compra, distinguindo o crescimento do saldo do resultado em termos reais.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[12px] font-bold text-[#B45309] uppercase tracking-wider block">03. COMPARAÇÃO</span>
                <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                  Compare conceitos antes de decidir.
                </h3>
                <p className="text-[16px] text-[#475569] leading-[1.65]">
                  Estude formas de retorno, risco, liquidez e diversificação e entenda como esses critérios se relacionam.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[12px] font-bold text-[#1D4ED8] uppercase tracking-wider block">04. BITCOIN</span>
                <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                  Conheça o Bitcoin além da cotação.
                </h3>
                <p className="text-[16px] text-[#475569] leading-[1.65]">
                  Compreenda emissão, transações, verificação e custódia, com uma base para continuar seus estudos.
                </p>
              </div>
            </div>
          </div>

          {/* BOTÃO APÓS OS 4 CARDS */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => scrollToSection("oferta")}
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-[12px] bg-[#047857] hover:bg-[#065F46] focus:outline-none focus:ring-4 focus:ring-[#1D4ED8]/30 text-white font-outfit font-bold text-base uppercase tracking-wide shadow-md transition-all cursor-pointer"
            >
              VER AS DUAS COLEÇÕES
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. NOVA SEÇÃO DE PÚBLICO (#hdz-publico)                                   */}
      {/* ========================================================================= */}
      <section id="hdz-publico" className="py-12 md:py-20 bg-[#FAF7F2] border-b border-[#E2E8F0]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 space-y-10">
          
          <div className="text-center max-w-[760px] mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest bg-[#EFF6FF] text-[#1D4ED8] border border-[#EFF6FF]">
              PARA QUEM É A COLEÇÃO
            </span>
            <h2 className="font-outfit font-bold text-[28px] sm:text-[32px] md:text-[38px] text-[#0B1F3A] leading-[1.2]">
              Para quem quer entender antes de decidir.
            </h2>
            <p className="text-[16px] text-[#475569] leading-[1.65]">
              Uma coleção para construir uma base de conhecimento e revisitar conceitos conforme suas necessidades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Card 1 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] space-y-3 text-left">
              <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                Quem está organizando as próprias finanças.
              </h3>
              <p className="text-[16px] text-[#475569] leading-[1.65]">
                Quer compreender orçamento, dívidas, reserva e metas antes de avançar para investimentos.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] space-y-3 text-left">
              <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                Quem quer conectar os conceitos financeiros.
              </h3>
              <p className="text-[16px] text-[#475569] leading-[1.65]">
                Busca entender como juros, inflação, retorno e liquidez aparecem nas decisões do dia a dia.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] space-y-3 text-left">
              <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                Quem está começando a estudar Bitcoin.
              </h3>
              <p className="text-[16px] text-[#475569] leading-[1.65]">
                Prefere conhecer as regras e o funcionamento da rede antes de se concentrar na cotação.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] space-y-3 text-left">
              <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                Quem quer compreender os ativos digitais.
              </h3>
              <p className="text-[16px] text-[#475569] leading-[1.65]">
                Busca estudar criptografia, redes, stablecoins e tokenização com os guias adicionais da Coleção Completa.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. NOVO ROTEIRO DE ESTUDO (#hdz-roteiro)                                  */}
      {/* ========================================================================= */}
      <section id="hdz-roteiro" className="py-12 md:py-20 bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 space-y-10">
          
          <div className="text-center max-w-[760px] mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest bg-[#EFF6FF] text-[#1D4ED8] border border-[#EFF6FF]">
              ESTUDE NO SEU RITMO
            </span>
            <h2 className="font-outfit font-bold text-[28px] sm:text-[32px] md:text-[38px] text-[#0B1F3A] leading-[1.2]">
              Uma sequência sugerida para começar e avançar.
            </h2>
            <p className="text-[16px] text-[#475569] leading-[1.65]">
              Escolha um tema, observe o mapa visual e retome a explicação quando precisar. Você pode seguir esta ordem ou consultar diretamente o assunto que gerou sua dúvida.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Etapa 01 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] space-y-4 text-left">
              <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] font-outfit font-bold text-lg flex items-center justify-center">
                01
              </div>
              <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                Dinheiro e economia.
              </h3>
              <p className="text-[16px] text-[#475569] leading-[1.65]">
                Comece por Educação Financeira e Economia, Juros e Inflação para relacionar sua organização financeira ao contexto econômico.
              </p>
            </div>

            {/* Etapa 02 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] space-y-4 text-left">
              <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] font-outfit font-bold text-lg flex items-center justify-center">
                02
              </div>
              <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                Investimentos e fundamentos do Bitcoin.
              </h3>
              <p className="text-[16px] text-[#475569] leading-[1.65]">
                Avance para as formas de retorno, risco e liquidez e para as regras e o funcionamento da rede Bitcoin.
              </p>
            </div>

            {/* Etapa 03 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] space-y-4 text-left">
              <div className="w-11 h-11 rounded-xl bg-[#FFFBEB] text-[#B45309] font-outfit font-bold text-lg flex items-center justify-center">
                03
              </div>
              <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                Estruturas digitais e leitura complementar.
              </h3>
              <p className="text-[16px] text-[#475569] leading-[1.65]">
                Na Coleção Completa, continue com os cinco guias adicionais e os dois e-books bônus.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. NOVO CATÁLOGO DOS 9 GUIAS VISUAIS (#hdz-guias)                         */}
      {/* ========================================================================= */}
      <section id="hdz-guias" className="py-12 md:py-20 bg-[#FAF7F2] border-b border-[#E2E8F0]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 space-y-10">
          
          <div className="text-center max-w-[760px] mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest bg-[#EFF6FF] text-[#1D4ED8] border border-[#EFF6FF]">
              CONTEÚDO DAS COLEÇÕES
            </span>
            <h2 className="font-outfit font-bold text-[28px] sm:text-[32px] md:text-[38px] text-[#0B1F3A] leading-[1.2]">
              Conheça os guias e escolha o alcance dos seus estudos.
            </h2>
            <p className="text-[16px] text-[#475569] leading-[1.65]">
              A Coleção Inicial reúne quatro guias para construir sua base. A Coleção Completa inclui esses mesmos materiais e acrescenta cinco guias e dois e-books bônus.
            </p>
          </div>

          {/* GRID DOS 9 GUIAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {catalogGuias.map((guia) => {
              const isInitial = guia.type === "initial";
              return (
                <div
                  key={guia.number}
                  className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] flex flex-col justify-between space-y-4 text-left"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-11 h-11 rounded-xl font-outfit font-bold text-lg flex items-center justify-center ${
                          isInitial
                            ? "bg-[#EFF6FF] text-[#1D4ED8]"
                            : "bg-[#FFFBEB] text-[#B45309]"
                        }`}
                      >
                        {guia.number}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          isInitial
                            ? "bg-[#EFF6FF] text-[#1D4ED8] border border-[#EFF6FF]"
                            : "bg-[#FFFBEB] text-[#B45309] border border-[#FFFBEB]"
                        }`}
                      >
                        {guia.badge}
                      </span>
                    </div>

                    <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                      {guia.title}
                    </h3>

                    <p className="text-[16px] text-[#475569] leading-[1.65]">
                      {guia.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0] text-xs font-semibold text-[#475569] flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#1D4ED8]" />
                    <span>Guia digital em PDF</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTÃO ABAIXO DO CATÁLOGO */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => scrollToSection("oferta")}
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-[12px] bg-[#047857] hover:bg-[#065F46] focus:outline-none focus:ring-4 focus:ring-[#1D4ED8]/30 text-white font-outfit font-bold text-base uppercase tracking-wide shadow-md transition-all cursor-pointer"
            >
              ESCOLHER MINHA COLEÇÃO
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SEÇÃO EXISTENTE #ebooks (APRESENTADA COMO BÔNUS DA COMPLETA)           */}
      {/* ========================================================================= */}
      <section id="ebooks" className="py-12 md:py-20 bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 space-y-10">
          
          <div className="text-center max-w-[760px] mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest bg-[#FFFBEB] text-[#B45309] border border-[#FFFBEB]">
              2 E-BOOKS BÔNUS NA COLEÇÃO COMPLETA
            </span>
            <h2 className="font-outfit font-bold text-[28px] sm:text-[32px] md:text-[38px] text-[#0B1F3A] leading-[1.2]">
              Continue a leitura com dois e-books complementares.
            </h2>
            <p className="text-[16px] text-[#475569] leading-[1.65]">
              Além dos nove guias visuais, a Coleção Completa inclui duas leituras para aprofundar sua compreensão do Bitcoin e das transações em blockchain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* E-BOOK 01 */}
            <div className="p-6 md:p-8 rounded-[20px] bg-[#FFFFFF] border-2 border-[#1D4ED8]/30 shadow-[0_8px_24px_rgba(11,31,58,0.06)] space-y-5 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-[#EFF6FF] text-[#1D4ED8] text-xs font-bold border border-[#EFF6FF] uppercase">
                    BÔNUS 01 | PDF DIGITAL
                  </span>
                  <span className="text-xs font-semibold text-[#475569]">Formato PDF</span>
                </div>
                
                <h3 className="font-outfit font-bold text-[20px] text-[#0B1F3A] leading-[1.3]">
                  📘 {ebookBundle.ebookOne.title}
                </h3>
                <p className="text-[16px] text-[#475569] leading-[1.65]">
                  {ebookBundle.ebookOne.description}
                </p>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E2E8F0] space-y-2 text-xs sm:text-sm text-[#475569]">
                  <div className="flex items-center justify-between font-medium">
                    <span>Assunto principal:</span>
                    <span className="font-bold text-[#0B1F3A]">Blockchain e transações</span>
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <span>Formato de entrega:</span>
                    <span className="font-bold text-[#0B1F3A]">E-book digital em PDF</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#0B1F3A] font-bold">
                <span className="text-[#047857]">✓ INCLUÍDO NA COLEÇÃO COMPLETA</span>
                <span>Download em PDF</span>
              </div>
            </div>

            {/* E-BOOK 02 */}
            <div className="p-6 md:p-8 rounded-[20px] bg-[#FFFFFF] border-2 border-[#F59E0B]/40 shadow-[0_8px_24px_rgba(11,31,58,0.06)] space-y-5 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-[#FFFBEB] text-[#B45309] text-xs font-bold border border-[#FFFBEB] uppercase">
                    BÔNUS 02 | PDF DIGITAL
                  </span>
                  <span className="text-xs font-semibold text-[#475569]">Formato PDF</span>
                </div>
                
                <h3 className="font-outfit font-bold text-[20px] text-[#0B1F3A] leading-[1.3]">
                  📙 {ebookBundle.ebookTwo.title}
                </h3>
                <p className="text-[16px] text-[#475569] leading-[1.65]">
                  {ebookBundle.ebookTwo.description}
                </p>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E2E8F0] space-y-2 text-xs sm:text-sm text-[#475569]">
                  <div className="flex items-center justify-between font-medium">
                    <span>Assunto principal:</span>
                    <span className="font-bold text-[#0B1F3A]">Introdução ao Bitcoin</span>
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <span>Formato de entrega:</span>
                    <span className="font-bold text-[#0B1F3A]">E-book digital em PDF</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#0B1F3A] font-bold">
                <span className="text-[#047857]">✓ INCLUÍDO NA COLEÇÃO COMPLETA</span>
                <span>Download em PDF</span>
              </div>
            </div>
          </div>

          {/* NOTA ABAIXO DOS CARDS */}
          <div className="text-center pt-1">
            <p className="text-xs sm:text-sm text-[#475569] font-medium max-w-2xl mx-auto">
              Os dois e-books bônus estão incluídos na Coleção Completa. A Coleção Inicial contém os quatro guias apresentados acima.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. REGIÃO DE OFERTA (#oferta — DOIS PLANOS E TABELA COMPARATIVA)          */}
      {/* ========================================================================= */}
      <section id="oferta" className="py-12 md:py-20 bg-[#FAF7F2] border-b border-[#E2E8F0]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 space-y-12">
          
          <div className="text-center max-w-[760px] mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest bg-[#EFF6FF] text-[#1D4ED8] border border-[#EFF6FF]">
              DUAS OPÇÕES PARA SEUS ESTUDOS
            </span>
            <h2 className="font-outfit font-bold text-[28px] sm:text-[32px] md:text-[38px] text-[#0B1F3A] leading-[1.2]">
              Escolha a coleção que acompanha seu momento de estudo.
            </h2>
            <p className="text-[16px] text-[#475569] leading-[1.65]">
              Comece com os quatro guias da base ou leve a Coleção Completa para ampliar seus estudos sobre Bitcoin e ativos digitais.
            </p>
          </div>

          {/* SEQUÊNCIA VERTICAL DOS DOIS CARDS DE OFERTA */}
          <div className="max-w-[840px] mx-auto space-y-8">
            
            {/* CARD 1 — COLEÇÃO INICIAL */}
            <div className="rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] p-6 sm:p-8 md:p-10 text-left space-y-6 shadow-[0_8px_24px_rgba(11,31,58,0.06)] relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] text-xs font-bold uppercase tracking-wider mb-2">
                    4 GUIAS VISUAIS
                  </span>
                  <h3 className="font-outfit font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    COLEÇÃO INICIAL
                  </h3>
                </div>

                {/* Bloco de Preço Dinâmico / Indefinido */}
                {precoColecaoInicial !== null ? (
                  <div className="text-right">
                    <span className="text-xs font-semibold text-[#475569] block">Investimento</span>
                    <span className="text-3xl font-extrabold text-[#047857]">
                      R$ {precoColecaoInicial.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                ) : null}
              </div>

              <p className="text-[16px] text-[#475569] leading-[1.65]">
                Uma base organizada para compreender suas finanças, o contexto econômico, os investimentos e os fundamentos do Bitcoin.
              </p>

              {/* LISTA DE MATERIAIS */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E2E8F0] space-y-4">
                <span className="font-bold text-[#0B1F3A] block text-xs uppercase tracking-wider">
                  📚 MATERIAIS INCLUÍDOS NESTE PLANO (4 GUIAS):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#1F2937] font-medium">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#047857] shrink-0" />
                    <span>Guia Visual Educação Financeira</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#047857] shrink-0" />
                    <span>Guia Visual Economia, Juros e Inflação</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#047857] shrink-0" />
                    <span>Guia Visual Investimentos</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#047857] shrink-0" />
                    <span>Guia Visual Fundamentos do Bitcoin</span>
                  </div>
                </div>

                <div className="border-t border-[#E2E8F0] pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#475569]">
                  <p>✓ Arquivos digitais em PDF</p>
                  <p>✓ Download dos materiais do seu plano</p>
                  <p>✓ Consulta pelo celular, tablet ou computador</p>
                  <p>✓ Garantia de 7 dias</p>
                </div>
              </div>

              {/* BOTÃO DE COMPRA */}
              <div className="space-y-3 pt-2 text-center">
                {checkoutColecaoInicial ? (
                  <a
                    href={checkoutColecaoInicial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 min-h-[52px] px-8 py-3.5 rounded-[12px] bg-[#047857] hover:bg-[#065F46] focus:ring-4 focus:ring-[#1D4ED8]/30 text-white font-outfit font-bold text-base uppercase tracking-wide shadow-md transition-all cursor-pointer"
                  >
                    <span>QUERO A COLEÇÃO INICIAL</span>
                    <ArrowRight className="w-5 h-5 text-white shrink-0" />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full inline-flex items-center justify-center gap-3 min-h-[52px] px-8 py-3.5 rounded-[12px] bg-[#047857] opacity-90 text-white font-outfit font-bold text-base uppercase tracking-wide cursor-not-allowed shadow-md"
                  >
                    <span>QUERO A COLEÇÃO INICIAL</span>
                    <ArrowRight className="w-5 h-5 text-white shrink-0" />
                  </button>
                )}
                <p className="text-xs text-[#475569] font-medium">
                  Confira o conteúdo e as condições no checkout.
                </p>
              </div>

              <p className="text-[11px] text-[#475569] text-center pt-1 italic">
                Imagem ilustrativa da coleção. Este plano inclui os quatro guias listados acima.
              </p>
            </div>

            {/* CARD 2 — COLEÇÃO COMPLETA */}
            <div className="rounded-[20px] bg-[#FFFFFF] border-2 border-[#F59E0B] p-6 sm:p-8 md:p-10 text-left space-y-6 shadow-[0_8px_24px_rgba(11,31,58,0.06)] relative">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FFFBEB] text-[#B45309] border border-[#F59E0B]/40 text-xs font-bold uppercase tracking-wider mb-2">
                    9 GUIAS + 2 E-BOOKS BÔNUS
                  </span>
                  <h3 className="font-outfit font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    COLEÇÃO COMPLETA
                  </h3>
                </div>

                {/* Bloco de Preço Dinâmico / Indefinido */}
                {precoColecaoCompleta !== null ? (
                  <div className="text-right">
                    <span className="text-xs font-semibold text-[#475569] block">Investimento</span>
                    <span className="text-3xl font-extrabold text-[#047857]">
                      R$ {precoColecaoCompleta.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                ) : null}
              </div>

              <p className="text-[16px] text-[#475569] leading-[1.65]">
                A base da Coleção Inicial e mais cinco guias para estudar segurança, redes e estruturas de ativos digitais, com duas leituras complementares sobre Bitcoin e transações.
              </p>

              {/* LISTA DE MATERIAIS COMPLETA */}
              <div className="p-5 rounded-2xl bg-[#FFFBEB]/60 border border-[#F59E0B]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0B1F3A] block text-xs uppercase tracking-wider">
                    📚 CONTEÚDO COMPLETO INCLUÍDO (11 MATERIAIS):
                  </span>
                  <span className="text-xs font-bold text-[#B45309] bg-[#FFFBEB] px-2.5 py-0.5 rounded-full border border-[#F59E0B]/30">
                    11 materiais digitais ao todo
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#1F2937] font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#047857] shrink-0" />
                    <span>Guia Visual Educação Financeira</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#047857] shrink-0" />
                    <span>Guia Visual Economia, Juros e Inflação</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#047857] shrink-0" />
                    <span>Guia Visual Investimentos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#047857] shrink-0" />
                    <span>Guia Visual Fundamentos do Bitcoin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Guia Visual Criptografia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Guia Visual Dólar Digital</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Guia Visual Blockchain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Guia Visual Tokenização</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Guia Visual Mentalidade Bitcoiner</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0B1F3A] font-bold">
                    <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                    <span>🎁 Bônus: Do Clique ao Bloco</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0B1F3A] font-bold sm:col-span-2">
                    <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                    <span>🎁 Bônus: Meu Primeiro Bitcoin</span>
                  </div>
                </div>

                <div className="border-t border-[#F59E0B]/30 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#475569]">
                  <p>✓ Todos os nove guias visuais</p>
                  <p>✓ Dois e-books bônus incluídos</p>
                  <p>✓ Arquivos digitais em PDF para download</p>
                  <p>✓ Consulta pelo celular, tablet ou computador</p>
                  <p>✓ Garantia de 7 dias</p>
                </div>
              </div>

              {/* BOTÃO DE COMPRA COMPLETA */}
              <div className="space-y-3 pt-2 text-center">
                {checkoutColecaoCompleta ? (
                  <a
                    href={checkoutColecaoCompleta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 min-h-[52px] px-8 py-3.5 rounded-[12px] bg-[#047857] hover:bg-[#065F46] focus:ring-4 focus:ring-[#1D4ED8]/30 text-white font-outfit font-bold text-base uppercase tracking-wide shadow-md transition-all cursor-pointer"
                  >
                    <span>QUERO A COLEÇÃO COMPLETA</span>
                    <ArrowRight className="w-5 h-5 text-white shrink-0" />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full inline-flex items-center justify-center gap-3 min-h-[52px] px-8 py-3.5 rounded-[12px] bg-[#047857] opacity-90 text-white font-outfit font-bold text-base uppercase tracking-wide cursor-not-allowed shadow-md"
                  >
                    <span>QUERO A COLEÇÃO COMPLETA</span>
                    <ArrowRight className="w-5 h-5 text-white shrink-0" />
                  </button>
                )}
                <p className="text-xs text-[#475569] font-medium">
                  Todos os materiais da Inicial e mais cinco guias e dois bônus.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. PASSO A PASSO EXISTENTE COM COPY ATUALIZADA                          */}
      {/* ========================================================================= */}
      <section className="py-12 md:py-20 bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 space-y-10">
          
          <div className="text-center max-w-[760px] mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest bg-[#EFF6FF] text-[#1D4ED8] border border-[#EFF6FF]">
              PASSO A PASSO DO ACESSO
            </span>
            <h2 className="font-outfit font-bold text-[28px] sm:text-[32px] md:text-[38px] text-[#0B1F3A] leading-[1.2]">
              Como você recebe e utiliza sua coleção.
            </h2>
            <p className="text-[16px] text-[#475569] leading-[1.65]">
              Da escolha do plano à consulta dos arquivos, veja o caminho do seu acesso.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Etapa 1 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] space-y-3 text-left">
              <span className="font-outfit font-bold text-2xl text-[#1D4ED8] block">01</span>
              <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                Escolha sua coleção.
              </h3>
              <p className="text-[16px] text-[#475569] leading-[1.65]">
                Confira os materiais da Inicial e da Completa e escolha a opção que atende ao seu momento.
              </p>
            </div>

            {/* Etapa 2 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] space-y-3 text-left">
              <span className="font-outfit font-bold text-2xl text-[#1D4ED8] block">02</span>
              <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                Conclua o pagamento.
              </h3>
              <p className="text-[16px] text-[#475569] leading-[1.65]">
                Finalize a compra no checkout correspondente ao plano escolhido e confira as formas de pagamento disponíveis.
              </p>
            </div>

            {/* Etapa 3 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] space-y-3 text-left">
              <span className="font-outfit font-bold text-2xl text-[#1D4ED8] block">03</span>
              <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                Receba as orientações de acesso.
              </h3>
              <p className="text-[16px] text-[#475569] leading-[1.65]">
                Após a confirmação do pagamento, siga as instruções enviadas ao e-mail informado na compra.
              </p>
            </div>

            {/* Etapa 4 */}
            <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,31,58,0.06)] space-y-3 text-left">
              <span className="font-outfit font-bold text-2xl text-[#1D4ED8] block">04</span>
              <h3 className="font-outfit font-semibold text-[20px] text-[#0B1F3A] leading-[1.3]">
                Baixe e consulte os materiais.
              </h3>
              <p className="text-[16px] text-[#475569] leading-[1.65]">
                Acesse os PDFs do seu plano e organize a leitura pelo celular, tablet ou computador.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. PERGUNTAS FREQUENTES (FAQ ACCORDION - 9 ITENS)                       */}
      {/* ========================================================================= */}
      <section className="py-12 md:py-20 bg-[#FAF7F2] border-b border-[#E2E8F0]">
        <div className="max-w-[760px] mx-auto px-5 md:px-6 space-y-10">
          
          <div className="text-center space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest bg-[#EFF6FF] text-[#1D4ED8] border border-[#EFF6FF]">
              TIRE SUAS DÚVIDAS
            </span>
            <h2 className="font-outfit font-bold text-[28px] sm:text-[32px] md:text-[38px] text-[#0B1F3A] leading-[1.2]">
              Perguntas Frequentes
            </h2>
            <p className="text-[16px] text-[#475569] leading-[1.65]">
              Respostas para as principais dúvidas sobre as duas coleções.
            </p>
          </div>

          <div className="space-y-3">
            {allFaqItems.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-[16px] bg-[#FFFFFF] border border-[#E2E8F0] overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-outfit font-semibold text-[17px] text-[#0B1F3A] hover:text-[#1D4ED8] transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#1D4ED8] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-[15px] text-[#475569] leading-[1.65] border-t border-[#E2E8F0]/60 pt-4 bg-[#FAF7F2]/40">
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
