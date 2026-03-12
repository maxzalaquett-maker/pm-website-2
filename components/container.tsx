import { ReactNode } from "react";

import { cx } from "@/lib/cx";

type ContainerProps = {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
};

export function Container({ children, narrow = false, className }: ContainerProps) {
  return (
    <div className={cx(narrow ? "container-narrow" : "container-default", className)}>
      {children}
    </div>
  );
}
