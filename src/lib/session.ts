import { headers } from "next/headers";
import { cache } from "react";

import { auth } from "@/lib/auth";
import { Roles } from "@/lib/enums";

export const getUserSession = cache(async () => {
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
