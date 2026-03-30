import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.lenshubperu.com",
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