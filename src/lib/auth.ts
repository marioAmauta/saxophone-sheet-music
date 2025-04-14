import prisma from "@/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { ObjectId } from "mongodb";

import { authCookieName } from "@/lib/constants";
import { Roles } from "@/lib/enums";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }
  },
  advanced: {
    cookiePrefix: authCookieName,
    generateId: () => new ObjectId().toString()
  },
  database: prismaAdapter(prisma, {
    provider: "mongodb"
  }),
  emailAndPassword: {
    enabled: true
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: Roles.User,
        input: false
      }
    }
  },
  plugins: [nextCookies()]
});
