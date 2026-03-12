import Link from "next/link";

import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <Container className="flex flex-col gap-5 py-[var(--space-5)] text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[var(--foreground)]">{siteConfig.name}</p>
        <div className="flex flex-wrap gap-5">
          <Link className="hover:text-[var(--foreground)]" href={siteConfig.linkedinUrl} target="_blank">
            LinkedIn
          </Link>
          <Link className="hover:text-[var(--foreground)]" href={`mailto:${siteConfig.email}`}>
            Email
          </Link>
          <a className="hover:text-[var(--foreground)]" href="/resume.pdf">
            Resume
          </a>
        </div>
      </Container>
    </footer>
  );
}
