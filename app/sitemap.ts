import { MetadataRoute } from "next";

import { getCaseStudySlugs, getSiteConfig } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteConfig().siteUrl;

  return [
    "",
    "/work",
    "/principles",
    "/about",
    ...getCaseStudySlugs().map((slug) => `/work/${slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
