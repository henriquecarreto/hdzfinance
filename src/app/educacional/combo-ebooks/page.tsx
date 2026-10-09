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

// Miniatura de Livro/Guia em HTML/CSS
function CssBookThumbnail({ shortTitle, isBonus = false }: { shortTitle: string; isBonus?: boolean }) {
  return (
    <div
      className={`w-[60px] h-[82px] bg-[#FFFBEB] rounded-[4px] shadow-sm flex flex-col justify-between p-1 shrink-0 relative overflow-hidden ${
        isBonus ? "border border-[#34D399] border-l-[5px] border-l-[#059669]" : "border border-[#F5C84B] border-l-[5px] border-l-[#0B1F3A]"
      }`}
    >
      <div className="flex-1 flex items-center justify-center pt-1 px-0.5">
        <span className="text-[8px] font-bold text-[#0B1F3A] text-center leading-[1.15] uppercase tracking-tighter line-clamp-3">
          {shortTitle}
        </span>
      </div>
      <div className="text-[7px] font-bold text-[#0B1F3A]/60 text-center tracking-wider uppercase border-t border-amber-200/60 pt-0.5">
        PDF
      </div>
    </div>
  );
}

// Catálogo dos 9 Guias Visuais
const catalogGuias = [
  {
    number: "01",
    title: "Guia Visual Educação Financeira",
    shortTitle: "Educação Financeira",
    description:
      "Compreenda orçamento, dívidas, reserva de emergência e metas e aprenda a diferenciar renda de patrimônio.",
    badge: "INICIAL E COMPLETA",
    type: "initial",
  },
  {
    number: "02",
    title: "Guia Visual Economia, Juros e Inflação",
    shortTitle: "Economia & Inflação",
    description:
      "Entenda como preços, juros, inflação e câmbio se relacionam e conheça a diferença entre retorno nominal e real.",
    badge: "INICIAL E COMPLETA",
    type: "initial",
  },
  {
    number: "03",
    title: "Guia Visual Investimentos",
    shortTitle: "Investimentos",
    description:
      "Conheça conceitos de renda fixa e ações e compreenda risco, retorno, liquidez e diversificação.",
    badge: "INICIAL E COMPLETA",
    type: "initial",
  },
  {
    number: "04",
    title: "Guia Visual Fundamentos do Bitcoin",
    shortTitle: "Fundamentos Bitcoin",
    description:
      "Compreenda emissão, transações, mineração e custódia para estudar o funcionamento do Bitcoin.",
    badge: "INICIAL E COMPLETA",
    type: "initial",
  },
  {
    number: "05",
    title: "Guia Visual Criptografia",
    shortTitle: "Criptografia",
    description:
      "Entenda chaves, hashes, assinaturas e recuperação de carteiras e reconheça pontos de atenção em segurança.",
    badge: "COLEÇÃO COMPLETA",
    type: "complete",
  },
  {
    number: "06",
    title: "Guia Visual Dólar Digital",
    shortTitle: "Dólar Digital",
    description:
      "Conheça stablecoins e os conceitos de reservas, paridade, resgate, câmbio e redes.",
    badge: "COLEÇÃO COMPLETA",
    type: "complete",
  },
  {
    number: "07",
    title: "Guia Visual Blockchain",
    shortTitle: "Blockchain",
    description:
      "Compreenda mecanismos de consenso, modelos de registro e governança e entenda quando a tecnologia faz sentido.",
    badge: "COLEÇÃO COMPLETA",
    type: "complete",
  },
  {
    number: "08",
    title: "Guia Visual Tokenização",
    shortTitle: "Tokenização",
    description:
      "Entenda como tokens, NFTs e ativos tokenizados representam direitos e conheça seu ciclo de emissão e circulação.",
    badge: "COLEÇÃO COMPLETA",
    type: "complete",
  },
  {
    number: "09",
    title: "Guia Visual Mentalidade Bitcoiner",
    shortTitle: "Mentalidade Bitcoiner",
    description:
      "Complemente seus estudos sobre Bitcoin com um guia dedicado à mentalidade bitcoiner.",
    badge: "COLEÇÃO COMPLETA",
    type: "complete",
  },
];

