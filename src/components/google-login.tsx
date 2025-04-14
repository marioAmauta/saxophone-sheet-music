"use client";

import { useTranslations } from "next-intl";

import { authClient } from "@/lib/auth-client";

import { useAfterLoginRedirect } from "@/hooks/use-after-login-redirect";

import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function GoogleLogin() {
  const t = useTranslations("GoogleLogin");

  const { redirectLink } = useAfterLoginRedirect();

  return (
    <Button
      type="button"
      variant="secondary"
      className="flex w-full items-center justify-center gap-2"
      onClick={async () => {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: redirectLink
        });
      }}
    >
      <GoogleIcon className="size-4 fill-current" />
      <span>{t("label")}</span>
    </Button>
  );
}
