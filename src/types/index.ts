export type CategorySlug =
  | "economia"
  | "mercados"
  | "investimentos"
  | "financas-pessoais"
  | "criptomoedas"
  | "tecnologia";

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface Article {
  id: string;
  legacyId?: string;
  type?: "materia" | "noticia";
  sourceUrl?: string;
  slug: string;
  title: string;
  subtitle: string;
  category: CategorySlug | string;
  categoryName: string;
  author: Author;
  publishDate: string;
  updateDate: string;
  readTimeMinutes?: number;
  coverImage: string;
  coverAlt: string;
  content: string; // HTML/Formatted text
  isFeatured?: boolean;
  isMainHeadline?: boolean;
  isMostRead?: boolean;
  viewCount?: number;
  tags: string[];
  sources?: { name: string; url: string }[];
}

export interface AnalysisArticle extends Article {
  keyTakeaways: string[];
  editorNote?: string;
}

export interface LearningLesson {
  id: string;
  slug: string;
  title: string;
  durationMinutes: number;
  summary: string;
  content: string;
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  category: string;
  description: string;
  iconName: string;
  lessonCount: number;
  totalDuration: string;
  lessons: LearningLesson[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  type: string;
  level?: "Iniciante" | "Intermediário" | "Avançado";
  benefits?: string[];
  priceFormatted?: string;
  status?: "Disponível" | "Em breve";
  coverImage?: string;
  buyUrl?: string;
  problemSolved?: string;
  targetAudience?: string[];
  excludedAudience?: string[];
  modules?: { title: string; description: string }[];
  deliverables?: string[];
  faq?: { question: string; answer: string }[];
}

export interface MarketIndicator {
  id: string;
  symbol: string;
  name: string;
  value: string;
  changePercentage: number;
  changeAbsolute?: string;
  unit?: string;
  category: "macro" | "tradicional" | "cripto";
  lastUpdated: string;
  isSimulated: true;
}
