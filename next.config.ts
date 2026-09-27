import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // تصویر شاخص بلاگ تا ۵ مگابایت (سقف باکت blog)؛ کمی بیشتر برای سربار multipart.
      bodySizeLimit: "6mb",
    },
  },
  images: {
    // تصاویر شاخص بلاگ از باکت عمومی Supabase اپ.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/blog/**",
      },
    ],
  },
};

export default nextConfig;
