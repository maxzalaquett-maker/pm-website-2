import { ReactNode } from "react";

import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  narrow?: boolean;
};

export function Section({ id, eyebrow, title, description, children, narrow = false }: SectionProps) {
  return (
    <section id={id} className="section-default">
      <Container narrow={narrow}>
        {title ? <PageIntro eyebrow={eyebrow} title={title} description={description} /> : null}
        {children}
      </Container>
    </section>
  );
}
