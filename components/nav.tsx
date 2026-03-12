"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site-config";

const links: Array<{ href: Route; label: string }> = [
  { href: "/work", label: "Work" },
  { href: "/principles", label: "Principles" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="topbar">
      <Container className="topbar-inner">
        <Link href="/" className="site-wordmark">
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-2 sm:gap-3">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link"
                    data-active={isActive}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                className="nav-link"
                href="/resume.pdf"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
