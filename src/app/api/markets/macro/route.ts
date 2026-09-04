import { NextResponse } from "next/server";
import { getMacroIndicatorsData } from "@/lib/macro-provider";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const data = await getMacroIndicatorsData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("[API /api/markets/macro] Error:", err);
    return NextResponse.json(
      { error: "Erro ao consultar indicadores macroeconômicos oficiais." },
      { status: 500 }
    );
  }
}
