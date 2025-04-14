"use client";

import { useLocale, useTranslations } from "next-intl";

import { AppRoutes } from "@/lib/app-routes";
import { authClient } from "@/lib/auth-client";

import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function GoogleLogin() {
  const t = useTranslations("GoogleLogin");
  const locale = useLocale();

  return (
    <Button
      type="button"
      variant="secondary"
      className="flex w-full items-center justify-center gap-2"
      onClick={async () => {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: `/${locale}${AppRoutes.homePage}`
        });
      }}
    >
      <GoogleIcon className="size-4 fill-current" />
      <span>{t("label")}</span>
    </Button>
  );
}
