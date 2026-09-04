import { NextResponse } from "next/server";
import { ARTICLES } from "@/data/articles";

export async function GET() {
  const baseUrl = "https://hdzfinance.com.br";

  const rssItems = ARTICLES.map((art) => `
    <item>
      <title>${art.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</title>
      <link>${baseUrl}/noticias/${art.slug}</link>
      <description>${art.subtitle.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</description>
      <pubDate>${new Date(art.publishDate).toUTCString()}</pubDate>
      <guid>${baseUrl}/noticias/${art.slug}</guid>
    </item>
  `).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>HDZ Finance - Notícias e Análises Financeiras</title>
    <link>${baseUrl}</link>
    <description>Informação para entender. Educação para decidir.</description>
    <language>pt-br</language>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
