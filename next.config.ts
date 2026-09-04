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
