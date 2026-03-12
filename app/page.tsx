import Link from "next/link";

import { CaseStudyCard } from "@/components/case-study-card";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { getFeaturedCaseStudies, getSiteConfig } from "@/lib/content";

export default function HomePage() {
  const site = getSiteConfig();
  const featuredCaseStudies = getFeaturedCaseStudies();

  return (
    <>
      <Hero />

      <Section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {site.home.proofItems.map((item) => (
            <div key={item} className="rounded-3xl border border-[var(--border)] bg-white/60 p-5">
              <p className="text-sm leading-6 text-[var(--muted)]">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="work"
        eyebrow="Selected work"
        title="Case studies grounded in product thinking"
        description="Examples of strategy work focused on trust, clarity, and better decision-making in complex domains."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </Section>

      <Section
        id="principles"
        eyebrow="Principles"
        title="How I Approach Product Work"
        description="Trusted products come from clear thinking, honest tradeoffs, and disciplined prioritization."
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/principles"
            className="button-secondary"
          >
            Read principles
          </Link>
          <a
            href="/resume.pdf"
            className="button-primary"
          >
            Download resume
          </a>
        </div>
      </Section>
    </>
  );
}
