import { MetadataRoute } from "next";
import { ARTICLES } from "@/data/articles";
import { ANALYSES } from "@/data/analyses";
import { CATEGORY_LIST } from "@/data/categories";
import { LEARNING_PATHS } from "@/data/learning";
import { PRODUCTS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hdzfinance.com.br";

  const staticRoutes = [
    "",
    "/materias",
    "/educacional",
    "/educacional/recomendacoes-de-leitura",
    "/aprenda",
    "/mercados",
    "/sobre",
    "/busca",
    "/contato",
    "/diretrizes",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const articleRoutes = ARTICLES.map((art) => ({
    url: `${baseUrl}/noticias/${art.slug}`,
    lastModified: new Date(art.updateDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const materiaRoutes = ANALYSES.map((art) => ({
    url: `${baseUrl}/materias/${art.slug}`,
    lastModified: new Date(art.updateDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryRoutes = CATEGORY_LIST.map((cat) => ({
    url: `${baseUrl}/categoria/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const learnRoutes = LEARNING_PATHS.map((path) => ({
    url: `${baseUrl}/aprenda/${path.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const productRoutes = PRODUCTS.map((prod) => ({
    url: `${baseUrl}/produtos/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...materiaRoutes,
    ...categoryRoutes,
    ...learnRoutes,
    ...productRoutes,
  ];
}
