import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { getArtistsByMusicalGenre, getTotalArtistsByMusicalGenre } from "@/data-access/artist";

import { AppRoutes } from "@/lib/app-routes";
import { BreadcrumbItemType, SortOptions } from "@/lib/types";
import { capitalize, getPaginationParams, getSortingOption } from "@/lib/utils";

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

type MusicalGenreDetailPageProps = {
  params: Params<{ musicalGenre: string }>;
  searchParams: SearchParams;
};

export default async function MusicalGenreDetailPage({ params, searchParams }: MusicalGenreDetailPageProps) {
  const t = await getTranslations("MusicalGenreDetailPage");
  const tSorting = await getTranslations("sorting");

  const { musicalGenre } = await params;

  const decodedMusicalGenre = decodeURIComponent(musicalGenre);

  const capitalizedMusicalGenre = capitalize(decodedMusicalGenre);

  const sortingOptionsArray: SortingOptionsArray = [
    { label: tSorting("latest"), value: "newest" },
    { label: tSorting("oldest"), value: "oldest" },
    { label: tSorting("az"), value: "azArtist" },
    { label: tSorting("za"), value: "zaArtist" }
  ];

  const awaitedSearchParams = await searchParams;

  const { page, limit, start, end } = getPaginationParams({ searchParams: awaitedSearchParams });

  const [foundArtists, totalArtists] = await Promise.all([
    getArtistsByMusicalGenre({
      musicalGenre: decodedMusicalGenre,
      skip: start,
      take: limit,
      sort: getSortingOption((awaitedSearchParams.sort as SortOptions) || sortingOptionsArray[0].value)
    }),
    getTotalArtistsByMusicalGenre({
      musicalGenre: decodedMusicalGenre
    })
  ]);

  const tNavbar = await getTranslations("navbar");

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      href: AppRoutes.homePage,
      label: tNavbar("home")
    },
    {
      href: AppRoutes.musicalGenresPage,
      label: tNavbar("musicalGenres")
    },
    {
      label: capitalizedMusicalGenre
    }
  ];

  return (
    <PageContainer>
      <TypographyH1>{capitalizedMusicalGenre}</TypographyH1>
      <Separator />
      <BreadcrumbControl breadcrumbItems={breadcrumbItems} />
      {foundArtists.length > 0 ? (
        <>
          <Suspense>
            <SortingControl
              quantityLabel={t("quantityLabel")}
              start={start}
              end={end}
              totalItems={totalArtists}
              sortingOptions={sortingOptionsArray}
            />
          </Suspense>
          <SongsList>
            {foundArtists.map((artist) => (
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
          <Message>{t("noArtistFound")}</Message>
          <div className="flex justify-center">
            <GoBackButton />
          </div>
        </>
      )}
    </PageContainer>
  );
}
