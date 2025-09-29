import { useTranslations } from "next-intl";

import { AppRoutes } from "@/lib/app-routes";

import { MessageWithLink } from "@/components/layout/message-with-link";
import { PageContainer } from "@/components/layout/sections";
import { TypographyH1 } from "@/components/typography";

import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  const t = useTranslations("RegisterPage");

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <RegisterForm />
      <MessageWithLink href={AppRoutes.loginPage} linkLabel={t("loginLink")} messageText={t("alreadyHaveAccount")} />
    </PageContainer>
  );
}
