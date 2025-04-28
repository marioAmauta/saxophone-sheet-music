import { cookies, headers } from "next/headers";
import { cache } from "react";

import { auth } from "@/lib/auth";
import { authCookieName } from "@/lib/constants";
import { Roles } from "@/lib/enums";

export const getUserSession = cache(async () => {
  const authCookie = (await cookies()).get(`${authCookieName}.session_token`);

  if (!authCookie) {
    return {
      user: null,
      session: null,
      isAdmin: false
    };
  }

  let session: Awaited<ReturnType<typeof auth.api.getSession>> = null;

  try {
    session = await auth.api.getSession({
      headers: await headers()
    });
  } catch (error) {
    console.error("Error getting session:", error);
  }

  return {
    ...session,
    isAdmin: session?.user.role === Roles.Admin
  };
});
