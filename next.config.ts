import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 🔥 DESACTIVA optimización de Vercel (evita el límite)
    unoptimized: true,

    // ✅ Mantienes esto por compatibilidad
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.lenshubperu.com",
      },
      {
        protocol: "https",
        hostname: "pub-8126f15a0d334b9fb6de95bb3588f282.r2.dev",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/catalogo",
        destination: "/productos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;