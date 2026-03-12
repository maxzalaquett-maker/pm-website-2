import { Principle } from "@/lib/types";

type PrincipleCardProps = {
  principle: Principle;
};

export function PrincipleCard({ principle }: PrincipleCardProps) {
  return (
    <article className="rounded-3xl border border-[var(--border)] bg-white/65 p-6">
      <h3 className="text-xl font-semibold tracking-tight">{principle.title}</h3>
      <p className="mt-4 text-base leading-7 text-[var(--muted)]">{principle.description}</p>
    </article>
  );
}
