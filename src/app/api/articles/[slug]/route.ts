import { NextResponse } from "next/server";
import { getArticleBySlug } from "@/lib/content-service";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: Props) {
  try {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
      return NextResponse.json(
        { error: "Artigo não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, article }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Erro ao buscar artigo." },
      { status: 500 }
    );
  }
}
