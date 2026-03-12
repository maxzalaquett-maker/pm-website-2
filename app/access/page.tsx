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
    >
      <div className="max-w-md rounded-3xl border border-[var(--border)] bg-white/70 p-6">
        {isWorkProtectionEnabled() ? (
          <AccessForm nextPath={nextPath} />
        ) : (
          <div className="space-y-4">
            <p className="text-sm leading-6 text-[var(--muted)]">
              Access is currently open.
            </p>
            <a
              href={nextPath}
              className="button-secondary"
            >
              Continue to work
            </a>
          </div>
        )}
      </div>

      <form action={lockWork} className="mt-6">
        <button type="submit" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          Clear saved access
        </button>
      </form>
    </Section>
  );
}
