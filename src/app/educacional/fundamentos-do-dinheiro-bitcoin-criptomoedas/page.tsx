"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ArrowRight,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

// State offer config
const trainingOffer = {
  offerReady: true,
  price: 197.0,
  installments: "12x R$ 19,78",
  installmentTotal: "R$ 237,36",
  checkoutUrl: null,
  guaranteeDays: 7,
};

// Helper style for warm gold #E9991C text with fine black stroke
const goldTextStrokeLarge = {
  color: "#E9991C",
  WebkitTextFillColor: "#E9991C",
  WebkitTextStroke: "0.7px #000000",
  paintOrder: "stroke fill",
};

const goldTextStrokeSmall = {
  color: "#E9991C",
  WebkitTextFillColor: "#E9991C",
  WebkitTextStroke: "0.4px #000000",
  paintOrder: "stroke fill",
};

// Helper style for white CTA button text with fine black stroke
const whiteButtonTextStroke = {
  color: "#FFFFFF",
  WebkitTextFillColor: "#FFFFFF",
  WebkitTextStroke: "0.6px #000000",
  paintOrder: "stroke fill",
};

// 6 Carousel Stages
interface CarouselStage {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
}

const CAROUSEL_STAGES: CarouselStage[] = [
  {
    id: 0,
    badge: "APRESENTAÇÃO",
    title: "Apresentação",
    subtitle: "Conheça a proposta do treinamento e como acompanhar as aulas.",
    image: "/images/previews/apresentacao.jpg",
  },
  {
    id: 1,
    badge: "ETAPA 01",
    title: "Fundamentos do dinheiro",
    subtitle: "Entenda a origem do dinheiro e o que afeta seu poder de compra.",
    image: "/images/previews/fundamentos-do-dinheiro.jpg",
  },
  {
    id: 2,
    badge: "ETAPA 02",
    title: "O que é Bitcoin",
    subtitle: "Conheça a proposta do Bitcoin e os fundamentos da rede.",
    image: "/images/previews/o-que-e-bitcoin.jpg",
  },
  {
    id: 3,
    badge: "ETAPA 03",
    title: "Ciclos de mercado",
    subtitle: "Observe o contexto por trás das altas, quedas e mudanças de preço.",
    image: "/images/previews/ciclos-de-mercado.jpg",
  },
  {
    id: 4,
    badge: "ETAPA 04",
    title: "Seja você seu próprio banco",
    subtitle: "Aprenda os conceitos e os cuidados envolvidos na autocustódia.",
    image: "/images/previews/seja-seu-proprio-banco.jpg",
  },
  {
    id: 5,
    badge: "ETAPA 05",
    title: "Gerenciamento e utilização",
    subtitle: "Conheça os cuidados para organizar, movimentar e utilizar seus ativos.",
    image: "/images/previews/gerenciamento-de-carteira.jpg",
  },
];

// Color Scheme Definitions
interface ColorScheme {
  bgSoft: string;
  borderSoft: string;
  textHighlight: string;
  markerBg: string;
}

const SCHEMES: Record<string, ColorScheme> = {
  blue: {
    bgSoft: "bg-[#EFF6FF]",
    borderSoft: "border-[#BFDBFE]",
    textHighlight: "text-[#2563EB]",
    markerBg: "bg-[#2563EB]",
  },
  green: {
    bgSoft: "bg-[#ECFDF5]",
    borderSoft: "border-[#A7F3D0]",
    textHighlight: "text-[#00A859]",
    markerBg: "bg-[#00A859]",
  },
  gold: {
    bgSoft: "bg-[#FFF7E5]",
    borderSoft: "border-[#FDE68A]",
    textHighlight: "text-[#E9991C]",
    markerBg: "bg-[#E9991C]",
  },
  purple: {
    bgSoft: "bg-[#F5F3FF]",
    borderSoft: "border-[#DDD6FE]",
    textHighlight: "text-[#7C3AED]",
    markerBg: "bg-[#7C3AED]",
  },
  turquoise: {
    bgSoft: "bg-[#F0FDFA]",
    borderSoft: "border-[#99F6E4]",
    textHighlight: "text-[#0D9488]",
    markerBg: "bg-[#0D9488]",
  },
};

// 6 Modules Dataset with auxiliary colors and emojis
interface ModuleCard {
  id: number;
  emoji: string;
  moduleLabel: string;
  title: string;
  description: string;
  topics: string[];
  colorKey: "blue" | "green" | "gold" | "purple" | "turquoise";
}

