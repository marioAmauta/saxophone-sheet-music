import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { cn } from "@/lib/utils";

import { PageContainer } from "@/components/layout/sections";
import { TypographyH1, TypographyP } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";

export default function AccountRequiredPage() {
  const t = useTranslations("AccountRequiredPage");

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <TypographyP>{t("description")}</TypographyP>
      <Link href={AppRoutes.loginPage} className={cn(buttonVariants(), "bg-primary")}>
        {t("buttonLabel")}
      </Link>
    </PageContainer>
  );
}
