import { getLocale, getTranslations } from "next-intl/server";

import { redirect } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { getUserSession } from "@/lib/session";

import { PageContainer } from "@/components/layout/sections";
import { TypographyH1 } from "@/components/typography";

import { CreateSongForm } from "./create-song-form";

export default async function CreateSongPage() {
  const { isAdmin, user } = await getUserSession();

  const locale = await getLocale();

  if (!user) {
    return redirect({ href: AppRoutes.loginPage, locale });
  }

  if (!isAdmin) {
    return redirect({ href: AppRoutes.homePage, locale });
  }

  const t = await getTranslations("CreateSongPage");

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <CreateSongForm />
    </PageContainer>
  );
}
