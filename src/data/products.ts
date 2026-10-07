import { Product } from "@/types";

export interface EducationalProduct {
  id: string;
  category: string;
  title: string;
  price: number | null;
  image: string | null;
  summary: string | null;
  salesPagePath: string;
  salesPageReady: boolean;
  checkoutUrl: string | null;
}

export const EDUCATIONAL_PRODUCTS: EducationalProduct[] = [
  {
    id: "reading-recommendations",
    category: "Biblioteca HDZ",
    title: "Recomendações de Leitura",
    price: null,
    image: "/images/products/reading-recommendations-cover.jpg",
    summary: null,
    salesPagePath: "/educacional/recomendacoes-de-leitura",
    salesPageReady: true,
    checkoutUrl: null,
  },
  {
    id: "money-bitcoin-course",
    category: "Curso",
    title: "Fundamentos do Dinheiro, Bitcoin e Criptomoedas",
    price: null,
    image: "/images/products/money-bitcoin-course-cover.jpg",
    summary: null,
    salesPagePath: "/educacional/fundamentos-do-dinheiro-bitcoin-criptomoedas",
    salesPageReady: true,
    checkoutUrl: null,
  },
  {
    id: "ebook-bundle",
    category: "Combo de E-books",
    title: "Combo com 2 E-books",
    price: null,
    image: null,
    summary: null,
    salesPagePath: "/educacional/combo-ebooks",
    salesPageReady: true,
    checkoutUrl: null,
  },
];

// Legacy PRODUCTS compatibility export for search/sitemap references
export const PRODUCTS: Product[] = EDUCATIONAL_PRODUCTS.map((ep) => ({
  id: ep.id,
  slug: ep.salesPagePath.replace("/educacional/", ""),
  title: ep.title,
  shortDescription: ep.title,
  type: ep.category,
  level: "Iniciante",
  benefits: [],
  priceFormatted: ep.price !== null ? `R$ ${ep.price.toFixed(2).replace(".", ",")}` : "Página em preparação",
  status: ep.salesPageReady ? "Disponível" : "Em breve",
  coverImage: "/images/materias/ciclos-de-mercado/cover.webp",
  buyUrl: ep.checkoutUrl || ep.salesPagePath,
}));
