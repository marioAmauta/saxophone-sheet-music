import prisma from "@/db";
import sgMail from "@sendgrid/mail";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { createTranslator, Locale } from "use-intl/core";

import { routing } from "@/i18n/routing";

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
    database: {
      generateId: () => new ObjectId().toString()
    }
  },
  database: prismaAdapter(prisma, {
    provider: "mongodb"
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

      const cookiesObject = await cookies();

      const locale = (cookiesObject.get("NEXT_LOCALE")?.value as Locale) || routing.defaultLocale;

      const t = createTranslator({
        locale,
        messages: {
          en: {
            subject: "Recover Password",
            text: "Recover your password in"
          },
          es: {
            subject: "Recuperar contraseña",
            text: "Recupera tu contraseña en"
          }
        }
      });

      const subjectContent = t(`${locale}.subject`);
      const textContent = t(`${locale}.text`);

      const message = {
        to: user.email,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject: subjectContent,
        text: `${textContent}: ${url}`
      };

      await sgMail.send(message);
    }
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
