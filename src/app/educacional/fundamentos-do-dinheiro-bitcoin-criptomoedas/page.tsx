"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Lock,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  Wallet,
  Key,
  Cpu,
  Coins,
  BookOpen,
  HelpCircle,
  RefreshCw,
  Play,
  Check,
  Zap,
  Clock,
  Layers,
  Award,
} from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/SocialIcons";

// Configurable Sales Offer State (Preserved)
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

// 6 Module Covers Dataset
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
    question: "Por que o Bitcoin surgiu?",
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
    question: "O que exatamente você está comprando?",
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
    question: "Como o ativo se comporta nos ciclos?",
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
    question: "Como proteger aquilo que você comprou?",
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
    question: "Como administrar e utilizar na prática?",
    topics: [
      "Estratégias de exposição e alocação consciente",
      "Movimentação, envio e recebimento",
      "Conceitos de saques e liquidez",
      "Demonstração em plataformas (Binance, Bitybank, Picnic)",
      "Cartões cripto e utilização no dia a dia",
    ],
  },
];

// FAQ Dataset
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
    q: "O treinamento ensina trading ou sinais?",
    a: "O treinamento aborda ciclos, indicadores e comportamento do mercado para tomada de decisão consciente. Não vendemos sinais e não fazemos promessas de prever movimentos futuros de preço.",
  },
  {
    q: "Vou aprender sobre autocustódia e chaves?",
    a: "Sim. Existe um módulo inteiro dedicado exclusivamente a carteiras, chaves privadas, seed phrase, segurança e fundamentos práticos de autocustódia.",
  },
  {
    q: "O treinamento mostra ferramentas na prática?",
    a: "O conteúdo inclui demonstrações conceituais e práticas de ferramentas e plataformas utilizadas no ecossistema (como Binance, Bitybank, Picnic e cartões cripto).",
  },
  {
    q: "Isso é uma recomendação de investimento?",
    a: "Não. O conteúdo tem finalidade estritamente educacional e busca aumentar sua autonomia e compreensão sobre dinheiro, Bitcoin, mercado e tecnologia.",
  },
  {
    q: "Como recebo o acesso ao treinamento?",
    a: "Após a confirmação da compra pelo checkout oficial, você recebe o link de acesso imediato por e-mail e pelos canais configurados na plataforma.",
  },
  {
    q: "Existe garantia de reembolso?",
    a: "Sim. Você tem 7 dias corridos a partir da inscrição para avaliar o conteúdo. Se achar que não faz sentido para você, basta solicitar o reembolso conforme a política do checkout.",
  },
];

