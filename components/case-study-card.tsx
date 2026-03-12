import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Tag } from "@/components/tag";
import { CaseStudy } from "@/lib/types";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <div className="mb-[var(--space-3)] flex items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <span>{caseStudy.industry}</span>
        <span>{caseStudy.role}</span>
      </div>
      <h3 className="text-[var(--font-size-2xl)] font-semibold tracking-[-0.03em]">{caseStudy.title}</h3>
      <p className="body-copy muted-copy mt-[var(--space-2)] flex-1">{caseStudy.summary}</p>
      <div className="mt-[var(--space-4)] flex flex-wrap gap-2">
        {caseStudy.skills.map((skill) => (
          <Tag key={skill} className="text-xs font-medium">
            {skill}
          </Tag>
        ))}
      </div>
      <Button href={`/work/${caseStudy.slug}`} variant="secondary" className="mt-[var(--space-4)] self-start">
        View case study
      </Button>
    </Card>
  );
}
