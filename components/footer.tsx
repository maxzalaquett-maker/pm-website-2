import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
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
      </div>
    </footer>
  );
}
