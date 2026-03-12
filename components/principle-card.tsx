import { Card } from "@/components/card";
import { Principle } from "@/lib/types";

type PrincipleCardProps = {
  principle: Principle;
};

export function PrincipleCard({ principle }: PrincipleCardProps) {
  return (
    <Card>
      <h3 className="text-[var(--font-size-xl)] font-semibold tracking-[-0.03em]">{principle.title}</h3>
      <p className="body-copy muted-copy mt-[var(--space-2)]">{principle.description}</p>
    </Card>
  );
}
