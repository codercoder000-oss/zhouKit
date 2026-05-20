// [D2] robots.txt 配置
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: "https://deltaforce-wiki.vercel.app/sitemap.xml",
  };
}
