import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const [btcRes, ethRes] = await Promise.all([
      fetch("https://www.bitstamp.net/api/v2/ticker/btcusd/", {
        signal: controller.signal,
        cache: "no-store",
      }).catch(() => null),
      fetch("https://www.bitstamp.net/api/v2/ticker/ethusd/", {
        signal: controller.signal,
        cache: "no-store",
      }).catch(() => null),
    ]);

    clearTimeout(timeout);

    let btcQuote = null;
    let ethQuote = null;

    if (btcRes && btcRes.ok) {
      const btc = await btcRes.json();
      const price = parseFloat(btc.last);
      const change24h = parseFloat(btc.percent_change_24);
      const timestamp = parseInt(btc.timestamp, 10) * 1000;

      if (!isNaN(price)) {
        btcQuote = {
          symbol: "BTC",
          pair: "BTC/USD",
          price,
          change24h: !isNaN(change24h) ? change24h : 0,
          timestamp,
          source: "Bitstamp",
          status: "live",
        };
      }
    }

    if (ethRes && ethRes.ok) {
      const eth = await ethRes.json();
      const price = parseFloat(eth.last);
      const change24h = parseFloat(eth.percent_change_24);
      const timestamp = parseInt(eth.timestamp, 10) * 1000;

      if (!isNaN(price)) {
        ethQuote = {
          symbol: "ETH",
          pair: "ETH/USD",
          price,
          change24h: !isNaN(change24h) ? change24h : 0,
          timestamp,
          source: "Bitstamp",
          status: "live",
        };
      }
    }

    return NextResponse.json(
      {
        BTC: btcQuote,
        ETH: ethQuote,
        fetchedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (err) {
    console.error("[/api/market/crypto error]:", err);
    return NextResponse.json(
      { BTC: null, ETH: null, error: "Bitstamp REST request failed" },
      { status: 500 }
    );
  }
}
