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
  Wallet,
  TrendingUp,
  ShieldCheck,
  ShoppingCart,
  MailCheck,
  Download,
  Smartphone,
} from "lucide-react";

// =============================================================================
// CONFIGURAÇÕES COMERCIAIS DAS COLEÇÕES
// =============================================================================
const precoColecaoInicial: number = 19.90;
const precoColecaoCompleta: number = 29.90;
const precoAnteriorInicial: number = 29.90;
const precoAnteriorCompleta: number = 39.90;
const checkoutColecaoInicial: string = "https://pay.wiapy.com/XY656Bg9PUjE";
const checkoutColecaoCompleta: string = "https://pay.wiapy.com/ffvmuAbakGTQ";

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

// Carrossel Marquee Infinito — Rotina de Estudos (3 Imagens)
const rotinaSlides = [
  {
    id: 1,
    title: "Estudo de Finanças e Investimentos",
    alt: "Pessoa estudando os guias visuais de educação financeira e investimentos e fazendo anotações.",
    image: "/images/rotina/rotina-estudos-1.jpg",
  },
  {
    id: 2,
    title: "Consulta ao Guia de Educação Financeira",
    alt: "Pessoa consultando o guia visual de Educação Financeira em uma mesa de estudos.",
    image: "/images/rotina/rotina-estudos-2.jpg",
  },
  {
    id: 3,
    title: "Mapas de Renda Fixa e Dividendos",
    alt: "Pessoa estudando mapas visuais sobre investimentos, renda fixa, poupança e dividendos.",
    image: "/images/rotina/rotina-estudos-3.jpg",
  },
];

// Array duplicado para loop infinito contínuo da rotina de estudos
const rotinaMarqueeItems = [...rotinaSlides, ...rotinaSlides, ...rotinaSlides, ...rotinaSlides];

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

