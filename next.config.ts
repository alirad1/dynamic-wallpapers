import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/**/*": ["./lib/wallpaper/fonts/**/*"],
  },
};

export default nextConfig;
