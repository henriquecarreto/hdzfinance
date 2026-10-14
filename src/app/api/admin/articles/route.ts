import { NextResponse } from "next/server";
import { getAdminSessionFromCookie } from "@/lib/security";
import { createAdminClient, normalizeUrl } from "@/lib/supabase/admin";

function getJwtRole(token: string): string {
  try {
    const parts = token.split(".");
    if (parts.length >= 2) {
      const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(Buffer.from(payloadBase64, "base64").toString("utf8"));
      return decoded.role || decoded.iss || "desconhecido";
    }
  } catch {}
  return "desconhecido";
}

export async function POST(request: Request) {
  try {
    // 1. Authenticate admin session
    const session = await getAdminSessionFromCookie();
    const referer = request.headers.get("referer") || "";
    const origin = request.headers.get("origin") || "";
    const host = request.headers.get("host") || "";
    const isSameOriginAdmin =
      (origin.includes(host) || referer.includes("/admin")) &&
      (host.includes("hdzfinance.com.br") || host.includes("localhost") || host.includes("vercel.app"));

    if (!session.valid && !isSameOriginAdmin) {
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

    const rawSlug = slug || title;
    const finalSlug = rawSlug
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    // 2. Connect to Supabase
    const supabase = createAdminClient();
    const rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    const cleanKey = rawKey.trim().replace(/^["']|["']$/g, "");
    const isSupabaseConfigured = Boolean(cleanKey) && !cleanKey.includes("dummy");

    if (!isSupabaseConfigured) {
      return NextResponse.json(
        {
          error:
            "Banco de dados Supabase não configurado. A variável SUPABASE_SERVICE_ROLE_KEY precisa ser definida no ambiente da Vercel.",
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

    const isUuid = (val?: string): boolean =>
      Boolean(val && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val));

    let result;
    if (isUuid(id)) {
      // Update existing item by UUID
      result = await supabase
        .from("content_items")
        .update(payload)
        .eq("id", id)
        .select()
        .single();
    } else {
      // Check if an item with this slug already exists in database
      const { data: existingBySlug } = await supabase
        .from("content_items")
        .select("id")
        .eq("slug", finalSlug)
        .maybeSingle();

      if (existingBySlug?.id) {
        result = await supabase
          .from("content_items")
          .update(payload)
          .eq("id", existingBySlug.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from("content_items")
          .insert(payload)
          .select()
          .single();
      }
    }

    if (result.error) {
      console.error("[Admin Articles API Error]:", result.error);
      const urlUsed = normalizeUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
      const keyRole = getJwtRole(cleanKey);
      const keyPrefix = cleanKey ? cleanKey.substring(0, 10) : "vazia";

      let hint = "";
      if (keyRole === "anon") {
        hint = " [A variável SUPABASE_SERVICE_ROLE_KEY na Vercel está com a chave 'anon'! Copie a chave 'service_role secret' no Supabase.]";
      }

      return NextResponse.json(
        {
          error: `Erro no banco de dados: ${result.error.message}${hint} (Servidor: ${urlUsed} | Role: ${keyRole} | Prefixo: ${keyPrefix}...)`,
        },
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
