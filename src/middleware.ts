import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "@/i18n/routing";

import { AppRoutes } from "@/lib/app-routes";
import { getUserSession } from "@/lib/session";

export default async function middleware(request: NextRequest) {
  const { session } = await getUserSession();

  const pathname = request.nextUrl.pathname;

  if (session) {
    if (
      pathname.includes(AppRoutes.loginPage) ||
      pathname.includes(AppRoutes.registerPage) ||
      pathname.includes(AppRoutes.accountRequiredPage)
    ) {
      return NextResponse.redirect(new URL(AppRoutes.homePage, request.url));
    }
  }

  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  runtime: "nodejs"
};