export default function BitcoinCourseSalesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carousel2Index, setCarousel2Index] = useState(0);
  const [isPausingAutoplay, setIsPausingAutoplay] = useState(false);

  // Carousel 1 Autoplay (Module Covers)
  useEffect(() => {
    if (isPausingAutoplay) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % MODULES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPausingAutoplay]);

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

  const nextCarousel1 = useCallback(() => {
    setIsPausingAutoplay(true);
    setCarouselIndex((prev) => (prev + 1) % MODULES.length);
  }, []);

  const prevCarousel1 = useCallback(() => {
    setIsPausingAutoplay(true);
    setCarouselIndex((prev) => (prev - 1 + MODULES.length) % MODULES.length);
  }, []);

  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] font-sans antialiased selection:bg-[#147BFF] selection:text-white pb-16">
      
      {/* ==================== 1. BARRA SUPERIOR ==================== */}
      <div className="w-full bg-[#070A0F] border-b border-white/[0.08] py-2 px-4 text-center">
        <span className="text-[11px] md:text-[12px] font-bold text-[#F59A18] uppercase tracking-widest inline-flex items-center justify-center gap-2">
          <span className="text-white/40">◆</span>
          <span>FORMAÇÃO HDZ FINANCE • FUNDAMENTOS, BITCOIN E AUTOCUSTÓDIA</span>
          <span className="text-white/40 hidden sm:inline">◆</span>
        </span>
      </div>

      {/* ==================== 2. HERO PRINCIPAL ==================== */}
      <section className="relative pt-8 md:pt-14 pb-12 md:pb-20 overflow-hidden border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Coluna Esquerda: Copy Principal */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>TREINAMENTO HDZ FINANCE</span>
              </div>

              <h1 className="font-outfit font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-[#F5F7FA] tracking-tight leading-[1.12]">
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
              <div className="p-4 rounded-xl bg-[#0D131C] border border-white/[0.1] text-xs md:text-sm text-[#E2E8F0] space-y-1">
                <span className="font-bold text-[#F59A18] block uppercase text-[11px] tracking-wider">
                  ⚠️ Princípio HDZ Finance
                </span>
                <span>
                  Antes de colocar seu patrimônio em Bitcoin, entenda como ele funciona, como protegê-lo e como utilizá-lo.
                </span>
              </div>

              {/* CTA Hero */}
              <div className="pt-2 space-y-3">
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
              <div className="pt-4 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#C7CDD4]">
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
              <div className="relative w-full max-w-[420px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-[#F59A18]/40 shadow-2xl shadow-[#F59A18]/10 group">
                <Image
                  src="/images/products/money-bitcoin-course-cover.jpg"
                  alt="Formação HDZ Finance — Fundamentos do Dinheiro, Bitcoin e Autocustódia"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 420px"
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

      {/* ==================== 3. PRIMEIRO CARROSSEL — CAPAS DOS MÓDULOS ==================== */}
      <section className="py-12 md:py-16 bg-[#080C12] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-8 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              JORNADA VISUAL DE CONHECIMENTO
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Uma jornada completa: do dinheiro à autonomia com Bitcoin
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3]">
              Cada etapa prepara você para compreender a próxima com solidez.
            </p>
          </div>

          {/* Carrossel Interativo */}
          <div className="relative pt-4">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out gap-4 md:gap-6"
                style={{
                  transform: `translateX(-${carouselIndex * (100 / (typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3.2))}%)`,
                }}
              >
                {MODULES.map((mod) => (
                  <div
                    key={mod.id}
                    className="w-full sm:w-[48%] md:w-[31%] shrink-0 flex flex-col justify-between p-4 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-[#F59A18]/40 transition-all text-left group"
                  >
                    <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden mb-4 bg-[#050607]">
                      <Image
                        src={mod.image}
                        alt={mod.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 85vw, 320px"
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
                ))}
              </div>
            </div>

            {/* Controles do Carrossel */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              <button
                onClick={prevCarousel1}
                aria-label="Módulo anterior"
                className="p-2.5 rounded-full bg-[#121924] border border-white/10 text-white hover:bg-[#F59A18] hover:text-black transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex space-x-2">
                {MODULES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsPausingAutoplay(true);
                      setCarouselIndex(idx);
                    }}
                    aria-label={`Ir para módulo ${idx + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      carouselIndex === idx ? "bg-[#F59A18] w-6" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextCarousel1}
                aria-label="Próximo módulo"
                className="p-2.5 rounded-full bg-[#121924] border border-white/10 text-white hover:bg-[#F59A18] hover:text-black transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. SEÇÃO DO PROBLEMA CENTRAL ==================== */}
      <section className="py-14 md:py-20 bg-[#06090E] border-b border-white/[0.08]">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 text-center space-y-8">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest bg-[#147BFF]/10 text-[#38BDF8] border border-[#147BFF]/30">
            ANTES DE INVESTIR, ENTENDA
          </span>

          <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#F5F7FA] leading-tight">
            Você pode comprar Bitcoin sem realmente estar preparado para possuir Bitcoin.
          </h2>

          <div className="space-y-5 text-sm sm:text-base text-[#9BA5B3] leading-relaxed max-w-3xl mx-auto text-left sm:text-center font-normal">
            <p>
              Abrir uma conta em uma exchange e apertar o botão <strong className="text-white">“comprar”</strong> leva poucos minutos.
            </p>
            <p>
              Entender o que você está comprando, quanto expor, como interpretar o mercado, onde armazenar, como proteger suas chaves e como utilizar seus bitcoins exige algo muito mais importante: <strong className="text-[#F59A18]">conhecimento.</strong>
            </p>
          </div>

          {/* Destaque Frase Impactante */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#0D1522] via-[#101B2B] to-[#0D1522] border border-[#147BFF]/40 shadow-xl max-w-3xl mx-auto">
            <p className="font-outfit font-bold text-lg md:text-2xl text-[#F5F7FA] leading-snug">
              “Bitcoin elimina intermediários. Não elimina a necessidade de saber o que você está fazendo.”
            </p>
          </div>
        </div>
      </section>

      {/* ==================== 5. QUATRO PILARES ==================== */}
      <section className="py-14 md:py-20 bg-[#080D14] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              O QUE VOCÊ PRECISA DOMINAR
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Entenda o que realmente importa antes de colocar dinheiro em Bitcoin
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* CARD 01 */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-[#147BFF]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#147BFF]/10 text-[#38BDF8] border border-[#147BFF]/30 flex items-center justify-center font-bold font-mono text-lg">
                01
              </div>
              <h3 className="font-outfit font-bold text-xl text-[#F5F7FA]">
                ENTENDA O DINHEIRO
              </h3>
              <p className="text-sm text-[#9BA5B3] leading-relaxed">
                Antes de estudar Bitcoin, entenda moeda, inflação, bancos, expansão monetária e os problemas que levaram ao surgimento de alternativas descentralizadas.
              </p>
            </div>

            {/* CARD 02 */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-[#F59A18]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 flex items-center justify-center font-bold font-mono text-lg">
                02
              </div>
              <h3 className="font-outfit font-bold text-xl text-[#F5F7FA]">
                ENTENDA O BITCOIN
              </h3>
              <p className="text-sm text-[#9BA5B3] leading-relaxed">
                Descubra como funcionam blockchain, mineração, emissão limitada, criptografia, descentralização e a infraestrutura que sustenta a rede.
              </p>
            </div>

            {/* CARD 03 */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-[#10B981]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 flex items-center justify-center font-bold font-mono text-lg">
                03
              </div>
              <h3 className="font-outfit font-bold text-xl text-[#F5F7FA]">
                ENTENDA O MERCADO
              </h3>
              <p className="text-sm text-[#9BA5B3] leading-relaxed">
                Aprenda a interpretar ciclos, comportamento dos investidores, indicadores, períodos de euforia e medo e diferentes momentos do mercado.
              </p>
            </div>

            {/* CARD 04 */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-[#F59A18]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 flex items-center justify-center font-bold font-mono text-lg">
                04
              </div>
              <h3 className="font-outfit font-bold text-xl text-[#F5F7FA]">
                ENTENDA A CUSTÓDIA
              </h3>
              <p className="text-sm text-[#9BA5B3] leading-relaxed">
                Compreenda carteiras, chaves privadas, seed phrase, backups e os fundamentos necessários para proteger seus próprios ativos.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={scrollToOffer}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#0D131C] border border-[#F59A18]/40 text-[#F59A18] hover:bg-[#F59A18] hover:text-black font-bold text-sm transition-all"
            >
              <span>CONHECER O TREINAMENTO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== 6. SEÇÃO “ERROS E RISCOS” ==================== */}
      <section className="py-14 md:py-20 bg-[#0B131F] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest bg-[#F59A18]/15 text-[#F59A18] border border-[#F59A18]/30">
              CONHECIMENTO TAMBÉM É PROTEÇÃO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Existem erros no Bitcoin que você só precisa cometer uma vez.
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3]">
              E exatamente por isso é melhor conhecê-los antes que exista dinheiro envolvido.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 6 ERROS */}
            {[
              {
                title: "Comprar apenas porque o preço está subindo",
                desc: "Tomar decisões pela euforia pode significar assumir riscos sem sequer entender o contexto do mercado.",
              },
              {
                title: "Vender apenas porque o preço caiu",
                desc: "Sem entender ciclos, volatilidade pode facilmente virar medo e prejuízo definitivo.",
              },
              {
                title: "Deixar tudo em uma exchange",
                desc: "Comprar Bitcoin e possuir as próprias chaves são duas coisas completamente diferentes.",
              },
              {
                title: "Não entender sua seed phrase",
                desc: "A seed não é apenas uma senha comum. Ela representa o acesso direto aos seus fundos.",
              },
              {
                title: "Não ter estratégia de exposição",
                desc: "Entrar no mercado sem gerenciamento transforma qualquer oscilação em decisão emocional.",
              },
              {
                title: "Usar ferramentas sem entendê-las",
                desc: "Carteiras, redes e plataformas envolvem responsabilidades que precisam ser compreendidas.",
              },
            ].map((erro, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#080E17] border border-white/10 space-y-3 text-left">
                <div className="flex items-center space-x-2 text-[#EF4444]">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-mono font-bold uppercase">Risco {idx + 1}</span>
                </div>
                <h3 className="font-outfit font-bold text-base text-white">{erro.title}</h3>
                <p className="text-xs text-[#9BA5B3] leading-relaxed">{erro.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center space-y-4 pt-4">
            <p className="font-outfit font-bold text-lg text-white">
              Você não precisa aprender tudo isso depois de errar.
            </p>
            <button
              onClick={scrollToOffer}
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FFB12B] via-[#F59A18] to-[#E98508] text-[#080B0F] font-extrabold text-sm md:text-base hover:brightness-105 transition-all shadow-lg"
            >
              <span>QUERO APRENDER ANTES DE ARRISCAR</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== 7. SEÇÃO IMPACTANTE SOBRE AUTOCUSTÓDIA ==================== */}
      <section className="py-14 md:py-20 bg-[#06090E] border-b border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 space-y-12 text-center">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
            SEJA VOCÊ SEU PRÓPRIO BANCO
          </span>

          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#F5F7FA]">
              Seu Bitcoin pode ser seu. <br className="hidden sm:inline" />
              <span className="text-[#F59A18]">A responsabilidade também.</span>
            </h2>
            <p className="text-sm md:text-base text-[#9BA5B3] leading-relaxed">
              Uma das maiores características do Bitcoin é permitir que uma pessoa tenha controle direto sobre seus próprios ativos. Mas autonomia exige responsabilidade.
            </p>
          </div>

          {/* Keywords Highlight Grid */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {["SEED PHRASE", "CHAVE PRIVADA", "CARTEIRA", "BACKUP", "ENDEREÇO", "REDE"].map((tag, idx) => (
              <span key={idx} className="px-3.5 py-1.5 rounded-lg bg-[#0E1520] border border-[#147BFF]/30 text-[#38BDF8] font-mono text-xs font-bold">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-xs md:text-sm text-[#C7CDD4] max-w-2xl mx-auto font-medium">
            Quando existe dinheiro envolvido, esses conceitos deixam de ser detalhes técnicos.
          </p>

          {/* 4 Feature Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-5 rounded-xl bg-[#0A0F17] border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 text-[#F59A18]">
                <Key className="w-4 h-4" />
                <span className="font-bold font-mono text-xs">SEED PHRASE</span>
              </div>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Perder seu único backup pode significar perder o acesso definitivo à carteira.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0F17] border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 text-[#F59A18]">
                <Lock className="w-4 h-4" />
                <span className="font-bold font-mono text-xs">CHAVE PRIVADA</span>
              </div>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Quem possui a chave privada pode controlar os fundos associados a ela.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0F17] border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 text-[#F59A18]">
                <Wallet className="w-4 h-4" />
                <span className="font-bold font-mono text-xs">EXCHANGES</span>
              </div>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Manter seus ativos exclusivamente em uma corretora significa continuar dependendo de terceiros.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0F17] border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 text-[#F59A18]">
                <RefreshCw className="w-4 h-4" />
                <span className="font-bold font-mono text-xs">TRANSAÇÕES</span>
              </div>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Endereços, redes e confirmações precisam ser compreendidos antes de movimentar valores.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F1724] border border-[#F59A18]/30 max-w-2xl mx-auto">
            <p className="font-outfit font-extrabold text-lg md:text-xl text-[#F5F7FA]">
              “Liberdade financeira exige responsabilidade financeira.”
            </p>
          </div>

          <div>
            <button
              onClick={scrollToOffer}
              className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-[#0D131C] border border-[#F59A18]/40 text-[#F59A18] hover:bg-[#F59A18] hover:text-black font-bold text-sm transition-all"
            >
              <span>APRENDER AUTOCUSTÓDIA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== 8. PARA QUEM É O TREINAMENTO ==================== */}
      <section className="py-14 md:py-20 bg-[#080D14] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              PARA QUEM FOI DESENVOLVIDO
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Este treinamento faz sentido para você?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#147BFF]/10 text-[#38BDF8] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">
                PARA QUEM ESTÁ COMEÇANDO
              </h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Quer aprender Bitcoin sem começar por gráficos complexos, jargões excessivos ou promessas de enriquecimento rápido.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#F59A18]/10 text-[#F59A18] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">
                PARA QUEM JÁ POSSUI CRIPTO
              </h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Já comprou Bitcoin ou outros ativos, mas percebe que ainda existem lacunas importantes em segurança, custódia ou gerenciamento.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 text-[#10B981] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">
                PARA QUEM QUER AUTOCUSTÓDIA
              </h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Deseja compreender como funciona o controle direto dos próprios bitcoins e reduzir a dependência exclusiva de terceiros.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#F59A18]/10 text-[#F59A18] flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">
                PARA QUEM QUER DECIDIR COM CRITÉRIO
              </h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Quer compreender mercado e ciclos antes de simplesmente seguir opiniões, influencers ou movimentos pontuais de preço.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 9. A JORNADA ==================== */}
      <section className="py-14 md:py-20 bg-[#06090E] border-b border-white/[0.08]">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 space-y-12 text-center">
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              UMA FORMAÇÃO, NÃO AULAS SOLTAS
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Cada módulo responde uma pergunta que o próximo módulo exige
            </h2>
          </div>

          {/* Jornada Sequencial (Horizontal em Desktop, Vertical em Mobile) */}
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-2 relative">
            {[
              { num: "01", step: "DINHEIRO", question: "Por que o Bitcoin surgiu?" },
              { num: "02", step: "BITCOIN", question: "O que exatamente você está comprando?" },
              { num: "03", step: "MERCADO", question: "Como esse ativo se comporta nos ciclos?" },
              { num: "04", step: "AUTOCUSTÓDIA", question: "Como proteger aquilo que comprou?" },
              { num: "05", step: "GERENCIAMENTO", question: "Como administrar e utilizar na prática?" },
            ].map((j, idx) => (
              <div key={idx} className="flex-1 p-5 rounded-xl bg-[#0C121B] border border-white/10 flex flex-col justify-between text-left space-y-3 relative group hover:border-[#F59A18]/50 transition-all">
                <div className="flex items-center justify-between text-[#F59A18]">
                  <span className="font-mono font-extrabold text-sm">{j.num}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider bg-[#F59A18]/10 px-2 py-0.5 rounded border border-[#F59A18]/30">
                    {j.step}
                  </span>
                </div>
                <p className="text-xs text-[#E2E8F0] font-medium leading-snug">
                  {j.question}
                </p>
                {idx < 4 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#F59A18]">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 10. CONTEÚDO DO TREINAMENTO (GRID) ==================== */}
      <section className="py-14 md:py-20 bg-[#080D14] border-b border-white/[0.08]" id="modulos">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              CONHEÇA O TREINAMENTO
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Da origem do dinheiro à utilização prática do Bitcoin
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {MODULES.map((mod) => (
              <div
                key={mod.id}
                className="p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] hover:border-[#F59A18]/40 transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
                      {mod.badge}
                    </span>
                    <span className="text-xs text-[#9BA5B3] font-mono italic">{mod.question}</span>
                  </div>

                  <h3 className="font-outfit font-bold text-xl text-[#F5F7FA] leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-[#9BA5B3] leading-relaxed">
                    {mod.subtitle}
                  </p>

                  <div className="pt-2 space-y-2 border-t border-white/[0.08]">
                    <span className="text-[11px] font-bold text-[#C7CDD4] uppercase tracking-wider block">
                      Tópicos Abordados:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#9BA5B3]">
                      {mod.topics.map((t, tidx) => (
                        <li key={tidx} className="flex items-start">
                          <Check className="w-3.5 h-3.5 text-[#F59A18] mr-2 shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 11. SEGUNDO CARROSSEL — POR DENTRO DO TREINAMENTO ==================== */}
      <section className="py-14 md:py-20 bg-[#06090E] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-10 text-center">
          <div className="space-y-3 max-w-3xl mx-auto">
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

          {/* Galeria de Screenshots das Aulas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((mod, idx) => (
              <div
                key={idx}
                onClick={() => setActivePreviewIndex(idx)}
                className="group relative aspect-[9/16] rounded-xl overflow-hidden border border-white/10 bg-[#0D131C] cursor-pointer hover:border-[#F59A18]/50 transition-all"
              >
                <Image
                  src={mod.image}
                  alt={mod.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050607]/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
                  <span className="text-[10px] font-mono text-[#F59A18] uppercase font-bold">
                    {mod.badge}
                  </span>
                  <h4 className="font-outfit font-bold text-sm text-white">{mod.title}</h4>
                  <div className="flex items-center space-x-1 text-[11px] text-[#38BDF8] pt-1">
                    <Maximize2 className="w-3 h-3" />
                    <span>Clique para visualizar</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePreviewIndex !== null && (
        <div
          onClick={() => setActivePreviewIndex(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center">
            <button
              onClick={() => setActivePreviewIndex(null)}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 z-20"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-h-[80vh] aspect-[9/16] max-w-[420px] rounded-xl overflow-hidden border border-white/20">
              <Image
                src={MODULES[activePreviewIndex].image}
                alt={MODULES[activePreviewIndex].title}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-white text-sm font-bold mt-3 font-outfit">
              {MODULES[activePreviewIndex].title}
            </p>
          </div>
        </div>
      )}

      {/* ==================== 12. SEÇÃO SOBRE MERCADO E CICLOS ==================== */}
      <section className="py-14 md:py-20 bg-[#080D14] border-b border-white/[0.08]">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 space-y-10 text-center">
          <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
            CICLOS E COMPORTAMENTO
          </span>

          <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#F5F7FA] max-w-3xl mx-auto">
            Pare de tomar decisões apenas porque o preço subiu ou caiu.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#9BA5B3] max-w-3xl mx-auto font-normal">
            <p>
              Mercados são movidos por períodos de otimismo, medo, expansão, correção e mudança de expectativas.
            </p>
            <p>
              O objetivo deste módulo não é prever o futuro. É ensinar você a compreender melhor o contexto antes de tomar uma decisão.
            </p>
          </div>

          {/* Visual Cycle Map */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#0D131C] border border-white/10 space-y-6">
            <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider block">
              ESTRUTURA DOS CICLOS DE MERCADO
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm font-bold font-mono">
              <span className="px-3.5 py-2 rounded-xl bg-[#F59A18]/20 text-[#F59A18] border border-[#F59A18]/40">
                EUFORIA
              </span>
              <span className="text-white/40">→</span>
              <span className="px-3.5 py-2 rounded-xl bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40">
                VOLATILIDADE
              </span>
              <span className="text-white/40">→</span>
              <span className="px-3.5 py-2 rounded-xl bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/40">
                MEDO
              </span>
              <span className="text-white/40">→</span>
              <span className="px-3.5 py-2 rounded-xl bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40">
                ACUMULAÇÃO
              </span>
              <span className="text-white/40">→</span>
              <span className="px-3.5 py-2 rounded-xl bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/40">
                RECUPERAÇÃO
              </span>
            </div>
            <p className="text-xs text-[#9BA5B3] italic pt-2">
              “Indicadores não eliminam o risco. Conhecimento melhora a qualidade da decisão.”
            </p>
          </div>
        </div>
      </section>

      {/* ==================== 13. TRANSFORMAÇÃO / RESULTADOS EDUCACIONAIS ==================== */}
      <section className="py-14 md:py-20 bg-[#06090E] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              AO FINAL DA JORNADA
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Você não precisa saber tudo sobre Bitcoin. Precisa entender o suficiente para não depender cegamente de terceiros.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider block">
                01. COMPREENDER
              </span>
              <h3 className="font-outfit font-bold text-lg text-white">Dinheiro e Rede</h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Entender a história do dinheiro, a inflação e a infraestrutura tecnológica por trás do Bitcoin.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider block">
                02. INTERPRETAR
              </span>
              <h3 className="font-outfit font-bold text-lg text-white">Mercado e Fases</h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Reconhecer fases e comportamentos do mercado sem agir por pânico ou euforia.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-[#F59A18] uppercase tracking-wider block">
                03. PROTEGER
              </span>
              <h3 className="font-outfit font-bold text-lg text-white">Custódia e Chaves</h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Entender carteiras, chaves privadas, backups e princípios essenciais de segurança.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider block">
                04. GERENCIAR
              </span>
              <h3 className="font-outfit font-bold text-lg text-white">Exposição e Carteira</h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Organizar melhor sua exposição de forma alinhada com seu perfil e horizonte.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-[#F59A18] uppercase tracking-wider block">
                05. UTILIZAR
              </span>
              <h3 className="font-outfit font-bold text-lg text-white">Ferramentas Práticas</h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Entender caminhos para movimentar, vender, sacar e utilizar seus bitcoins na prática.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider block">
                06. DECIDIR
              </span>
              <h3 className="font-outfit font-bold text-lg text-white">Autonomia Crítica</h3>
              <p className="text-xs text-[#9BA5B3] leading-relaxed">
                Ter conhecimento suficiente para construir suas próprias decisões sem depender de influencers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 14. SEÇÃO DE OFERTA ==================== */}
      <section className="py-14 md:py-24 bg-[#080D14] border-b border-white/[0.08]" id="oferta">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-md text-xs font-extrabold uppercase tracking-widest bg-[#F59A18]/15 text-[#F59A18] border border-[#F59A18]/30">
              ACESSO AO TREINAMENTO
            </span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-5xl text-[#F5F7FA]">
              Comece pelos fundamentos que conectam dinheiro, Bitcoin e autonomia.
            </h2>
          </div>

          {/* Pricing Box */}
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#0F1724] via-[#0B111C] to-[#070B12] border-2 border-[#F59A18]/40 shadow-2xl shadow-[#F59A18]/10 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold text-[#F59A18] uppercase tracking-wider block">
                FORMAÇÃO COMPLETA HDZ FINANCE
              </span>
              <h3 className="font-outfit font-bold text-xl md:text-3xl text-white">
                Fundamentos do Dinheiro, Bitcoin e Autocustódia
              </h3>
            </div>

            {/* O que está incluído */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-[#E2E8F0] max-w-2xl mx-auto border-y border-white/10 py-6">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#F59A18] shrink-0" />
                <span>Apresentação & Visão Geral</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#F59A18] shrink-0" />
                <span>Módulo 1 — Fundamentos do Dinheiro</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#F59A18] shrink-0" />
                <span>Módulo 2 — O que é Bitcoin</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#F59A18] shrink-0" />
                <span>Módulo 3 — Ciclos de Mercado</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#F59A18] shrink-0" />
                <span>Módulo 4 — Seja Seu Próprio Banco</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#F59A18] shrink-0" />
                <span>Módulo 5 — Gerenciamento e Utilização</span>
              </div>
            </div>

            {/* Ação e Checkout */}
            <div className="text-center space-y-4 max-w-md mx-auto">
              {trainingOffer.checkoutUrl ? (
                <a
                  href={trainingOffer.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-[#FFB12B] via-[#F59A18] to-[#E98508] text-[#080B0F] font-extrabold text-lg hover:brightness-105 transition-all shadow-xl shadow-[#F59A18]/20"
                >
                  <span>QUERO ACESSAR O TREINAMENTO</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </a>
              ) : (
                <div className="p-4 rounded-xl bg-[#141F30] border border-[#147BFF]/40 space-y-2">
                  <span className="text-xs font-mono text-[#38BDF8] font-bold block uppercase">
                    PÁGINA EM PREPARAÇÃO DE CHECKOUT
                  </span>
                  <p className="text-xs text-[#9BA5B3]">
                    Inscrições abertas em breve através da nossa plataforma oficial de checkout.
                  </p>
                </div>
              )}

              <p className="text-[11px] text-[#9BA5B3]">
                Pagamento processado com segurança pela plataforma integrada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 15. PROVA SOCIAL ==================== */}
      <section className="py-14 md:py-20 bg-[#06090E] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              EXPERIÊNCIA DOS ALUNOS
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Veja a experiência de quem já começou a estudar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/10 space-y-3">
              <div className="flex items-center space-x-1 text-[#F59A18]">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <p className="text-xs text-[#E2E8F0] italic leading-relaxed">
                “O módulo de autocustódia abriu meus olhos. Eu tinha comprado Bitcoin em corretora e achava que era meu. Entender a seed phrase fez toda a diferença.”
              </p>
              <span className="text-xs font-bold text-[#9BA5B3] block">— Carlos M.</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/10 space-y-3">
              <div className="flex items-center space-x-1 text-[#F59A18]">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <p className="text-xs text-[#E2E8F0] italic leading-relaxed">
                “Didática impecável. Começar entendendo a história do dinheiro antes de falar de Bitcoin faz a gente entender o motivo real desse ativo existir.”
              </p>
              <span className="text-xs font-bold text-[#9BA5B3] block">— Eduardo R.</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D131C] border border-white/10 space-y-3">
              <div className="flex items-center space-x-1 text-[#F59A18]">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <p className="text-xs text-[#E2E8F0] italic leading-relaxed">
                “Sem promessas falsas de ficar rico. É um curso sério sobre economia, tecnologia e segurança. Recomendo para qualquer pessoa que queira investir com consciência.”
              </p>
              <span className="text-xs font-bold text-[#9BA5B3] block">— Marcelo T.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 16. GARANTIA ==================== */}
      <section className="py-12 bg-[#080D14] border-b border-white/[0.08]">
        <div className="max-w-[900px] mx-auto px-5 md:px-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-outfit font-bold text-xl md:text-3xl text-white">
            Conheça o treinamento com tranquilidade
          </h2>
          <p className="text-xs md:text-sm text-[#9BA5B3] leading-relaxed max-w-xl mx-auto">
            Você tem 7 dias corridos para acessar a plataforma e avaliar se o conteúdo faz sentido para você. Caso esteja dentro dos critérios da política de garantia, basta solicitar o reembolso.
          </p>
        </div>
      </section>

      {/* ==================== 17. COMO FUNCIONA O ACESSO ==================== */}
      <section className="py-14 md:py-20 bg-[#06090E] border-b border-white/[0.08]">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 space-y-10 text-center">
          <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
            ACESSO SIMPLES
          </span>
          <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
            Como você recebe o treinamento
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-5 rounded-xl bg-[#0C121B] border border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-[#F59A18]">PASSO 01</span>
              <h3 className="font-outfit font-bold text-sm text-white">Conclua sua inscrição</h3>
              <p className="text-xs text-[#9BA5B3]">Finalize a inscrição através do checkout seguro.</p>
            </div>

            <div className="p-5 rounded-xl bg-[#0C121B] border border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-[#F59A18]">PASSO 02</span>
              <h3 className="font-outfit font-bold text-sm text-white">Receba seu acesso</h3>
              <p className="text-xs text-[#9BA5B3]">As instruções são enviadas por e-mail no mesmo instante.</p>
            </div>

            <div className="p-5 rounded-xl bg-[#0C121B] border border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-[#F59A18]">PASSO 03</span>
              <h3 className="font-outfit font-bold text-sm text-white">Comece pela apresentação</h3>
              <p className="text-xs text-[#9BA5B3]">Entenda a estrutura e siga a jornada recomendada.</p>
            </div>

            <div className="p-5 rounded-xl bg-[#0C121B] border border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-[#F59A18]">PASSO 04</span>
              <h3 className="font-outfit font-bold text-sm text-white">Avance no seu ritmo</h3>
              <p className="text-xs text-[#9BA5B3]">Acesse as aulas e reveja o conteúdo quando quiser.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 18. PERGUNTAS FREQUENTES (FAQ) ==================== */}
      <section className="py-14 md:py-20 bg-[#080D14] border-b border-white/[0.08]" id="faq">
        <div className="max-w-[900px] mx-auto px-5 md:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#F59A18] uppercase tracking-widest block">
              PERGUNTAS FREQUENTES
            </span>
            <h2 className="font-outfit font-bold text-2xl md:text-4xl text-[#F5F7FA]">
              Ainda ficou alguma dúvida?
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#0D131C] border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  >
                    <span className="font-outfit font-bold text-sm md:text-base text-white">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#F59A18] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-[#9BA5B3] leading-relaxed border-t border-white/5">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 19. CTA FINAL ==================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A121E] via-[#070D17] to-[#050607]">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 text-center space-y-8">
          <h2 className="font-outfit font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight">
            A pior hora para aprender sobre segurança é depois de precisar dela.
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm font-bold font-mono text-[#38BDF8]">
            <span>Entenda dinheiro.</span>
            <span className="text-white/30">•</span>
            <span>Entenda Bitcoin.</span>
            <span className="text-white/30">•</span>
            <span>Entenda o mercado.</span>
            <span className="text-white/30">•</span>
            <span>Proteja suas chaves.</span>
          </div>

          <p className="font-outfit font-bold text-lg md:text-xl text-[#F59A18]">
            “Conhecimento vem antes da autonomia.”
          </p>

          <div className="pt-2">
            <button
              onClick={scrollToOffer}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#FFB12B] via-[#F59A18] to-[#E98508] text-[#080B0F] font-extrabold text-lg hover:brightness-105 transition-all shadow-2xl shadow-[#F59A18]/25"
            >
              <span>COMEÇAR O TREINAMENTO</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
