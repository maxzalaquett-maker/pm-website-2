type SkillTagProps = {
  label: string;
};

export function SkillTag({ label }: SkillTagProps) {
  return (
    <span className="rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--muted)]">
      {label}
    </span>
  );
}
