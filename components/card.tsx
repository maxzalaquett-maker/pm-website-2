import { ElementType, ReactNode } from "react";

import { cx } from "@/lib/cx";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function Card({ children, className, as: Component = "article" }: CardProps) {
  return <Component className={cx("card-base", className)}>{children}</Component>;
}
