import { Button } from "@/components/button";
import { Card } from "@/components/card";
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
            <Card key={item}>
              <p className="muted-copy text-sm leading-6">{item}</p>
            </Card>
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
          <Button href="/principles" variant="secondary">
            Read principles
          </Button>
          <Button href="/resume.pdf" variant="primary">
            Download resume
          </Button>
        </div>
      </Section>
    </>
  );
}
