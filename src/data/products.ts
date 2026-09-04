import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "metodo-hdz-de-alocacao-e-macroeconomia",
    title: "Curso HDZ de Alocação de Ativos e Leitura Macroeconômica",
    shortDescription:
      "Treinamento prático para aprender a analisar o ciclo de juros, interpretar relatórios do Banco Central e estruturar uma carteira de investimentos resiliente.",
    type: "Curso",
    level: "Intermediário",
    benefits: [
      "Leitura analítica de cenários inflacionários e taxa Selic",
      "Metodologia para alocação percentual entre Renda Fixa e Renda Variável",
      "Modelos práticos de rebalanceamento periódico de carteira",
      "Acesso a videoaulas estruturadas e material de apoio em PDF",
    ],
    priceFormatted: "R$ 497,00",
    status: "Disponível",
    coverImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80",
    buyUrl: "#checkout-hotmart-draft",
    problemSolved:
      "Ajuda investidores que já possuem reserva de emergência, mas sentem-se inseguros sobre como montar uma estratégia completa de alocação de patrimônio diante de oscilações na economia brasileira.",
    targetAudience: [
      "Investidores que querem sair da dependência de recomendações genéricas de terceiros.",
      "Profissionais que buscam entender os fundamentos macroeconômicos por trás dos preços dos ativos.",
      "Pessoas que desejam estruturar um plano claro de investimentos para os próximos 5 a 10 anos.",
    ],
    excludedAudience: [
      "Pessoas procurando promessas de ganhos rápidos, sinais de trading ou enriquecimento acelerado.",
      "Investidores que ainda não organizaram suas contas pessoais e não possuem reserva de emergência mínima.",
    ],
    modules: [
      {
        title: "Módulo 1: Fundamentos da Macroeconomia Prática",
        description: "Entendendo o balanço de pagamentos, IPCA, Selic, câmbio e a atuação dos Bancos Centrais.",
      },
      {
        title: "Módulo 2: O Espectro da Renda Fixa",
        description: "Tesouro Direto, títulos de crédito privado, precificação e marcação a mercado explicados na prática.",
      },
      {
        title: "Módulo 3: Fundamentos de Renda Variável e FIIs",
        description: "Múltiplos de valuation, dividend yield sustentável e análise de relatórios de gestão imobiliária.",
      },
      {
        title: "Módulo 4: Montagem e Gestão do Portfólio",
        description: "Definição de regras de aporte, prazos de resgate e gestão contínua de risco sem ansiedade.",
      },
    ],
    deliverables: [
      "Acesso por 12 meses às videoaulas gravadas em alta definição",
      "Apostila de acompanhamento em PDF com resumos visuais",
      "Planilha complementar de acompanhamento de ativos",
      "Certificado de conclusão de curso livre",
    ],
    faq: [
      {
        question: "Como receberei o acesso após o pagamento?",
        answer: "Assim que a transação for confirmada pela plataforma de pagamento, você receberá os dados de acesso diretamente no seu e-mail cadastrado.",
      },
      {
        question: "O curso oferece recomendações de compra ou venda de ações?",
        answer: "Não. O curso é 100% educacional e focado na metodologia de análise e tomada de decisão autônoma. Não realizamos recomendação de investimentos.",
      },
      {
        question: "Por quanto tempo poderei assistir às aulas?",
        answer: "O acesso à área de membros é válido por 12 meses consecutivos a partir da data de confirmação do pedido.",
      },
    ],
  },
  {
    id: "prod-2",
    slug: "manual-da-autocustodia-e-seguranca-em-bitcoin",
    title: "Manual Prático de Autocustódia e Segurança em Bitcoin",
    shortDescription:
      "Guia passo a passo em formato e-book interativo focado na proteção de criptoativos, escolha de hardware wallets e prevenção de riscos digitais.",
    type: "E-book & Guia",
    level: "Iniciante",
    benefits: [
      "Passo a passo visual para configuração de hardware wallets",
      "Boas práticas para geração e guarda física de palavras-semente (seed phrases)",
      "Checklist de segurança contra ataques de phishing e malwares",
    ],
    priceFormatted: "R$ 97,00",
    status: "Disponível",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    buyUrl: "#checkout-hotmart-draft",
    problemSolved:
      "Resolve o medo e a falta de instrução técnica sobre como armazenar Bitcoin com segurança sem depender de custódia de terceiros ou corretoras.",
    targetAudience: [
      "Entusiastas que já possuem fração de Bitcoin em corretoras e desejam realizar a migração para carteira própria.",
      "Investidores preocupados com a proteção cibernética de seu patrimônio digital.",
    ],
    excludedAudience: [
      "Pessoas interessadas em memecoins, esquemas de arbitragem rápida ou day trade.",
    ],
    modules: [
      {
        title: "Capítulo 1: A Filosofia da Custódia Própria",
        description: "Entendendo por que 'não suas chaves, não suas moedas' é o mantra fundamental do Bitcoin.",
      },
      {
        title: "Capítulo 2: Tipos de Carteiras e Escolha do Hardware",
        description: "Diferenças entre Hot Wallets, Cold Wallets, Coldcard, Trezor e Ledger.",
      },
      {
        title: "Capítulo 3: Geração Segura da Seed Phrase",
        description: "Como criar seu backup em ambiente offline e opções de armazenamento em aço inoxidável.",
      },
    ],
    deliverables: [
      "E-book completo em formato PDF de alta resolução",
      "Checklist em formato de impressão para procedimento de backup",
    ],
    faq: [
      {
        question: "Qual o formato do material?",
        answer: "O guia é fornecido em formato digital PDF, otimizado para leitura em tablets, e-readers (Kindle) e computadores.",
      },
    ],
  },
  {
    id: "prod-3",
    slug: "planilha-de-gestao-orcamentaria-e-controle-patrimonial",
    title: "Planilha HDZ de Planejamento Orçamentário e Patrimônio",
    shortDescription:
      "Ferramenta pronta em Excel e Google Sheets para consolidação de despesas mensais, cálculo de rentabilidade real e acompanhamento de metas.",
    type: "Planilha & Ferramenta",
    level: "Iniciante",
    benefits: [
      "Consolidação automática de renda, gastos fixos e variáveis",
      "Gráficos intuitivos de distribuição percentual de despesas",
      "Acompanhamento da evolução do patrimônio líquido ao longo do tempo",
      "Cálculo de alocação de carteira comparado às metas estabelecidas",
    ],
    priceFormatted: "R$ 67,00",
    status: "Disponível",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
    buyUrl: "#checkout-hotmart-draft",
    problemSolved:
      "Elimina a bagunça de anotações soltas ou aplicativos pagos complexos, fornecendo uma visão centralizada do fluxo de caixa e dos investimentos.",
    targetAudience: [
      "Famílias ou indivíduos que desejam saber exatamente para onde vai seu orçamento mensal.",
      "Investidores que querem acompanhar a alocação de seus ativos sem depender de consolidadores pagos.",
    ],
    excludedAudience: [
      "Pessoas que procuram automação bancária via Open Finance diretamente na planilha sem digitação prévia.",
    ],
    modules: [
      {
        title: "Aba 1: Fluxo de Caixa Mensal",
        description: "Lançamento simplificado de receitas e despesas por categorias pré-definidas.",
      },
      {
        title: "Aba 2: Reserva e Investimentos",
        description: "Registro de ativos de Renda Fixa, Fundos, Ações e Cripto com cálculo automático de proporções.",
      },
      {
        title: "Aba 3: Meta de Longo Prazo",
        description: "Simulador de independência financeira baseado no aporte mensal e taxa de juro real estimada.",
      },
    ],
    deliverables: [
      "Arquivo compatível com Google Sheets e Microsoft Excel 2019+",
      "Vídeo tutorial de 15 minutos com instruções de preenchimento",
    ],
    faq: [
      {
        question: "Preciso pagar mensalidade para usar a planilha?",
        answer: "Não. A compra é de pagamento único, sem nenhuma mensalidade ou cobrança recorrente.",
      },
    ],
  },
  {
    id: "prod-4",
    slug: "guia-de-fiis-e-renda-passiva-imobiliaria",
    title: "Guia HDZ de Fundos Imobiliários e Geração de Renda",
    shortDescription:
      "Estudo detalhado sobre os critérios de seleção de FIIs de tijolo, papel e logística para montagem de carteira geradora de proventos.",
    type: "Material Especial",
    level: "Intermediário",
    benefits: [
      "Critérios para avaliação de vacância física e financeira",
      "Entendimento sobre contratos atípicos vs. típicos no setor logístico",
      "Metodologia para analisar a qualidade dos imóveis e histórico dos gestores",
    ],
    priceFormatted: "R$ 147,00",
    status: "Em breve",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    buyUrl: "#em-breve",
    problemSolved:
      "Ensina a avaliar a saúde financeira de um fundo imobiliário sem cair no engano de olhar apenas para o maior Dividend Yield recente.",
    targetAudience: [
      "Investidores focados na construção de renda passiva mensal através do mercado imobiliário negociado na bolsa.",
    ],
    excludedAudience: [
      "Especuladores buscando ganhos de capital em curtíssimo prazo.",
    ],
    modules: [
      {
        title: "Módulo 1: Anatomia de um Fundo Imobiliário",
        description: "Estrutura jurídica, regulamentação da CVM e tributação de rendimentos.",
      },
      {
        title: "Módulo 2: Leitura de Relatórios Gerenciais",
        description: "O que observar na demonstração de resultados (DRE) e no portfólio físico do fundo.",
      },
    ],
    deliverables: [
      "Acesso ao material assim que o lançamento oficial for efetuado",
    ],
    faq: [
      {
        question: "Quando o material estará disponível?",
        answer: "Este material está em fase final de revisão pela equipe editorial e será lançado em breve. Inscreva-se na nossa newsletter para ser notificado.",
      },
    ],
  },
];
