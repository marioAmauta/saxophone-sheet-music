import { getLocale, getTranslations } from "next-intl/server";

import { getArtistBySlug } from "@/data-access/artist";

import { redirect } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { getUserSession } from "@/lib/session";

import { PageContainer } from "@/components/layout/sections";
import { TypographyH1 } from "@/components/typography";

import { EditArtistForm } from "./edit-artist-form";

type EditArtistPageProps = {
  params: Params<{ slug: string }>;
};

export default async function EditArtistPage({ params }: EditArtistPageProps) {
  const { user, isAdmin } = await getUserSession();

  const locale = await getLocale();

  if (!user && !isAdmin) {
    return redirect({ href: AppRoutes.loginPage, locale });
  }

  const { slug } = await params;

  const foundArtist = await getArtistBySlug({ slug });

  if (!foundArtist) {
    return redirect({ href: AppRoutes.artistsPage, locale });
  }

  const t = await getTranslations("EditArtistPage");

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <EditArtistForm artist={foundArtist} />
    </PageContainer>
  );
}
