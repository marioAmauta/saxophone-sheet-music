"use server";

import { APIError } from "better-auth/api";
import { getLocale, getTranslations } from "next-intl/server";

import { redirect } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { auth } from "@/lib/auth";
import { ActionReturnType } from "@/lib/types";
import { loginSchema, registerSchema } from "@/lib/zod-schemas";

export async function registerAction(data: unknown): Promise<ActionReturnType> {
  const t = await getTranslations("RegisterForm");

  const parsedRegisterData = registerSchema(t).safeParse(data);

  if (!parsedRegisterData.success) {
    return {
      success: false,
      errorMessage: t("invalidCredentials")
    };
  }

  const { name, email, password } = parsedRegisterData.data;

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password
      }
    });
  } catch (error) {
    if (error instanceof APIError) {
      const errorCodes = auth.$ERROR_CODES;

      if (error.body) {
        if (error.body.message === errorCodes.PASSWORD_TOO_SHORT) {
          return {
            success: false,
            errorMessage: t("passwordTooShort")
          };
        }

        if (error.body.message === errorCodes.USER_ALREADY_EXISTS) {
          return {
            success: false,
            errorMessage: t("shouldChooseAnotherEmail")
          };
        }
      }
    }
  }

  const locale = await getLocale();

  redirect({ href: AppRoutes.homePage, locale });
}

export async function loginAction(data: unknown): Promise<ActionReturnType> {
  const t = await getTranslations("LoginForm");
  const errorT = await getTranslations("RegisterForm");

  const parsedLoginData = loginSchema(t).safeParse(data);

  if (!parsedLoginData.success) {
    return {
      success: false,
      errorMessage: t("invalidCredentials")
    };
  }

  const { email, password } = parsedLoginData.data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password
      }
    });
  } catch (error) {
    if (error instanceof APIError) {
      console.error({ error });

      return {
        success: false,
        errorMessage: errorT("invalidCredentials")
      };
    }
  }

  const locale = await getLocale();

  redirect({ href: AppRoutes.homePage, locale });
}
