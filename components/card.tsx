import { ElementType, ReactNode } from "react";

import { cx } from "@/lib/cx";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  interactive?: boolean;
};

export function Card({ children, className, as: Component = "article", interactive = false }: CardProps) {
  return <Component className={cx("card-base", interactive && "card-interactive", className)}>{children}</Component>;
}
