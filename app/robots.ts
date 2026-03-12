import { MetadataRoute } from "next";

import { getSiteConfig } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${getSiteConfig().siteUrl}/sitemap.xml`,
  };
}
