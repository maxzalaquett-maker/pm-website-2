import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { AccessForm } from "@/components/access-form";
import { Section } from "@/components/section";
import { isWorkProtectionEnabled } from "@/lib/work-auth";

import { lockWork } from "./actions";

type AccessPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function AccessPage({ searchParams }: AccessPageProps) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/") ? params.next : "/work";

  return (
    <Section
      eyebrow="Private work"
      title="Enter password"
      description="The case study section is lightly protected for private sharing."
      narrow
    >
      <Card className="max-w-md bg-[var(--surface-strong)] p-[var(--space-5)]">
        {isWorkProtectionEnabled() ? (
          <AccessForm nextPath={nextPath} />
        ) : (
          <div className="space-y-4">
            <p className="muted-copy text-sm leading-6">
              Access is currently open.
            </p>
            <Button href={nextPath} variant="secondary">
              Continue to work
            </Button>
          </div>
        )}
      </Card>

      <form action={lockWork} className="mt-6">
        <button type="submit" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          Clear saved access
        </button>
      </form>
    </Section>
  );
}