// Catálogo dos 3 Bônus
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
  {
    number: "03",
    title: "Planilha de Controle Financeiro",
    shortTitle: "Planilha de Controle Financeiro",
    description:
      "Ferramenta prática pronta para uso para organizar seu orçamento mensal, acompanhar receitas, despesas e planejar suas metas de investimento.",
    badge: "🎁 BÔNUS EXCLUSIVO",
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
        "A Coleção Inicial reúne quatro guias visuais (Educação Financeira; Economia, Juros e Inflação; Investimentos; Fundamentos do Bitcoin). A Coleção Completa inclui esses mesmos quatro guias, mais cinco guias adicionais (Criptografia, Dólar Digital, Blockchain, Tokenização e Mentalidade Bitcoiner) e três bônus exclusivos (Do Clique ao Bloco, Meu Primeiro Bitcoin e a Planilha de Controle Financeiro), somando 12 materiais.",
    },
    {
      question: "Em qual formato os materiais são entregues?",
      answer:
        "Todos os guias visuais e e-books bônus são entregues em formato PDF digital de alta resolução, e a Planilha de Controle Financeiro em formato digital pronto para uso, otimizados para leitura, consulta e utilização em celulares, tablets e computadores.",
    },
    {
      question: "Os guias e e-books são vendidos separadamente?",
      answer:
        "Nesta oferta, os materiais estão organizados em duas coleções fechadas (Inicial e Completa) para garantir uma sequência lógica de estudo com condições especiais.",
    },
    {
      question: "Como receberei o acesso após a compra?",
      answer:
        "Assim que a confirmação do pagamento for concluída, você receberá um e-mail com as orientações e os links diretos para download dos PDFs e da planilha correspondentes ao seu plano.",
    },
    {
      question: "Existe garantia de reembolso?",
      answer:
        "Sim. Oferecemos 7 dias de garantia incondicional. Você pode baixar os arquivos, avaliar a organização do conteúdo e, se considerar que não atende às suas expectativas, solicitar o reembolso integral dentro do prazo.",
    },
    {
      question: "Qual a diferença entre os guias visuais e os bônus?",
      answer:
        "Os guias visuais organizam conceitos fundamentais em mapas conceituais para consulta rápida. Os bônus incluem e-books de leitura complementar em texto contínuo ('Do Clique ao Bloco' e 'Meu Primeiro Bitcoin') e a Planilha de Controle Financeiro para gestão prática do seu orçamento no dia a dia, incluídos exclusivamente na Coleção Completa.",
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
        <div className="max-w-[840px] mx-auto px-4 md:px-5 text-center">
          
          {/* SELO CÁPSULA */}
          <div className="mb-[10px]">
            <span className="inline-block px-[10px] py-[4px] rounded-full bg-[#FFFBEB] border border-[#F59E0B] text-[#92400E] text-[11px] font-bold tracking-wide uppercase">
              📖 COLEÇÃO VISUAL DE EDUCAÇÃO FINANCEIRA
            </span>
          </div>

          {/* TÍTULO PRINCIPAL H1 */}
          <h1 className="font-outfit font-extrabold text-[clamp(32px,4vw,48px)] tracking-tight leading-[1.08] text-center max-w-[840px] mx-auto mb-[16px]">
            <span className="text-[#0A0A0A]">Chega de </span>
            <span className="text-[#D72638]">perder dinheiro</span>
            <br className="hidden md:block" />{" "}
            <span className="text-[#0866E8]">com juros que você não entende.</span>
            <br className="hidden md:block" />{" "}
            <span className="text-[#059669]">Assuma o controle das suas finanças.</span>
          </h1>

          {/* DESCRIÇÃO SUBTÍTULO */}
          <p className="text-[18px] md:text-[22px] font-medium text-[#111111] leading-[1.5] text-center max-w-[780px] mx-auto mb-[12px]">
            Entenda <span className="font-bold text-[#0866E8]">o que você paga aos bancos</span>, como <span className="font-bold text-[#111111]">a inflação diminui seu poder de compra</span> e como <span className="font-bold text-[#0866E8]">os investimentos funcionam</span>. Aprenda com <span className="font-extrabold text-[#D72638]">90 mapas mentais visuais</span> para <span className="font-bold text-[#059669]">estudar e consultar</span>.
          </p>

          {/* LINHA CURTA DE PÚBLICO */}
          <p className="text-[14px] font-semibold text-[#111111] leading-[1.4] text-center max-w-[780px] mx-auto mb-[14px]">
            👥 Para quem quer cuidar melhor do próprio dinheiro e deixar de decidir no escuro.
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
      {/* 3.5 SEÇÃO ROTINA DE ESTUDOS (#hdz-rotina-visual)                          */}
      {/* ========================================================================= */}
      <section id="hdz-rotina-visual" className="pt-[44px] pb-[32px] max-md:pt-[32px] max-md:pb-[24px] bg-[#FAF7F2] border-b border-[#E2E8F0] overflow-hidden">
        <div>
          
          {/* CABEÇALHO DA SEÇÃO */}
          <div className="text-center max-w-[760px] mx-auto px-4 sm:px-5 mb-[28px] space-y-3">
            {/* Selo */}
            <div>
              <span className="inline-block px-[10px] py-[4px] rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FFFBEB] text-[#92400E] border border-[#F5B700]">
                ✨ ROTINA DE ESTUDOS
              </span>
            </div>

            {/* Título */}
            <h2 className="font-outfit font-extrabold text-[26px] sm:text-[30px] md:text-[34px] text-[#0B1F3A] leading-[1.15]">
              Veja como os materiais podem fazer parte da sua rotina de estudos
            </h2>

            {/* Descrição */}
            <p className="text-[15px] text-[#334155] leading-[1.5]">
              Uma forma visual de estudar, consultar e compreender educação financeira, investimentos, inflação e juros.
            </p>
          </div>

          {/* FAIXA DO CARROSSEL DA ROTINA */}
          <div className="relative w-full overflow-hidden py-2 ticker-mask">
            <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
              {rotinaMarqueeItems.map((slide, idx) => (
                <div
                  key={`rotina-slide-${slide.id}-${idx}`}
                  onClick={() => setZoomedImage(slide.image)}
                  className="group relative w-[clamp(260px,31vw,380px)] shrink-0 rounded-[12px] bg-[#FAF7F2] border border-[#F5D46A] shadow-[0_3px_8px_rgba(11,31,58,0.08)] hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden aspect-[4/3]"
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    width={500}
                    height={375}
                    className="w-full h-full object-contain rounded-[12px] transition-transform duration-300 group-hover:scale-[1.015]"
                  />

                  {/* EFEITO HOVER LIGHTBOX */}
                  <div className="absolute inset-0 bg-[#0B1F3A]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                    <div className="bg-[#0B1F3A] text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md border border-white/20">
                      <ZoomIn className="w-4 h-4 text-[#F59E0B]" />
                      <span>Clique para Ampliar</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SEÇÃO DE PÚBLICO (#hdz-publico)                                         */}
      {/* ========================================================================= */}
      <section id="hdz-publico" className="py-[48px] max-md:py-[32px] bg-[#0B1F3A] border-b border-[#0B1F3A]">
        <div className="max-w-[1040px] mx-auto px-5 md:px-6">
          
          {/* CABEÇALHO CENTRALIZADO */}
          <div className="text-center max-w-[720px] mx-auto mb-8">
            {/* Selo */}
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FFFBEB] text-[#92400E] border border-[#F59E0B] mb-3">
              👥 PÚBLICOS ATENDIDOS
            </span>

            {/* Título */}
            <h2 className="font-outfit font-extrabold text-[26px] sm:text-[30px] md:text-[34px] text-white leading-[1.15] mb-3">
              Para quem esta coleção foi desenvolvida?
            </h2>

            {/* Descrição */}
            <p className="text-[15px] text-[#D5DDE6] leading-[1.5]">
              Materiais visuais e didáticos para quem quer organizar as finanças, compreender investimentos e ampliar seus conhecimentos sobre dinheiro e ativos digitais.
            </p>
          </div>

          {/* GRADE DOS QUATRO CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] items-stretch">
            
            {/* Card 1 — Organização financeira */}
            <div className="p-[24px] rounded-[12px] bg-white border border-[#F6D365] shadow-[0_2px_5px_rgba(11,31,58,0.10)] flex flex-col justify-between h-full text-left">
              <div>
                <div className="flex items-center gap-[12px]">
                  <div className="w-[42px] h-[42px] bg-[#FFFBEB] border border-[#F6D365] rounded-[10px] flex items-center justify-center shrink-0">
                    <Wallet className="w-[22px] h-[22px] text-[#0EA5E9]" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-outfit font-bold text-[17px] text-[#0B1F3A] leading-snug">
                    Para quem quer organizar as finanças
                  </h3>
                </div>

                <p className="mt-[14px] text-[14px] text-[#334155] leading-[1.55]">
                  Compreenda orçamento, dívidas, reserva de emergência e metas para cuidar melhor do seu dinheiro e construir sua base financeira.
                </p>
              </div>

              <div>
                <div className="mt-[18px] mb-[12px] border-t border-[#E2E8F0]" />
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium">
                  <span className="text-[#059669]">✓ Organização e planejamento</span>
                  <span className="text-[#475569]">Inicial e Completa</span>
                </div>
              </div>
            </div>

            {/* Card 2 — Investimentos e economia */}
            <div className="p-[24px] rounded-[12px] bg-white border border-[#F6D365] shadow-[0_2px_5px_rgba(11,31,58,0.10)] flex flex-col justify-between h-full text-left">
              <div>
                <div className="flex items-center gap-[12px]">
                  <div className="w-[42px] h-[42px] bg-[#FFFBEB] border border-[#F6D365] rounded-[10px] flex items-center justify-center shrink-0">
                    <TrendingUp className="w-[22px] h-[22px] text-[#10B981]" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-outfit font-bold text-[17px] text-[#0B1F3A] leading-snug">
                    Para quem quer entender os investimentos
                  </h3>
                </div>

                <p className="mt-[14px] text-[14px] text-[#334155] leading-[1.55]">
                  Conheça risco, retorno e liquidez e entenda como a inflação e os juros influenciam seus investimentos e seu poder de compra.
                </p>
              </div>

              <div>
                <div className="mt-[18px] mb-[12px] border-t border-[#E2E8F0]" />
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium">
                  <span className="text-[#059669]">✓ Conceitos para comparar</span>
                  <span className="text-[#475569]">Inicial e Completa</span>
                </div>
              </div>
            </div>

            {/* Card 3 — Fundamentos do Bitcoin */}
            <div className="p-[24px] rounded-[12px] bg-white border border-[#F6D365] shadow-[0_2px_5px_rgba(11,31,58,0.10)] flex flex-col justify-between h-full text-left">
              <div>
                <div className="flex items-center gap-[12px]">
                  <div className="w-[42px] h-[42px] bg-[#FFFBEB] border border-[#F6D365] rounded-[10px] flex items-center justify-center shrink-0">
                    <span className="font-outfit font-bold text-[26px] text-[#F59E0B] leading-none">
                      ₿
                    </span>
                  </div>
                  <h3 className="font-outfit font-bold text-[17px] text-[#0B1F3A] leading-snug">
                    Para quem está começando no Bitcoin
                  </h3>
                </div>

                <p className="mt-[14px] text-[14px] text-[#334155] leading-[1.55]">
                  Entenda os fundamentos, as transações e a custódia para conhecer o funcionamento do Bitcoin além das mudanças de preço.
                </p>
              </div>

              <div>
                <div className="mt-[18px] mb-[12px] border-t border-[#E2E8F0]" />
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium">
                  <span className="text-[#059669]">✓ Fundamentos explicados</span>
                  <span className="text-[#475569]">Inicial e Completa</span>
                </div>
              </div>
            </div>

            {/* Card 4 — Ativos digitais */}
            <div className="p-[24px] rounded-[12px] bg-white border border-[#F6D365] shadow-[0_2px_5px_rgba(11,31,58,0.10)] flex flex-col justify-between h-full text-left">
              <div>
                <div className="flex items-center gap-[12px]">
                  <div className="w-[42px] h-[42px] bg-[#FFFBEB] border border-[#F6D365] rounded-[10px] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-[22px] h-[22px] text-[#8B5CF6]" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-outfit font-bold text-[17px] text-[#0B1F3A] leading-snug">
                    Para quem quer explorar os ativos digitais
                  </h3>
                </div>

                <p className="mt-[14px] text-[14px] text-[#334155] leading-[1.55]">
                  Amplie seus estudos com os guias de criptografia, dólar digital, blockchain e tokenização disponíveis na Coleção Completa.
                </p>
              </div>

              <div>
                <div className="mt-[18px] mb-[12px] border-t border-[#E2E8F0]" />
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium">
                  <span className="text-[#059669]">✓ Conhecimento para aprofundar</span>
                  <span className="text-[#475569]">Coleção Completa</span>
                </div>
              </div>
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
              Conheça os 12 materiais da coleção completa
            </h2>

            {/* Descrição */}
            <p className="text-[16px] text-[#334155] leading-[1.5] mb-3.5">
              Guias visuais para compreender educação financeira, economia, investimentos e Bitcoin, com três bônus exclusivos para impulsionar seus estudos.
            </p>

            {/* Etiqueta */}
            <span className="inline-block px-[10px] py-[6px] rounded-full text-[12px] font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
              9 GUIAS VISUAIS + 3 BÔNUS EXCLUSIVOS • MATERIAIS DIGITAIS EM PDF & PLANILHA
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

                      {/* Descrição */}
                      <p className="text-[14px] text-[#475569] leading-[1.5]">
                        {guia.description}
                      </p>
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

          {/* GRUPO 2: 3 BÔNUS DENTRO DA MESMA SEÇÃO */}
          <div id="ebooks" className="mt-[32px]">
            {/* Linha de identificação bônus */}
            <div className="border-b-2 border-[#A7F3D0] pb-2 mb-[20px] max-sm:mb-[16px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="font-outfit font-bold text-[18px] text-[#059669]">
                🎁 3 bônus para complementar seus estudos
              </h3>
              <span className="text-sm font-medium text-[#047857]">
                Incluídos na Coleção Completa
              </span>
            </div>

            {/* Grade dos 3 bônus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] max-sm:gap-[16px] items-stretch">
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

                    {/* Descrição */}
                    <p className="text-[14px] text-[#475569] leading-[1.5]">
                      {bonus.description}
                    </p>
                  </div>

                  {/* Divisória + Rodapé */}
                  <div>
                    <div className="my-3 border-t border-[#E2E8F0]" />
                    <p className="text-[11px] font-medium text-[#059669]">
                      {bonus.title.includes("Planilha") ? "📊 Planilha digital em Excel/Sheets" : "📄 E-book digital em PDF"}
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
                Acesse os 12 materiais da coleção completa
              </h3>
              <p className="text-[14px] text-[#475569]">
                Nove guias visuais, dois e-books bônus e a Planilha de Controle Financeiro para estudar e consultar no seu ritmo.
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
      {/* 8. SEÇÃO DE OFERTA (#oferta — DOIS PLANOS LADO A LADO)                   */}
      {/* ========================================================================= */}
      <section id="oferta" className="py-[56px] max-md:py-[36px] bg-[#FAF5E8] border-b border-[#E2E8F0]">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          
          {/* CABEÇALHO CENTRALIZADO */}
          <div className="text-center max-w-[700px] mx-auto mb-[36px] space-y-3">
            {/* Selo */}
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white text-[#0B1F3A] border border-[#F5B700]">
              ✨ OPÇÕES DISPONÍVEIS • ACERVO DIGITAL
            </span>

            {/* Título */}
            <h2 className="font-outfit font-extrabold text-[26px] sm:text-[32px] md:text-[36px] text-[#0B1F3A] leading-[1.15]">
              Escolha o plano ideal para você
            </h2>

            {/* Descrição */}
            <p className="text-[15px] text-[#475569] leading-[1.5]">
              Comece com quatro guias ou escolha a coleção completa, com nove guias visuais e três bônus exclusivos.
            </p>
          </div>

          {/* GRADE DOS PLANOS: DOIS CARDS LADO A LADO */}
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] gap-[24px] max-md:gap-[28px] items-start">
            
            {/* --------------------------------------------------------------------- */}
            {/* CARD 1 — COLEÇÃO INICIAL (Esquerda, menor, borda cinza)              */}
            {/* --------------------------------------------------------------------- */}
            <div className="p-[22px] rounded-[10px] bg-white border border-[#DADDE1] shadow-[0_2px_5px_rgba(11,31,58,0.08)] flex flex-col justify-between text-left space-y-5">
              
              <div className="space-y-4">
                {/* Nome → Descrição */}
                <div>
                  <h3 className="font-outfit font-extrabold text-[22px] text-[#0B1F3A] leading-tight">
                    COLEÇÃO INICIAL
                  </h3>
                  <p className="mt-1 text-[14px] text-[#475569] leading-[1.5]">
                    Uma base visual para compreender suas finanças, os investimentos e o contexto econômico.
                  </p>
                </div>

                {/* Imagem de Capa */}
                <div className="mt-4">
                  <Image
                    src="/images/products/colecao-inicial-cover.jpg"
                    alt="Coleção Inicial - 4 Guias Visuais"
                    width={500}
                    height={400}
                    className="w-full h-auto rounded-[6px] object-cover shadow-sm"
                  />
                </div>

                {/* Bloco de Preço */}
                <div className="pt-2 space-y-1">
                  <del className="text-[#D72638] text-[16px] font-semibold line-through block">
                    De R$ {precoAnteriorInicial.toFixed(2).replace(".", ",")}
                  </del>
                  <div className="flex items-baseline">
                    <span className="text-[14px] font-normal text-[#0B1F3A] mr-1">por</span>
                    <span className="font-outfit font-extrabold text-[38px] sm:text-[44px] md:text-[52px] text-[#00A859] leading-none">
                      R$ {precoColecaoInicial.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#475569]">
                    Materiais digitais em PDF
                  </p>
                </div>

                {/* Divisória */}
                <div className="border-t border-[#E2E8F0]" />

                {/* Materiais Incluídos */}
                <div className="space-y-3">
                  <span className="font-outfit font-bold text-[13px] text-[#0B1F3A] block uppercase tracking-wide">
                    📚 4 GUIAS VISUAIS INCLUÍDOS
                  </span>
                  
                  <div className="space-y-[10px] text-[14px] text-[#0B1F3A] font-medium">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0]/60">
                      <Check className="w-4 h-4 text-[#00A859] shrink-0" />
                      <span>Guia Visual Educação Financeira</span>
                    </div>
                    <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0]/60">
                      <Check className="w-4 h-4 text-[#00A859] shrink-0" />
                      <span>Guia Visual Economia, Juros e Inflação</span>
                    </div>
                    <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0]/60">
                      <Check className="w-4 h-4 text-[#00A859] shrink-0" />
                      <span>Guia Visual Investimentos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#00A859] shrink-0" />
                      <span>Guia Visual Fundamentos do Bitcoin</span>
                    </div>
                  </div>
                </div>

                {/* Divisória */}
                <div className="border-t border-[#E2E8F0]" />

                {/* Benefícios de Formato */}
                <div className="space-y-2 text-[13px] text-[#475569]">
                  <p className="flex items-center gap-2">
                    <span>📥</span>
                    <span>Arquivos para download</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📱</span>
                    <span>Consulta no celular, tablet ou computador</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>🛡️</span>
                    <span>Garantia de 7 dias</span>
                  </p>
                </div>
              </div>

              {/* Botão + Pagamento */}
              <div className="pt-2 space-y-2 text-center">
                {checkoutColecaoInicial ? (
                  <a
                    href={checkoutColecaoInicial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[48px] px-6 py-3 rounded-[7px] bg-[#00A859] hover:bg-[#008C4A] text-white font-outfit font-bold text-sm uppercase tracking-wide transition-all shadow-sm cursor-pointer flex items-center justify-center text-center"
                  >
                    QUERO A COLEÇÃO INICIAL
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        alert("Checkout em configuração para a Coleção Inicial.");
                      }
                    }}
                    className="w-full min-h-[48px] px-6 py-3 rounded-[7px] bg-[#00A859] hover:bg-[#008C4A] text-white font-outfit font-bold text-sm uppercase tracking-wide transition-all shadow-sm cursor-pointer flex items-center justify-center text-center"
                  >
                    QUERO A COLEÇÃO INICIAL
                  </button>
                )}

                <p className="text-[11px] text-[#475569] flex flex-wrap justify-center gap-1">
                  <span>🔒 Pagamento seguro</span>
                  <span>•</span>
                  <span>💠 Pix</span>
                  <span>•</span>
                  <span>💳 Cartão</span>
                </p>
              </div>

            </div>

            {/* --------------------------------------------------------------------- */}
            {/* CARD 2 — COLEÇÃO COMPLETA (Direita, maior, destacada em dourado)      */}
            {/* --------------------------------------------------------------------- */}
            <div className="p-[24px] rounded-[10px] bg-white border-2 border-[#F5B700] shadow-[0_4px_12px_rgba(245,183,0,0.18)] flex flex-col justify-between text-left space-y-5 relative">
              
              {/* Faixa Dourada Sobreposta */}
              <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#F5B700] text-[#0B1F3A] font-outfit font-bold text-[11px] uppercase tracking-wider whitespace-nowrap shadow-sm">
                ⭐ 9 GUIAS VISUAIS + 3 BÔNUS EXCLUSIVOS
              </div>

              <div className="space-y-4 pt-1">
                {/* Nome → Descrição */}
                <div>
                  <h3 className="font-outfit font-extrabold text-[24px] text-[#0B1F3A] leading-tight">
                    COLEÇÃO COMPLETA
                  </h3>
                  <p className="mt-1 text-[14px] text-[#475569] leading-[1.5]">
                    Todos os materiais da Inicial, mais cinco guias e três bônus exclusivos. Amplie seus estudos por R$ 10,00 a mais.
                  </p>
                </div>

                {/* Imagem de Capa */}
                <div className="mt-4">
                  <Image
                    src="/images/products/colecao-completa-cover.jpg"
                    alt="Coleção Completa - 12 Materiais Digitais"
                    width={600}
                    height={480}
                    className="w-full h-auto rounded-[6px] object-cover shadow-sm"
                  />
                </div>

                {/* Bloco de Preço */}
                <div className="pt-2 space-y-1">
                  <del className="text-[#D72638] text-[16px] font-semibold line-through block">
                    De R$ {precoAnteriorCompleta.toFixed(2).replace(".", ",")}
                  </del>
                  <div className="flex items-baseline">
                    <span className="text-[14px] font-normal text-[#0B1F3A] mr-1">por</span>
                    <span className="font-outfit font-extrabold text-[42px] sm:text-[50px] md:text-[60px] text-[#00A859] leading-none">
                      R$ {precoColecaoCompleta.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#475569]">
                    12 materiais digitais (PDFs + Planilha)
                  </p>
                </div>

                {/* Quadro Interno dos Materiais */}
                <div className="p-[14px] rounded-[6px] bg-[#FFFDF3] border border-[#F5B700] space-y-3">
                  <span className="font-outfit font-bold text-[12px] text-[#92400E] block uppercase tracking-wide">
                    📚 9 GUIAS VISUAIS + 🎁 3 BÔNUS EXCLUSIVOS
                  </span>

                  {/* Lista em 2 colunas no computador e 1 no celular */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-[9px] text-[13px] text-[#0B1F3A] font-medium">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A859] shrink-0" />
                      <span>Guia Visual Educação Financeira</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A859] shrink-0" />
                      <span>Guia Visual Economia, Juros e Inflação</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A859] shrink-0" />
                      <span>Guia Visual Investimentos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A859] shrink-0" />
                      <span>Guia Visual Fundamentos do Bitcoin</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A859] shrink-0" />
                      <span>Guia Visual Criptografia</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A859] shrink-0" />
                      <span>Guia Visual Dólar Digital</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A859] shrink-0" />
                      <span>Guia Visual Blockchain</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A859] shrink-0" />
                      <span>Guia Visual Tokenização</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:col-span-2">
                      <Check className="w-3.5 h-3.5 text-[#00A859] shrink-0" />
                      <span>Guia Visual Mentalidade Bitcoiner</span>
                    </div>
                  </div>

                  {/* Divisória Interna Bônus */}
                  <div className="border-t-2 border-[#F5B700]/60 pt-3 space-y-2.5">
                    <span className="font-outfit font-extrabold text-[12px] text-[#047857] block uppercase tracking-wide">
                      🎁 3 BÔNUS INCLUÍDOS NA COMPRA:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 text-[13px] text-[#0B1F3A] font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#00A859] shrink-0" />
                        <span>Do Clique ao Bloco (E-book)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#00A859] shrink-0" />
                        <span>Meu Primeiro Bitcoin (E-book)</span>
                      </div>
                    </div>

                    {/* Destaque BEM GRANDE para o BÔNUS PLANILHA DE CONTROLE FINANCEIRO */}
                    <div className="mt-2.5 p-3.5 rounded-[10px] bg-[#ECFDF5] border-2 border-[#00A859] shadow-sm">
                      <div className="flex items-start gap-2.5">
                        <span className="text-2xl leading-none">📊</span>
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#047857] text-white uppercase tracking-wider">
                            BÔNUS EXCLUSIVO
                          </span>
                          <h5 className="font-outfit font-black text-[16px] sm:text-[18px] text-[#047857] leading-tight tracking-tight">
                            BÔNUS PLANILHA DE CONTROLE FINANCEIRO
                          </h5>
                          <p className="text-[12px] text-[#065F46] font-medium leading-snug">
                            Planilha prática pronta para você organizar seu orçamento mensal, despesas e metas de investimento.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefícios abaixo do quadro */}
                <div className="space-y-2 text-[13px] text-[#475569]">
                  <p className="flex items-center gap-2">
                    <span>📥</span>
                    <span>Todos os arquivos para download</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📱</span>
                    <span>Consulta no celular, tablet ou computador</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>🛡️</span>
                    <span>Garantia de 7 dias</span>
                  </p>
                </div>
              </div>

              {/* Botão + Etiqueta de Economia + Pagamento */}
              <div className="pt-2 space-y-2.5 text-center">
                {checkoutColecaoCompleta ? (
                  <a
                    href={checkoutColecaoCompleta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[52px] px-6 py-3 rounded-[7px] bg-[#00A859] hover:bg-[#008C4A] text-white font-outfit font-extrabold text-sm uppercase tracking-wide transition-all shadow-[0_3px_8px_rgba(0,168,89,0.20)] cursor-pointer flex items-center justify-center text-center"
                  >
                    QUERO A COLEÇÃO COMPLETA →
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        alert("Checkout em configuração para a Coleção Completa.");
                      }
                    }}
                    className="w-full min-h-[52px] px-6 py-3 rounded-[7px] bg-[#00A859] hover:bg-[#008C4A] text-white font-outfit font-extrabold text-sm uppercase tracking-wide transition-all shadow-[0_3px_8px_rgba(0,168,89,0.20)] cursor-pointer flex items-center justify-center text-center"
                  >
                    QUERO A COLEÇÃO COMPLETA →
                  </button>
                )}

                {/* Etiqueta Economia */}
                <div>
                  <span className="inline-block px-[10px] py-[4px] rounded-full text-[12px] font-bold text-[#D72638] bg-white border border-[#D72638]">
                    VOCÊ ECONOMIZA R$ 10,00
                  </span>
                </div>

                <p className="text-[11px] text-[#475569] flex flex-wrap justify-center gap-1">
                  <span>🔒 Pagamento seguro</span>
                  <span>•</span>
                  <span>💠 Pix</span>
                  <span>•</span>
                  <span>💳 Cartão</span>
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. SEÇÃO DE DEPOIMENTOS (#hdz-depoimentos)                                */}
      {/* ========================================================================= */}
      <section id="hdz-depoimentos" className="py-[56px] max-md:py-[36px] bg-[#FFF5F5] border-b border-[#FFE9EB]">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          
          {/* CABEÇALHO CENTRALIZADO */}
          <div className="text-center max-w-[720px] mx-auto mb-[32px] space-y-3">
            {/* Selo */}
            <div>
              <span className="inline-block px-[10px] py-[4px] rounded-full text-[11px] font-bold uppercase tracking-wider bg-white text-[#0B1F3A] border border-[#F5B700]">
                AVALIAÇÕES E EXPERIÊNCIAS
              </span>
            </div>

            {/* Título */}
            <h2 className="font-outfit font-extrabold text-[25px] sm:text-[30px] md:text-[34px] text-[#0B1F3A] leading-[1.15]">
              Veja a experiência de quem já utilizou o material
            </h2>

            {/* Descrição */}
            <p className="text-[14px] text-[#475569] leading-[1.5]">
              Exemplos fictícios de apresentação de depoimentos sobre os materiais da coleção.
            </p>
          </div>

          {/* GRADE DOS TRÊS CARDS DE DEPOIMENTOS */}
          <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-[24px] items-stretch">
            
            {/* CARD 1 — MARCELO ALMEIDA */}
            <div className="p-[24px] rounded-[12px] bg-white border border-[#FFD9DF] shadow-[0_3px_5px_rgba(70,30,35,0.10)] min-h-[280px] flex flex-col justify-between h-full text-left">
              <div>
                {/* Linha das Estrelas + Selo Fictício */}
                <div className="flex items-center justify-between">
                  <span className="text-[#F5B700] text-[17px] tracking-widest leading-none">
                    ★★★★★
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#ECFDF5] text-[#047857] text-[10px] font-bold uppercase tracking-wider">
                    EXEMPLO FICTÍCIO
                  </span>
                </div>

                {/* Divisória Rosa Clara */}
                <div className="my-[14px] border-t border-[#FFE9EB]" />

                {/* Texto do Depoimento */}
                <p className="text-[15px] text-[#334155] leading-[1.6]">
                  “Um amigo meu comentou sobre dividendos uma vez e eu não entendi direito. Quando li essa parte do material, finalmente fez sentido. Antes eu achava que ganhar com ações era só comprar e vender.”
                </p>
              </div>

              <div>
                {/* Divisória Neutra */}
                <div className="mt-[20px] mb-[14px] border-t border-[#E2E8F0]" />

                {/* Rodapé Perfil */}
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#E0F2FE] shrink-0 flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 40 40" className="w-full h-full" aria-label="Avatar ilustrativo de perfil fictício">
                      <circle cx="20" cy="20" r="20" fill="#E0F2FE" />
                      <circle cx="20" cy="17" r="7" fill="#F3D2C1" />
                      <path d="M13 15C13 11.5 16 10 20 10C24 10 27 11.5 27 15C27 15.5 26.5 16 26 16C25.5 13 23 12 20 12C17 12 14.5 13 14 16C13.5 16 13 15.5 13 15Z" fill="#1E293B" />
                      <path d="M9 36C9 29.5 14 26 20 26C26 26 31 29.5 31 36H9Z" fill="#0EA5E9" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-[#0B1F3A] leading-tight">
                      Marcelo Almeida
                    </h4>
                    <span className="text-[12px] text-[#64748B]">
                      Servidor público
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2 — JULIANA COSTA */}
            <div className="p-[24px] rounded-[12px] bg-white border border-[#FFD9DF] shadow-[0_3px_5px_rgba(70,30,35,0.10)] min-h-[280px] flex flex-col justify-between h-full text-left">
              <div>
                {/* Linha das Estrelas + Selo Fictício */}
                <div className="flex items-center justify-between">
                  <span className="text-[#F5B700] text-[17px] tracking-widest leading-none">
                    ★★★★★
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#ECFDF5] text-[#047857] text-[10px] font-bold uppercase tracking-wider">
                    EXEMPLO FICTÍCIO
                  </span>
                </div>

                {/* Divisória Rosa Clara */}
                <div className="my-[14px] border-t border-[#FFE9EB]" />

                {/* Texto do Depoimento */}
                <p className="text-[15px] text-[#334155] leading-[1.6]">
                  “Eu sempre confundia juros com inflação. Gostei dos desenhos porque consegui entender melhor a diferença. Quando esqueço alguma coisa, volto no mapa e releio aquela parte.”
                </p>
              </div>

              <div>
                {/* Divisória Neutra */}
                <div className="mt-[20px] mb-[14px] border-t border-[#E2E8F0]" />

                {/* Rodapé Perfil */}
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#FCE7F3] shrink-0 flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 40 40" className="w-full h-full" aria-label="Avatar ilustrativo de perfil fictício">
                      <circle cx="20" cy="20" r="20" fill="#FCE7F3" />
                      <circle cx="20" cy="17" r="7" fill="#F5D6C6" />
                      <path d="M12 18C12 11 15 9 20 9C25 9 28 11 28 18C28 20 27 21 26 21C25 18 24 12 20 12C16 12 15 18 14 21C13 21 12 20 12 18Z" fill="#78350F" />
                      <path d="M8 36C8 29 13 26 20 26C27 26 32 29 32 36H8Z" fill="#EC4899" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-[#0B1F3A] leading-tight">
                      Juliana Costa
                    </h4>
                    <span className="text-[12px] text-[#64748B]">
                      Estudante
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3 — RAFAEL SANTOS */}
            <div className="p-[24px] rounded-[12px] bg-white border border-[#FFD9DF] shadow-[0_3px_5px_rgba(70,30,35,0.10)] min-h-[280px] flex flex-col justify-between h-full text-left">
              <div>
                {/* Linha das Estrelas + Selo Fictício */}
                <div className="flex items-center justify-between">
                  <span className="text-[#F5B700] text-[17px] tracking-widest leading-none">
                    ★★★★★
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#ECFDF5] text-[#047857] text-[10px] font-bold uppercase tracking-wider">
                    EXEMPLO FICTÍCIO
                  </span>
                </div>

                {/* Divisória Rosa Clara */}
                <div className="my-[14px] border-t border-[#FFE9EB]" />

                {/* Texto do Depoimento */}
                <p className="text-[15px] text-[#334155] leading-[1.6]">
                  “Como trabalho por conta, o dinheiro entra em dias diferentes. Gostei da parte de orçamento, porque eu nunca separava direito os gastos do mês. Foi bom começar pelo básico.”
                </p>
              </div>

              <div>
                {/* Divisória Neutra */}
                <div className="mt-[20px] mb-[14px] border-t border-[#E2E8F0]" />

                {/* Rodapé Perfil */}
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#DCFCE7] shrink-0 flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 40 40" className="w-full h-full" aria-label="Avatar ilustrativo de perfil fictício">
                      <circle cx="20" cy="20" r="20" fill="#DCFCE7" />
                      <circle cx="20" cy="17" r="7" fill="#E8C39E" />
                      <path d="M14 15C14 12 16.5 10 20 10C23.5 10 26 12 26 15C26 15.5 25.5 16 25 16C24.5 13.5 22.5 12 20 12C17.5 12 15.5 13.5 15 16C14.5 16 14 15.5 14 15Z" fill="#334155" />
                      <path d="M16 22C17.5 23.5 22.5 23.5 24 22C24 23.5 22.5 24.5 20 24.5C17.5 24.5 16 23.5 16 22Z" fill="#334155" />
                      <path d="M9 36C9 29.5 14 26 20 26C26 26 31 29.5 31 36H9Z" fill="#10B981" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-[#0B1F3A] leading-tight">
                      Rafael Santos
                    </h4>
                    <span className="text-[12px] text-[#64748B]">
                      Autônomo
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. SEÇÃO DE GARANTIA (#hdz-garantia)                                     */}
      {/* ========================================================================= */}
      <section id="hdz-garantia" className="py-[40px] bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          
          {/* PAINEL CENTRAL DE GARANTIA */}
          <div
            className="p-[32px] max-md:p-[24px] rounded-[12px] border border-[#314DB3] shadow-[0_8px_20px_rgba(8,20,38,0.20)] flex flex-col md:flex-row items-center justify-between gap-[28px] text-center md:text-left"
            style={{
              background: "linear-gradient(110deg, #0C2937 0%, #142D57 52%, #081426 100%)",
            }}
          >
            
            {/* SELO CIRCULAR À ESQUERDA */}
            <div className="w-[96px] h-[96px] shrink-0 rounded-full bg-[#081426] border-[3px] border-[#00A859] flex flex-col items-center justify-center p-2 shadow-md mx-auto md:mx-0">
              <ShieldCheck className="w-5 h-5 text-[#00A859] mb-0.5" strokeWidth={2} />
              <span className="text-[9px] font-bold text-white tracking-widest uppercase leading-none">
                GARANTIA DE
              </span>
              <span className="font-outfit font-extrabold text-[15px] text-[#00A859] leading-none mt-0.5">
                7 DIAS
              </span>
            </div>

            {/* COPY CENTRAL */}
            <div className="flex-1 space-y-2">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#34D399] border border-[#34D399] bg-transparent uppercase tracking-wider">
                  COMPRA COM GARANTIA
                </span>
              </div>
              <h3 className="font-outfit font-extrabold text-[22px] sm:text-[26px] text-white leading-[1.2]">
                7 dias para testar e conhecer o material
              </h3>
              <p className="text-[14px] text-[#E2E8F0] leading-[1.55] max-w-[500px]">
                Acesse os materiais e avalie se a coleção atende às suas expectativas. Se decidir solicitar o reembolso, utilize o canal informado no acesso dentro do prazo de sete dias.
              </p>
            </div>

            {/* BOTÃO À DIREITA */}
            <div className="w-full max-w-[320px] md:w-[220px] shrink-0">
              <button
                type="button"
                onClick={() => scrollToSection("oferta")}
                className="w-full min-h-[52px] px-4 py-2.5 rounded-[7px] bg-[#00A859] hover:bg-[#008C4A] text-white font-outfit font-extrabold text-[14px] uppercase tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center text-center leading-tight"
              >
                QUERO ACESSAR COM GARANTIA →
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. PASSO A PASSO DA ENTREGA (#hdz-entrega)                               */}
      {/* ========================================================================= */}
      <section id="hdz-entrega" className="py-[56px] max-md:py-[36px] bg-[#0B1F3A] border-b border-[#0B1F3A]">
        <div className="max-w-[1040px] mx-auto px-6 max-md:px-4">
          
          {/* CABEÇALHO CENTRALIZADO */}
          <div className="text-center max-w-[760px] mx-auto mb-[40px]">
            {/* Selo */}
            <span className="inline-block px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#00A859] border border-[#A7F3D0] mb-[14px]">
              ✓ PASSO A PASSO DA ENTREGA
            </span>

            {/* Título */}
            <h2 className="font-outfit font-extrabold text-[26px] sm:text-[32px] md:text-[36px] text-white leading-[1.15] mb-[12px]">
              COMO VOCÊ RECEBE OS MATERIAIS
            </h2>

            {/* Descrição */}
            <p className="text-[16px] text-[#E2E8F0] leading-[1.5]">
              Veja como funciona, passo a passo.
            </p>
          </div>

          {/* GRID DOS QUATRO CARDS */}
          <div className="relative">
            {/* Linha horizontal dourada conectando os ícones (apenas no desktop lg:block) */}
            <div className="hidden lg:block absolute top-[47px] left-[10%] right-[10%] h-[1px] bg-[#F6D365]/60 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] items-stretch relative z-10">
              
              {/* ETAPA 1 */}
              <div className="p-[24px] rounded-[14px] bg-white border border-[#F6D365] shadow-[0_4px_12px_rgba(0,0,0,0.12)] min-h-[280px] flex flex-col items-center justify-start text-center h-full">
                {/* Quadrado Ícone + Número */}
                <div className="relative inline-flex items-center justify-center w-[46px] h-[46px] rounded-[12px] bg-[#EFF6FF] border border-[#BFDBFE] shrink-0 mb-[18px]">
                  <ShoppingCart className="w-[24px] h-[24px] text-[#0866E8]" strokeWidth={1.8} />
                  <span className="absolute -top-1.5 -right-1.5 w-[20px] h-[20px] rounded-full bg-[#0B1F3A] text-white flex items-center justify-center text-[11px] font-bold shadow-xs border border-white/40">
                    1
                  </span>
                </div>

                {/* Título */}
                <h3 className="font-outfit font-extrabold text-[17px] text-[#0B1F3A] leading-[1.3] mb-[10px]">
                  Conclua sua compra
                </h3>

                {/* Descrição */}
                <p className="text-[14px] text-[#334155] leading-[1.6]">
                  Escolha o plano desejado e finalize o pagamento com segurança.
                </p>
              </div>

              {/* ETAPA 2 */}
              <div className="p-[24px] rounded-[14px] bg-white border border-[#F6D365] shadow-[0_4px_12px_rgba(0,0,0,0.12)] min-h-[280px] flex flex-col items-center justify-start text-center h-full">
                {/* Quadrado Ícone + Número */}
                <div className="relative inline-flex items-center justify-center w-[46px] h-[46px] rounded-[12px] bg-[#ECFDF5] border border-[#A7F3D0] shrink-0 mb-[18px]">
                  <MailCheck className="w-[24px] h-[24px] text-[#00A859]" strokeWidth={1.8} />
                  <span className="absolute -top-1.5 -right-1.5 w-[20px] h-[20px] rounded-full bg-[#0B1F3A] text-white flex items-center justify-center text-[11px] font-bold shadow-xs border border-white/40">
                    2
                  </span>
                </div>

                {/* Título */}
                <h3 className="font-outfit font-extrabold text-[17px] text-[#0B1F3A] leading-[1.3] mb-[10px]">
                  Receba o acesso pela Wiapy
                </h3>

                {/* Descrição */}
                <p className="text-[14px] text-[#334155] leading-[1.6]">
                  Após a confirmação do pagamento, as orientações de acesso serão enviadas para o e-mail informado na compra.
                </p>
              </div>

              {/* ETAPA 3 */}
              <div className="p-[24px] rounded-[14px] bg-white border border-[#F6D365] shadow-[0_4px_12px_rgba(0,0,0,0.12)] min-h-[280px] flex flex-col items-center justify-start text-center h-full">
                {/* Quadrado Ícone + Número */}
                <div className="relative inline-flex items-center justify-center w-[46px] h-[46px] rounded-[12px] bg-[#FFFBEB] border border-[#F6D365] shrink-0 mb-[18px]">
                  <Download className="w-[24px] h-[24px] text-[#E98A00]" strokeWidth={1.8} />
                  <span className="absolute -top-1.5 -right-1.5 w-[20px] h-[20px] rounded-full bg-[#0B1F3A] text-white flex items-center justify-center text-[11px] font-bold shadow-xs border border-white/40">
                    3
                  </span>
                </div>

                {/* Título */}
                <h3 className="font-outfit font-extrabold text-[17px] text-[#0B1F3A] leading-[1.3] mb-[10px]">
                  Acesse e baixe os materiais
                </h3>

                {/* Descrição */}
                <p className="text-[14px] text-[#334155] leading-[1.6]">
                  Os arquivos ficarão disponíveis na plataforma Wiapy, organizados para você acessar, consultar e baixar quando precisar.
                </p>
              </div>

              {/* ETAPA 4 */}
              <div className="p-[24px] rounded-[14px] bg-white border border-[#F6D365] shadow-[0_4px_12px_rgba(0,0,0,0.12)] min-h-[280px] flex flex-col items-center justify-start text-center h-full">
                {/* Quadrado Ícone + Número */}
                <div className="relative inline-flex items-center justify-center w-[46px] h-[46px] rounded-[12px] bg-[#F0FDFA] border border-[#99F6E4] shrink-0 mb-[18px]">
                  <Smartphone className="w-[24px] h-[24px] text-[#00A859]" strokeWidth={1.8} />
                  <span className="absolute -top-1.5 -right-1.5 w-[20px] h-[20px] rounded-full bg-[#0B1F3A] text-white flex items-center justify-center text-[11px] font-bold shadow-xs border border-white/40">
                    4
                  </span>
                </div>

                {/* Título */}
                <h3 className="font-outfit font-extrabold text-[17px] text-[#0B1F3A] leading-[1.3] mb-[10px]">
                  Estude como preferir
                </h3>

                {/* Descrição */}
                <p className="text-[14px] text-[#334155] leading-[1.6]">
                  Consulte os materiais pelo celular, tablet ou computador. Se preferir, você também poderá baixar e imprimir os arquivos em PDF.
                </p>
              </div>

            </div>
          </div>

          {/* BOTÃO ABAIXO DOS CARDS */}
          <div className="mt-[36px] text-center">
            <button
              type="button"
              onClick={() => scrollToSection("oferta")}
              className="w-full max-w-[360px] min-h-[52px] px-6 py-3 rounded-[9px] bg-[#00A859] hover:bg-[#008C4A] text-white font-outfit font-extrabold text-[16px] uppercase tracking-wide transition-all shadow-[0_4px_12px_rgba(0,168,89,0.22)] cursor-pointer inline-flex items-center justify-center text-center leading-tight"
            >
              QUERO GARANTIR MEU ACESSO →
            </button>
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
