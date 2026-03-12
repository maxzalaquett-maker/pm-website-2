import { NextRequest, NextResponse } from "next/server";

import { getWorkPassword, isWorkProtectionEnabled, WORK_ACCESS_COOKIE } from "@/lib/work-auth";

export function proxy(request: NextRequest) {
  if (!isWorkProtectionEnabled()) {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(WORK_ACCESS_COOKIE)?.value;

  if (cookieValue === getWorkPassword()) {
    return NextResponse.next();
  }

  const accessUrl = new URL("/access", request.url);
  accessUrl.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);

  return NextResponse.redirect(accessUrl);
}

export const config = {
  matcher: ["/work/:path*"],
};
