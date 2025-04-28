import { useTranslations } from "next-intl";
import Link from "next/link";

import { AppRoutes } from "@/lib/app-routes";

import { PageContainer } from "@/components/layout/sections";
import { TypographyH1 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";

import { ForgotPasswordForm } from "./forgot-password-form";

export default function ForgotPasswordPage() {
  const t = useTranslations("ForgotPasswordPage");

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <ForgotPasswordForm />
      <div className="flex justify-center">
        <Link href={AppRoutes.loginPage} className={buttonVariants({ variant: "link" })}>
          {t("goToLoginPageButton")}
        </Link>
      </div>
    </PageContainer>
  );
}
