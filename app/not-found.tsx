import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center px-6 py-20">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Not found</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">That page does not exist.</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
        The link may be outdated, or the page may have been moved.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="button-secondary"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
