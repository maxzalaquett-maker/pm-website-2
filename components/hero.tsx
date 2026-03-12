import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col px-6 py-16 sm:py-20">
      <div className="max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
          Product strategy for complex platforms
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Product strategist focused on building trusted digital products.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
          I help organizations simplify complex systems so customers can clearly understand what
          they have, what they can do, and what happens next.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/work"
          className="button-primary"
        >
          View Work
        </Link>
        <a
          href="/resume.pdf"
          className="button-secondary"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}
