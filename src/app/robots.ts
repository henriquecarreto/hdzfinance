import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://hdzfinance.com.br";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/scratch/"],
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/news-sitemap.xml`,
    ],
  };
}
