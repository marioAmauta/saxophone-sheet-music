import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { getSearchedTotalSong, getSongsBySongTitleOrArtistName } from "@/data-access/song";

import { SortOptions } from "@/lib/types";
import { getPaginationParams, getSortingOption } from "@/lib/utils";

import { PaginationControl } from "@/components/layout/pagination-control";
import { SortingControl, SortingOptionsArray } from "@/components/layout/sorting-control";
import { SongCard } from "@/components/song-card";
import { SongsList } from "@/components/songs-list";
import { TypographyLarge } from "@/components/typography";

import { RecentSearches } from "./recent-searches";

type SearchResultsProps = {
  searchParams: SearchParamsSync;
};

export async function SearchResults({ searchParams }: SearchResultsProps) {
  const t = await getTranslations("SearchResults");
  const tSorting = await getTranslations("sorting");

  const userSearch = searchParams.q as string;

  if (!userSearch) {
    return <RecentSearches />;
  }

  const { page, limit, start, end } = getPaginationParams({ searchParams });

  const sortingOptionsArray: SortingOptionsArray = [
    { label: tSorting("az"), value: "azSong" },
    { label: tSorting("za"), value: "zaSong" },
    { label: tSorting("latest"), value: "newest" },
    { label: tSorting("oldest"), value: "oldest" }
  ];

  const sort = searchParams.sort as SortOptions;

  const [foundSongs, totalFoundSongs] = await Promise.all([
    getSongsBySongTitleOrArtistName({
      userSearch,
      skip: start,
      take: limit,
      sort: getSortingOption(sort || sortingOptionsArray[0].value)
    }),
    getSearchedTotalSong({ userSearch })
  ]);

  if (foundSongs.length > 0) {
    return (
      <>
        <div className="text-center">
          <TypographyLarge>{t("withResult")}</TypographyLarge>
          <TypographyLarge className="break-all">{`"${userSearch}"`}</TypographyLarge>
        </div>
        <Suspense>
          <SortingControl
            key={sort}
            quantityLabel={t("quantityLabel")}
            start={start}
            end={end}
            totalItems={totalFoundSongs}
            sortingOptions={sortingOptionsArray}
          />
        </Suspense>
        <SongsList>
          {foundSongs.map((song) => (
            <SongCard key={song.slug} {...song} />
          ))}
        </SongsList>
        <Suspense>
          <PaginationControl start={start} end={end} page={page} limit={limit} totalItems={totalFoundSongs} />
        </Suspense>
      </>
    );
  }

  return (
    <div className="text-center">
      <TypographyLarge>{t("withoutResult")}</TypographyLarge>
      <TypographyLarge className="break-all">{`"${userSearch}"`}</TypographyLarge>
    </div>
  );
}
