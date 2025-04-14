import { getLocale, getTranslations } from "next-intl/server";

import { getSongBySlugForEdit } from "@/data-access/song";

import { redirect } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { getUserSession } from "@/lib/session";

import { PageContainer } from "@/components/layout/sections";
import { TypographyH1 } from "@/components/typography";

import { EditSongForm } from "./edit-song-form";

type EditSongPageProps = {
  params: Params<{ slug: string }>;
};

export default async function EditSongPage({ params }: EditSongPageProps) {
  const { slug } = await params;

  const { user, isAdmin } = await getUserSession();

  const locale = await getLocale();

  if (!user && !isAdmin) {
    return redirect({ href: AppRoutes.loginPage, locale });
  }

  const foundSong = await getSongBySlugForEdit({ slug });

  if (!foundSong) {
    return redirect({ href: AppRoutes.songsPage, locale });
  }

  const t = await getTranslations("EditSongPage");

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <EditSongForm song={foundSong} />
    </PageContainer>
  );
}
