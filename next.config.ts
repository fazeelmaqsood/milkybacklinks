import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Smaller production bundle for VPS / Hostinger Node.js hosting
  output: "standalone",
};

export default nextConfig;
