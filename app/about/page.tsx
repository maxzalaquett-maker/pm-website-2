import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { SkillTag } from "@/components/skill-tag";
import { getSiteConfig } from "@/lib/content";

export default function AboutPage() {
  const site = getSiteConfig();

  return (
    <Section
      eyebrow="About"
      title="Strategy shaped by complex products and customer trust"
      description={site.about.description}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="body-copy muted-copy max-w-2xl space-y-6">
          <p>{site.about.summary}</p>
        </div>
        <Card as="aside" className="bg-[var(--surface-strong)] p-[var(--space-5)]">
          <h2 className="text-[var(--font-size-lg)] font-semibold tracking-[-0.03em] text-[var(--foreground)]">
            Areas of focus
          </h2>
          <div className="mt-[var(--space-4)] flex flex-wrap gap-3">
            {site.about.focusAreas.map((item) => (
              <SkillTag key={item} label={item} />
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}
