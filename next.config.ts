import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["*"], // Разрешить загрузку изображений с любых доменов
  },
};

export default nextConfig;
