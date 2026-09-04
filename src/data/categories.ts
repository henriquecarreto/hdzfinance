import { Category, CategorySlug } from "@/types";

export const CATEGORIES: Record<CategorySlug, Category> = {
  economia: {
    id: "cat-1",
    slug: "economia",
    name: "Economia",
    description:
      "Notícias e leituras essenciais sobre políticas monetárias, inflação, PIB e conjuntura econômica nacional e global.",
  },
  mercados: {
    id: "cat-2",
    slug: "mercados",
    name: "Mercados",
    description:
      "Acompanhamento analítico da Bolsa de Valores, renda fixa, câmbio, fundos de investimento e movimentos de mercado.",
  },
  investimentos: {
    id: "cat-3",
    slug: "investimentos",
    name: "Investimentos",
    description:
      "Estratégias de alocação de ativos, análise de portfólios, renda fixa, ações e diversificação de patrimônio.",
  },
  "financas-pessoais": {
    id: "cat-4",
    slug: "financas-pessoais",
    name: "Finanças Pessoais",
    description:
      "Orientação prática para planejamento orçamentário, reserva de emergência, controle de dívidas e construção de riqueza.",
  },
  criptomoedas: {
    id: "cat-5",
    slug: "criptomoedas",
    name: "Criptomoedas",
    description:
      "Análise racional de Bitcoin, ativos digitais, tecnologia blockchain e segurança no mercado de criptoativos.",
  },
  tecnologia: {
    id: "cat-6",
    slug: "tecnologia",
    name: "Tecnologia",
    description:
      "Inovações no setor financeiro, inteligência artificial aplicada aos negócios, fintechs e transformação digital.",
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);
