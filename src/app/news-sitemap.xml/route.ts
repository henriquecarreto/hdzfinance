import { NextResponse } from "next/server";
import { ARTICLES } from "@/data/articles";

export async function GET() {
  const baseUrl = "https://hdzfinance.com.br";

  const xmlItems = ARTICLES.map((art) => `
    <url>
      <loc>${baseUrl}/noticias/${art.slug}</loc>
      <news:news>
        <news:publication>
          <news:name>HDZ Finance</news:name>
          <news:language>pt</news:language>
        </news:publication>
        <news:publication_date>${new Date(art.publishDate).toISOString()}</news:publication_date>
        <news:title>${art.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</news:title>
      </news:news>
    </url>
  `).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${xmlItems}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
