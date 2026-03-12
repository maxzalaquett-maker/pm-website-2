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
      {state.error ? <p className="text-sm text-[#7a2e20]">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Checking..." : "Unlock work"}
      </button>
    </form>
  );
}
