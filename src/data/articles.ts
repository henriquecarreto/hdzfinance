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

export const ARTICLES: Article[] = [];