// Catálogo dos 2 Bônus
const catalogBonus = [
  {
    number: "01",
    title: "Do Clique ao Bloco",
    shortTitle: "Do Clique ao Bloco",
    description:
      "Acompanhe o caminho de uma transação, do envio ao registro na blockchain, em uma leitura complementar aos guias.",
    badge: "🎁 BÔNUS DA COLEÇÃO COMPLETA",
  },
  {
    number: "02",
    title: "Meu Primeiro Bitcoin",
    shortTitle: "Meu Primeiro Bitcoin",
    description:
      "Uma leitura introdutória para compreender o essencial e contextualizar os primeiros passos no universo Bitcoin.",
    badge: "🎁 BÔNUS DA COLEÇÃO COMPLETA",
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
      {/* 1. PRIMEIRA SEÇÃO (HERO COMPACTO EM FUNDO CREME #FAF7F2)                  */}
      {/* ========================================================================= */}
      <section className="bg-[#FAF7F2] border-b border-[#E2E8F0] pt-5 md:pt-6 pb-5">
        <div className="max-w-[680px] mx-auto px-4 md:px-5 text-center">
          
          {/* SELO CÁPSULA */}
          <div className="mb-[10px]">
            <span className="inline-block px-[10px] py-[4px] rounded-full bg-[#FFFBEB] border border-[#F59E0B] text-[#92400E] text-[11px] font-bold tracking-wide uppercase">
              📖 COLEÇÃO VISUAL DE EDUCAÇÃO FINANCEIRA
            </span>
          </div>

          {/* TÍTULO PRINCIPAL H1 */}
          <h1 className="font-outfit font-extrabold text-[26px] sm:text-[34px] md:text-[42px] text-[#0A0A0A] tracking-tight leading-[1.08] mb-[12px]">
            Entenda seu dinheiro<br />
            e aprenda sobre <span className="text-[#0866E8]">investimentos</span>,<br />
            <span className="text-[#059669]">inflação e juros</span>.
          </h1>

          {/* DESCRIÇÃO SUBTÍTULO */}
          <p className="text-[15px] md:text-[17px] text-[#111111] leading-[1.45] mb-[10px] font-normal">
            Descubra uma coleção com 90 mapas mentais visuais para compreender <strong className="font-bold text-[#111111]">educação financeira</strong>, <strong className="font-bold text-[#111111]">investimentos</strong>, <strong className="font-bold text-[#111111]">inflação</strong> e <strong className="font-bold text-[#111111]">juros</strong> de forma clara e organizada.
          </p>

          {/* LINHA CURTA DE PÚBLICO */}
          <p className="text-[13px] font-semibold text-[#111111] leading-[1.4] mb-[14px]">
            👥 Para iniciantes, estudantes e quem quer cuidar melhor do próprio dinheiro.
          </p>

          {/* MOLDURA DA IMAGEM PRINCIPAL */}
          <div className="mb-[10px]">
            <div
              className="w-full max-w-[560px] mx-auto rounded-[14px] p-2 bg-[#FAF7F2] border border-[#F5CD63]"
              style={{ boxShadow: "0 6px 14px rgba(11, 31, 58, 0.10)" }}
            >
              <Image
                src="/images/products/combo-ebooks-cover.jpg"
                alt="Coleção Visual HDZ Finance sobre Educação Financeira, Investimentos, Inflação e Juros"
                width={560}
                height={660}
                priority
                className="w-full h-auto object-contain rounded-[10px] block"
                sizes="(max-width: 640px) 100vw, 560px"
              />
            </div>
          </div>

          {/* LINHA DE QUANTIDADE */}
          <p className="text-[11px] font-bold text-[#111111] uppercase tracking-wider mb-[12px]">
            📚 90 MAPAS MENTAIS PARA ESTUDAR E CONSULTAR QUANDO PRECISAR
          </p>

          {/* 4 BENEFÍCIOS CURTOS EM 2 COLUNAS COMPACTAS */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 max-w-[540px] mx-auto text-left mb-[16px]">
            <div className="text-[13px] font-semibold text-[#111111] leading-[1.35]">
              📊 Investimentos explicados com clareza.
            </div>
            <div className="text-[13px] font-semibold text-[#111111] leading-[1.35]">
              💰 Educação financeira para o dia a dia.
            </div>
            <div className="text-[13px] font-semibold text-[#111111] leading-[1.35]">
              📈 Entenda a inflação e os juros.
            </div>
            <div className="text-[13px] font-semibold text-[#111111] leading-[1.35]">
              🧠 Consulte os conceitos de forma visual.
            </div>
          </div>

          {/* BOTÃO PRINCIPAL VERDE E SELOS DE PAGAMENTO */}
          <div className="space-y-[8px]">
            <button
              type="button"
              onClick={() => scrollToSection("hdz-guias")}
              className="w-full max-w-[360px] mx-auto min-h-[48px] px-6 inline-flex items-center justify-center rounded-[8px] bg-[#00B86B] hover:bg-[#009E5C] focus:outline-none text-white font-outfit font-bold text-[14px] uppercase tracking-wide cursor-pointer transition-all"
              style={{ boxShadow: "0 4px 10px rgba(0, 184, 107, 0.18)" }}
            >
              <span>CONHECER OS 90 MAPAS MENTAIS →</span>
            </button>

            {/* 3 SELOS DE PAGAMENTO */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
              <span className="inline-flex items-center px-2 py-[3px] rounded-full bg-[#ECFDF5] border border-[#86EFAC] text-[#047857] text-[11px] font-bold">
                🔒 Pagamento Seguro
              </span>
              <span className="inline-flex items-center px-2 py-[3px] rounded-full bg-[#ECFDF5] border border-[#86EFAC] text-[#047857] text-[11px] font-bold">
                💠 Pix
              </span>
              <span className="inline-flex items-center px-2 py-[3px] rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-[11px] font-bold">
                💳 Cartão de Crédito
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CARROSSEL EXISTENTE COM COPY ATUALIZADA                                 */}
      {/* ========================================================================= */}
      <section className="py-12 md:py-20 bg-[#FAF7F2] border-b border-[#E2E8F0] overflow-hidden">
        <div className="max-w-[1360px] mx-auto space-y-8">
          
          {/* CABEÇALHO DO CARROSSEL */}
          <div className="text-center max-w-[760px] mx-auto px-5 mb-6">
            <div className="mb-2">
              <span className="inline-block px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest bg-[#EFF6FF] text-[#1D4ED8] border border-[#EFF6FF]">
                VEJA OS MAPAS POR DENTRO
              </span>
            </div>
            <h2 className="font-outfit font-bold text-[28px] sm:text-[32px] md:text-[38px] text-[#0B1F3A] leading-[1.2] mb-3">
              Veja como fica mais simples entender suas finanças.
            </h2>
            <p className="text-[16px] text-[#475569] leading-[1.65]">
              Explore páginas reais da coleção e descubra como os mapas conectam educação financeira, investimentos, inflação e juros em explicações visuais claras, organizadas e fáceis de consultar.
            </p>

            {/* IMAGEM MOSTRUÁRIO DOS MAPAS MENTAIS */}
            <div className="pt-3 pb-1">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] mx-auto rounded-[16px] p-2 bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_6px_16px_rgba(11,31,58,0.06)]">
                <Image
                  src="/images/products/guias-visuais-showcase.jpg"
                  alt="Mostruário dos Guias Visuais HDZ Finance"
                  width={500}
                  height={640}
                  priority
                  className="w-full h-auto object-contain rounded-lg block"
                  sizes="(max-width: 640px) 320px, 440px"
                />
              </div>
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
      {/* 3. EXPERIÊNCIA DE LEITURA (PADRÃO VISUAL REFORMA TRIBUTÁRIA - #0B1F3A)     */}
      {/* ========================================================================= */}
      <section className="py-12 md:py-16 bg-[#0B1F3A] text-white border-b border-[#0B1F3A]">
        <div className="max-w-[1040px] mx-auto px-5 md:px-6 space-y-8 md:space-y-10 text-center">
          
          {/* TÍTULO E SUBTÍTULO */}
          <div className="max-w-[780px] mx-auto space-y-3">
            <h2 className="font-outfit font-extrabold text-[24px] sm:text-[30px] md:text-[36px] tracking-tight uppercase leading-[1.2]">
              <span className="text-white block">CONECTE OS CONCEITOS QUE APARECEM</span>
              <span className="text-[#E9991C] block">NA SUA VIDA FINANCEIRA</span>
            </h2>
            <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#D5DDE6] leading-[1.5] max-w-[720px] mx-auto font-normal">
              Entenda educação financeira, investimentos, inflação e juros com mapas mentais organizados de forma visual, clara e fácil de consultar.
            </p>
          </div>

          {/* GRADE 2X2 DE CAIXAS HORIZONTAIS COMPACTAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[960px] mx-auto text-left">
            
            {/* Caixa 1 */}
            <div className="p-4 sm:p-5 rounded-[12px] bg-[#253B5F] border border-white/10 shadow-md flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#00A859] flex items-center justify-center text-white shrink-0 font-bold mt-0.5">
                <Check className="w-4 h-4 text-white stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-outfit font-bold text-[15px] sm:text-[16px] text-white tracking-wide uppercase leading-tight">
                  ORGANIZE SUAS FINANÇAS
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#D5DDE6] leading-[1.4] font-normal">
                  Compreenda orçamento, reserva financeira, dívidas e planejamento.
                </p>
              </div>
            </div>

            {/* Caixa 2 */}
            <div className="p-4 sm:p-5 rounded-[12px] bg-[#253B5F] border border-white/10 shadow-md flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#00A859] flex items-center justify-center text-white shrink-0 font-bold mt-0.5">
                <Check className="w-4 h-4 text-white stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-outfit font-bold text-[15px] sm:text-[16px] text-white tracking-wide uppercase leading-tight">
                  ENTENDA A ECONOMIA
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#D5DDE6] leading-[1.4] font-normal">
                  Conecte os conceitos econômicos às decisões do seu dia a dia.
                </p>
              </div>
            </div>

            {/* Caixa 3 */}
            <div className="p-4 sm:p-5 rounded-[12px] bg-[#253B5F] border border-white/10 shadow-md flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#00A859] flex items-center justify-center text-white shrink-0 font-bold mt-0.5">
                <Check className="w-4 h-4 text-white stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-outfit font-bold text-[15px] sm:text-[16px] text-white tracking-wide uppercase leading-tight">
                  COMPARE INVESTIMENTOS
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#D5DDE6] leading-[1.4] font-normal">
                  Entenda como risco, retorno, liquidez e diversificação se relacionam.
                </p>
              </div>
            </div>

            {/* Caixa 4 */}
            <div className="p-4 sm:p-5 rounded-[12px] bg-[#253B5F] border border-white/10 shadow-md flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#00A859] flex items-center justify-center text-white shrink-0 font-bold mt-0.5">
                <Check className="w-4 h-4 text-white stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-outfit font-bold text-[15px] sm:text-[16px] text-white tracking-wide uppercase leading-tight">
                  COMPREENDA INFLAÇÃO E JUROS
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#D5DDE6] leading-[1.4] font-normal">
                  Veja como afetam seu poder de compra, suas dívidas e seus investimentos.
                </p>
              </div>
            </div>

          </div>

          {/* BOTÃO PRINCIPAL VERDE */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => scrollToSection("oferta")}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-[10px] bg-[#00A859] hover:bg-[#008A54] focus:outline-none text-white font-outfit font-bold text-[15px] uppercase tracking-wide shadow-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>CONHECER A COLEÇÃO COMPLETA →</span>
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
      {/* 6. CATÁLOGO UNIFICADO DE MATERIAIS (#hdz-guias)                           */}
      {/* ========================================================================= */}
      <section id="hdz-guias" className="pt-[56px] pb-[48px] max-md:py-[36px] bg-[#FAF7F2] border-b border-[#E2E8F0]">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          
          {/* CABEÇALHO CENTRALIZADO */}
          <div className="text-center max-w-[720px] mx-auto">
            {/* Selo */}
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white text-[#047857] border border-[#99D5C6] mb-3">
              📚 COLEÇÃO VISUAL HDZ FINANCE
            </span>

            {/* Título */}
            <h2 className="font-outfit font-extrabold text-[26px] sm:text-[32px] md:text-[36px] text-[#0B1F3A] leading-[1.15] mb-3">
              Conheça os 11 materiais da coleção completa
            </h2>

            {/* Descrição */}
            <p className="text-[16px] text-[#334155] leading-[1.5] mb-3.5">
              Guias visuais para compreender educação financeira, economia, investimentos e Bitcoin, com duas leituras complementares para continuar seus estudos.
            </p>

            {/* Etiqueta */}
            <span className="inline-block px-[10px] py-[6px] rounded-full text-[12px] font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
              9 GUIAS VISUAIS + 2 E-BOOKS BÔNUS • MATERIAIS DIGITAIS EM PDF
            </span>
          </div>

          {/* GRUPO 1: 9 GUIAS VISUAIS */}
          <div className="mt-8">
            {/* Linha de identificação */}
            <div className="border-b-2 border-[#F5C84B] pb-2 mb-[20px] max-sm:mb-[16px]">
              <h3 className="font-outfit font-bold text-[18px] text-[#0B1F3A]">
                📚 9 guias visuais
              </h3>
            </div>

            {/* Grade dos 9 guias */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] max-sm:gap-[16px] items-stretch">
              {catalogGuias.map((guia) => {
                const isInitial = guia.type === "initial";
                return (
                  <div
                    key={guia.number}
                    className="p-[20px] rounded-[12px] bg-white border border-[#E5DED0] shadow-[0_2px_6px_rgba(11,31,58,0.06)] flex flex-col justify-between text-left"
                  >
                    <div className="space-y-3">
                      {/* Número + Selo */}
                      <div className="flex items-center justify-between">
                        <div className="w-[28px] h-[28px] rounded-[6px] bg-[#0B1F3A] text-white font-outfit font-bold text-xs flex items-center justify-center">
                          {guia.number}
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            isInitial
                              ? "bg-[#EFF6FF] text-[#1D4ED8]"
                              : "bg-[#FFFBEB] text-[#92400E]"
                          }`}
                        >
                          {guia.badge}
                        </span>
                      </div>

                      {/* Nome do Guia */}
                      <h4 className="font-outfit font-bold text-[17px] text-[#0B1F3A] leading-snug">
                        {guia.title}
                      </h4>

                      {/* Descrição + Miniatura */}
                      <div className="flex items-start gap-3 justify-between">
                        <p className="text-[14px] text-[#475569] leading-[1.5] flex-1">
                          {guia.description}
                        </p>
                        <CssBookThumbnail shortTitle={guia.shortTitle} />
                      </div>
                    </div>

                    {/* Divisória + Rodapé */}
                    <div>
                      <div className="my-3 border-t border-[#E2E8F0]" />
                      <p className="text-[11px] font-medium text-[#059669]">
                        📄 Guia digital em PDF
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* GRUPO 2: 2 BÔNUS DENTRO DA MESMA SEÇÃO */}
          <div id="ebooks" className="mt-[32px]">
            {/* Linha de identificação bônus */}
            <div className="border-b-2 border-[#A7F3D0] pb-2 mb-[20px] max-sm:mb-[16px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="font-outfit font-bold text-[18px] text-[#059669]">
                🎁 2 bônus para complementar seus estudos
              </h3>
              <span className="text-sm font-medium text-[#047857]">
                Incluídos na Coleção Completa
              </span>
            </div>

            {/* Grade dos 2 bônus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] max-sm:gap-[16px] items-stretch">
              {catalogBonus.map((bonus) => (
                <div
                  key={bonus.number}
                  className="p-[20px] rounded-[12px] bg-white border border-[#34D399] border-t-[3px] border-t-[#059669] shadow-[0_2px_6px_rgba(11,31,58,0.06)] flex flex-col justify-between text-left"
                >
                  <div className="space-y-3">
                    {/* Selo Bônus */}
                    <div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#047857]">
                        {bonus.badge}
                      </span>
                    </div>

                    {/* Título Bônus */}
                    <h4 className="font-outfit font-bold text-[17px] text-[#0B1F3A] leading-snug">
                      {bonus.title}
                    </h4>

                    {/* Descrição + Miniatura */}
                    <div className="flex items-start gap-3 justify-between">
                      <p className="text-[14px] text-[#475569] leading-[1.5] flex-1">
                        {bonus.description}
                      </p>
                      <CssBookThumbnail shortTitle={bonus.shortTitle} isBonus={true} />
                    </div>
                  </div>

                  {/* Divisória + Rodapé */}
                  <div>
                    <div className="my-3 border-t border-[#E2E8F0]" />
                    <p className="text-[11px] font-medium text-[#059669]">
                      📄 E-book digital em PDF
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAIXA FINAL INTEGRADA AO CATÁLOGO */}
          <div className="mt-[28px] p-[24px] rounded-[14px] bg-white border border-[#E5DED0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-left">
            <div className="space-y-1 text-center md:text-left">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[#EFF6FF] text-[#1D4ED8]">
                ✨ COLEÇÃO COMPLETA
              </span>
              <h3 className="font-outfit font-bold text-[18px] md:text-[20px] text-[#0B1F3A]">
                Acesse os 11 materiais da coleção completa
              </h3>
              <p className="text-[14px] text-[#475569]">
                Nove guias visuais e dois e-books bônus para estudar e consultar no seu ritmo.
              </p>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection("oferta")}
              className="w-full md:w-auto min-h-[48px] px-6 py-3 rounded-[8px] bg-[#00B86B] hover:bg-[#009E5C] text-white font-outfit font-bold text-sm uppercase tracking-wide transition-all shrink-0 cursor-pointer shadow-sm text-center flex items-center justify-center"
            >
              QUERO A COLEÇÃO COMPLETA →
            </button>
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
