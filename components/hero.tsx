import { Button } from "@/components/button";
import { PlatformSystemAnimation } from "@/components/platform-system-animation";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="hero-shell container-default">
      <div className="hero-copy">
        <PageIntro
          eyebrow={siteConfig.home.heroEyebrow}
          title={siteConfig.home.heroHeadline}
          description={siteConfig.home.heroSubheadline}
          titleAs="h1"
          className="hero-intro"
        />
        <div className="button-row hero-actions">
          <Button href="/work" variant="primary">
            View Work
          </Button>
          <Button href="/resume.pdf" variant="secondary">
            Download Resume
          </Button>
        </div>
      </div>
      <div className="hero-visual-slot">
        <PlatformSystemAnimation />
      </div>
    </section>
  );
}