const COURSE_MODULES: ModuleCard[] = [
  {
    id: 0,
    emoji: "🎬",
    moduleLabel: "APRESENTAÇÃO",
    title: "APRESENTAÇÃO",
    description:
      "Conheça a proposta do treinamento, a organização das aulas e como os assuntos se conectam. Uma introdução para orientar seus primeiros passos e ajudar você a acompanhar o conteúdo.",
    topics: [
      "Organização das aulas.",
      "Visão geral dos assuntos.",
      "Como acompanhar o treinamento.",
    ],
    colorKey: "blue",
  },
  {
    id: 1,
    emoji: "💰",
    moduleLabel: "MÓDULO 01",
    title: "FUNDAMENTOS DO DINHEIRO",
    description:
      "Entenda a origem e as funções do dinheiro, além dos efeitos da inflação e da expansão monetária sobre o poder de compra. Uma base para compreender o contexto em que o Bitcoin surgiu.",
    topics: [
      "Origem e funções do dinheiro.",
      "Inflação e poder de compra.",
      "Bancos centrais e expansão monetária.",
    ],
    colorKey: "green",
  },
  {
    id: 2,
    emoji: "🪙",
    moduleLabel: "MÓDULO 02",
    title: "O QUE É BITCOIN",
    description:
      "Conheça a proposta do Bitcoin e os fundamentos do funcionamento da rede. Entenda os conceitos que permitem olhar para o ativo além da cotação.",
    topics: [
      "Blockchain e descentralização.",
      "Criptografia e mineração.",
      "Oferta programada.",
    ],
    colorKey: "gold",
  },
  {
    id: 3,
    emoji: "📈",
    moduleLabel: "MÓDULO 03",
    title: "CICLOS DE MERCADO",
    description:
      "Entenda como ciclos, volatilidade e comportamento dos participantes se relacionam. Conheça os indicadores e exemplos apresentados nas aulas para compreender melhor o contexto do mercado.",
    topics: [
      "Fases dos ciclos.",
      "Indicadores e contexto.",
      "Emoções nas decisões.",
    ],
    colorKey: "blue",
  },
  {
    id: 4,
    emoji: "🔐",
    moduleLabel: "MÓDULO 04",
    title: "SEJA VOCÊ SEU PRÓPRIO BANCO",
    description:
      "Conheça as carteiras e os cuidados envolvidos na autocustódia. Entenda o papel das chaves, das frases de recuperação e dos backups na guarda dos seus bitcoins.",
    topics: [
      "Tipos de carteiras.",
      "Chaves e frases de recuperação.",
      "Backups e cuidados de armazenamento.",
    ],
    colorKey: "purple",
  },
  {
    id: 5,
    emoji: "🧭",
    moduleLabel: "MÓDULO 05",
    title: "GERENCIAMENTO E UTILIZAÇÃO",
    description:
      "Conecte os conceitos à organização e ao uso dos ativos. Acompanhe as demonstrações de movimentação e utilização apresentadas no treinamento.",
    topics: [
      "Exposição e organização da carteira.",
      "Envio, recebimento e saques.",
      "Demonstrações práticas de ferramentas.",
    ],
    colorKey: "turquoise",
  },
];

// Público Dataset with auxiliary colors & emojis
const PUBLIC_CARDS = [
  {
    emoji: "🌱",
    tag: "01 • INICIANTES",
    title: "Para quem está começando",
    description:
      "Quer entender o Bitcoin desde os fundamentos, com explicações claras e exemplos.",
    colorKey: "green" as const,
  },
  {
    emoji: "🪙",
    tag: "02 • INVESTIDORES",
    title: "Para quem já possui cripto",
    description:
      "Já comprou ativos e quer compreender melhor segurança, custódia e organização da carteira.",
    colorKey: "gold" as const,
  },
  {
    emoji: "🔐",
    tag: "03 • SEGURANÇA",
    title: "Para quem quer conhecer a autocustódia",
    description:
      "Quer aprender sobre carteiras, chaves e as responsabilidades de guardar seus próprios bitcoins.",
    colorKey: "purple" as const,
  },
  {
    emoji: "🎯",
    tag: "04 • CRITÉRIO",
    title: "Para quem busca mais critério",
    description:
      "Quer compreender o mercado antes de decidir com base em opiniões ou oscilações de preço.",
    colorKey: "blue" as const,
  },
];

// Aprendizado Cards
const LEARNING_CARDS = [
  {
    emoji: "🧠",
    title: "Entender",
    description: "Relacionar dinheiro, Bitcoin, tecnologia e contexto de mercado.",
    colorKey: "blue" as const,
  },
  {
    emoji: "🔐",
    title: "Guardar",
    description: "Compreender carteiras, chaves e os cuidados da autocustódia.",
    colorKey: "gold" as const,
  },
  {
    emoji: "🚀",
    title: "Utilizar",
    description: "Conhecer os procedimentos e ferramentas demonstrados nas aulas.",
    colorKey: "green" as const,
  },
];

// Passo a Passo do Acesso Dataset
const ACCESS_STEPS = [
  {
    step: "01",
    emoji: "🛒",
    title: "Conclua sua compra",
    description:
      "Escolha a forma de pagamento e finalize a compra no checkout oficial do treinamento.",
    colorKey: "blue" as const,
  },
  {
    step: "02",
    emoji: "📩",
    title: "Receba as orientações",
    description:
      "Após a confirmação do pagamento, as instruções de acesso serão enviadas para o e-mail informado na compra.",
    colorKey: "green" as const,
  },
  {
    step: "03",
    emoji: "▶️",
    title: "Acesse as aulas",
    description:
      "Entre na área do aluno e encontre as aulas organizadas para acompanhar cada etapa do treinamento.",
    colorKey: "gold" as const,
  },
  {
    step: "04",
    emoji: "📱",
    title: "Aprenda no seu ritmo",
    description:
      "Avance pelos módulos e reveja os assuntos que quiser aprofundar, conforme as condições de acesso do treinamento.",
    colorKey: "turquoise" as const,
  },
];

// 3 Real Course Lesson Screenshots for Section "VEJA POR DENTRO"
const INSIDE_LESSONS = [
  {
    id: 0,
    title: "Apresentação — Visão Geral",
    image: "/images/inside-course/aula-01-apresentacao.png",
  },
  {
    id: 1,
    title: "Módulo 1 — Fundamentos do Dinheiro",
    image: "/images/inside-course/aula-02-fundamentos-do-dinheiro.png",
  },
  {
    id: 2,
    title: "Módulo 2 — O que é Bitcoin",
    image: "/images/inside-course/aula-03-o-que-e-bitcoin.png",
  },
];

