import { CaseStudyCard } from "@/components/case-study-card";
import { Section } from "@/components/section";
import { getAllCaseStudies } from "@/lib/content";

export default function WorkPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <Section
      eyebrow="Work"
      title="Selected case studies"
      description="A small set of product strategy projects across financial services and healthcare."
    >
      <div className="grid-cards" data-columns="3">
        {caseStudies.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
        ))}
      </div>
    </Section>
  );
}
