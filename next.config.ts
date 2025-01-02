import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["*"], // Разрешить загрузку изображений с любых доменов
  },
  reactStrictMode: false,
};

export default nextConfig;
