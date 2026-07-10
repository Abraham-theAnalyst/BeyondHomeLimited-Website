import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // internal reference pages and the API stay out of the index
      disallow: ["/api/", "/direction", "/system"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
