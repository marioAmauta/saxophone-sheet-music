import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";

import { PageContainer } from "@/components/layout/sections";
import { TypographyH1 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";

import { ResetPasswordForm } from "./reset-password-form";

export default function ResetPasswordPage() {
  const t = useTranslations("ResetPasswordPage");

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <ResetPasswordForm />
      <div className="flex justify-center">
        <Link href={AppRoutes.forgotPasswordPage} className={buttonVariants({ variant: "link" })}>
          {t("goToRecoverPassword")}
        </Link>
      </div>
    </PageContainer>
  );
}
