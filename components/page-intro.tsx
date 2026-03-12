import { ElementType, ReactNode } from "react";

import { cx } from "@/lib/cx";

type PageIntroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  titleAs?: ElementType;
  className?: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  titleAs: Title = "h2",
  className,
}: PageIntroProps) {
  const titleClassName = Title === "h1" ? "page-title" : "section-title";

  return (
    <div className={cx("page-intro", className)}>
      {eyebrow ? <p className="page-intro-eyebrow">{eyebrow}</p> : null}
      <Title className={titleClassName}>{title}</Title>
      {description ? <p className="body-copy muted-copy page-intro-description">{description}</p> : null}
    </div>
  );
}
