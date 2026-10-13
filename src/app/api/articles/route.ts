import { NextResponse } from "next/server";
import { getAllPublishedArticles } from "@/lib/content-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const articles = await getAllPublishedArticles();
    return NextResponse.json({ success: true, articles }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Erro ao listar artigos." },
      { status: 500 }
    );
  }
}
