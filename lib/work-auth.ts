export const WORK_ACCESS_COOKIE = "work_access";

export function getWorkPassword() {
  return process.env.WORK_PAGE_PASSWORD?.trim() ?? "";
}

export function isWorkProtectionEnabled() {
  return getWorkPassword().length > 0;
}
