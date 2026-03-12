import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";

export default function NotFound() {
  return (
    <Container narrow className="flex min-h-[60vh] flex-col justify-center py-20">
      <PageIntro
        eyebrow="Not found"
        title="That page does not exist."
        description="The link may be outdated, or the page may have been moved."
      />
      <div className="mt-[var(--space-5)]">
        <Button href="/" variant="secondary">
          Return home
        </Button>
      </div>
    </Container>
  );
}
