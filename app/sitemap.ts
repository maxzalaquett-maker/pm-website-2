import { MetadataRoute } from "next";

import { caseStudies } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://example.vercel.app";

  return [
    "",
    "/work",
    "/principles",
    "/about",
    ...caseStudies.map((caseStudy) => `/work/${caseStudy.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
