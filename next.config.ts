import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/privacidade",
        destination: "/diretrizes",
        permanent: true,
      },
      {
        source: "/termos",
        destination: "/diretrizes",
        permanent: true,
      },
      {
        source: "/aviso-legal",
        destination: "/diretrizes",
        permanent: true,
      },
      {
        source: "/politica-editorial",
        destination: "/diretrizes",
        permanent: true,
      },
      {
        source: "/analises",
        destination: "/materias",
        permanent: true,
      },
      {
        source: "/cursos-e-guias",
        destination: "/educacional",
        permanent: true,
      },
      {
        source: "/aprenda",
        destination: "/educacional",
        permanent: true,
      },
      {
        source: "/educacional/combo-ebooks",
        destination: "/educacional/guia-visual-financas",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
