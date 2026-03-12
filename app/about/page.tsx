import { Section } from "@/components/section";
import { SkillTag } from "@/components/skill-tag";

const focusAreas = [
  "Product discovery",
  "Platform thinking",
  "Customer trust in complex systems",
  "Stakeholder alignment across large organizations",
];

export default function AboutPage() {
  return (
    <Section
      eyebrow="About"
      title="Strategy shaped by complex products and customer trust"
      description="I’m a product strategist with more than a decade of experience designing and shaping digital platforms in financial services and healthcare."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="max-w-2xl space-y-6 text-base leading-8 text-[var(--muted)]">
          <p>
            My work focuses on helping organizations simplify complex systems so customers can
            better understand their options and make confident decisions.
          </p>
        </div>
        <aside className="rounded-3xl border border-[var(--border)] bg-white/60 p-6">
          <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">Areas of focus</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {focusAreas.map((item) => (
              <SkillTag key={item} label={item} />
            ))}
          </div>
        </aside>
      </div>
    </Section>
  );
}
