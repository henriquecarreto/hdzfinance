"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Key,
  HelpCircle,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Zap,
  Lock,
  BookOpen,
  Award,
  Check,
  AlertTriangle,
  RefreshCw,
  Coins,
  Play,
  Layers,
} from "lucide-react";

// State offer config (Preserved original values & checkout flow)
const trainingOffer = {
  offerReady: true,
  price: null,
  originalPrice: null,
  installments: null,
  checkoutUrl: null,
  accessDuration: "Acesso Imediato",
  certificate: "Certificado HDZ",
  guaranteeEnabled: true,
  guaranteeDays: 7,
};

// 6 Modules Dataset
interface ModuleItem {
  id: number;
  numberStr: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  question: string;
  topics: string[];
}

const MODULES: ModuleItem[] = [
  {
    id: 0,
    numberStr: "00",
    title: "Apresentação",
    subtitle: "Antes de começar, entenda a jornada.",
    image: "/images/previews/apresentacao.jpg",
    badge: "Visão Geral",
    question: "Como funciona a formação HDZ Finance?",
    topics: [
      "Apresentação da metodologia HDZ",
      "Estrutura completa do treinamento",
      "Como aproveitar melhor cada aula",
      "Visão geral dos 5 módulos práticos",
    ],
  },
  {
    id: 1,
    numberStr: "01",
    title: "Fundamentos do Dinheiro",
    subtitle: "Antes de entender Bitcoin, entenda o problema que ele tenta resolver.",
    image: "/images/previews/fundamentos-do-dinheiro.jpg",
    badge: "Módulo 01",
    question: "Por que Bitcoin surgiu?",
    topics: [
      "Origem histórica e funções do dinheiro",
      "Inflação e perda do poder de compra",
      "Bancos centrais e expansão monetária",
      "Política monetária e incentivos econômicos",
      "Evolução do sistema financeiro tradicional",
    ],
  },
  {
    id: 2,
    numberStr: "02",
    title: "O que é Bitcoin",
    subtitle: "Entenda aquilo que você pretende comprar.",
    image: "/images/previews/o-que-e-bitcoin.jpg",
    badge: "Módulo 02",
    question: "O que exatamente estou comprando?",
    topics: [
      "Rede Bitcoin e protocolo descentralizado",
      "Blockchain e livro de registros imutável",
      "Criptografia e segurança matemática",
      "Mineração e consenso da rede",
      "Escassez programada e oferta limitada de 21 milhões",
    ],
  },
  {
    id: 3,
    numberStr: "03",
    title: "Ciclos de Mercado",
    subtitle: "Aprenda a enxergar contexto onde muita gente enxerga apenas preço.",
    image: "/images/previews/ciclos-de-mercado.jpg",
    badge: "Módulo 03",
    question: "Como interpretar o contexto do mercado?",
    topics: [
      "Fases de acumulação, euforia e correção",
      "Comportamento psicológico dos investidores",
      "Indicadores on-chain e análise contextual",
      "Métricas de mercado sem promessas fáceis",
      "Interpretação de volatilidade com critério",
    ],
  },
  {
    id: 4,
    numberStr: "04",
    title: "Seja Você Seu Próprio Banco",
    subtitle: "Possuir Bitcoin de verdade exige entender custódia.",
    image: "/images/previews/seja-seu-proprio-banco.jpg",
    badge: "Módulo 04",
    question: "Como proteger aquilo que é meu?",
    topics: [
      "Tipos de carteiras (Hot vs Cold Wallets)",
      "Fundamentos de autocustódia real",
      "Seed phrase de 12/24 palavras",
      "Chaves privadas vs chaves públicas",
      "Backups seguros e proteção contra perdas",
    ],
  },
  {
    id: 5,
    numberStr: "05",
    title: "Gerenciamento e Utilização",
    subtitle: "Do Bitcoin guardado ao Bitcoin que você sabe utilizar.",
    image: "/images/previews/gerenciamento-de-carteira.jpg",
    badge: "Módulo 05",
    question: "Como administrar e utilizar meus bitcoins?",
    topics: [
      "Estratégias de exposição e alocação consciente",
      "Movimentação, envio e recebimento",
      "Conceitos de saques e liquidez",
      "Demonstração em plataformas (Binance, Bitybank, Picnic)",
      "Cartões cripto e utilização no dia a dia",
    ],
  },
];

