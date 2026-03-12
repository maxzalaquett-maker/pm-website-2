import { CaseStudyCard } from "@/components/case-study-card";
import { Section } from "@/components/section";
import { caseStudies } from "@/lib/case-studies";

export default function WorkPage() {
  return (
    <Section
      eyebrow="Work"
      title="Selected case studies"
      description="A small set of product strategy projects across financial services and healthcare."
    >
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {caseStudies.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
        ))}
      </div>
    </Section>
  );
}
