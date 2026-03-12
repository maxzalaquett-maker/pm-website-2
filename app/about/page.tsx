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
        <div className="max-w-2xl space-y-6 text-base leading-8 text-[var(--muted)]">
          <p>{site.about.summary}</p>
        </div>
        <aside className="rounded-3xl border border-[var(--border)] bg-white/60 p-6">
          <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">Areas of focus</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {site.about.focusAreas.map((item) => (
              <SkillTag key={item} label={item} />
            ))}
          </div>
        </aside>
      </div>
    </Section>
  );
}
