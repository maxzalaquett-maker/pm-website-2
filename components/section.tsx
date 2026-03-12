import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, description, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-[var(--border)] py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-2xl">
            {eyebrow ? (
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
                {eyebrow}
              </p>
            ) : null}
            {title ? <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2> : null}
            {description ? (
              <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">{description}</p>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
