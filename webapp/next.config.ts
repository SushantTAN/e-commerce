import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.example.com" },
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "help.rangeme.com" },
      { protocol: "https", hostname: "coolmaterial.com" },


    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
