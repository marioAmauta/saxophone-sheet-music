import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { getLikedSongs, getTotalFavoriteSongs } from "@/data-access/song";

import { redirect } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { getUserSession } from "@/lib/session";
import { BreadcrumbItemType, SortOptions } from "@/lib/types";
import { getPaginationParams, getSortingOption } from "@/lib/utils";

import { GoBackButton } from "@/components/go-back-button";
import { BreadcrumbControl } from "@/components/layout/breadcrumb-control";
import { PaginationControl } from "@/components/layout/pagination-control";
import { PageContainer } from "@/components/layout/sections";
import { SortingControl, SortingOptionsArray } from "@/components/layout/sorting-control";
import { Message } from "@/components/messages";
import { SongCard } from "@/components/song-card";
import { SongsList } from "@/components/songs-list";
import { TypographyH1 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";

type FavoriteSongsPageProps = {
  searchParams: SearchParams;
};

export default async function FavoriteSongsPage({ searchParams }: Readonly<FavoriteSongsPageProps>) {
  const { user } = await getUserSession();

  if (!user) {
    const locale = await getLocale();
    return redirect({ href: AppRoutes.accountRequiredPage, locale });
  }

  const t = await getTranslations("FavoriteSongsPage");
  const tSorting = await getTranslations("sorting");

  const awaitedSearchParams = await searchParams;

  const { page, limit, start, end } = getPaginationParams({ searchParams: awaitedSearchParams });

  const sortingOptionsArray: SortingOptionsArray = [
    { label: tSorting("latest"), value: "newestLiked" },
    { label: tSorting("oldest"), value: "oldestLiked" },
    { label: tSorting("az"), value: "azLiked" },
    { label: tSorting("za"), value: "zaLiked" }
  ];

  const sort = awaitedSearchParams.sort as SortOptions;

  const [userLikedSongs, totalFavoriteSongs] = await Promise.all([
    getLikedSongs({
      userId: user.id,
      skip: start,
      take: limit,
      sort: getSortingOption(sort || sortingOptionsArray[0].value)
    }),
    getTotalFavoriteSongs({ userId: user.id })
  ]);

  const favoriteSongs = userLikedSongs.map(({ song }) => song);

  const tNavbar = await getTranslations("navbar");

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      href: AppRoutes.homePage,
      label: tNavbar("home")
    },
    {
      href: AppRoutes.favoriteSongsPage,
      label: tNavbar("favoriteSongs")
    }
  ];

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <Separator />
      <BreadcrumbControl breadcrumbItems={breadcrumbItems} />
      {favoriteSongs.length > 0 ? (
        <>
          <Suspense>
            <SortingControl
              key={sort}
              quantityLabel={t("quantityLabel")}
              start={start}
              end={end}
              totalItems={totalFavoriteSongs}
              sortingOptions={sortingOptionsArray}
            />
          </Suspense>
          <SongsList>
            {favoriteSongs.map((song) => (
              <SongCard key={song.slug} {...song} />
            ))}
          </SongsList>
          <Suspense>
            <PaginationControl start={start} end={end} page={page} limit={limit} totalItems={totalFavoriteSongs} />
          </Suspense>
        </>
      ) : (
        <>
          <Message>{t("noSongs")}</Message>
          <div className="flex justify-center">
            <GoBackButton />
          </div>
        </>
      )}
    </PageContainer>
  );
}
