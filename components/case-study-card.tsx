import Link from "next/link";

import { CaseStudy } from "@/lib/types";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-white/70 p-6">
      <div className="mb-5 flex items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <span>{caseStudy.industry}</span>
        <span>{caseStudy.role}</span>
      </div>
      <h3 className="text-2xl font-semibold tracking-tight">{caseStudy.title}</h3>
      <p className="mt-4 flex-1 text-base leading-7 text-[var(--muted)]">{caseStudy.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {caseStudy.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--muted)]"
          >
            {skill}
          </span>
        ))}
      </div>
      <Link
        href={`/work/${caseStudy.slug}`}
        className="mt-8 inline-flex text-sm font-medium text-[var(--accent)] hover:text-[var(--foreground)]"
      >
        View case study
      </Link>
    </article>
  );
}
