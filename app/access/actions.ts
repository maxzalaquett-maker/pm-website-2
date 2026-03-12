"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getWorkPassword, isWorkProtectionEnabled, WORK_ACCESS_COOKIE } from "@/lib/work-auth";

function normalizeNextPath(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.startsWith("/")) {
    return "/work";
  }

  return value;
}

export async function unlockWork(_: { error?: string } | undefined, formData: FormData) {
  const nextPath = normalizeNextPath(formData.get("next"));
  const password = formData.get("password");

  if (!isWorkProtectionEnabled()) {
    redirect(nextPath as Parameters<typeof redirect>[0]);
  }

  if (typeof password !== "string" || password !== getWorkPassword()) {
    return { error: "Incorrect password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(WORK_ACCESS_COOKIE, getWorkPassword(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect(nextPath as Parameters<typeof redirect>[0]);
}

export async function lockWork() {
  const cookieStore = await cookies();
  cookieStore.delete(WORK_ACCESS_COOKIE);
  redirect("/");
}
