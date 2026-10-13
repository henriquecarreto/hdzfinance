import { Article, AnalysisArticle } from "@/types";
import { ARTICLES, AUTHORS } from "@/data/articles";
import { ANALYSES } from "@/data/analyses";
import { CATEGORY_LIST } from "@/data/categories";
import { createAdminClient } from "@/lib/supabase/admin";

function getCategoryName(slug: string): string {
  const cat = CATEGORY_LIST.find((c) => c.slug === slug);
  return cat?.name || slug.charAt(0).toUpperCase() + slug.slice(1);
}

function mapDbItemToArticle(item: any): Article {
  return {
    id: item.id,
    type: item.type === "materia" ? "materia" : "noticia",
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle || item.excerpt || "",
    category: item.category,
    categoryName: getCategoryName(item.category),
    author: {
      id: "autor-hdz",
      name: item.author_name || "Produção HDZ Finance",
      role: "Análise Econômica & Mercados",
      avatar: AUTHORS.editoria.avatar,
      bio: AUTHORS.editoria.bio,
    },
    publishDate: item.published_at || item.created_at,
    updateDate: item.updated_at || item.published_at || item.created_at,
    readTimeMinutes: 3,
    coverImage: item.cover_image_path || "/images/materias/ciclos-de-mercado/cover.webp",
    coverAlt: item.cover_image_alt || item.title,
    content: item.body_html || "",
    tags: Array.isArray(item.tags) ? item.tags : [],
    isFeatured: Boolean(item.featured),
  };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const cleanSlug = slug.replace(/^-+|-+$/g, "");

  // 1. Check hardcoded static ARTICLES
  const staticArticle = ARTICLES.find((a) => a.slug === slug || a.slug === cleanSlug);
  if (staticArticle) {
    return staticArticle;
  }

  // 2. Query Supabase if configured
  try {
    const isSupabaseConfigured =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("dummy") &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.SUPABASE_SERVICE_ROLE_KEY.includes("dummy");

    if (isSupabaseConfigured) {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("content_items")
        .select("*")
        .or(`slug.eq.${slug},slug.eq.${cleanSlug}`)
        .eq("status", "published")
        .maybeSingle();

      if (!error && data) {
        return mapDbItemToArticle(data);
      }
    }
  } catch (err) {
    console.warn(`[ContentService] Error fetching article by slug (${slug}):`, err);
  }

  return null;
}

export async function getMateriaBySlug(slug: string): Promise<AnalysisArticle | null> {
  // 1. Check hardcoded static ANALYSES
  const staticMateria = ANALYSES.find((a) => a.slug === slug || a.legacyId === slug);
  if (staticMateria) {
    return staticMateria;
  }

  // 2. Query Supabase if configured
  try {
    const isSupabaseConfigured =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("dummy") &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.SUPABASE_SERVICE_ROLE_KEY.includes("dummy");

    if (isSupabaseConfigured) {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("content_items")
        .select("*")
        .eq("slug", slug)
        .eq("type", "materia")
        .eq("status", "published")
        .maybeSingle();

      if (!error && data) {
        const article = mapDbItemToArticle(data);
        return {
          ...article,
          keyTakeaways: [article.subtitle],
        };
      }
    }
  } catch (err) {
    console.warn(`[ContentService] Error fetching materia by slug (${slug}):`, err);
  }

  return null;
}

export async function getAllPublishedArticles(): Promise<Article[]> {
  const combined = [...ARTICLES];

  try {
    const isSupabaseConfigured =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("dummy") &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.SUPABASE_SERVICE_ROLE_KEY.includes("dummy");

    if (isSupabaseConfigured) {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("content_items")
        .select("*")
        .eq("type", "noticia")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (!error && data && Array.isArray(data)) {
        for (const item of data) {
          if (!combined.some((a) => a.slug === item.slug || a.id === item.id)) {
            combined.unshift(mapDbItemToArticle(item));
          }
        }
      }
    }
  } catch (err) {
    console.warn("[ContentService] Error fetching all published articles:", err);
  }

  return combined;
}
