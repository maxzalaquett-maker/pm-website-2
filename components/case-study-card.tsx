import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Tag } from "@/components/tag";
import { CaseStudy } from "@/lib/types";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Card interactive className="flex h-full flex-col">
      <h3 className="card-title">{caseStudy.title}</h3>
      <div className="card-meta">
        <p className="card-meta-row">
          <span className="card-meta-label">Industry:</span>
          <span>{caseStudy.industry}</span>
        </p>
        <p className="card-meta-row">
          <span className="card-meta-label">Role:</span>
          <span>{caseStudy.role}</span>
        </p>
      </div>
      <p className="body-copy muted-copy mt-[var(--space-2)] flex-1">{caseStudy.summary}</p>
      <div className="mt-[var(--space-4)] flex flex-wrap gap-2">
        {caseStudy.skills.map((skill) => (
          <Tag key={skill}>
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
