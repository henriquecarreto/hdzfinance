import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
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
    ];
  },
};

export default nextConfig;
