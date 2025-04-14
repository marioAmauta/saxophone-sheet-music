import { getTranslations } from "next-intl/server";

import { getAvailableMusicalGenres } from "@/data-access/artist";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { BreadcrumbItemType } from "@/lib/types";
import { capitalize } from "@/lib/utils";

import { GoBackButton } from "@/components/go-back-button";
import { BreadcrumbControl } from "@/components/layout/breadcrumb-control";
import { PageContainer } from "@/components/layout/sections";
import { Message } from "@/components/messages";
import { TypographyH1 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function MusicalGenresPage() {
  const t = await getTranslations("MusicalGenresPage");

  const availableGenres = (await getAvailableMusicalGenres()).filter((genre) => genre.musicalGenre);

  const tNavbar = await getTranslations("navbar");

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      href: AppRoutes.homePage,
      label: tNavbar("home")
    },
    {
      href: AppRoutes.musicalGenresPage,
      label: tNavbar("musicalGenres")
    }
  ];

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <Separator />
      <BreadcrumbControl breadcrumbItems={breadcrumbItems} />
      {availableGenres.length > 0 ? (
        <div className="mx-auto grid w-max grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
          {availableGenres.map(({ musicalGenre }) => {
            if (!musicalGenre) {
              return null;
            }

            return (
              <Link
                key={musicalGenre}
                href={AppRoutes.musicalGenreDetailPage({ musicalGenre })}
                className={buttonVariants()}
              >
                {capitalize(musicalGenre)}
              </Link>
            );
          })}
        </div>
      ) : (
        <>
          <Message>{t("noMusicalGenres")}</Message>
          <div className="flex justify-center">
            <GoBackButton />
          </div>
        </>
      )}
    </PageContainer>
  );
}
