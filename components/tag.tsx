import { ReactNode } from "react";

import { cx } from "@/lib/cx";

type TagProps = {
  children: ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span className={cx("tag-base", className)} aria-disabled="true">
      {children}
    </span>
  );
}
