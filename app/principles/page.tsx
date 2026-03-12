import { PrincipleCard } from "@/components/principle-card";
import { Section } from "@/components/section";
import { getPrinciples } from "@/lib/content";

export default function PrinciplesPage() {
  const principles = getPrinciples();

  return (
    <Section
      eyebrow="Principles"
      title="How I think about product work"
      description="A few principles that guide how I frame product problems, make tradeoffs, and help teams move with clarity."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {principles.map((principle) => (
          <PrincipleCard key={principle.title} principle={principle} />
        ))}
      </div>
    </Section>
  );
}
