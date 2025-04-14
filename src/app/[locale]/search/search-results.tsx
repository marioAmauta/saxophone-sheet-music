import { getTranslations } from "next-intl/server";

import { getSongsBySongTitleOrArtistName } from "@/app/search/actions";

import { AppRoutes } from "@/lib/app-routes";

import { SongCard } from "@/components/song-card";
import { SongsList } from "@/components/songs-list";
import { TypographyLarge } from "@/components/typography";

import { RecentSearches } from "./recent-searches";

type SearchResultsProps = {
  userSearch: string;
};

export async function SearchResults({ userSearch }: SearchResultsProps) {
  const t = await getTranslations("SearchResults");

  if (!userSearch) {
    return <RecentSearches />;
  }

  const foundSongs = await getSongsBySongTitleOrArtistName({ userSearch });

  if (foundSongs.length > 0) {
    return (
      <>
        <div className="text-center">
          <TypographyLarge>{t("withResult")}</TypographyLarge>
          <TypographyLarge className="break-all">{`"${userSearch}"`}</TypographyLarge>
        </div>
        <SongsList>
          {foundSongs.map((song) => (
            <SongCard key={song.slug} href={AppRoutes.songsPageDetail({ slug: song.slug })} {...song} />
          ))}
        </SongsList>
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
