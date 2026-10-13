import { NextResponse } from "next/server";
import { getAdminSessionFromCookie } from "@/lib/security";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    // 1. Authenticate admin session
    const session = await getAdminSessionFromCookie();
    if (!session.valid) {
      return NextResponse.json(
        { error: "Acesso não autorizado. Por favor, realize login no painel administrativo." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      id,
      title,
      subtitle,
      excerpt,
      slug,
      bodyHtml,
      category,
      tags,
      authorName,
      coverImagePath,
      coverImageAlt,
      featured,
      featuredOrder,
      status,
      publishedAt,
      type = "noticia",
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "O título da publicação é obrigatório." },
        { status: 400 }
      );
    }

    const finalSlug =
      slug ||
      title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

    // 2. Connect to Supabase
    const supabase = createAdminClient();
    const isSupabaseConfigured =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("dummy") &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.SUPABASE_SERVICE_ROLE_KEY.includes("dummy");

    if (!isSupabaseConfigured) {
      return NextResponse.json(
        {
          error:
            "Banco de dados Supabase não configurado. As variáveis NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY precisam ser definidas no ambiente.",
          needsConfig: true,
        },
        { status: 503 }
      );
    }

    const now = new Date().toISOString();
    const payload = {
      type,
      status: status || "published",
      title: title.trim(),
      subtitle: subtitle || excerpt || null,
      excerpt: excerpt || subtitle || null,
      slug: finalSlug,
      body_html: bodyHtml || "",
      category: category || "economia",
      tags: Array.isArray(tags) ? tags : [],
      author_name: authorName || "Produção HDZ Finance",
      cover_image_path: coverImagePath || null,
      cover_image_alt: coverImageAlt || title.trim(),
      featured: Boolean(featured),
      featured_order: Number(featuredOrder) || 0,
      published_at: publishedAt || now,
      updated_at: now,
    };

    let result;
    if (id && !id.startsWith("item-") && !id.startsWith("temp-")) {
      // Update existing item
      result = await supabase
        .from("content_items")
        .update(payload)
        .eq("id", id)
        .select()
        .single();
    } else {
      // Insert new item or upsert on slug
      result = await supabase
        .from("content_items")
        .upsert(payload, { onConflict: "slug" })
        .select()
        .single();
    }

    if (result.error) {
      console.error("[Admin Articles API Error]:", result.error);
      return NextResponse.json(
        { error: `Erro no banco de dados: ${result.error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Conteúdo publicado com sucesso no banco de dados!",
        item: result.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Admin Articles POST Exception]:", error);
    return NextResponse.json(
      { error: error?.message || "Erro interno ao processar a publicação." },
      { status: 500 }
    );
  }
}
