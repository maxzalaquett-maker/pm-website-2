import { caseStudies } from "@/data/case-studies";
import { principles } from "@/data/principles";
import { siteConfig } from "@/lib/site-config";

export function getSiteConfig() {
  return siteConfig;
}

export function getAllCaseStudies() {
  return caseStudies;
}

export function getFeaturedCaseStudies() {
  const featured = new Set<string>(siteConfig.featuredCaseStudySlugs);

  return caseStudies.filter((caseStudy) => featured.has(caseStudy.slug));
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getCaseStudySlugs() {
  return caseStudies.map((caseStudy) => caseStudy.slug);
}

export function getPrinciples() {
  return principles;
}
