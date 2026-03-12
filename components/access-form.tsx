"use client";

import { useActionState } from "react";

import { unlockWork } from "@/app/access/actions";
import { Button } from "@/components/button";

type AccessFormProps = {
  nextPath: string;
};

const initialState = {
  error: "",
};

export function AccessForm({ nextPath }: AccessFormProps) {
  const [state, formAction, isPending] = useActionState(unlockWork, initialState);

  return (
    <form action={formAction} className="space-y-[var(--space-4)]">
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
          className="surface-field"
        />
      </div>
      {state.error ? <p className="text-sm text-[var(--danger)]">{state.error}</p> : null}
      <Button type="submit" disabled={isPending} className="w-full disabled:cursor-not-allowed disabled:opacity-70">
        {isPending ? "Checking..." : "Unlock work"}
      </Button>
    </form>
  );
}
