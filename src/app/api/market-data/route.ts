import { NextResponse } from "next/server";
import { getMarketTickerData } from "@/lib/market-provider";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const data = await getMarketTickerData();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