// 3 Real Course Lesson Screenshots dataset for Section 07 (Fixed Grid)
const INSIDE_LESSONS = [
  {
    id: 0,
    title: "Módulo 1 - Apresentação",
    image: "/images/inside-course/aula-01-apresentacao.png",
  },
  {
    id: 1,
    title: "Módulo 1 - Fundamentos do Dinheiro",
    image: "/images/inside-course/aula-02-fundamentos-do-dinheiro.png",
  },
  {
    id: 2,
    title: "Módulo 2 - O que é o Bitcoin?",
    image: "/images/inside-course/aula-03-o-que-e-bitcoin.png",
  },
];

// 6 Essential FAQ items
const FAQ_ITEMS = [
  {
    q: "Preciso entender Bitcoin antes de começar?",
    a: "Não. O treinamento foi estruturado justamente para construir conhecimento progressivamente desde os fundamentos do dinheiro até a utilização prática.",
  },
  {
    q: "Preciso já possuir Bitcoin?",
    a: "Não. Você pode estudar primeiro e conhecer melhor o ecossistema antes de decidir se quer adquirir qualquer valor no mercado.",
  },
  {
    q: "O treinamento ensina trading?",
    a: "O treinamento aborda ciclos, indicadores e comportamento do mercado para tomada de decisão consciente. Não vendemos sinais e não fazemos promessas de prever movimentos futuros de preço.",
  },
  {
    q: "Vou aprender autocustódia e segurança?",
    a: "Sim. Existe um módulo inteiro dedicado exclusivamente a carteiras, chaves privadas, seed phrase, segurança e fundamentos práticos de autocustódia.",
  },
  {
    q: "O conteúdo é recomendação de investimento?",
    a: "Não. O conteúdo tem finalidade estritamente educacional e busca aumentar sua autonomia e compreensão sobre dinheiro, Bitcoin, mercado e tecnologia.",
  },
  {
    q: "Como funciona o acesso e a garantia?",
    a: "Após a confirmação do pagamento pelo checkout oficial, você recebe o acesso imediato por e-mail e possui 7 dias corridos de garantia incondicional para avaliar o treinamento.",
  },
];

