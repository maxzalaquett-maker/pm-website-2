import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[var(--foreground)]">Max [Last Name]</p>
        <div className="flex flex-wrap gap-5">
          <Link className="hover:text-[var(--foreground)]" href="https://www.linkedin.com" target="_blank">
            LinkedIn
          </Link>
          <Link className="hover:text-[var(--foreground)]" href="mailto:max@example.com">
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
