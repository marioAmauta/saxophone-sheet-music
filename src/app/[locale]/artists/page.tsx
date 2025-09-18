import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { getArtists, getTotalArtists } from "@/data-access/artist";

import { AppRoutes } from "@/lib/app-routes";
import { BreadcrumbItemType, SortOptions } from "@/lib/types";
import { getPaginationParams, getSortingOption } from "@/lib/utils";

import { ArtistCard } from "@/components/artist-card";
import { GoBackButton } from "@/components/go-back-button";
import { BreadcrumbControl } from "@/components/layout/breadcrumb-control";
import { PaginationControl } from "@/components/layout/pagination-control";
import { PageContainer } from "@/components/layout/sections";
import { SortingControl, SortingOptionsArray } from "@/components/layout/sorting-control";
import { Message } from "@/components/messages";
import { SongsList } from "@/components/songs-list";
import { TypographyH1 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";

type ArtistsPageProps = {
  searchParams: SearchParams;
};

export default async function ArtistsPage({ searchParams }: Readonly<ArtistsPageProps>) {
  const awaitedSearchParams = await searchParams;

  const t = await getTranslations("ArtistsPage");
  const tSorting = await getTranslations("sorting");

  const { page, limit, start, end } = getPaginationParams({ searchParams: awaitedSearchParams });

  const sortingOptionsArray: SortingOptionsArray = [
    { label: tSorting("latest"), value: "newest" },
    { label: tSorting("oldest"), value: "oldest" },
    { label: tSorting("az"), value: "azArtist" },
    { label: tSorting("za"), value: "zaArtist" }
  ];

  const sort = awaitedSearchParams.sort as SortOptions;

  const [artists, totalArtists] = await Promise.all([
    getArtists({
      skip: start,
      take: limit,
      sort: getSortingOption(sort || sortingOptionsArray[0].value)
    }),
    getTotalArtists()
  ]);

  const tNavbar = await getTranslations("navbar");

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      href: AppRoutes.homePage,
      label: tNavbar("home")
    },
    {
      href: AppRoutes.artistsPage,
      label: tNavbar("artists")
    }
  ];

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <Separator />
      <BreadcrumbControl breadcrumbItems={breadcrumbItems} />
      {artists.length > 0 ? (
        <>
          <Suspense>
            <SortingControl
              key={sort}
              quantityLabel={t("quantityLabel")}
              start={start}
              end={end}
              totalItems={totalArtists}
              sortingOptions={sortingOptionsArray}
            />
          </Suspense>
          <SongsList>
            {artists.map((artist) => (
              <ArtistCard
                key={artist.slug}
                slug={artist.slug}
                artistName={artist.artistName}
                musicalGenre={artist.musicalGenre}
              />
            ))}
          </SongsList>
          <Suspense>
            <PaginationControl start={start} end={end} page={page} limit={limit} totalItems={totalArtists} />
          </Suspense>
        </>
      ) : (
        <>
          <Message>{t("noArtists")}</Message>
          <div className="flex justify-center">
            <GoBackButton />
          </div>
        </>
      )}
    </PageContainer>
  );
}
