import { useTranslations } from "next-intl";

import { LoginButton } from "@/app/login-button";
import { SignUpButton } from "@/app/signup-button";

import { PageContainer } from "@/components/layout/sections";
import { TypographyH1, TypographyP } from "@/components/typography";

export default function AccountRequiredPage() {
  const t = useTranslations("AccountRequiredPage");

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <TypographyP>{t("description")}</TypographyP>
      <div className="flex gap-4">
        <SignUpButton />
        <LoginButton />
      </div>
    </PageContainer>
  );
}
