import { Button } from "@/components/button";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="container-default py-[var(--space-7)] sm:py-[var(--space-8)]">
      <PageIntro
        eyebrow={siteConfig.home.heroEyebrow}
        title={siteConfig.home.heroHeadline}
        description={siteConfig.home.heroSubheadline}
        titleAs="h1"
        className="max-w-[52rem]"
      />
      <div className="mt-[var(--space-5)] flex flex-col gap-3 sm:flex-row">
        <Button href="/work" variant="primary">
          View Work
        </Button>
        <Button href="/resume.pdf" variant="secondary">
          Download Resume
        </Button>
      </div>
    </section>
  );
}
