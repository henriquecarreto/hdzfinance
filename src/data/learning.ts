import { LearningPath } from "@/types";

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "path-1",
    slug: "comece-por-aqui",
    title: "Comece por Aqui: Mentalidade e Primeiros Passos Financeiros",
    level: "Iniciante",
    category: "Finanças Pessoais",
    description:
      "Construa uma visão estruturada sobre a função do dinheiro, planejamento orçamentário e proteção patrimonial básica.",
    iconName: "Compass",
    lessonCount: 4,
    totalDuration: "40 min",
    lessons: [
      {
        id: "les-101",
        slug: "o-dinheiro-mudou-entendendo-o-sistema-moderno",
        title: "O Dinheiro Mudou: Entendendo a Evolução do Poder de Compra",
        durationMinutes: 10,
        summary: "Como a inflação, os meios digitais e a tecnologia transformaram a forma como lidamos com valor.",
        content: `
          <p>O conceito de dinheiro evoluiu drasticamente nas últimas décadas. Entender como a expansão da moeda afeta o poder de compra é o primeiro passo para não perder riqueza ao longo do tempo.</p>
          <h3>O que é inflação na prática?</h3>
          <p>Inflação não é apenas o aumento de preços nas prateleiras, mas sim a perda do valor de compra da própria moeda fiduciária. Se o seu dinheiro fica parado em conta corrente sem render nada, ele perde valor todos os dias.</p>
        `,
      },
      {
        id: "les-102",
        slug: "diagnostico-de-entradas-e-saidas",
        title: "Diagnóstico Orçamentário: Mapeando Fluxo de Caixa",
        durationMinutes: 10,
        summary: "Passo a passo para mapear cada centavo gasto sem complexidade desnecessária.",
        content: `
          <p>Você não precisa de planilhas complexas com 50 abas. O fundamental é categorizar sua renda em custos fixos essenciais, metas de futuro e consumo consciente.</p>
        `,
      },
      {
        id: "les-103",
        slug: "reserva-de-emergencia-passo-a-passo",
        title: "Construindo sua Reserva de Liquidez",
        durationMinutes: 10,
        summary: "Quanto guardar, onde aplicar e quando utilizar a sua reserva de emergência.",
        content: `
          <p>A reserva de emergência deve cobrir de 3 a 6 meses do seu custo de vida essencial e estar aplicada exclusivamente em instrumentos com resgate imediato (D+0) e liquidez garantida.</p>
        `,
      },
      {
        id: "les-104",
        slug: "armadilhas-das-dividas-de-juros-altos",
        title: "Evitando o Superendividamento e Juros Abusivos",
        durationMinutes: 10,
        summary: "Como estancar o efeito bola de neve do cartão de crédito e cheque especial.",
        content: `
          <p>Antes de pensar em investimentos arriscados, quite todas as dívidas que cobram juros compostos elevados. Nenhum investimento tradicional supera a taxa cobrada pelo rotativo do cartão.</p>
        `,
      },
    ],
  },
  {
    id: "path-2",
    slug: "organizacao-financeira",
    title: "Organização Financeira e Controle de Gastos",
    level: "Iniciante",
    category: "Finanças Pessoais",
    description:
      "Aprenda métodos comprovados para definir prioridades, planejar metas de curto e longo prazo e manter a disciplina.",
    iconName: "PieChart",
    lessonCount: 3,
    totalDuration: "35 min",
    lessons: [
      {
        id: "les-201",
        slug: "metodo-50-30-20-explicado",
        title: "O Método 50/30/20 Aplicado à Realidade Brasileira",
        durationMinutes: 12,
        summary: "Dividindo seu orçamento em Necessidades (50%), Desejos (30%) e Futuro (20%).",
        content: `<p>Aprenda a flexibilizar proporções de acordo com a sua fase de vida e prioridades familiares.</p>`,
      },
      {
        id: "les-202",
        slug: "automatizacao-de-investimentos",
        title: "Automatizando a Poupança de Longo Prazo",
        durationMinutes: 11,
        summary: "Pague-se primeiro: como separar o aporte assim que a renda entra na conta.",
        content: `<p>A disciplina automatizada remove a dependência da força de vontade no final do mês.</p>`,
      },
      {
        id: "les-203",
        slug: "definicao-de-metas-smart",
        title: "Definindo Metas Financeiras Claras (SMART)",
        durationMinutes: 12,
        summary: "Como transformar sonhos abstratos em números, prazos e planos de aporte mensais.",
        content: `<p>Transforme desejos gerais em objetivos mensuráveis e com prazos definidos.</p>`,
      },
    ],
  },
  {
    id: "path-3",
    slug: "como-funcionam-os-juros",
    title: "Como Funcionam os Juros Compostos e a Macroeconomia",
    level: "Intermediário",
    category: "Economia",
    description:
      "Compreenda a matemática dos juros ao seu favor, a taxa Selic, inflação e a mecânica das taxas na economia real.",
    iconName: "TrendingUp",
    lessonCount: 3,
    totalDuration: "45 min",
    lessons: [
      {
        id: "les-301",
        slug: "a-formula-dos-juros-compostos",
        title: "A Matemática do Tempo: O Poder dos Juros Compostos",
        durationMinutes: 15,
        summary: "Por que a taxa de aporte constante e a longevidade dos aportes multiplicam o patrimônio.",
        content: `<p>Entenda o efeito acumulativo do juro sobre juro no horizonte de décadas.</p>`,
      },
      {
        id: "les-302",
        slug: "entendendo-a-taxa-selic-e-copom",
        title: "Selic, CDI e COPOM: Como a Taxa Mãe Afeta Tudo",
        durationMinutes: 15,
        summary: "O mecanismo de transmissão da política monetária nos juros bancários e no consumo.",
        content: `<p>Descubra como o Banco Central utiliza a taxa Selic para balizar o custo do dinheiro no país.</p>`,
      },
      {
        id: "les-303",
        slug: "taxa-real-vs-taxa-nominal",
        title: "Rentabilidade Real vs. Nominal: A Ilusão dos Números",
        durationMinutes: 15,
        summary: "Como descontar o IPCA e os impostos para saber quanto seu dinheiro realmente rendeu.",
        content: `<p>Ganhar 12% ao ano com inflação de 8% e imposto de 15% resulta em um ganho real muito diferente da taxa estampada.</p>`,
      },
    ],
  },
  {
    id: "path-4",
    slug: "fundamentos-de-investimentos",
    title: "Fundamentos de Investimentos: Renda Fixa e Renda Variável",
    level: "Intermediário",
    category: "Investimentos",
    description:
      "Conheça as classes de ativos, perfis de risco, liquidez, custódia e as regras de alocação de carteira.",
    iconName: "Layers",
    lessonCount: 4,
    totalDuration: "50 min",
    lessons: [
      {
        id: "les-401",
        slug: "o-triangulo-dos-investimentos",
        title: "O Triângulo dos Investimentos: Rentabilidade, Liquidez e Segurança",
        durationMinutes: 12,
        summary: "Entenda por que não existe um investimento perfeito que tenha o máximo nos três pilares.",
        content: `<p>Entender a relação de compromisso entre esses 3 fatores protege o investidor de golpistas.</p>`,
      },
      {
        id: "les-402",
        slug: "tesouro-direto-cdb-lci-lca",
        title: "Mapa Completo da Renda Fixa Brasileira",
        durationMinutes: 13,
        summary: "Comparativo entre títulos públicos, bancários com FGC e crédito privado.",
        content: `<p>Saiba qual título escolher para cada prazo de aplicação.</p>`,
      },
      {
        id: "les-403",
        slug: "acoes-e-fundos-imobiliarios-introducao",
        title: "Primeiros Passos na Renda Variável",
        durationMinutes: 12,
        summary: "Tornando-se sócio de boas empresas e cotista de grandes ativos imobiliários.",
        content: `<p>Como pensar como proprietário e sócio, focando em dividendos e valorização de longo prazo.</p>`,
      },
      {
        id: "les-404",
        slug: "diversificacao-e-perfil-de-investidor",
        title: "Descobrindo seu Perfil de Risco e Construindo sua Carteira",
        durationMinutes: 13,
        summary: "Alocação tática de acordo com sua tolerância à volatilidade e horizonte de tempo.",
        content: `<p>Crie sua primeira alocação percentual alinhada aos seus objetivos reais.</p>`,
      },
    ],
  },
  {
    id: "path-5",
    slug: "bitcoin-para-iniciantes",
    title: "Bitcoin para Iniciantes: Conceitos, Tecnologia e Custódia",
    level: "Iniciante",
    category: "Bitcoin",
    description:
      "Aprenda o que é o Bitcoin sem sensacionalismo: funcionamento da blockchain, halving e armazenamento seguro.",
    iconName: "ShieldCheck",
    lessonCount: 3,
    totalDuration: "40 min",
    lessons: [
      {
        id: "les-501",
        slug: "o-que-e-bitcoin-e-por-que-ele-foi-criado",
        title: "O Que É o Bitcoin e Qual Problema Ele Se Propõe a Resolver",
        durationMinutes: 12,
        summary: "A origem da moeda digital peer-to-peer em meio à crise financeira de 2008.",
        content: `<p>Entenda o contexto histórico da criação do protocolo Bitcoin por Satoshi Nakamoto.</p>`,
      },
      {
        id: "les-502",
        slug: "como-funciona-a-blockchain-e-a-mineracao",
        title: "Arquitetura Blockchain, Nós e Mineração Explicados",
        durationMinutes: 14,
        summary: "O consenso de prova de trabalho (Proof of Work) e a imutabilidade do registro público.",
        content: `<p>Saiba como milhares de computadores independentes mantêm a rede segura sem autoridade central.</p>`,
      },
      {
        id: "les-503",
        slug: "principios-de-autocustodia-e-seguranca",
        title: "Chaves Privadas, Wallets e Autocustódia Responsável",
        durationMinutes: 14,
        summary: "Não suas chaves, não suas moedas: como guardar seu patrimônio digital com segurança total.",
        content: `<p>Conheça a diferença entre deixar moedas em corretoras e utilizar carteiras frias (hardware wallets).</p>`,
      },
    ],
  },
  {
    id: "path-6",
    slug: "riscos-do-mercado-e-seguranca-digital",
    title: "Riscos do Mercado e Segurança Digital no Sistema Financeiro",
    level: "Avançado",
    category: "Segurança Digital",
    description:
      "Como se proteger de fraudes digitais, esquemas de pirâmide, promessas irreais e vulnerabilidades de custódia.",
    iconName: "AlertTriangle",
    lessonCount: 3,
    totalDuration: "35 min",
    lessons: [
      {
        id: "les-601",
        slug: "como-identificar-golpes-e-promessas-falsas",
        title: "Identificando Esquemas de Pirâmide e Promessas de Lucro Fácil",
        durationMinutes: 10,
        summary: "Sinais de alerta: rendimento fixo diário garantido, recrutamento obrigatório e falta de registro regulatório.",
        content: `<p>A regra de ouro: no mercado financeiro, nenhum retorno acima da taxa livre de risco pode ser 'garantido'.</p>`,
      },
      {
        id: "les-602",
        slug: "seguranca-em-aplicativos-bancarios-e-corretoras",
        title: "Proteção de Aplicativos Bancários, Autenticação de 2 Fatores e Phishing",
        durationMinutes: 12,
        summary: "Boas práticas essenciais de higiene digital para proteger suas senhas e dispositivos.",
        content: `<p>Aprenda a utilizar chaves de segurança físicas, aplicativos autenticadores e senhas fortes descartáveis.</p>`,
      },
      {
        id: "les-603",
        slug: "gerenciamento-de-risco-e-tamanho-de-posicao",
        title: "Gerenciamento de Risco e Tamanho Máximo de Posição",
        durationMinutes: 13,
        summary: "A regra de sobrevivência do investidor: nunca alocar capital que você não possa dar-se ao luxo de ver oscilar.",
        content: `<p>Como definir limites máximos de perda suportável e diversificação defensiva.</p>`,
      },
    ],
  },
];
