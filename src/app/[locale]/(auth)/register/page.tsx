import { useTranslations } from "next-intl";

import { routing } from "@/i18n/routing";

import { AppRoutes } from "@/lib/app-routes";
import { DATA_CY_ELEMENTS } from "@/lib/constants";

import { MessageWithLink } from "@/components/layout/message-with-link";
import { PageContainer } from "@/components/layout/sections";
import { TypographyH1 } from "@/components/typography";

import { RegisterForm } from "./register-form";

export const experimental_ppr = true;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function RegisterPage() {
  const t = useTranslations("RegisterPage");

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <RegisterForm />
      <MessageWithLink
        href={AppRoutes.loginPage}
        dataCyLink={DATA_CY_ELEMENTS.loginLink}
        linkLabel={t("loginLink")}
        messageText={t("alreadyHaveAccount")}
      />
    </PageContainer>
  );
}
