import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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