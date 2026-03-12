import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components/section";
import { SkillTag } from "@/components/skill-tag";
import { caseStudies, caseStudiesBySlug } from "@/lib/case-studies";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudiesBySlug[slug];

  if (!caseStudy) {
    return {};
  }

  return {
    title: `${caseStudy.title} | Max Zalaquett`,
    description: caseStudy.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = caseStudiesBySlug[slug];

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <section className="mx-auto w-full max-w-4xl px-6 py-12 sm:py-16">
        <Link
          className="inline-flex rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)]"
          href="/work"
        >
          Back to work
        </Link>
        <div className="mt-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            {caseStudy.industry}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{caseStudy.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">{caseStudy.summary}</p>
        </div>
        <dl className="mt-8 grid gap-5 rounded-3xl border border-[var(--border)] bg-white/60 p-5 sm:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-[var(--muted)]">Industry</dt>
            <dd className="mt-2 text-base">{caseStudy.industry}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-[var(--muted)]">Role</dt>
            <dd className="mt-2 text-base">{caseStudy.role}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-[var(--muted)]">Skills</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {caseStudy.skills.map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </dd>
          </div>
        </dl>
      </section>

      <Section title="Why this mattered">
        <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">{caseStudy.whyThisMattered}</p>
      </Section>

      <Section title="The problem">
        <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">{caseStudy.problem}</p>
      </Section>

      <Section title="My role">
        <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">{caseStudy.myRole}</p>
      </Section>

      <Section title="Discovery and insights">
        <ul className="grid gap-4">
          {caseStudy.discoveryAndInsights.map((item) => (
            <li key={item} className="rounded-3xl border border-[var(--border)] bg-white/60 p-4 text-[var(--muted)]">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Key decisions">
        <ul className="grid gap-4">
          {caseStudy.keyDecisions.map((item) => (
            <li key={item} className="rounded-3xl border border-[var(--border)] bg-white/60 p-4 text-[var(--muted)]">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Outcome">
        <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">{caseStudy.outcome}</p>
      </Section>

      <Section title="Skills demonstrated">
        <div className="flex flex-wrap gap-3">
          {caseStudy.skillsDemonstrated.map((skill) => (
            <SkillTag key={skill} label={skill} />
          ))}
        </div>
      </Section>
    </>
  );
}