export default function BitcoinCourseSalesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(null);

  // Responsive Carousel Cards Per Page
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isHoveringCarousel1, setIsHoveringCarousel1] = useState(false);

  // Responsive Window Size Handler
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

  // Carousel 1 Autoplay (~4s)
  useEffect(() => {
    if (isHoveringCarousel1) return;
    const maxIndex = MODULES.length - cardsPerPage;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isHoveringCarousel1, cardsPerPage]);

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

  const maxIndex = Math.max(0, MODULES.length - cardsPerPage);

  const prevCarousel1 = useCallback(() => {
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const nextCarousel1 = useCallback(() => {
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);


  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] font-sans antialiased selection:bg-[#147BFF] selection:text-white pb-12 overflow-x-hidden">
      
      {/* ==================== 1. BARRA SUPERIOR ==================== */}
      <div className="w-full bg-[#070A0F] border-b border-white/[0.08] py-2 px-4 text-center">
        <span className="text-[11px] md:text-[12px] font-bold text-[#F59A18] uppercase tracking-widest inline-flex items-center justify-center gap-2">
          <span className="text-white/40">◆</span>
          <span>FORMAÇÃO HDZ FINANCE • FUNDAMENTOS, BITCOIN E AUTOCUSTÓDIA</span>
          <span className="text-white/40 hidden sm:inline">◆</span>
        </span>
      </div>

      {/* ==================== 01 — HERO PRINCIPAL ==================== */}
      <section className="relative pt-8 md:pt-12 pb-10 md:pb-16 overflow-hidden border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Coluna Esquerda: Copy Principal */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>TREINAMENTO HDZ FINANCE</span>
              </div>

              <h1 className="font-outfit font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[50px] text-[#F5F7FA] tracking-tight leading-[1.12]">
                Comprar Bitcoin é fácil. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB12B] via-[#F59A18] to-[#FFC875]">
                  Saber o que fazer depois é outra história.
                </span>
              </h1>

              <p className="text-base md:text-lg text-[#9BA5B3] leading-relaxed max-w-2xl font-normal">
                Entenda dinheiro, Bitcoin, ciclos de mercado, segurança, autocustódia e gerenciamento de carteira para tomar decisões com mais consciência e evitar erros que podem custar muito caro.
              </p>

              <p className="text-sm md:text-base text-[#C7CDD4] leading-relaxed font-medium italic border-l-2 border-[#147BFF] pl-4">
                "Porque no Bitcoin, conhecimento não serve apenas para encontrar oportunidades. Ele também serve para proteger aquilo que já é seu."
              </p>

              {/* Caixa Destaque Alerta */}
              <div className="p-3.5 rounded-xl bg-[#0D131C] border border-white/[0.1] text-xs md:text-sm text-[#E2E8F0] space-y-1">
                <span className="font-bold text-[#F59A18] block uppercase text-[11px] tracking-wider">
                  ⚠️ Princípio HDZ Finance
                </span>
                <span>
                  Antes de colocar seu patrimônio em Bitcoin, entenda como ele funciona, como protegê-lo e como utilizá-lo.
                </span>
              </div>

              {/* CTA Hero */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={scrollToOffer}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FFB12B] via-[#F59A18] to-[#E98508] text-[#080B0F] font-extrabold text-base md:text-lg hover:brightness-105 transition-all shadow-xl shadow-[#F59A18]/15"
                >
                  <span>QUERO DOMINAR OS FUNDAMENTOS</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </button>

                <p className="text-xs text-[#9BA5B3] font-mono">
                  Treinamento do básico à aplicação prática
                </p>
              </div>

              {/* Checklist de Segurança */}
              <div className="pt-3 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-[#C7CDD4]">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0" />
                  <span>Fundamentos do dinheiro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0" />
                  <span>Bitcoin e blockchain</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0" />
                  <span>Ciclos de mercado</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0" />
                  <span>Autocustódia e segurança</span>
                </div>
                <div className="flex items-center space-x-2 col-span-2 sm:col-span-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0" />
                  <span>Gerenciamento e utilização prática</span>
                </div>
              </div>
            </div>

            {/* Coluna Direita: Produto Premium */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-[#F59A18]/40 shadow-2xl shadow-[#F59A18]/10 group">
                <Image
                  src="/images/products/money-bitcoin-course-cover.jpg"
                  alt="Formação HDZ Finance — Fundamentos do Dinheiro, Bitcoin e Autocustódia"
                  fill
                  priority
                  className="object-contain bg-[#050607] transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050607]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#080D14]/90 backdrop-blur-md border border-white/10 text-center">
                  <span className="text-[11px] font-bold text-[#F59A18] uppercase tracking-wider block">
                    FORMAÇÃO COMPLETA HDZ
                  </span>
                  <span className="text-xs text-[#E2E8F0] font-medium">
                    Do Dinheiro à Autocustódia Prática
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 02 — CARROSSEL DA JORNADA (MÓDULOS) ==================== */}
      <section
        className="py-10 md:py-14 bg-[#080C12] border-b border-white/[0.08]"
        onMouseEnter={() => setIsHoveringCarousel1(true)}
        onMouseLeave={() => setIsHoveringCarousel1(false)}
      >
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-6 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              JORNADA VISUAL DE CONHECIMENTO
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Uma jornada completa: do dinheiro à autonomia com Bitcoin
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3]">
              Cada etapa prepara você para compreender a próxima.
            </p>
          </div>

          {/* Carrossel 1 — Sem corte de imagens / Sem cards truncados nas bordas */}
          <div className="relative pt-2">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${(carouselIndex * 100) / cardsPerPage}%)`,
                }}
              >
                {MODULES.map((mod) => (
                  <div
                    key={mod.id}
                    style={{ width: `${100 / cardsPerPage}%` }}
                    className="shrink-0 px-2.5 md:px-3 flex flex-col"
                  >
                    <div className="h-full flex flex-col justify-between p-4 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-[#F59A18]/40 transition-all text-left group">
                      <div className="relative aspect-[16/9] w-full max-w-[440px] mx-auto rounded-xl overflow-hidden mb-3.5 bg-[#050607]">
                        <Image
                          src={mod.image}
                          alt={mod.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 mb-1.5">
                            {mod.badge}
                          </span>
                          <h3 className="font-outfit font-bold text-base text-[#F5F7FA] leading-snug">
                            {mod.title}
                          </h3>
                          <p className="text-xs text-[#9BA5B3] mt-1 line-clamp-2">
                            {mod.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controles de Navegação */}
            <div className="flex items-center justify-between mt-6 max-w-[240px] mx-auto">
              <button
                onClick={prevCarousel1}
                aria-label="Anterior"
                className="p-2.5 rounded-full bg-[#111827] border border-white/10 hover:border-[#F59A18] text-[#9BA5B3] hover:text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    aria-label={`Ir para o slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      carouselIndex === idx
                        ? "w-6 bg-[#F59A18]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextCarousel1}
                aria-label="Próximo"
                className="p-2.5 rounded-full bg-[#111827] border border-white/10 hover:border-[#F59A18] text-[#9BA5B3] hover:text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 03 — OS 4 PILARES ==================== */}
      <section className="py-10 md:py-14 bg-[#050607] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              O QUE VOCÊ PRECISA DOMINAR
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Entenda o que realmente importa antes de colocar dinheiro em Bitcoin
            </h2>
            <p className="text-sm md:text-base text-[#C7CDD4] max-w-2xl mx-auto leading-relaxed">
              Comprar Bitcoin leva poucos minutos. Entender o que você está comprando, como o mercado funciona e como proteger seus ativos exige conhecimento.
            </p>
          </div>

          {/* Grid dos 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            {/* Card 01 */}
            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-[#F59A18]/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59A18]/10 border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18] font-bold text-sm">
                  01
                </div>
                <h3 className="font-outfit font-bold text-lg text-[#F5F7FA]">
                  ENTENDA O DINHEIRO
                </h3>
                <p className="text-sm text-[#9BA5B3] leading-relaxed">
                  Antes de entender Bitcoin, entenda o sistema monetário e os problemas que ajudaram a criar a necessidade de uma alternativa descentralizada.
                </p>
              </div>
            </div>

            {/* Card 02 */}
            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-[#F59A18]/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59A18]/10 border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18] font-bold text-sm">
                  02
                </div>
                <h3 className="font-outfit font-bold text-lg text-[#F5F7FA]">
                  ENTENDA O BITCOIN
                </h3>
                <p className="text-sm text-[#9BA5B3] leading-relaxed">
                  Compreenda blockchain, mineração, oferta limitada, criptografia e descentralização.
                </p>
              </div>
            </div>

            {/* Card 03 */}
            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-[#F59A18]/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59A18]/10 border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18] font-bold text-sm">
                  03
                </div>
                <h3 className="font-outfit font-bold text-lg text-[#F5F7FA]">
                  ENTENDA O MERCADO
                </h3>
                <p className="text-sm text-[#9BA5B3] leading-relaxed">
                  Aprenda a interpretar ciclos, indicadores, euforia, medo e diferentes momentos do mercado.
                </p>
              </div>
            </div>

            {/* Card 04 */}
            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-[#F59A18]/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59A18]/10 border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18] font-bold text-sm">
                  04
                </div>
                <h3 className="font-outfit font-bold text-lg text-[#F5F7FA]">
                  ENTENDA A CUSTÓDIA
                </h3>
                <p className="text-sm text-[#9BA5B3] leading-relaxed">
                  Entenda carteiras, chaves privadas, seed phrase, backups e os fundamentos da autocustódia.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={scrollToOffer}
              className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-[#0D1522] border border-[#F59A18]/40 text-[#F59A18] font-bold text-sm md:text-base hover:bg-[#F59A18] hover:text-[#080B0F] transition-all"
            >
              <span>CONHECER O TREINAMENTO</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== 04 — AUTONOMIA, RISCO E AUTOCUSTÓDIA ==================== */}
      <section className="py-10 md:py-14 bg-[#080C14] border-b border-white/[0.08] relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              AUTONOMIA EXIGE RESPONSABILIDADE
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Seu Bitcoin pode ser seu. A responsabilidade também.
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] max-w-2xl mx-auto leading-relaxed">
              Bitcoin permite reduzir a dependência de intermediários. Mas, quando você me assume o controle dos próprios ativos, conhecimento deixa de ser opcional.
            </p>
            <div className="p-3.5 rounded-xl bg-[#130E0A] border border-[#F59A18]/30 max-w-2xl mx-auto text-xs md:text-sm text-[#FFD8A8] font-medium">
              ⚡ Alguns erros podem ser caros, difíceis de corrigir ou até irreversíveis. É melhor entendê-los antes que exista dinheiro envolvido.
            </div>
          </div>

          {/* 4 Cards Unificados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            {/* Card 1: Seed Phrase */}
            <div className="p-6 rounded-2xl bg-[#0D131C] border border-[#F59A18]/30 hover:border-[#F59A18] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F59A18]/10 border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18]">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">
                SEED PHRASE
              </h3>
              <p className="text-xs md:text-sm text-[#9BA5B3] leading-relaxed">
                Não entender sua seed pode colocar todo o acesso à carteira em risco. Ela não é apenas uma senha. É uma informação crítica de recuperação e controle.
              </p>
            </div>

            {/* Card 2: Chaves e Carteiras */}
            <div className="p-6 rounded-2xl bg-[#0D131C] border border-[#F59A18]/30 hover:border-[#F59A18] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F59A18]/10 border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18]">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">
                CHAVES E CARTEIRAS
              </h3>
              <p className="text-xs md:text-sm text-[#9BA5B3] leading-relaxed">
                Controle dos ativos exige compreender quem controla as chaves. Autocustódia significa assumir responsabilidade pela própria segurança.
              </p>
            </div>

            {/* Card 3: Exchanges */}
            <div className="p-6 rounded-2xl bg-[#0D131C] border border-[#F59A18]/30 hover:border-[#F59A18] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F59A18]/10 border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">
                EXCHANGES
              </h3>
              <p className="text-xs md:text-sm text-[#9BA5B3] leading-relaxed">
                Comprar Bitcoin em uma exchange não é a mesma coisa que dominar autocustódia. Entenda a diferença entre conveniência e controle.
              </p>
            </div>

            {/* Card 4: Decisões sem Estratégia */}
            <div className="p-6 rounded-2xl bg-[#0D131C] border border-[#F59A18]/30 hover:border-[#F59A18] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F59A18]/10 border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">
                DECISÕES SEM ESTRATÉGIA
              </h3>
              <p className="text-xs md:text-sm text-[#9BA5B3] leading-relaxed">
                Euforia e medo podem fazer você comprar ou vender sem entender o contexto. Conhecimento não elimina risco, mas melhora a qualidade da decisão.
              </p>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <p className="text-sm font-semibold text-[#F5F7FA]">
              Você não precisa aprender tudo isso depois de errar.
            </p>
            <div>
              <button
                onClick={scrollToOffer}
                className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-xl bg-[#F59A18] text-[#080B0F] font-extrabold text-sm md:text-base hover:brightness-105 transition-all shadow-lg shadow-[#F59A18]/20"
              >
                <span>QUERO APRENDER ANTES DE ARRISCAR</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 05 — PARA QUEM É ==================== */}
      <section className="py-10 md:py-14 bg-[#050607] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              PARA QUEM FOI DESENVOLVIDO
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Este treinamento faz sentido para você?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            <div className="p-5 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-white/20 transition-all space-y-2">
              <span className="text-[11px] font-bold text-[#F59A18] uppercase tracking-wider block">
                01 • INICIANTE
              </span>
              <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">
                Para quem está começando
              </h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Quer aprender Bitcoin com clareza, sem gráficos confusos ou falsas promessas de enriquecimento.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-white/20 transition-all space-y-2">
              <span className="text-[11px] font-bold text-[#F59A18] uppercase tracking-wider block">
                02 • INVESTIDOR
              </span>
              <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">
                Para quem já possui cripto
              </h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Já comprou ativos, mas percebe lacunas em segurança, custódia e gerenciamento de carteira.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-white/20 transition-all space-y-2">
              <span className="text-[11px] font-bold text-[#F59A18] uppercase tracking-wider block">
                03 • SEGURANÇA
              </span>
              <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">
                Para quem quer autocustódia
              </h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Deseja dominar o controle direto dos próprios bitcoins e reduzir a dependência de terceiros.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-white/20 transition-all space-y-2">
              <span className="text-[11px] font-bold text-[#F59A18] uppercase tracking-wider block">
                04 • CRITÉRIO
              </span>
              <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">
                Para quem quer decidir com critério
              </h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Quer entender mercado e ciclos antes de seguir opiniões ou movimentos emocionais de preço.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 06 — CONTEÚDO DO TREINAMENTO ==================== */}
      <section className="py-10 md:py-14 bg-[#080C12] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              CONHEÇA O TREINAMENTO
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Da origem do dinheiro à utilização prática do Bitcoin
            </h2>
          </div>

          {/* Grid Completo dos 6 Módulos com a pergunta que cada um responde */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {MODULES.map((mod) => (
              <div
                key={mod.id}
                className="p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-[#F59A18]/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
                      {mod.badge}
                    </span>
                    <span className="text-xs font-mono text-[#9BA5B3]">
                      #{mod.numberStr}
                    </span>
                  </div>

                  <h3 className="font-outfit font-bold text-lg text-[#F5F7FA]">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-[#9BA5B3]">
                    {mod.subtitle}
                  </p>

                  {/* Destaque da pergunta respondida pelo módulo */}
                  <div className="p-2.5 rounded-lg bg-[#05080F] border border-white/10 text-xs text-[#F59A18] font-medium">
                    <span className="block text-[10px] text-[#9BA5B3] uppercase font-bold tracking-wider mb-0.5">
                      Pergunta respondida:
                    </span>
                    "{mod.question}"
                  </div>

                  {/* Diagrama de ciclos compacto no Módulo 03 */}
                  {mod.id === 3 && (
                    <div className="my-2 p-2.5 rounded-lg bg-[#111827] border border-[#F59A18]/30 text-center">
                      <span className="text-[10px] font-bold text-[#F59A18] uppercase tracking-wider block mb-1">
                        Mapas de Ciclos de Mercado:
                      </span>
                      <div className="text-[11px] font-mono text-[#E2E8F0] font-semibold flex items-center justify-center gap-1 flex-wrap">
                        <span>EUFORIA</span> <span>→</span> <span>VOLATILIDADE</span> <span>→</span> <span>MEDO</span> <span>→</span> <span>ACUMULAÇÃO</span> <span>→</span> <span>RECUPERAÇÃO</span>
                      </div>
                    </div>
                  )}

                  {/* Lista de tópicos */}
                  <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
                    {mod.topics.map((topic, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-[#C7CDD4]">
                        <Check className="h-3.5 w-3.5 text-[#F59A18] shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 07 — VEJA POR DENTRO (IMAGENS FIXAS) ==================== */}
      <section className="py-10 md:py-14 bg-[#050607] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-6 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              VEJA POR DENTRO
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Veja como o treinamento funciona antes mesmo de começar
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3]">
              Aulas práticas, conceitos explicados visualmente e demonstrações de ferramentas utilizadas no ecossistema.
            </p>
          </div>

          {/* Grid Fixo de 3 Colunas com as 3 Aulas Reais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 pt-2">
            {INSIDE_LESSONS.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActivePreviewIndex(idx)}
                className="cursor-pointer group relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#0D131C] border border-white/[0.1] hover:border-[#F59A18]/60 transition-all shadow-xl"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#050607]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs">
                  <Maximize2 className="w-5 h-5 text-[#F59A18]" />
                  <span>EXPANDIR AULA</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 08 — RESULTADO DA FORMAÇÃO ==================== */}
      <section className="py-10 md:py-14 bg-[#080C14] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              AO FINAL DA JORNADA
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Você não precisa saber tudo sobre Bitcoin. Precisa entender o suficiente para não depender cegamente de terceiros.
            </h2>
          </div>

          {/* 3 Cards Consolidados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-white/20 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F59A18]/10 border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18] font-bold">
                01
              </div>
              <h3 className="font-outfit font-bold text-lg text-[#F5F7FA]">
                ENTENDER
              </h3>
              <p className="text-sm text-[#9BA5B3] leading-relaxed">
                Dinheiro, Bitcoin, blockchain, ciclos e funcionamento do ecossistema.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-white/20 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F59A18]/10 border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18] font-bold">
                02
              </div>
              <h3 className="font-outfit font-bold text-lg text-[#F5F7FA]">
                PROTEGER
              </h3>
              <p className="text-sm text-[#9BA5B3] leading-relaxed">
                Carteiras, chaves privadas, seed phrase, autocustódia e segurança.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-white/20 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F59A18]/10 border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18] font-bold">
                03
              </div>
              <h3 className="font-outfit font-bold text-lg text-[#F5F7FA]">
                UTILIZAR
              </h3>
              <p className="text-sm text-[#9BA5B3] leading-relaxed">
                Gerenciamento, movimentação, venda, saque e ferramentas utilizadas no ecossistema.
              </p>
            </div>
          </div>

          <p className="text-sm text-[#9BA5B3] max-w-2xl mx-auto italic pt-2">
            O objetivo não é fazer você depender da HDZ. É dar fundamentos para que você compreenda melhor suas próprias decisões.
          </p>
        </div>
      </section>

      {/* ==================== 09 — OFERTA + FORMA DE ACESSO (UNIFICADAS) ==================== */}
      <section id="oferta" className="py-12 md:py-16 bg-[#050607] border-b border-white/[0.08]">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 space-y-8">
          
          {/* Card Principal da Oferta */}
          <div className="rounded-3xl bg-[#0D131C] border-2 border-[#F59A18]/40 p-6 md:p-10 text-center space-y-6 shadow-2xl shadow-[#F59A18]/10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-xs font-bold uppercase tracking-wider">
              ACESSO AO TREINAMENTO COMPLETO
            </span>

            <h2 className="font-outfit font-extrabold text-2xl md:text-4xl text-[#F5F7FA]">
              Comece pelos fundamentos que conectam dinheiro, Bitcoin e autonomia.
            </h2>

            <div className="p-4 rounded-xl bg-[#080D14] border border-white/10 max-w-xl mx-auto text-left space-y-2 text-xs md:text-sm text-[#C7CDD4]">
              <span className="font-bold text-[#F59A18] block text-xs uppercase">
                O que está incluído no seu acesso:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F59A18]" />
                  <span>Apresentação & Visão Geral</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F59A18]" />
                  <span>Módulo 1 — Dinheiro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F59A18]" />
                  <span>Módulo 2 — O que é Bitcoin</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F59A18]" />
                  <span>Módulo 3 — Ciclos de Mercado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F59A18]" />
                  <span>Módulo 4 — Autocustódia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F59A18]" />
                  <span>Módulo 5 — Gerenciamento</span>
                </div>
              </div>
            </div>

            {/* Preço Real Configurado */}
            <div className="space-y-1">
              <div className="text-xs text-[#9BA5B3] font-mono uppercase tracking-wider">
                Investimento Único
              </div>
              <div className="text-3xl md:text-5xl font-extrabold font-outfit text-[#F5F7FA]">
                12x R$ 19,78
              </div>
              <div className="text-sm text-[#9BA5B3]">
                ou R$ 197,00 à vista
              </div>
            </div>

            {/* CTA Checkout Oficial */}
            <div className="pt-2 space-y-3 max-w-md mx-auto">
              <a
                href={trainingOffer.checkoutUrl || "#"}
                target={trainingOffer.checkoutUrl ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FFB12B] via-[#F59A18] to-[#E98508] text-[#080B0F] font-extrabold text-base md:text-lg hover:brightness-105 transition-all shadow-xl shadow-[#F59A18]/20"
              >
                <span>QUERO ACESSAR O TREINAMENTO</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </a>
              <p className="text-xs text-[#9BA5B3]">
                Pagamento 100% seguro via plataforma oficial
              </p>
            </div>

            {/* Etapas de Acesso Unificadas */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-3.5 rounded-xl bg-[#080D14] border border-white/[0.06] space-y-1">
                <span className="text-[11px] font-bold text-[#F59A18] block">01 — FAÇA SUA INSCRIÇÃO</span>
                <p className="text-xs text-[#9BA5B3]">Finalize pelo checkout oficial.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#080D14] border border-white/[0.06] space-y-1">
                <span className="text-[11px] font-bold text-[#F59A18] block">02 — RECEBA O ACESSO</span>
                <p className="text-xs text-[#9BA5B3]">A plataforma envia suas instruções por e-mail.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#080D14] border border-white/[0.06] space-y-1">
                <span className="text-[11px] font-bold text-[#F59A18] block">03 — COMECE A JORNADA</span>
                <p className="text-xs text-[#9BA5B3]">Assista às aulas no seu ritmo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 10 — FAQ (6 PERGUNTAS ESSENCIAIS) ==================== */}
      <section className="py-10 md:py-14 bg-[#080C12] border-b border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-5 md:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              PERGUNTAS FREQUENTES
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Ainda ficou alguma dúvida?
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className="rounded-xl bg-[#0D131C] border border-white/[0.08] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left text-sm md:text-base font-bold text-[#F5F7FA] hover:text-[#F59A18] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#F59A18] shrink-0 transition-transform duration-200 ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 pb-5 md:px-5 text-xs md:text-sm text-[#9BA5B3] leading-relaxed border-t border-white/[0.05] pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 11 — CTA FINAL ==================== */}
      <section className="py-12 md:py-16 bg-[#070B12] text-center">
        <div className="max-w-[900px] mx-auto px-5 md:px-8 space-y-6">
          <h2 className="font-outfit font-extrabold text-2xl md:text-4xl text-[#F5F7FA] leading-tight">
            A pior hora para aprender sobre segurança é depois de precisar dela.
          </h2>

          <p className="text-sm md:text-base text-[#9BA5B3] max-w-xl mx-auto leading-relaxed">
            Entenda o dinheiro. Entenda o Bitcoin. Proteja suas chaves. Aprenda a utilizar aquilo que é seu.
          </p>

          <div className="p-3.5 rounded-xl bg-[#0D1522] border border-[#F59A18]/30 max-w-md mx-auto text-xs md:text-sm font-semibold text-[#F59A18]">
            Conhecimento vem antes da autonomia.
          </div>

          <div>
            <button
              onClick={scrollToOffer}
              className="inline-flex items-center space-x-3 px-9 py-4 rounded-xl bg-gradient-to-r from-[#FFB12B] via-[#F59A18] to-[#E98508] text-[#080B0F] font-extrabold text-base md:text-lg hover:brightness-105 transition-all shadow-xl shadow-[#F59A18]/20"
            >
              <span>COMEÇAR O TREINAMENTO</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== MODAL LIGHTBOX PREVIEW ==================== */}
      {activePreviewIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center bg-[#0D131C] border border-white/20 rounded-2xl overflow-hidden p-4 md:p-6">
            <button
              onClick={() => setActivePreviewIndex(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:text-[#F59A18] transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full aspect-[16/9] max-h-[75vh]">
              <Image
                src={INSIDE_LESSONS[activePreviewIndex]?.image || MODULES[activePreviewIndex]?.image}
                alt={INSIDE_LESSONS[activePreviewIndex]?.title || MODULES[activePreviewIndex]?.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="font-outfit font-bold text-base md:text-lg text-[#F5F7FA]">
                {INSIDE_LESSONS[activePreviewIndex]?.title || MODULES[activePreviewIndex]?.title}
              </h4>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
