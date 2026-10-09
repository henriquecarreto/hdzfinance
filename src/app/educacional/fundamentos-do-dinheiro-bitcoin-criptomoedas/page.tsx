"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Key,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Check,
  ShoppingBag,
  Mail,
  PlayCircle,
  BookOpen,
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

// 6 Modules Dataset
interface ModuleCard {
  id: number;
  moduleLabel: string;
  title: string;
  description: string;
  topics: string[];
}

const COURSE_MODULES: ModuleCard[] = [
  {
    id: 0,
    moduleLabel: "VISÃO GERAL",
    title: "APRESENTAÇÃO",
    description:
      "Conheça a proposta do treinamento, a organização das aulas e como os assuntos se conectam. Uma introdução para orientar seus primeiros passos e ajudar você a acompanhar o conteúdo.",
    topics: [
      "Organização das aulas.",
      "Visão geral dos assuntos.",
      "Como acompanhar o treinamento.",
    ],
  },
  {
    id: 1,
    moduleLabel: "MÓDULO 01",
    title: "FUNDAMENTOS DO DINHEIRO",
    description:
      "Entenda a origem e as funções do dinheiro, além dos efeitos da inflação e da expansão monetária sobre o poder de compra. Uma base para compreender o contexto em que o Bitcoin surgiu.",
    topics: [
      "Origem e funções do dinheiro.",
      "Inflação e poder de compra.",
      "Bancos centrais e expansão monetária.",
    ],
  },
  {
    id: 2,
    moduleLabel: "MÓDULO 02",
    title: "O QUE É BITCOIN",
    description:
      "Conheça a proposta do Bitcoin e os fundamentos do funcionamento da rede. Entenda os conceitos que permitem olhar para o ativo além da cotação.",
    topics: [
      "Blockchain e descentralização.",
      "Criptografia e mineração.",
      "Oferta programada.",
    ],
  },
  {
    id: 3,
    moduleLabel: "MÓDULO 03",
    title: "CICLOS DE MERCADO",
    description:
      "Entenda como ciclos, volatilidade e comportamento dos participantes se relacionam. Conheça os indicadores e exemplos apresentados nas aulas para compreender melhor o contexto do mercado.",
    topics: [
      "Fases dos ciclos.",
      "Indicadores e contexto.",
      "Emoções nas decisões.",
    ],
  },
  {
    id: 4,
    moduleLabel: "MÓDULO 04",
    title: "SEJA VOCÊ SEU PRÓPRIO BANCO",
    description:
      "Conheça as carteiras e os cuidados envolvidos na autocustódia. Entenda o papel das chaves, das frases de recuperação e dos backups na guarda dos seus bitcoins.",
    topics: [
      "Tipos de carteiras.",
      "Chaves e frases de recuperação.",
      "Backups e cuidados de armazenamento.",
    ],
  },
  {
    id: 5,
    moduleLabel: "MÓDULO 05",
    title: "GERENCIAMENTO E UTILIZAÇÃO",
    description:
      "Conecte os conceitos à organização e ao uso dos ativos. Acompanhe as demonstrações de movimentação e utilização apresentadas no treinamento.",
    topics: [
      "Exposição e organização da carteira.",
      "Envio, recebimento e saques.",
      "Demonstrações práticas de ferramentas.",
    ],
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#243247] font-sans antialiased selection:bg-[#E4C98B]/40 selection:text-[#0B1F3A] overflow-x-hidden">

      {/* ==================== 01 — HERO PRINCIPAL (FUNDO #FAF7F2) ==================== */}
      <section className="relative py-10 md:py-14 bg-[#FAF7F2] border-b border-[#E8DFCF]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center space-y-5">
          
          {/* ETIQUETA */}
          <div>
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FAF5E8] text-[#0B1F3A] border border-[#E4C98B] text-xs font-bold uppercase tracking-widest shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#B94F00]" />
              <span>TREINAMENTO HDZ FINANCE</span>
            </span>
          </div>

          {/* TÍTULO */}
          <h1 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A] tracking-tight leading-[1.2] max-w-[760px] mx-auto">
            Comprar Bitcoin é só o começo. <br />
            <span className="text-[#B94F00]">
              Aprenda a cuidar do que é seu.
            </span>
          </h1>

          {/* DESCRIÇÃO */}
          <p className="text-[15px] sm:text-base md:text-[17px] text-[#44566C] leading-[1.5] max-w-[740px] mx-auto font-normal">
            Entenda como o dinheiro funciona, o que torna o Bitcoin diferente e os cuidados para guardar e movimentar seus ativos. Aulas em vídeo que conectam fundamentos e prática para você tomar decisões com mais clareza e autonomia.
          </p>

          {/* CAPA DOS MÓDULOS */}
          <div className="pt-2">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] mx-auto rounded-2xl p-3 bg-[#FFFFFF] border border-[#E8DFCF] shadow-lg">
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

          {/* BENEFÍCIOS DO TREINAMENTO */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-[#0B1F3A] font-semibold max-w-xl mx-auto">
            <div className="flex items-center space-x-2 text-center sm:text-left">
              <CheckCircle2 className="h-4 w-4 text-[#B94F00] shrink-0" />
              <span>Dinheiro e Bitcoin.</span>
            </div>
            <div className="flex items-center space-x-2 text-center sm:text-left">
              <CheckCircle2 className="h-4 w-4 text-[#B94F00] shrink-0" />
              <span>Ciclos e segurança.</span>
            </div>
            <div className="flex items-center space-x-2 text-center sm:text-left">
              <CheckCircle2 className="h-4 w-4 text-[#B94F00] shrink-0" />
              <span>Autocustódia na prática.</span>
            </div>
          </div>

          {/* BOTÃO HERO */}
          <div className="pt-3">
            <button
              onClick={scrollToOffer}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-[#B94F00] hover:bg-[#9F4300] font-extrabold text-base md:text-lg text-[#FFFFFF] transition-all shadow-md active:scale-[0.99]"
            >
              <span className="text-[#FFFFFF] tracking-wide">
                QUERO ACESSAR O TREINAMENTO
              </span>
              <ArrowRight className="w-5 h-5 ml-1 text-[#FFFFFF] shrink-0" />
            </button>
          </div>

        </div>
      </section>

      {/* ==================== 02 — CARROSSEL (FUNDO #FFFFFF) ==================== */}
      <section
        className="py-12 md:py-16 bg-[#FFFFFF] border-b border-[#E8DFCF]"
        onMouseEnter={() => setIsHoveringCarousel(true)}
        onMouseLeave={() => setIsHoveringCarousel(false)}
      >
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-6 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#B94F00] uppercase tracking-widest px-3 py-1 rounded-md bg-[#FAF5E8] border border-[#E4C98B] inline-block">
              CONHEÇA AS ETAPAS
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-3xl lg:text-4xl text-[#0B1F3A]">
              Do dinheiro à prática com Bitcoin.
            </h2>
            <p className="text-sm md:text-base text-[#44566C]">
              Veja os assuntos que conectam as aulas do treinamento.
            </p>
          </div>

          {/* CARROSSEL */}
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
                    <div className="h-full flex flex-col justify-between p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] shadow-xs hover:border-[#E4C98B] hover:shadow-md transition-all text-left group">
                      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-[#FAF7F2]">
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
                          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider bg-[#FAF5E8] text-[#0B1F3A] border border-[#E4C98B] mb-2">
                            {stage.badge}
                          </span>
                          <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A] leading-snug">
                            {stage.title}
                          </h3>
                          <p className="text-xs md:text-sm text-[#44566C] mt-1.5 leading-relaxed">
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
                className="p-2.5 rounded-full bg-[#FAF7F2] border border-[#E8DFCF] hover:bg-[#B94F00] hover:border-[#B94F00] text-[#0B1F3A] hover:text-[#FFFFFF] transition-all"
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
                        ? "w-7 bg-[#B94F00]"
                        : "w-2.5 bg-[#E8DFCF] hover:bg-[#44566C]"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextCarousel}
                aria-label="Próximo"
                className="p-2.5 rounded-full bg-[#FAF7F2] border border-[#E8DFCF] hover:bg-[#B94F00] hover:border-[#B94F00] text-[#0B1F3A] hover:text-[#FFFFFF] transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 03 — SEÇÃO DOS FUNDAMENTOS (FUNDO #FAF6F0) ==================== */}
      <section className="py-12 md:py-16 bg-[#FAF6F0] border-b border-[#E8DFCF]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FAF5E8] border border-[#E4C98B] inline-block">
              UMA BASE PARA COMEÇAR
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-3xl lg:text-4xl text-[#0B1F3A]">
              Mais clareza para entender. Mais critério para decidir.
            </h2>
            <p className="text-sm md:text-base text-[#44566C] max-w-2xl mx-auto leading-relaxed">
              Conheça os assuntos que ajudam a compreender o Bitcoin, acompanhar o mercado e reconhecer os cuidados envolvidos no uso dos ativos.
            </p>
          </div>

          {/* GRID DE 4 BLOCOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00] font-bold text-sm">
                  01
                </div>
                <h3 className="font-outfit font-bold text-lg text-[#0B1F3A]">
                  Dinheiro
                </h3>
                <p className="text-sm text-[#44566C] leading-relaxed">
                  Entenda o sistema monetário, a inflação e os fatores que afetam o poder de compra.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00] font-bold text-sm">
                  02
                </div>
                <h3 className="font-outfit font-bold text-lg text-[#0B1F3A]">
                  Bitcoin
                </h3>
                <p className="text-sm text-[#44566C] leading-relaxed">
                  Conheça blockchain, mineração, criptografia e os fundamentos de uma rede descentralizada.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00] font-bold text-sm">
                  03
                </div>
                <h3 className="font-outfit font-bold text-lg text-[#0B1F3A]">
                  Mercado
                </h3>
                <p className="text-sm text-[#44566C] leading-relaxed">
                  Compreenda ciclos, volatilidade e a influência das emoções nas decisões.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00] font-bold text-sm">
                  04
                </div>
                <h3 className="font-outfit font-bold text-lg text-[#0B1F3A]">
                  Autocustódia
                </h3>
                <p className="text-sm text-[#44566C] leading-relaxed">
                  Conheça carteiras, chaves privadas, frases de recuperação e cuidados com backups.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={scrollToModules}
              className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-[#B94F00] hover:bg-[#9F4300] text-[#FFFFFF] font-extrabold text-sm md:text-base transition-all shadow-xs"
            >
              <span>VER O CONTEÚDO DO TREINAMENTO</span>
              <ArrowRight className="w-4 h-4 ml-1 text-[#FFFFFF]" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== 04 — SEÇÃO DE RESPONSABILIDADE (FUNDO #FAF7F2) ==================== */}
      <section className="py-12 md:py-16 bg-[#FAF7F2] border-b border-[#E8DFCF]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FAF5E8] border border-[#E4C98B] inline-block">
              AUTOCUSTÓDIA NA PRÁTICA
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-3xl lg:text-4xl text-[#0B1F3A]">
              Mais controle também exige mais cuidado.
            </h2>
            <p className="text-sm md:text-base text-[#44566C] max-w-2xl mx-auto leading-relaxed">
              Guardar seus próprios bitcoins envolve responsabilidades. Conhecer as carteiras, as chaves e os mecanismos de recuperação ajuda a reconhecer os cuidados necessários antes de movimentar seus ativos.
            </p>
          </div>

          {/* GRID DE 4 CARDS DE AUTOCUSTÓDIA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00]">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A]">
                Frase de recuperação
              </h3>
              <p className="text-xs md:text-sm text-[#44566C] leading-relaxed">
                Entenda para que ela serve e os cuidados de armazenamento. Expor ou perder essa informação pode comprometer o acesso à carteira.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00]">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A]">
                Chaves e carteiras
              </h3>
              <p className="text-xs md:text-sm text-[#44566C] leading-relaxed">
                Conheça a diferença entre uma carteira sob seu controle e uma conta em que terceiros administram as chaves.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A]">
                Exchanges
              </h3>
              <p className="text-xs md:text-sm text-[#44566C] leading-relaxed">
                Entenda o papel das plataformas de negociação e como a custódia funciona em cada situação.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A]">
                Decisões por impulso
              </h3>
              <p className="text-xs md:text-sm text-[#44566C] leading-relaxed">
                Reconheça como o medo e a euforia podem influenciar suas escolhas. Conhecimento não elimina os riscos, mas ajuda a compreender o contexto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 05 — SEÇÃO DO PÚBLICO (FUNDO #FAF6F0) ==================== */}
      <section className="py-12 md:py-16 bg-[#FAF6F0] border-b border-[#E8DFCF]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FAF5E8] border border-[#E4C98B] inline-block">
              PÚBLICO DO TREINAMENTO
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-3xl lg:text-4xl text-[#0B1F3A]">
              Este treinamento faz sentido para você?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-2.5 shadow-xs">
              <span className="text-[11px] font-extrabold text-[#B94F00] uppercase tracking-wider block">
                01 • INICIANTES
              </span>
              <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A]">
                Para quem está começando
              </h3>
              <p className="text-xs md:text-sm text-[#44566C] leading-relaxed">
                Quer entender o Bitcoin desde os fundamentos, com explicações claras e exemplos.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-2.5 shadow-xs">
              <span className="text-[11px] font-extrabold text-[#B94F00] uppercase tracking-wider block">
                02 • INVESTIDORES
              </span>
              <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A]">
                Para quem já possui cripto
              </h3>
              <p className="text-xs md:text-sm text-[#44566C] leading-relaxed">
                Já comprou ativos e quer compreender melhor segurança, custódia e organização da carteira.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-2.5 shadow-xs">
              <span className="text-[11px] font-extrabold text-[#B94F00] uppercase tracking-wider block">
                03 • SEGURANÇA
              </span>
              <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A]">
                Para quem quer conhecer a autocustódia
              </h3>
              <p className="text-xs md:text-sm text-[#44566C] leading-relaxed">
                Quer aprender sobre carteiras, chaves e as responsabilidades de guardar seus próprios bitcoins.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-2.5 shadow-xs">
              <span className="text-[11px] font-extrabold text-[#B94F00] uppercase tracking-wider block">
                04 • CRITÉRIO
              </span>
              <h3 className="font-outfit font-bold text-base md:text-lg text-[#0B1F3A]">
                Para quem busca mais critério
              </h3>
              <p className="text-xs md:text-sm text-[#44566C] leading-relaxed">
                Quer compreender o mercado antes de decidir com base em opiniões ou oscilações de preço.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 06 — CONTEÚDO DOS MÓDULOS (FUNDO #F7F3EA) ==================== */}
      <section id="modulos" className="py-12 md:py-16 bg-[#F7F3EA] border-b border-[#E8DFCF]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-10 text-center">
          {/* INTRODUÇÃO */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FAF5E8] border border-[#E4C98B] inline-block">
              CONTEÚDO DAS AULAS
            </span>
            <h2 className="font-outfit font-bold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A] leading-tight">
              Conheça o conteúdo do treinamento.
            </h2>
            <p className="text-[15px] sm:text-base text-[#44566C] leading-relaxed max-w-2xl mx-auto font-normal">
              Uma apresentação e cinco módulos para conectar os conceitos às demonstrações práticas.
            </p>
          </div>

          {/* GRID DOS 6 CARDS DE MÓDULOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left items-stretch">
            {COURSE_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] shadow-xs hover:border-[#E4C98B] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* IDENTIFICAÇÃO DO MÓDULO */}
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider bg-[#FAF5E8] text-[#0B1F3A] border border-[#E4C98B]">
                      {mod.moduleLabel}
                    </span>
                  </div>

                  {/* TÍTULO */}
                  <h3 className="font-outfit font-bold text-[19px] sm:text-[20px] text-[#0B1F3A] leading-snug">
                    {mod.title}
                  </h3>

                  {/* PARÁGRAFO EXPLICATIVO */}
                  <p className="text-[14.5px] text-[#243247] leading-[1.55] font-normal">
                    {mod.description}
                  </p>
                </div>

                {/* TÓPICOS SIMPLES SEM SEÇÕES INTERNAS */}
                <div className="pt-3 border-t border-[#E8DFCF]">
                  <ul className="space-y-2 text-[14px] text-[#44566C]">
                    {mod.topics.map((topic, i) => (
                      <li key={i} className="flex items-start space-x-2.5 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B94F00] shrink-0 mt-1.5" aria-hidden="true" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 07 — PRÉVIAS DAS AULAS (FUNDO #FFFFFF) ==================== */}
      <section className="py-12 md:py-16 bg-[#FFFFFF] border-b border-[#E8DFCF]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FAF5E8] border border-[#E4C98B] inline-block">
              VEJA POR DENTRO
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-3xl lg:text-4xl text-[#0B1F3A]">
              Conheça o treinamento por dentro.
            </h2>
            <p className="text-sm md:text-base text-[#44566C]">
              Confira imagens reais das aulas, das explicações visuais e das demonstrações apresentadas no treinamento.
            </p>
          </div>

          {/* GRID DE 3 PRÉVIAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {INSIDE_LESSONS.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActivePreviewIndex(idx)}
                className="cursor-pointer group relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all shadow-xs"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#0B1F3A]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-[#FFFFFF] font-bold text-xs">
                  <Maximize2 className="w-5 h-5 text-[#E4C98B]" />
                  <span>AMPLIAR IMAGEM</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 08 — RESULTADOS DE APRENDIZADO (FUNDO #FAF7F2) ==================== */}
      <section className="py-12 md:py-16 bg-[#FAF7F2] border-b border-[#E8DFCF]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FAF5E8] border border-[#E4C98B] inline-block">
              CONHECIMENTO PARA A PRÁTICA
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-3xl lg:text-4xl text-[#0B1F3A]">
              Leve esse conhecimento para suas próximas decisões.
            </h2>
          </div>

          {/* 3 CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00] font-bold">
                01
              </div>
              <h3 className="font-outfit font-bold text-lg md:text-xl text-[#0B1F3A]">
                Entender
              </h3>
              <p className="text-sm md:text-base text-[#44566C] leading-relaxed">
                Relacionar dinheiro, Bitcoin, tecnologia e contexto de mercado.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00] font-bold">
                02
              </div>
              <h3 className="font-outfit font-bold text-lg md:text-xl text-[#0B1F3A]">
                Guardar
              </h3>
              <p className="text-sm md:text-base text-[#44566C] leading-relaxed">
                Compreender carteiras, chaves e os cuidados da autocustódia.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00] font-bold">
                03
              </div>
              <h3 className="font-outfit font-bold text-lg md:text-xl text-[#0B1F3A]">
                Utilizar
              </h3>
              <p className="text-sm md:text-base text-[#44566C] leading-relaxed">
                Conhecer os procedimentos e ferramentas demonstrados nas aulas.
              </p>
            </div>
          </div>

          <p className="text-sm md:text-base text-[#44566C] max-w-2xl mx-auto italic font-medium pt-2">
            O objetivo é oferecer uma base para você compreender melhor suas escolhas e reconhecer os cuidados envolvidos em cada etapa.
          </p>
        </div>
      </section>

      {/* ==================== 09 — OFERTA (FUNDO #FAF5E8) ==================== */}
      <section id="oferta" className="py-14 md:py-18 bg-[#FAF5E8] border-b border-[#E8DFCF]">
        <div className="max-w-[960px] mx-auto px-5 md:px-8">
          
          {/* CARD BRANCO DA OFERTA */}
          <div className="rounded-3xl bg-[#FFFFFF] border-2 border-[#E4C98B] p-6 md:p-10 text-center space-y-6 shadow-md">
            <span className="inline-block px-4 py-1 rounded-full bg-[#FAF5E8] text-[#0B1F3A] border border-[#E4C98B] text-xs font-bold uppercase tracking-widest">
              ACESSO AO TREINAMENTO
            </span>

            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A]">
              Acesse o treinamento e comece pelos fundamentos.
            </h2>

            <p className="text-sm sm:text-base text-[#44566C] max-w-2xl mx-auto leading-relaxed">
              Uma apresentação, cinco módulos e mais de quatro horas de aulas em vídeo sobre dinheiro, Bitcoin, mercado e autocustódia.
            </p>

            {/* LISTA COMPACTA DOS CONTEÚDOS */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFCF] max-w-lg mx-auto text-left space-y-2.5">
              <span className="font-bold text-[#0B1F3A] block text-xs uppercase tracking-wider">
                Conteúdo incluído no seu acesso:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-[#243247]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#B94F00] shrink-0" />
                  <span>Apresentação & Visão Geral</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#B94F00] shrink-0" />
                  <span>Módulo 1 — Dinheiro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#B94F00] shrink-0" />
                  <span>Módulo 2 — O que é Bitcoin</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#B94F00] shrink-0" />
                  <span>Módulo 3 — Ciclos de Mercado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#B94F00] shrink-0" />
                  <span>Módulo 4 — Autocustódia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#B94F00] shrink-0" />
                  <span>Módulo 5 — Gerenciamento</span>
                </div>
              </div>
            </div>

            {/* VALOR DO TREINAMENTO */}
            <div className="space-y-1 pt-2">
              <div className="text-xs text-[#44566C] font-extrabold uppercase tracking-widest">
                VALOR DO TREINAMENTO
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-[#0B1F3A]">
                12x R$ 19,78
              </div>
              <div className="text-sm font-semibold text-[#44566C]">
                ou R$ 197,00 à vista
              </div>
              <div className="text-xs text-[#44566C]">
                Total do parcelamento: R$ 237,36
              </div>
            </div>

            {/* BOTÃO CTA DA OFERTA */}
            <div className="pt-2 space-y-3 max-w-md mx-auto">
              <a
                href={trainingOffer.checkoutUrl || "#"}
                target={trainingOffer.checkoutUrl ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-[#B94F00] hover:bg-[#9F4300] text-[#FFFFFF] font-extrabold text-base md:text-lg transition-all shadow-md active:scale-[0.99]"
              >
                <span className="text-[#FFFFFF]">QUERO ACESSAR O TREINAMENTO</span>
                <ArrowRight className="w-5 h-5 ml-1 text-[#FFFFFF] shrink-0" />
              </a>
              <p className="text-xs text-[#44566C]">
                Pagamento realizado pelo checkout oficial.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 10 — NOVA SEÇÃO: PASSO A PASSO DO ACESSO (FUNDO #FAF7F2) ==================== */}
      <section className="py-14 md:py-18 bg-[#FAF7F2] border-b border-[#E8DFCF] relative">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 space-y-10 text-center">
          
          {/* ETIQUETA E CABEÇALHO */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FAF5E8] border border-[#E4C98B] inline-block">
              PASSO A PASSO DO ACESSO
            </span>
            <h2 className="font-outfit font-bold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A]">
              Como você acessa o treinamento.
            </h2>
            <p className="text-sm md:text-base text-[#44566C]">
              Da confirmação da compra às primeiras aulas, veja como funciona.
            </p>
          </div>

          {/* GRID DE 4 ETAPAS DE ACESSO */}
          <div className="relative pt-4">
            
            {/* LINHA DISCRETA DE CONEXÃO NO DESKTOP */}
            <div className="hidden lg:block absolute top-[68px] left-[10%] right-[10%] h-[2px] bg-[#E8DFCF] z-0" aria-hidden="true" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left relative z-10">
              
              {/* ETAPA 1 */}
              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00]">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-extrabold font-outfit text-[#E4C98B]">
                      01
                    </span>
                  </div>
                  <h3 className="font-outfit font-bold text-base sm:text-lg text-[#0B1F3A] tracking-tight">
                    ETAPA 1 — CONCLUA SUA COMPRA
                  </h3>
                  <p className="text-xs sm:text-sm text-[#44566C] leading-relaxed">
                    Escolha a forma de pagamento e finalize a compra no checkout oficial do treinamento.
                  </p>
                </div>
              </div>

              {/* ETAPA 2 */}
              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00]">
                      <Mail className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-extrabold font-outfit text-[#E4C98B]">
                      02
                    </span>
                  </div>
                  <h3 className="font-outfit font-bold text-base sm:text-lg text-[#0B1F3A] tracking-tight">
                    ETAPA 2 — RECEBA AS ORIENTAÇÕES
                  </h3>
                  <p className="text-xs sm:text-sm text-[#44566C] leading-relaxed">
                    Após a confirmação do pagamento, as instruções de acesso serão enviadas para o e-mail informado na compra.
                  </p>
                </div>
              </div>

              {/* ETAPA 3 */}
              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00]">
                      <PlayCircle className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-extrabold font-outfit text-[#E4C98B]">
                      03
                    </span>
                  </div>
                  <h3 className="font-outfit font-bold text-base sm:text-lg text-[#0B1F3A] tracking-tight">
                    ETAPA 3 — ACESSE AS AULAS
                  </h3>
                  <p className="text-xs sm:text-sm text-[#44566C] leading-relaxed">
                    Entre na área do aluno e encontre as aulas organizadas para acompanhar cada etapa do treinamento.
                  </p>
                </div>
              </div>

              {/* ETAPA 4 */}
              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFCF] hover:border-[#E4C98B] transition-all space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF5E8] border border-[#E4C98B] flex items-center justify-center text-[#B94F00]">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-extrabold font-outfit text-[#E4C98B]">
                      04
                    </span>
                  </div>
                  <h3 className="font-outfit font-bold text-base sm:text-lg text-[#0B1F3A] tracking-tight">
                    ETAPA 4 — APRENDA NO SEU RITMO
                  </h3>
                  <p className="text-xs sm:text-sm text-[#44566C] leading-relaxed">
                    Avance pelos módulos e reveja os assuntos que quiser aprofundar, conforme as condições de acesso do treinamento.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* BOTÃO DA SEÇÃO DE ACESSO */}
          <div className="pt-2">
            <button
              onClick={scrollToOffer}
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-[#B94F00] hover:bg-[#9F4300] text-[#FFFFFF] font-extrabold text-base transition-all shadow-md active:scale-[0.99]"
            >
              <span className="text-[#FFFFFF]">QUERO ACESSAR O TREINAMENTO</span>
              <ArrowRight className="w-5 h-5 ml-1 text-[#FFFFFF] shrink-0" />
            </button>
          </div>

        </div>
      </section>

      {/* ==================== 11 — PERGUNTAS FREQUENTES (FUNDO #FFFFFF) ==================== */}
      <section className="py-12 md:py-16 bg-[#FFFFFF] border-b border-[#E8DFCF]">
        <div className="max-w-[800px] mx-auto px-5 md:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest px-3.5 py-1 rounded-md bg-[#FAF5E8] border border-[#E4C98B] inline-block">
              TIRA-DÚVIDAS
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#0B1F3A]">
              Perguntas frequentes.
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className="rounded-xl bg-[#FFFFFF] border border-[#E8DFCF] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left text-sm md:text-base font-bold text-[#0B1F3A] hover:text-[#B94F00] transition-colors"
                >
                  <span className="pr-4">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#B94F00] shrink-0 transition-transform duration-200 ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 pb-5 md:px-5 text-xs md:text-sm text-[#44566C] leading-relaxed border-t border-[#E8DFCF] pt-3">
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
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center bg-[#FFFFFF] border border-[#E8DFCF] rounded-2xl overflow-hidden p-4 md:p-6 shadow-2xl">
            <button
              onClick={() => setActivePreviewIndex(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-[#FAF7F2] text-[#0B1F3A] hover:bg-[#B94F00] hover:text-[#FFFFFF] transition-colors z-10"
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