// 7 FAQ items
const FAQ_ITEMS = [
  {
    q: "Preciso entender Bitcoin antes de começar?",
    a: "Não. As aulas começam pelos fundamentos do dinheiro e avançam para Bitcoin, mercado, autocustódia e utilização prática.",
  },
  {
    q: "Preciso já possuir Bitcoin?",
    a: "Não. Você pode acompanhar o treinamento antes de decidir se deseja comprar Bitcoin.",
  },
  {
    q: "O treinamento ensina trading?",
    a: "O foco está nos fundamentos, nos ciclos de mercado, na segurança e na utilização dos ativos. O treinamento não oferece sinais de compra e venda nem promete antecipar movimentos de preço.",
  },
  {
    q: "Vou aprender sobre autocustódia e segurança?",
    a: "Sim. O módulo de autocustódia aborda carteiras, chaves, frases de recuperação, backups e cuidados para guardar seus bitcoins.",
  },
  {
    q: "O conteúdo é recomendação de investimento?",
    a: "Não. O treinamento tem finalidade educativa e apresenta conceitos e demonstrações para ampliar sua compreensão dos assuntos.",
  },
  {
    q: "Como recebo o acesso?",
    a: "Após a confirmação do pagamento, as orientações de acesso são enviadas para o e-mail informado na compra.",
  },
  {
    q: "Existe garantia?",
    a: "Sim. O treinamento conta com 7 dias corridos de garantia a contar da confirmação da compra. Caso deseje solicitar o cancelamento dentro desse prazo, basta solicitar o reembolso conforme as orientações recebidas na compra.",
  },
];

