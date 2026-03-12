import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { SkillTag } from "@/components/skill-tag";
import { getCaseStudyBySlug, getCaseStudySlugs, getSiteConfig } from "@/lib/content";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {};
  }

  return {
    title: `${caseStudy.title} | ${getSiteConfig().name}`,
    description: caseStudy.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <section className="py-[var(--space-7)] sm:py-[var(--space-8)]">
        <Container narrow>
          <Button href="/work" variant="secondary">
          Back to work
          </Button>
          <PageIntro
            eyebrow={caseStudy.industry}
            title={caseStudy.title}
            description={caseStudy.summary}
            titleAs="h1"
            className="mt-[var(--space-5)] max-w-[52rem]"
          />
          <Card as="dl" className="meta-grid mt-[var(--space-5)]">
            <div>
              <dt className="meta-label">Industry</dt>
              <dd className="meta-value">{caseStudy.industry}</dd>
            </div>
            <div>
              <dt className="meta-label">Role</dt>
              <dd className="meta-value">{caseStudy.role}</dd>
            </div>
            <div>
              <dt className="meta-label">Skills</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {caseStudy.skills.map((skill) => (
                  <SkillTag key={skill} label={skill} />
                ))}
              </dd>
            </div>
          </Card>
        </Container>
      </section>

      <Section title="Why this mattered" narrow>
        <p className="body-copy muted-copy prose-measure">{caseStudy.whyThisMattered}</p>
      </Section>

      <Section title="The problem" narrow>
        <p className="body-copy muted-copy prose-measure">{caseStudy.problem}</p>
      </Section>

      <Section title="My role" narrow>
        <p className="body-copy muted-copy prose-measure">{caseStudy.myRole}</p>
      </Section>

      <Section title="Discovery and insights" narrow>
        <ul className="list-cards">
          {caseStudy.discoveryAndInsights.map((item) => (
            <Card key={item} as="li">
              {item}
            </Card>
          ))}
        </ul>
      </Section>

      <Section title="Key decisions" narrow>
        <ul className="list-cards">
          {caseStudy.keyDecisions.map((item) => (
            <Card key={item} as="li">
              {item}
            </Card>
          ))}
        </ul>
      </Section>

      <Section title="Outcome" narrow>
        <p className="body-copy muted-copy prose-measure">{caseStudy.outcome}</p>
      </Section>

      <Section title="Skills demonstrated" narrow>
        <div className="flex flex-wrap gap-3">
          {caseStudy.skillsDemonstrated.map((skill) => (
            <SkillTag key={skill} label={skill} />
          ))}
        </div>
      </Section>
    </>
  );
}
