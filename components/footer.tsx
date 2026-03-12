import Link from "next/link";

import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="footer-shell">
      <Container className="footer-inner">
        <p className="text-[var(--color-on-surface)]">{siteConfig.name}</p>
        <div className="footer-links">
          <Link className="footer-link" href={siteConfig.linkedinUrl} target="_blank">
            LinkedIn
          </Link>
          <Link className="footer-link" href={`mailto:${siteConfig.email}`}>
            Email
          </Link>
          <a className="footer-link" href="/resume.pdf">
            Resume
          </a>
        </div>
      </Container>
    </footer>
  );
}
