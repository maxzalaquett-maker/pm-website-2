"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links: Array<{ href: Route; label: string }> = [
  { href: "/work", label: "Work" },
  { href: "/principles", label: "Principles" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color:rgba(250,250,248,0.92)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-semibold tracking-tight sm:text-base">
          Max [Last Name]
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-5 text-sm text-[var(--muted)] sm:gap-7">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`hover:text-[var(--foreground)] ${
                      isActive ? "text-[var(--foreground)]" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a className="hover:text-[var(--foreground)]" href="/resume.pdf">
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
