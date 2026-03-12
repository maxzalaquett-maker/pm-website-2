"use client";

import { useActionState } from "react";

import { unlockWork } from "@/app/access/actions";

type AccessFormProps = {
  nextPath: string;
};

const initialState = {
  error: "",
};

export function AccessForm({ nextPath }: AccessFormProps) {
  const [state, formAction, isPending] = useActionState(unlockWork, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={nextPath} />
      <div>
        <label className="mb-2 block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none focus:border-[var(--accent)]"
        />
      </div>
      {state.error ? <p className="text-sm text-[#a44d3f]">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Checking..." : "Unlock work"}
      </button>
    </form>
  );
}
