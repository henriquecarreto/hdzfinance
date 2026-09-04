import Link from "next/link";
import Image from "next/image";
import { ARTICLES } from "@/data/articles";
import { ANALYSES } from "@/data/analyses";
import { Clock, Calendar, ArrowRight, Wallet, TrendingUp, Network, Compass } from "lucide-react";

export type FeaturedNews = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  publishedAt: string;
  readingTime: number;
  featuredPosition: 1 | 2 | 3;
  href: string;
};

export default function HomePage() {
  const sourceItems = ARTICLES.length > 0 ? ARTICLES.slice(0, 3).map((art, idx) => ({
    id: art.id,
    slug: art.slug,
    title: art.title,
    excerpt: art.subtitle,
    category: art.categoryName,
    coverImage: art.coverImage,
    publishedAt: art.publishDate,
    readingTime: art.readTimeMinutes,
    featuredPosition: (idx + 1) as 1 | 2 | 3,
    href: `/noticias/${art.slug}`,
  })) : ANALYSES.slice(0, 3).map((art, idx) => ({
    id: art.id,
    slug: art.slug,
    title: art.title,
    excerpt: art.subtitle,
    category: art.categoryName,
    coverImage: art.coverImage,
    publishedAt: art.publishDate,
    readingTime: art.readTimeMinutes,
    featuredPosition: (idx + 1) as 1 | 2 | 3,
    href: `/materias/${art.slug}`,
  }));

  const featuredNewsList: FeaturedNews[] = sourceItems;

  const mainNews = featuredNewsList.find((n) => n.featuredPosition === 1) || featuredNewsList[0];
  const sideNews = featuredNewsList.filter((n) => n.featuredPosition !== 1);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] selection:bg-[#147BFF] selection:text-white">
      {/* SEÇÃO HERO: EM DESTAQUE (3 NOTÍCIAS OU MATÉRIAS) */}
      <section className="relative isolate overflow-hidden pt-8 md:pt-12 pb-16 md:pb-24 border-b border-white/[0.08] bg-[#050607]">
        <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8 space-y-6">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#147BFF] bg-[#147BFF]/10 border border-[#147BFF]/30 px-3 py-1 rounded">
              EM DESTAQUE
            </span>
            <Link
              href={mainNews.href.startsWith("/materias") ? "/materias" : "/noticias"}
              className="text-xs font-semibold uppercase tracking-wider text-[#9BA5B3] hover:text-[#147BFF] transition-colors flex items-center gap-1 bg-[#0D1117] px-3 py-1 rounded border border-white/[0.08]"
            >
              <span>{mainNews.href.startsWith("/materias") ? "Ver todas as matérias" : "Ver todas as notícias"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Main Featured Card (65% width - 8 cols) */}
            <div className="lg:col-span-8">
              <Link
                href={mainNews.href}
                className="relative block w-full h-[420px] md:h-[500px] lg:h-[530px] rounded-[20px] overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#147BFF] shadow-2xl border border-white/[0.08]"
              >
                <Image
                  src={mainNews.coverImage}
                  alt={mainNews.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-[#050607]/60 to-transparent z-10" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 space-y-3.5">
                  <div className="flex items-center space-x-3 text-xs text-[#9BA5B3]">
                    <span className="px-3 py-1 rounded font-bold uppercase tracking-wider bg-[#147BFF] text-white text-[11px]">
                      {mainNews.category}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-[#147BFF]" />
                      {formatDate(mainNews.publishedAt)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1 text-[#147BFF]" />
                      {mainNews.readingTime} min de leitura
                    </span>
                  </div>

                  <h2 className="font-outfit font-extrabold text-2xl md:text-4xl lg:text-[44px] text-[#F5F7FA] group-hover:text-[#3A91FF] transition-colors leading-[1.15] tracking-tight">
                    {mainNews.title}
                  </h2>

                  <p className="text-sm md:text-base text-[#9BA5B3] line-clamp-2 max-w-3xl font-normal leading-relaxed">
                    {mainNews.excerpt}
                  </p>
                </div>
              </Link>
            </div>

            {/* 2 Secondary Cards Stacked (35% width - 4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              {sideNews.map((item, idx) => (
                <div key={item.id} className="space-y-4">
                  {idx > 0 && <div className="h-[1px] bg-white/[0.08] my-2" />}
                  <Link
                    href={item.href}
                    className="block space-y-3 group"
                  >
                    <div className="relative aspect-[16/9] w-full rounded-[18px] overflow-hidden bg-[#0D1117] border border-white/[0.08]">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-[11px] text-[#9BA5B3]">
                        <span className="font-semibold text-[#147BFF] uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span>•</span>
                        <span>{formatDate(item.publishedAt)}</span>
                        <span>•</span>
                        <span>{item.readingTime} min</span>
                      </div>

                      <h3 className="font-outfit font-bold text-lg md:text-xl text-[#F5F7FA] group-hover:text-[#3A91FF] transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* SEÇÃO 1: ALÉM DAS MANCHETES (COM IMAGEM DE FUNDO LOCALIZADA)               */}
      {/* ========================================================================= */}
      <section className="money-section py-20 md:py-28 border-b border-white/[0.08]">
        {/* Background Image: Fluxos da Economia Global (Desktop & Mobile image-set) */}
        <div className="money-section__background" aria-hidden="true" />

        {/* Localized Dark Protection Overlay */}
        <div className="money-section__overlay" aria-hidden="true" />

        <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          {/* Header Block */}
          <div className="max-w-[760px] space-y-5">
            <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-[#F59A18] block">
              ALÉM DAS MANCHETES
            </span>

            <h2 className="font-outfit font-extrabold text-[32px] md:text-[42px] lg:text-[46px] text-[#EEF4FA] tracking-tight leading-[1.18]">
              Seu dinheiro não fica parado. Ele ganha ou perde força todos os dias.
            </h2>

            <div className="section-copy space-y-3.5 text-[16px] md:text-[17px] text-[#EEF3F8] leading-[1.65] font-medium">
              <p>
                Inflação reduz o que ele compra. Juros mudam o custo do tempo. A tecnologia cria novas formas de armazenar e transferir valor.
              </p>
              <p>
                E o Bitcoin colocou uma pergunta no centro do debate financeiro: quem deve controlar as regras do dinheiro?
              </p>
              <p>
                Compreender essas forças ajuda a enxergar além dos preços e perceber mudanças que podem chegar ao seu bolso antes mesmo de aparecerem nas manchetes.
              </p>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="market-card editorial-card p-6 md:p-8 flex flex-col justify-between space-y-4 cursor-default group">
              <div className="space-y-4">
                <div className="w-[46px] h-[46px] rounded-xl bg-[#10151C] border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18] shadow-inner group-hover:border-[#F59A18]/60 transition-colors">
                  <Wallet className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-outfit font-bold text-[19px] md:text-[20px] text-[#EEF4FA] leading-snug">
                  A inflação age em silêncio
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  Quando os preços sobem, a mesma quantia compra menos. A perda pode parecer pequena no início, mas seus efeitos se acumulam com o tempo.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="market-card editorial-card p-6 md:p-8 flex flex-col justify-between space-y-4 cursor-default group">
              <div className="space-y-4">
                <div className="w-[46px] h-[46px] rounded-xl bg-[#10151C] border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18] shadow-inner group-hover:border-[#F59A18]/60 transition-colors">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-outfit font-bold text-[19px] md:text-[20px] text-[#EEF4FA] leading-snug">
                  Os juros definem o preço do tempo
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  Eles alteram o custo do crédito, o retorno da renda fixa e o valor que empresas, governos e investidores atribuem ao futuro.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="market-card editorial-card p-6 md:p-8 flex flex-col justify-between space-y-4 cursor-default group">
              <div className="space-y-4">
                <div className="w-[46px] h-[46px] rounded-xl bg-[#10151C] border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18] shadow-inner group-hover:border-[#F59A18]/60 transition-colors">
                  <TrendingUp className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-outfit font-bold text-[19px] md:text-[20px] text-[#EEF4FA] leading-snug">
                  O mercado negocia expectativas
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  Os preços reagem hoje ao que milhões de pessoas acreditam que poderá acontecer amanhã.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="market-card editorial-card p-6 md:p-8 flex flex-col justify-between space-y-4 cursor-default group">
              <div className="space-y-4">
                <div className="w-[46px] h-[46px] rounded-xl bg-[#10151C] border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18] shadow-inner group-hover:border-[#F59A18]/60 transition-colors">
                  <Network className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-outfit font-bold text-[19px] md:text-[20px] text-[#EEF4FA] leading-snug">
                  A tecnologia redefine o valor
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  Novas redes, ativos digitais e meios de pagamento estão transformando a forma como o dinheiro circula pelo mundo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 2: O PONTO DE PARTIDA (SEM IMAGEM — PULADO PARA ALTERNÂNCIA)        */}
      {/* ========================================================================= */}
      <section className="relative isolate overflow-hidden py-20 md:py-28 border-b border-white/[0.08] bg-[#080A0D]">
        <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          {/* Header Block */}
          <div className="max-w-[760px] space-y-5">
            <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-[#1677FF] block">
              O PONTO DE PARTIDA
            </span>

            <h2 className="font-outfit font-extrabold text-[32px] md:text-[42px] lg:text-[46px] text-[#EEF4FA] tracking-tight leading-[1.18]">
              Para entender o Bitcoin, comece pelo problema que ele tentou resolver.
            </h2>

            <div className="space-y-3.5 text-[16px] md:text-[17px] text-[#D5DDE6] leading-[1.65] font-normal">
              <p>
                Bitcoin não surgiu apenas para ser negociado. Ele nasceu de uma discussão muito maior sobre confiança, emissão de moeda, escassez e controle financeiro.
              </p>
              <p>
                Antes de observar sua cotação, é preciso entender o ambiente que tornou sua criação possível. Inflação, crises bancárias, expansão do crédito e evolução tecnológica fazem parte dessa história.
              </p>
            </div>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="market-card p-7 md:p-8 flex flex-col justify-between space-y-5 cursor-default">
              <div className="space-y-3.5">
                <span className="inline-block px-3 py-1 rounded-md bg-[#1677FF]/10 text-[#1677FF] border border-[#1677FF]/30 text-[11px] font-bold uppercase tracking-wider">
                  PERGUNTA 01
                </span>
                <h3 className="font-outfit font-bold text-[20px] md:text-[21px] text-[#EEF4FA] leading-snug">
                  Por que o dinheiro perde poder de compra?
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  A resposta passa pela relação entre moeda, produção, crédito, gastos e quantidade de dinheiro em circulação.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="market-card p-7 md:p-8 flex flex-col justify-between space-y-5 cursor-default">
              <div className="space-y-3.5">
                <span className="inline-block px-3 py-1 rounded-md bg-[#1677FF]/10 text-[#1677FF] border border-[#1677FF]/30 text-[11px] font-bold uppercase tracking-wider">
                  PERGUNTA 02
                </span>
                <h3 className="font-outfit font-bold text-[20px] md:text-[21px] text-[#EEF4FA] leading-snug">
                  Quem define as regras do sistema financeiro?
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  Governos, bancos centrais, instituições e mercados influenciam como o dinheiro é criado, movimentado e precificado.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="market-card p-7 md:p-8 flex flex-col justify-between space-y-5 cursor-default">
              <div className="space-y-3.5">
                <span className="inline-block px-3 py-1 rounded-md bg-[#1677FF]/10 text-[#1677FF] border border-[#1677FF]/30 text-[11px] font-bold uppercase tracking-wider">
                  PERGUNTA 03
                </span>
                <h3 className="font-outfit font-bold text-[20px] md:text-[21px] text-[#EEF4FA] leading-snug">
                  O que tornou possível uma moeda digital escassa?
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  Criptografia, redes distribuídas e regras verificáveis permitiram criar uma forma de valor que não depende de um controlador central.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 3: BITCOIN ALÉM DO PREÇO (ESCASSEZ DIGITAL INSTITUCIONAL)            */}
      {/* ========================================================================= */}
      <section className="bitcoin-section py-20 md:py-28 border-b border-white/[0.08]">
        {/* Background Image: Escassez Digital Institucional (Desktop & Mobile image-set) */}
        <div className="bitcoin-section__background" aria-hidden="true" />

        {/* Localized Dark Protection Overlay */}
        <div className="bitcoin-section__overlay" aria-hidden="true" />

        <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          {/* Header Block */}
          <div className="max-w-[760px] space-y-5">
            <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-[#F59A18] block">
              BITCOIN ALÉM DO PREÇO
            </span>

            <h2 className="font-outfit font-extrabold text-[32px] md:text-[42px] lg:text-[46px] text-[#EEF4FA] tracking-tight leading-[1.18]">
              A cotação muda a cada instante. As regras da rede permanecem verificáveis.
            </h2>

            <div className="section-copy space-y-3.5 text-[16px] md:text-[17px] text-[#EEF3F8] leading-[1.65] font-medium">
              <p>
                Por trás de cada movimento de preço existe uma rede global que funciona continuamente, registra transações e segue uma política de emissão conhecida.
              </p>
              <p>
                Essa estrutura não elimina riscos e não garante valorização. Mas apresenta uma nova maneira de pensar sobre escassez, propriedade, confiança e transferência de valor.
              </p>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="market-card editorial-card p-6 md:p-8 flex flex-col justify-between space-y-4 cursor-default">
              <div className="space-y-3.5">
                <span className="font-outfit font-extrabold text-[24px] card-number block">
                  01
                </span>
                <h3 className="font-outfit font-bold text-[19px] md:text-[20px] text-[#EEF4FA] leading-snug">
                  Escassez programada
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  O protocolo estabelece um limite de 21 milhões de bitcoins e uma emissão que diminui ao longo do tempo.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="market-card editorial-card p-6 md:p-8 flex flex-col justify-between space-y-4 cursor-default">
              <div className="space-y-3.5">
                <span className="font-outfit font-extrabold text-[24px] card-number block">
                  02
                </span>
                <h3 className="font-outfit font-bold text-[19px] md:text-[20px] text-[#EEF4FA] leading-snug">
                  Rede descentralizada
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  Participantes espalhados pelo mundo verificam as mesmas regras sem depender de uma única instituição.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="market-card editorial-card p-6 md:p-8 flex flex-col justify-between space-y-4 cursor-default">
              <div className="space-y-3.5">
                <span className="font-outfit font-extrabold text-[24px] card-number block">
                  03
                </span>
                <h3 className="font-outfit font-bold text-[19px] md:text-[20px] text-[#EEF4FA] leading-snug">
                  Propriedade digital
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  A tecnologia permite controlar e transferir valor por meio de chaves criptográficas.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="market-card editorial-card p-6 md:p-8 flex flex-col justify-between space-y-4 cursor-default">
              <div className="space-y-3.5">
                <span className="font-outfit font-extrabold text-[24px] card-number block">
                  04
                </span>
                <h3 className="font-outfit font-bold text-[19px] md:text-[20px] text-[#EEF4FA] leading-snug">
                  Potencial acompanhado de risco
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  Volatilidade, segurança e conhecimento são essenciais para compreender o Bitcoin com responsabilidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 4: A PROPOSTA DA HDZ FINANCE (SEM IMAGEM — PULADO PARA ALTERNÂNCIA) */}
      {/* ========================================================================= */}
      <section className="relative isolate overflow-hidden py-20 md:py-28 border-b border-white/[0.08] bg-[#050607]">
        <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8 space-y-12">
          {/* Header Block */}
          <div className="max-w-[760px] space-y-5">
            <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-[#1677FF] block">
              DA INFORMAÇÃO À COMPREENSÃO
            </span>

            <h2 className="font-outfit font-extrabold text-[32px] md:text-[42px] lg:text-[46px] text-[#EEF4FA] tracking-tight leading-[1.18]">
              Informação existe em excesso. Compreensão continua rara.
            </h2>

            <div className="space-y-3.5 text-[16px] md:text-[17px] text-[#D5DDE6] leading-[1.65] font-normal">
              <p>
                Todos os dias surgem novos números, opiniões e previsões. O verdadeiro desafio é separar acontecimentos relevantes do ruído que disputa sua atenção.
              </p>
              <p>
                A HDZ Finance conecta economia, mercados, Bitcoin e tecnologia para explicar não apenas o que aconteceu, mas por que isso importa.
              </p>
            </div>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="market-card p-7 md:p-8 flex flex-col justify-between space-y-5 cursor-default">
              <div className="space-y-3.5">
                <span className="inline-block px-3 py-1 rounded-md bg-[#1677FF]/10 text-[#1677FF] border border-[#1677FF]/30 text-[11px] font-bold uppercase tracking-wider">
                  ETAPA 01
                </span>
                <h3 className="font-outfit font-bold text-[20px] md:text-[21px] text-[#EEF4FA] leading-snug">
                  Entender a causa
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  Começar pelo fato e identificar as forças que provocaram o movimento.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="market-card p-7 md:p-8 flex flex-col justify-between space-y-5 cursor-default">
              <div className="space-y-3.5">
                <span className="inline-block px-3 py-1 rounded-md bg-[#1677FF]/10 text-[#1677FF] border border-[#1677FF]/30 text-[11px] font-bold uppercase tracking-wider">
                  ETAPA 02
                </span>
                <h3 className="font-outfit font-bold text-[20px] md:text-[21px] text-[#EEF4FA] leading-snug">
                  Conectar os efeitos
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  Relacionar juros, inflação, liquidez, tecnologia e comportamento dos mercados.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="market-card p-7 md:p-8 flex flex-col justify-between space-y-5 cursor-default">
              <div className="space-y-3.5">
                <span className="inline-block px-3 py-1 rounded-md bg-[#1677FF]/10 text-[#1677FF] border border-[#1677FF]/30 text-[11px] font-bold uppercase tracking-wider">
                  ETAPA 03
                </span>
                <h3 className="font-outfit font-bold text-[20px] md:text-[21px] text-[#EEF4FA] leading-snug">
                  Construir entendimento
                </h3>
                <p className="text-[15px] text-[#D5DDE6] leading-[1.6]">
                  Transformar fatos isolados em conhecimento útil para formar uma opinião própria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 5: CHAMADA FINAL (COM PROTEÇÃO RADIAL LOCALIZADA DE CONTRASTE)       */}
      {/* ========================================================================= */}
      <section className="final-cta-section py-24 md:py-32">
        {/* Background Image: Full visibility with localized central radial dark overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/backgrounds/hdz-final-money-evolution.jpg"
            alt="Evolução do dinheiro das moedas ao sistema digital global"
            fill
            aria-hidden="true"
            className="select-none object-cover object-center brightness-105 filter"
            sizes="100vw"
            priority
          />
        </div>

        <div className="final-cta-content max-w-[1100px] mx-auto px-6 md:px-8 text-center space-y-8">
          <span className="final-cta-eyebrow block">
            HDZ FINANCE
          </span>

          <h2 className="font-outfit font-extrabold text-[30px] sm:text-[38px] md:text-[46px] lg:text-[50px] max-w-[850px] mx-auto tracking-tight leading-[1.18]">
            Você não precisa prever o próximo movimento. Precisa entender as forças que podem provocá-lo.
          </h2>

          <div className="space-y-3.5 max-w-[740px] mx-auto">
            <p>
              Acompanhe notícias, matérias e conteúdos educacionais sobre economia, mercados, Bitcoin, dinheiro e tecnologia.
            </p>
            <p>
              Comece pelo assunto que mais desperta sua curiosidade e descubra como diferentes acontecimentos estão conectados.
            </p>
          </div>

          {/* 3 Action Buttons with refined hierarchy */}
          <div className="final-cta-actions">
            <Link
              href="/educacional/cursos"
              className="training-cta"
            >
              <span>Descobrir o treinamento</span>
              <Compass className="h-4 w-4 text-[#090B0E] shrink-0" aria-hidden="true" />
            </Link>

            <Link
              href="/noticias"
              className="news-cta"
            >
              <span>Acompanhar as notícias</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#F5F8FC] shrink-0" aria-hidden="true" />
            </Link>

            <Link
              href="/materias"
              className="articles-cta"
            >
              <span>Explorar matérias</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#F5F8FC] shrink-0" aria-hidden="true" />
            </Link>
          </div>

          <p className="final-cta-tagline pt-6">
            Informação para compreender. Conhecimento para decidir.
          </p>
        </div>
      </section>
    </div>
  );
}
