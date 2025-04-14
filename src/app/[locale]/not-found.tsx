import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";

import { PageContainer } from "@/components/layout/sections";
import { TypographyH1, TypographyH2, TypographyLarge } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function NotFoundPage() {
  const t = await getTranslations("NotFoundPage");

  return (
    <PageContainer className="text-center">
      <TypographyH1 className="mt-8 text-5xl">404</TypographyH1>
      <div className="mx-auto w-fit">
        <TypographyH2>{t("title")}</TypographyH2>
        <Separator />
      </div>
      <TypographyLarge>{t("description")}</TypographyLarge>
      <Link href={AppRoutes.homePage} className={buttonVariants()}>
        {t("buttonLabel")}
      </Link>
    </PageContainer>
  );
}
