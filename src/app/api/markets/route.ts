import { NextResponse } from "next/server";
import { getCanonicalMarketSnapshot, getMarketTickerData } from "@/lib/market-provider";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const snapshot = await getCanonicalMarketSnapshot();
  const legacyData = await getMarketTickerData();

  return NextResponse.json(
    {
      ...snapshot,
      items: legacyData.items, // Backwards compatibility field
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}