export default function BitcoinCourseSalesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(null);

  // Responsive Carousel Cards Per View
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, CAROUSEL_STAGES.length - cardsPerPage);

  const prevCarousel = useCallback(() => {
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const nextCarousel = useCallback(() => {
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Autoplay (~3s)
  useEffect(() => {
    if (isHoveringCarousel) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [isHoveringCarousel, maxIndex]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToOffer = () => {
    if (typeof window !== "undefined") {
      const el = document.getElementById("oferta");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToModules = () => {
    if (typeof window !== "undefined") {
      const el = document.getElementById("modulos");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        nextCarousel();
      } else {
        prevCarousel();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1F2937] font-sans antialiased selection:bg-[#E9991C]/30 selection:text-[#0B1F3A] overflow-x-hidden">

      {/* ==================== 01 — HERO PRINCIPAL (FUNDO 1: BRANCO #FFFFFF) ==================== */}
      <section className="relative py-10 md:py-14 bg-[#FFFFFF] border-b border-[#D5BE97]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center space-y-5">
          
          {/* ETIQUETA EMOJI */}
          <div>
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FAF5E8] text-[#0B1F3A] border border-[#D5BE97] text-xs font-bold uppercase tracking-widest shadow-xs">
              <span className="text-sm">🎥</span>
              <span>TREINAMENTO HDZ FINANCE</span>
            </span>
          </div>

          {/* TÍTULO COM DESTAQUE DOURADO #E9991C E CONTORNO PRETO */}
          <h1 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A] tracking-tight leading-[1.2] max-w-[760px] mx-auto">
            Comprar Bitcoin é só o começo. <br />
            <span style={goldTextStrokeLarge}>
              Aprenda a cuidar do que é seu.
            </span>
          </h1>

          {/* DESCRIÇÃO */}
          <p className="text-[15px] sm:text-base md:text-[17px] text-[#1F2937] leading-[1.5] max-w-[740px] mx-auto font-normal opacity-100">
            Entenda como o dinheiro funciona, o que torna o Bitcoin diferente e os cuidados para guardar e movimentar seus ativos. Aulas em vídeo que conectam fundamentos e prática para você tomar decisões com mais clareza e autonomia.
          </p>

          {/* CAPA DOS MÓDULOS (BORDA DOURADA 3PX #E9991C) */}
          <div className="pt-2">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] mx-auto rounded-2xl p-3 bg-[#FFFFFF] border-[3px] border-[#E9991C] shadow-md">
              <Image
                src="/images/products/training-books-cover.jpg"
                alt="Treinamento HDZ Finance — Módulos do Treinamento"
                width={340}
                height={400}
                priority
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 640px) 280px, 340px"
              />
            </div>
          </div>

          {/* LEGENDA ABAIXO DA IMAGEM */}
          <div className="pt-1">
            <p className="text-xs sm:text-sm md:text-base font-outfit font-extrabold text-[#0B1F3A] tracking-wide leading-snug max-w-xl mx-auto">
              📚 <span style={goldTextStrokeSmall}>5 MÓDULOS</span> COM VIDEOAULAS + 🎁 <span style={goldTextStrokeSmall}>2 E-BOOKS GRÁTIS</span> PARA LEITURA
            </p>
          </div>

          {/* QUATRO PEQUENOS BLOCOS DE BENEFÍCIOS (2 COLUNAS X 2 LINHAS) */}
          <div className="pt-2 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {/* BLOCO 1 */}
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#D5BE97] shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-[#E9991C]/15 border border-[#E9991C]/30 flex items-center justify-center text-lg shrink-0">
                🪙
              </div>
              <p className="text-xs sm:text-sm text-[#0B1F3A] font-medium leading-snug">
                <strong>Entenda dinheiro, Bitcoin</strong> e blockchain.
              </p>
            </div>

            {/* BLOCO 2 */}
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#D5BE97] shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center text-lg shrink-0">
                🔐
              </div>
              <p className="text-xs sm:text-sm text-[#0B1F3A] font-medium leading-snug">
                Conheça <strong>seed phrase</strong> e chaves privadas.
              </p>
            </div>

            {/* BLOCO 3 */}
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#D5BE97] shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-[#00A859]/15 border border-[#00A859]/30 flex items-center justify-center text-lg shrink-0">
                📈
              </div>
              <p className="text-xs sm:text-sm text-[#0B1F3A] font-medium leading-snug">
                Compreenda os <strong>ciclos de mercado</strong>.
              </p>
            </div>

            {/* BLOCO 4 */}
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#D5BE97] shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-[#E9991C]/15 border border-[#E9991C]/30 flex items-center justify-center text-lg shrink-0">
                👛
              </div>
              <p className="text-xs sm:text-sm text-[#0B1F3A] font-medium leading-snug">
                Aprenda cuidados com <strong>carteiras e autocustódia</strong>.
              </p>
            </div>
          </div>

          {/* BOTÃO HERO */}
          <div className="pt-2">
            <button
              onClick={scrollToOffer}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-[#E9991C] hover:bg-[#D88910] focus:bg-[#D88910] active:scale-[0.99] transition-all shadow-md group"
            >
              <span style={whiteButtonTextStroke} className="font-extrabold text-base md:text-lg tracking-wide">
                QUERO ACESSAR O TREINAMENTO
              </span>
              <ArrowRight
                className="w-5 h-5 ml-1 text-[#FFFFFF] shrink-0"
                style={{
                  filter:
                    "drop-shadow(-0.6px 0 0 #000000) drop-shadow(0.6px 0 0 #000000) drop-shadow(0 -0.6px 0 #000000) drop-shadow(0 0.6px 0 #000000)",
                }}
              />
            </button>
          </div>

          {/* INDICADORES DE PAGAMENTO ABAIXO DO BOTÃO */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#00A859]/10 text-[#00A859] border border-[#00A859]/30 shadow-2xs">
              <span>🔒</span>
              <span>Pagamento seguro</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#00A859]/10 text-[#00A859] border border-[#00A859]/30 shadow-2xs">
              <span>💠</span>
              <span>Pix</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/30 shadow-2xs">
              <span>💳</span>
              <span>Cartão de crédito</span>
            </span>
          </div>

        </div>
      </section>

      {/* ==================== 02 — CARROSSEL (FUNDO 2: AZUL-MARINHO #0B1F3A) ==================== */}
      <section
        className="py-12 md:py-16 bg-[#0B1F3A] border-b border-[#0B1F3A]"
        onMouseEnter={() => setIsHoveringCarousel(true)}
        onMouseLeave={() => setIsHoveringCarousel(false)}
      >
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-6 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FFFFFF] border border-[#D5BE97] inline-block shadow-xs">
              📚 CONHEÇA AS ETAPAS
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-3xl lg:text-4xl text-[#FFFFFF] opacity-100">
              Do dinheiro à prática com Bitcoin.
            </h2>
            <p className="text-sm md:text-base text-[#FFFFFF] opacity-100">
              Veja os assuntos que conectam as aulas do treinamento.
            </p>
          </div>

          {/* CARROSSEL DE CARDS BRANCOS */}
          <div className="relative pt-2">
            <div className="overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${(carouselIndex * 100) / cardsPerPage}%)`,
                }}
              >
                {CAROUSEL_STAGES.map((stage) => (
                  <div
                    key={stage.id}
                    style={{ width: `${100 / cardsPerPage}%` }}
                    className="shrink-0 px-3 flex flex-col"
                  >
                    <div className="h-full flex flex-col justify-between p-5 rounded-2xl bg-[#FFFFFF] border-[1.5px] border-[#E9991C] shadow-md hover:shadow-lg transition-all text-left group">
                      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-[#FAF7F2] border-2 border-[#E9991C]">
                        <Image
                          src={stage.image}
                          alt={stage.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] mb-2">
                            {stage.badge}
                          </span>
                          <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A] leading-snug">
                            {stage.title}
                          </h3>
                          <p className="text-xs md:text-sm text-[#1F2937] mt-1.5 leading-relaxed opacity-100">
                            {stage.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTROLES DO CARROSSEL */}
            <div className="flex items-center justify-between mt-6 max-w-[240px] mx-auto">
              <button
                onClick={prevCarousel}
                aria-label="Anterior"
                className="p-2.5 rounded-full bg-[#FFFFFF] border border-[#D5BE97] hover:bg-[#E9991C] hover:border-[#E9991C] text-[#0B1F3A] hover:text-[#FFFFFF] transition-all shadow-xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    aria-label={`Ir para a etapa ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      carouselIndex === idx
                        ? "w-7 bg-[#E9991C]"
                        : "w-2.5 bg-[#FFFFFF]/50 hover:bg-[#FFFFFF]"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextCarousel}
                aria-label="Próximo"
                className="p-2.5 rounded-full bg-[#FFFFFF] border border-[#D5BE97] hover:bg-[#E9991C] hover:border-[#E9991C] text-[#0B1F3A] hover:text-[#FFFFFF] transition-all shadow-xs"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 03 — FUNDAMENTOS (FUNDO 3: BRANCO #FFFFFF) ==================== */}
      <section className="py-12 md:py-16 bg-[#FFFFFF] border-b border-[#D5BE97]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FAF5E8] border border-[#D5BE97] inline-block shadow-xs">
              🎯 UMA BASE PARA COMEÇAR
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-3xl lg:text-4xl text-[#0B1F3A]">
              Mais clareza para entender. Mais critério para decidir.
            </h2>
            <p className="text-sm md:text-base text-[#1F2937] max-w-2xl mx-auto leading-relaxed opacity-100">
              Conheça os assuntos que ajudam a compreender o Bitcoin, acompanhar o mercado e reconhecer os cuidados envolvidos no uso dos ativos.
            </p>
          </div>

          {/* GRID DE 4 BLOCOS COM CARDS TRATADOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border-[1.5px] border-[#E9991C] shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-xl shrink-0">
                  💰
                </div>
                <h3 className="font-outfit font-bold text-lg text-[#0B1F3A]">
                  Dinheiro
                </h3>
                <p className="text-sm text-[#1F2937] leading-relaxed opacity-100">
                  Entenda o sistema monetário, a inflação e os fatores que afetam o poder de compra.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border-[1.5px] border-[#E9991C] shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#FFF7E5] border border-[#FDE68A] flex items-center justify-center text-xl shrink-0">
                  🪙
                </div>
                <h3 className="font-outfit font-bold text-lg text-[#0B1F3A]">
                  Bitcoin
                </h3>
                <p className="text-sm text-[#1F2937] leading-relaxed opacity-100">
                  Conheça blockchain, mineração, criptografia e os fundamentos de uma rede descentralizada.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border-[1.5px] border-[#E9991C] shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-xl shrink-0">
                  📊
                </div>
                <h3 className="font-outfit font-bold text-lg text-[#0B1F3A]">
                  Mercado
                </h3>
                <p className="text-sm text-[#1F2937] leading-relaxed opacity-100">
                  Compreenda ciclos, volatilidade e a influência das emoções nas decisões.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border-[1.5px] border-[#E9991C] shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center text-xl shrink-0">
                  🔐
                </div>
                <h3 className="font-outfit font-bold text-lg text-[#0B1F3A]">
                  Autocustódia
                </h3>
                <p className="text-sm text-[#1F2937] leading-relaxed opacity-100">
                  Conheça carteiras, chaves privadas, frases de recuperação e cuidados com backups.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={scrollToModules}
              className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-[#E9991C] hover:bg-[#D88910] transition-all shadow-md group"
            >
              <span style={whiteButtonTextStroke} className="font-extrabold text-sm md:text-base">
                VER O CONTEÚDO DO TREINAMENTO
              </span>
              <ArrowRight
                className="w-4 h-4 ml-1 text-[#FFFFFF]"
                style={{
                  filter:
                    "drop-shadow(-0.6px 0 0 #000000) drop-shadow(0.6px 0 0 #000000) drop-shadow(0 -0.6px 0 #000000) drop-shadow(0 0.6px 0 #000000)",
                }}
              />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== 04 — AUTOCUSTÓDIA (FUNDO 4: AZUL-MARINHO #0B1F3A) ==================== */}
      <section className="py-12 md:py-16 bg-[#0B1F3A] border-b border-[#0B1F3A]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FFFFFF] border border-[#D5BE97] inline-block shadow-xs">
              🛡️ AUTOCUSTÓDIA NA PRÁTICA
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-3xl lg:text-4xl text-[#FFFFFF] opacity-100">
              Mais controle também exige mais cuidado.
            </h2>
            <p className="text-sm md:text-base text-[#FFFFFF] max-w-2xl mx-auto leading-relaxed opacity-100">
              Guardar seus próprios bitcoins envolve responsabilidades. Conhecer as carteiras, as chaves e os mecanismos de recuperação ajuda a reconhecer os cuidados necessários antes de movimentar seus ativos.
            </p>
          </div>

          {/* GRID DE 4 CARDS BRANCOS COM TRATAMENTO DE BORDA E ÍCONES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border-[1.5px] border-[#E9991C] shadow-md hover:shadow-lg transition-all space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#FFF7E5] border border-[#FDE68A] flex items-center justify-center text-xl shrink-0">
                🔑
              </div>
              <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A]">
                Frase de recuperação
              </h3>
              <p className="text-xs md:text-sm text-[#1F2937] leading-relaxed opacity-100">
                Entenda para que ela serve e os cuidados de armazenamento. Expor ou perder essa informação pode comprometer o acesso à carteira.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border-[1.5px] border-[#E9991C] shadow-md hover:shadow-lg transition-all space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center text-xl shrink-0">
                🔒
              </div>
              <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A]">
                Chaves e carteiras
              </h3>
              <p className="text-xs md:text-sm text-[#1F2937] leading-relaxed opacity-100">
                Conheça a diferença entre uma carteira sob seu controle e uma conta em que terceiros administram as chaves.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border-[1.5px] border-[#E9991C] shadow-md hover:shadow-lg transition-all space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-xl shrink-0">
                🏦
              </div>
              <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A]">
                Exchanges
              </h3>
              <p className="text-xs md:text-sm text-[#1F2937] leading-relaxed opacity-100">
                Entenda o papel das plataformas de negociação e como a custódia funciona em cada situação.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border-[1.5px] border-[#E9991C] shadow-md hover:shadow-lg transition-all space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#F0FDFA] border border-[#99F6E4] flex items-center justify-center text-xl shrink-0">
                🧭
              </div>
              <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A]">
                Decisões por impulso
              </h3>
              <p className="text-xs md:text-sm text-[#1F2937] leading-relaxed opacity-100">
                Reconheça como o medo e a euforia podem influenciar suas escolhas. Conhecimento não elimina os riscos, mas ajuda a compreender o contexto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 05 — PÚBLICO (FUNDO 5: BRANCO #FFFFFF) ==================== */}
      <section className="py-12 md:py-16 bg-[#FFFFFF] border-b border-[#D5BE97]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FAF5E8] border border-[#D5BE97] inline-block shadow-xs">
              👥 PÚBLICO DO TREINAMENTO
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-3xl lg:text-4xl text-[#0B1F3A]">
              Este treinamento faz sentido para você?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            {PUBLIC_CARDS.map((card, idx) => {
              const scheme = SCHEMES[card.colorKey];
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FFFFFF] border-[1.5px] border-[#E9991C] shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* ÁREA ARREDONDADA DE 44PX ATRÁS DO EMOJI COM COR SUAVE */}
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-xl ${scheme.bgSoft} border ${scheme.borderSoft} flex items-center justify-center text-xl shrink-0`}>
                        {card.emoji}
                      </div>
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider ${scheme.bgSoft} ${scheme.textHighlight} border ${scheme.borderSoft}`}>
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A] pt-1">
                      {card.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#1F2937] leading-relaxed opacity-100">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 06 — CONTEÚDO DOS MÓDULOS (FUNDO 6: AZUL-MARINHO #0B1F3A) ==================== */}
      <section id="modulos" className="py-12 md:py-16 bg-[#0B1F3A] border-b border-[#0B1F3A]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-10 text-center">
          {/* INTRODUÇÃO */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FFFFFF] border border-[#D5BE97] inline-block shadow-xs">
              📚 CONHEÇA O TREINAMENTO
            </span>
            <h2 className="font-outfit font-bold text-2xl sm:text-3xl md:text-4xl text-[#FFFFFF] leading-tight opacity-100">
              Conheça o conteúdo do treinamento.
            </h2>
            <p className="text-[15px] sm:text-base text-[#FFFFFF] leading-relaxed max-w-2xl mx-auto font-normal opacity-100">
              Uma apresentação e cinco módulos para conectar os conceitos às demonstrações práticas.
            </p>
          </div>

          {/* GRID DOS 6 CARDS BRANCOS COM IDENTIFICAÇÕES E MARCADORES COLORIDOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left items-stretch">
            {COURSE_MODULES.map((mod) => {
              const scheme = SCHEMES[mod.colorKey];
              return (
                <div
                  key={mod.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border-[1.5px] border-[#E9991C] shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* EMOJI DENTRO DA ÁREA COLORIDA ARREDONDADA + ETIQUETA DO MÓDULO */}
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-xl ${scheme.bgSoft} border ${scheme.borderSoft} flex items-center justify-center text-xl shrink-0`}>
                        {mod.emoji}
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${scheme.bgSoft} ${scheme.textHighlight} border ${scheme.borderSoft}`}>
                        {mod.moduleLabel}
                      </span>
                    </div>

                    {/* TÍTULO */}
                    <h3 className="font-outfit font-bold text-[18px] sm:text-[20px] text-[#0B1F3A] leading-snug pt-1">
                      {mod.title}
                    </h3>

                    {/* PARÁGRAFO EXPLICATIVO */}
                    <p className="text-[15px] sm:text-[16px] text-[#1F2937] leading-[1.55] font-normal opacity-100">
                      {mod.description}
                    </p>
                  </div>

                  {/* TÓPICOS COM MARCADORES COLORIDOS */}
                  <div className="pt-3 border-t border-[#D5BE97]">
                    <ul className="space-y-2 text-[14.5px] sm:text-[15px] text-[#1F2937]">
                      {mod.topics.map((topic, i) => (
                        <li key={i} className="flex items-start space-x-2.5 leading-snug">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${scheme.markerBg} shrink-0 mt-1.5`}
                            aria-hidden="true"
                          />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 07 — PRÉVIAS DAS AULAS (FUNDO 7: BRANCO #FFFFFF) ==================== */}
      <section className="py-12 md:py-16 bg-[#FFFFFF] border-b border-[#D5BE97]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FAF5E8] border border-[#D5BE97] inline-block shadow-xs">
              🎬 VEJA POR DENTRO
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-3xl lg:text-4xl text-[#0B1F3A]">
              Conheça o treinamento por dentro.
            </h2>
            <p className="text-sm md:text-base text-[#1F2937] opacity-100">
              Confira imagens reais das aulas, das explicações visuais e das demonstrações apresentadas no treinamento.
            </p>
          </div>

          {/* GRID DE 3 PRÉVIAS COM MOLDURA DOURADA #E9991C, SOMBRA E LEGENDA CLARA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {INSIDE_LESSONS.map((item, idx) => (
              <div key={item.id} className="flex flex-col space-y-2 text-center">
                <div
                  onClick={() => setActivePreviewIndex(idx)}
                  className="cursor-pointer group relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#FAF7F2] border-2 border-[#E9991C] hover:border-[#D88910] transition-all shadow-md"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#0B1F3A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-[#FFFFFF] font-bold text-xs">
                    <Maximize2 className="w-5 h-5 text-[#E9991C]" />
                    <span>🔍 Ampliar imagem</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#0B1F3A] pt-1">
                  {item.title}
                </p>
                <button
                  onClick={() => setActivePreviewIndex(idx)}
                  className="text-[11px] font-semibold text-[#E9991C] hover:underline inline-flex items-center justify-center gap-1"
                >
                  <span>🔍 Ampliar imagem</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 08 — RESULTADOS (FUNDO 8: AZUL-MARINHO #0B1F3A) ==================== */}
      <section className="py-12 md:py-16 bg-[#0B1F3A] border-b border-[#0B1F3A]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FFFFFF] border border-[#D5BE97] inline-block shadow-xs">
              🎓 CONHECIMENTO PARA A PRÁTICA
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-3xl lg:text-4xl text-[#FFFFFF] opacity-100">
              Leve esse conhecimento para suas próximas decisões.
            </h2>
          </div>

          {/* 3 CARDS BRANCOS COM EMOJIS DESTACADOS E CORES AUXILIARES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {LEARNING_CARDS.map((card, idx) => {
              const scheme = SCHEMES[card.colorKey];
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FFFFFF] border-[1.5px] border-[#E9991C] shadow-md hover:shadow-lg transition-all space-y-3"
                >
                  <div className={`w-12 h-12 rounded-xl ${scheme.bgSoft} border ${scheme.borderSoft} flex items-center justify-center text-2xl shrink-0`}>
                    {card.emoji}
                  </div>
                  <h3 className="font-outfit font-bold text-lg md:text-xl text-[#0B1F3A]">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#1F2937] leading-relaxed opacity-100">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-sm md:text-base text-[#FFFFFF] max-w-2xl mx-auto italic font-medium pt-2 opacity-100">
            O objetivo é oferecer uma base para você compreender melhor suas escolhas e reconhecer os cuidados envolvidos em cada etapa.
          </p>
        </div>
      </section>

      {/* ==================== 09 — OFERTA (FUNDO 9: BRANCO #FFFFFF) ==================== */}
      <section id="oferta" className="py-14 md:py-18 bg-[#FFFFFF] border-b border-[#D5BE97]">
        <div className="max-w-[960px] mx-auto px-5 md:px-8">
          
          {/* CARD BRANCO DA OFERTA (BORDA DOURADA 2PX #E9991C, SOMBRA SUAVE) */}
          <div className="rounded-3xl bg-[#FFFFFF] border-2 border-[#E9991C] p-6 md:p-10 text-center space-y-6 shadow-lg">
            <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#FAF5E8] text-[#0B1F3A] border border-[#D5BE97] text-xs font-bold uppercase tracking-widest">
              <span>🎥</span>
              <span>ACESSO AO TREINAMENTO</span>
            </span>

            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A]">
              Acesse o treinamento e comece pelos fundamentos.
            </h2>

            <p className="text-sm sm:text-base text-[#1F2937] max-w-2xl mx-auto leading-relaxed opacity-100">
              Uma apresentação, cinco módulos e mais de quatro horas de aulas em vídeo sobre dinheiro, Bitcoin, mercado e autocustódia.
            </p>

            {/* LISTA COMPACTA DOS CONTEÚDOS COM PEQUENOS MARCADORES VERDES */}
            <div className="p-5 rounded-2xl bg-[#ECFDF5]/50 border border-[#A7F3D0] max-w-xl mx-auto text-left space-y-3">
              <span className="font-bold text-[#0B1F3A] block text-xs uppercase tracking-wider">
                Conteúdo incluído no seu acesso:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs md:text-sm text-[#1F2937]">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#00A859] flex items-center justify-center text-[#FFFFFF] shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Apresentação & Visão Geral</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#00A859] flex items-center justify-center text-[#FFFFFF] shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Módulo 1 — Dinheiro</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#00A859] flex items-center justify-center text-[#FFFFFF] shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Módulo 2 — O que é Bitcoin</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#00A859] flex items-center justify-center text-[#FFFFFF] shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Módulo 3 — Ciclos de Mercado</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#00A859] flex items-center justify-center text-[#FFFFFF] shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Módulo 4 — Autocustódia</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#00A859] flex items-center justify-center text-[#FFFFFF] shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Módulo 5 — Gerenciamento</span>
                </div>
              </div>
            </div>

            {/* VALOR DO TREINAMENTO */}
            <div className="space-y-1.5 pt-2">
              <div className="text-xs text-[#1F2937] font-extrabold uppercase tracking-widest opacity-100">
                VALOR DO TREINAMENTO
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-[#0B1F3A]">
                12x R$ 19,78
              </div>
              <div className="text-base font-bold text-[#1F2937] opacity-100">
                ou R$ 197,00 à vista
              </div>
              <div className="text-xs text-[#1F2937] opacity-100 font-medium">
                Total do parcelamento: R$ 237,36
              </div>
            </div>

            {/* BOTÃO CTA DA OFERTA (FUNDO #E9991C, HOVER #D88910, LEGENDA BRANCA COM CONTORNO PRETO) */}
            <div className="pt-2 space-y-3 max-w-md mx-auto">
              <a
                href={trainingOffer.checkoutUrl || "#"}
                target={trainingOffer.checkoutUrl ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-[#E9991C] hover:bg-[#D88910] focus:bg-[#D88910] active:scale-[0.99] transition-all shadow-md group"
              >
                <span style={whiteButtonTextStroke} className="font-extrabold text-base md:text-lg tracking-wide">
                  QUERO ACESSAR O TREINAMENTO
                </span>
                <ArrowRight
                  className="w-5 h-5 ml-1 text-[#FFFFFF] shrink-0"
                  style={{
                    filter:
                      "drop-shadow(-0.6px 0 0 #000000) drop-shadow(0.6px 0 0 #000000) drop-shadow(0 -0.6px 0 #000000) drop-shadow(0 0.6px 0 #000000)",
                  }}
                />
              </a>
              <p className="text-xs text-[#1F2937] opacity-100 font-medium">
                Pagamento realizado pelo checkout oficial. 7 dias de garantia incondicional.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 10 — PASSO A PASSO DO ACESSO (FUNDO 10: AZUL-MARINHO #0B1F3A) ==================== */}
      <section className="py-14 md:py-18 bg-[#0B1F3A] border-b border-[#0B1F3A] relative">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-10 text-center">
          
          {/* ETIQUETA E CABEÇALHO */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FFFFFF] border border-[#D5BE97] inline-block shadow-xs">
              📩 PASSO A PASSO DO ACESSO
            </span>
            <h2 className="font-outfit font-bold text-2xl sm:text-3xl md:text-4xl text-[#FFFFFF] opacity-100">
              Como você acessa o treinamento.
            </h2>
            <p className="text-sm md:text-base text-[#FFFFFF] opacity-100">
              Da confirmação da compra às primeiras aulas, veja como funciona.
            </p>
          </div>

          {/* GRID DE 4 ETAPAS DE ACESSO COM TRATAMENTO DE CARDS E NÚMEROS DESTACADOS */}
          <div className="relative pt-4">
            
            {/* LINHA DISCRETA DE CONEXÃO NO DESKTOP */}
            <div className="hidden lg:block absolute top-[68px] left-[10%] right-[10%] h-[2px] bg-[#E9991C]/40 z-0" aria-hidden="true" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left relative z-10">
              {ACCESS_STEPS.map((step, idx) => {
                const scheme = SCHEMES[step.colorKey];
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#FFFFFF] border-[1.5px] border-[#E9991C] shadow-md hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        {/* EMOJI MAIOR EM ÁREA COLORIDA ARREDONDADA */}
                        <div className={`w-12 h-12 rounded-xl ${scheme.bgSoft} border ${scheme.borderSoft} flex items-center justify-center text-2xl shrink-0`}>
                          {step.emoji}
                        </div>
                        {/* NÚMERO EM CÍRCULO/PILULA DOURADA */}
                        <span className="text-xl font-extrabold font-outfit text-[#E9991C] bg-[#FFF7E5] border border-[#FDE68A] px-2.5 py-0.5 rounded-full" style={goldTextStrokeSmall}>
                          {step.step}
                        </span>
                      </div>
                      <h3 className="font-outfit font-bold text-base sm:text-lg text-[#0B1F3A] tracking-tight">
                        ETAPA {idx + 1} — {step.title.toUpperCase()}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed opacity-100">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BOTÃO DA SEÇÃO DE ACESSO */}
          <div className="pt-2">
            <button
              onClick={scrollToOffer}
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-[#E9991C] hover:bg-[#D88910] transition-all shadow-md active:scale-[0.99] group"
            >
              <span style={whiteButtonTextStroke} className="font-extrabold text-base">
                QUERO ACESSAR O TREINAMENTO
              </span>
              <ArrowRight
                className="w-5 h-5 ml-1 text-[#FFFFFF] shrink-0"
                style={{
                  filter:
                    "drop-shadow(-0.6px 0 0 #000000) drop-shadow(0.6px 0 0 #000000) drop-shadow(0 -0.6px 0 #000000) drop-shadow(0 0.6px 0 #000000)",
                }}
              />
            </button>
          </div>

        </div>
      </section>

      {/* ==================== 11 — FAQ (FUNDO 11: BRANCO #FFFFFF) ==================== */}
      <section className="py-12 md:py-16 bg-[#FFFFFF] border-b border-[#D5BE97]">
        <div className="max-w-[800px] mx-auto px-5 md:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FAF5E8] border border-[#D5BE97] inline-block shadow-xs">
              💬 PERGUNTAS FREQUENTES
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#0B1F3A]">
              Perguntas frequentes.
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className="rounded-xl bg-[#FFFFFF] border border-[#D5BE97] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left text-sm md:text-base font-bold text-[#0B1F3A] hover:text-[#E9991C] transition-colors"
                >
                  <span className="pr-4">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#E9991C] shrink-0 transition-transform duration-200 ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 pb-5 md:px-5 text-xs md:text-sm text-[#1F2937] leading-relaxed border-t border-[#D5BE97] pt-3 opacity-100">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MODAL LIGHTBOX PREVIEW ==================== */}
      {activePreviewIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#0B1F3A]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center bg-[#FFFFFF] border-2 border-[#E9991C] rounded-2xl overflow-hidden p-4 md:p-6 shadow-2xl">
            <button
              onClick={() => setActivePreviewIndex(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-[#FAF7F2] text-[#0B1F3A] hover:bg-[#E9991C] hover:text-[#FFFFFF] transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full aspect-[16/9] max-h-[75vh]">
              <Image
                src={INSIDE_LESSONS[activePreviewIndex]?.image || CAROUSEL_STAGES[activePreviewIndex]?.image}
                alt={INSIDE_LESSONS[activePreviewIndex]?.title || CAROUSEL_STAGES[activePreviewIndex]?.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A]">
                {INSIDE_LESSONS[activePreviewIndex]?.title || CAROUSEL_STAGES[activePreviewIndex]?.title}
              </h4>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

