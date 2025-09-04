import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { getSongs, getTotalSongs } from "@/data-access/song";

import { AppRoutes } from "@/lib/app-routes";
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

type SongsPageProps = {
  searchParams: SearchParams;
};

export default async function SongsPage({ searchParams }: SongsPageProps) {
  const t = await getTranslations("SongsPage");
  const tSorting = await getTranslations("sorting");

  const awaitedSearchParams = await searchParams;

  const { page, limit, start, end } = getPaginationParams({ searchParams: awaitedSearchParams });

  const sortingOptionsArray: SortingOptionsArray = [
    { label: tSorting("latest"), value: "newest" },
    { label: tSorting("oldest"), value: "oldest" },
    { label: tSorting("az"), value: "azSong" },
    { label: tSorting("za"), value: "zaSong" }
  ];

  const sort = awaitedSearchParams.sort as SortOptions;

  const [songs, totalSongs] = await Promise.all([
    getSongs({
      skip: start,
      take: limit,
      sort: getSortingOption(sort || sortingOptionsArray[0].value)
    }),
    getTotalSongs()
  ]);

  const tNavbar = await getTranslations("navbar");

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      href: AppRoutes.homePage,
      label: tNavbar("home")
    },
    {
      href: AppRoutes.songsPage,
      label: tNavbar("songs")
    }
  ];

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <Separator />
      <BreadcrumbControl breadcrumbItems={breadcrumbItems} />
      {songs.length > 0 ? (
        <>
          <Suspense>
            <SortingControl
              key={sort}
              quantityLabel={t("quantityLabel")}
              start={start}
              end={end}
              totalItems={totalSongs}
              sortingOptions={sortingOptionsArray}
            />
          </Suspense>
          <SongsList>
            {songs.map((song) => (
              <SongCard key={song.slug} {...song} />
            ))}
          </SongsList>
          <Suspense>
            <PaginationControl start={start} end={end} page={page} limit={limit} totalItems={totalSongs} />
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
