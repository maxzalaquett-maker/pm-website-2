import { Card } from "@/components/card";
import { Principle } from "@/lib/types";

type PrincipleCardProps = {
  principle: Principle;
};

export function PrincipleCard({ principle }: PrincipleCardProps) {
  return (
    <Card>
      <h3 className="card-title">{principle.title}</h3>
      <p className="body-copy muted-copy mt-[var(--space-2)]">{principle.description}</p>
    </Card>
  );
}
