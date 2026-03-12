import type { Route } from "next";
import Link from "next/link";
import { ReactNode } from "react";

import { cx } from "@/lib/cx";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  target,
  rel,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = cx(
    variant === "primary" ? "button-primary" : "button-secondary",
    disabled && "opacity-70",
    className,
  );

  if (href) {
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link href={href as Route} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
