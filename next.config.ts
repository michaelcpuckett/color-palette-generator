import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "out",
  output: "export",
  cacheMaxMemorySize: 0, // disable in-memory caching
};

export default nextConfig;
