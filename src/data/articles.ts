import { Article, Author } from "@/types";

export const AUTHORS: Record<string, Author> = {
  editoria: {
    id: "auth-1",
    name: "Produção HDZ Finance",
    role: "Análise Econômica & Mercados",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Jornalistas e analistas dedicados ao monitoramento rigoroso do mercado financeiro e indicadores macroeconômicos.",
  },
  lucas: {
    id: "auth-2",
    name: "Lucas Andrade",
    role: "Estrategista de Renda Fixa",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Especialista em títulos públicos, política monetária do Banco Central e alocação de ativos defensivos.",
  },
  mariana: {
    id: "auth-3",
    name: "Mariana Costa",
    role: "Analista de Criptoativos e Tecnologia",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bio: "Focada em arquitetura blockchain, protocolo Bitcoin e a interseção entre finanças tradicionais e descentralizadas.",
  },
};

export const ARTICLES: Article[] = [
  {
    id: "noticia-conta-de-luz-sobe-798-e-leva-inflacao-de-setembro-a-082",
    type: "noticia",
    slug: "conta-de-luz-sobe-798-e-leva-inflacao-de-setembro-a-082",
    title: "Conta de luz sobe 7,98% e leva inflação de setembro a 0,82%",
    subtitle:
      "O reajuste na bandeira tarifária de energia elétrica pressionou o índice de preços ao consumidor, superando as projeções do mercado e renovando as preocupações com a política monetária.",
    category: "economia",
    categoryName: "Economia",
    author: AUTHORS.editoria,
    publishDate: "2026-10-11T09:00:00.000Z",
    updateDate: "2026-10-11T09:00:00.000Z",
    readTimeMinutes: 3,
    coverImage:
      "/images/materias/inflacao-sob-a-otica-austriaca-expansao-monetaria-ciclos-economicos-e-anos-eleitorais-no-brasil/cover.png",
    coverAlt: "Conta de luz sobe 7,98% e leva inflação de setembro a 0,82%",
    isFeatured: true,
    isMostRead: true,
    tags: ["inflacao", "energia-eletrica", "ipca", "economia", "copom"],
    sources: [
      {
        name: "IBGE - Índice Nacional de Preços ao Consumidor Amplo (IPCA)",
        url: "https://www.ibge.gov.br",
      },
      {
        name: "ANEEL - Agência Nacional de Energia Elétrica",
        url: "https://www.gov.br/aneel",
      },
    ],
    content: `
      <p>O Índice Nacional de Preços ao Consumidor Amplo (IPCA) de setembro acelerou para 0,82%, impulsionado diretamente pelo aumento de 7,98% nas tarifas de energia elétrica residencial após o acionamento da bandeira tarifária vermelha patamar 2 pela Agência Nacional de Energia Elétrica (Aneel). O resultado veio significativamente acima da mediana das projeções do mercado financeiro, que apontava para uma variação entre 0,45% e 0,55% para o período.</p>

      <h2>Impacto Direto da Energia Elétrica na Cesta de Consumo</h2>
      <p>A energia elétrica residencial é um dos itens de maior peso na composição do IPCA, correspondendo a cerca de 4% de todo o orçamento médio das famílias brasileiras. Com a vigência da bandeira tarifária mais severa em razão do baixo nível dos reservatórios hidrelétricos e do acionamento continuado de usinas termelétricas — cujo custo de geração é substancialmente superior —, o impacto repassado aos consumidores finais foi imediato e generalizado.</p>

      <p>De acordo com os dados oficiais divulgados pelo Instituto Brasileiro de Geografia e Estatística (IBGE), o grupo Habitação registrou a maior alta entre os nove grupos pesquisados, acumulando uma elevação de 2,41% no mês. Além da energia, outros serviços básicos e despesas de moradia apresentaram reajustes contratuais que somaram pressão ao custo de vida das principais regiões metropolitanas do país.</p>

      <h2>Efeito em Cadeia nos Custos Industriais e de Serviços</h2>
      <p>Economistas e analistas de mercado destacam que o encarecimento da eletricidade não afeta exclusivamente as residências. A indústria de transformação e o setor de serviços, que dependem diretamente de energia elétrica como insumo produtivo essencial, tendem a repassar gradualmente os custos operacionais adicionais para os preços finais de produtos e serviços ao longo dos próximos trimestres.</p>

      <blockquote>
        "A energia elétrica funciona como um indexador oculto na economia real: quando o insumo básico encarece, o custo de estocagem, refrigeração no varejo e manufatura inevitavelmente se espalha para os núcleos de inflação de serviços e alimentos."
      </blockquote>

      <h2>Desafios para o Banco Central e a Taxa Selic</h2>
      <p>O repique inflacionário ocorre em um momento sensível para o Comitê de Política Monetária (Copom). Com a inflação acumulada em 12 meses voltando a se aproximar do teto da meta estabelecida pelo Conselho Monetário Nacional (CMN), as expectativas para a taxa básica de juros (Selic) foram revisadas para cima no mais recente Boletim Focus.</p>

      <p>A persistência de choques climáticos e custos de infraestrutura reforça a necessidade de vigilância macroeconômica, mantendo o ambiente de juros reais elevados por um período mais prolongado e exigindo disciplina fiscal rigorosa para conter a desancoragem das projeções de longo prazo.</p>
    `,
  },
];

