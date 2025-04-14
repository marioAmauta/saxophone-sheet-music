import { BookOpenText, Download, Edit, Music, Music2, Video } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { LikeSongButton } from "@/app/songs/like-song-button";

import { isLikedSong, getSongBySlug } from "@/data-access/song";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { getUserSession } from "@/lib/session";
import { BreadcrumbItemType } from "@/lib/types";
import { capitalize } from "@/lib/utils";

import { LikeProvider } from "@/hooks/use-like-context";

import { DeleteSongButton } from "@/components/delete-song-button";
import { BreadcrumbControl } from "@/components/layout/breadcrumb-control";
import { PageContainer } from "@/components/layout/sections";
import { TypographyH1, TypographyH2 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type SongSegment = "songs" | "favoriteSongs";

type SongDetailProps = {
  params: Params<{ slug: string }>;
  songSegment: SongSegment;
};

export async function SongDetail({ params, songSegment }: SongDetailProps) {
  const { slug } = await params;

  const song = await getSongBySlug({ slug });

  if (!song) {
    notFound();
  }

  const t = await getTranslations("SongDetailPage");

  const { isAdmin } = await getUserSession();

  const isFavorite = await isLikedSong({ songId: song.id });

  const tNavbar = await getTranslations("navbar");

  const customOptions: Record<SongSegment, BreadcrumbItemType> = {
    songs: {
      href: AppRoutes.songsPage,
      label: tNavbar("songs")
    },
    favoriteSongs: {
      href: AppRoutes.favoriteSongsPage,
      label: tNavbar("favoriteSongs")
    }
  };

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      href: AppRoutes.homePage,
      label: tNavbar("home")
    },
    ...[customOptions[songSegment]],
    {
      label: song.title
    }
  ];

  return (
    <LikeProvider like={isFavorite}>
      <PageContainer>
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <div className="flex flex-col gap-4">
            <TypographyH1>{song.title}</TypographyH1>
            <Link href={AppRoutes.artistsDetailPage({ slug: song.artist.slug })} className="w-fit">
              <Badge>{song.artist.artistName}</Badge>
            </Link>
            {song.artist.musicalGenre ? (
              <Link
                href={AppRoutes.musicalGenreDetailPage({ musicalGenre: song.artist.musicalGenre })}
                className="w-fit"
              >
                <Badge>{capitalize(song.artist.musicalGenre)}</Badge>
              </Link>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            {isAdmin ? (
              <>
                <DeleteSongButton id={song.id} />
                <Link
                  href={AppRoutes.editSongPage({ slug })}
                  className={buttonVariants({ variant: "outline", className: "flex items-center gap-2" })}
                >
                  <Edit className="size-4" />
                  {t("editSongButton")}
                </Link>
              </>
            ) : null}
            <LikeSongButton className="hidden md:flex" songId={song.id} />
          </div>
        </div>
        <div className="space-y-4">
          <TypographyH2>{t("resourcesTitle")}</TypographyH2>
          <Separator />
          <BreadcrumbControl breadcrumbItems={breadcrumbItems} />
        </div>
        <div className="mx-auto grid max-w-(--breakpoint-sm) gap-6 md:gap-8">
          {song.artist.biographyLink ? (
            <a
              href={song.artist.biographyLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", className: "flex gap-2" })}
            >
              <BookOpenText className="size-4" />
              <span>{t("biographyLink")}</span>
            </a>
          ) : null}
          <a
            href={song.originalSongLink}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", className: "flex gap-2" })}
          >
            <Music className="size-4" />
            <span>{t("originalSong")}</span>
          </a>
          <a
            href={song.youTubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", className: "flex gap-2" })}
          >
            <Video className="size-4" />
            <span>{t("youTubeLink")}</span>
          </a>
          {song.audioFiles.map((audioFile) => (
            <a
              key={audioFile.id}
              href={audioFile.url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className={buttonVariants({ variant: "outline", className: "flex gap-2" })}
            >
              <Download className="size-4" />
              <span>{t("audioTrack")}</span>
            </a>
          ))}
          {song.sheets.map((sheet) => (
            <a
              key={sheet.id}
              href={sheet.url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className={buttonVariants({ variant: "outline", className: "flex gap-2" })}
            >
              <Music2 className="size-4" />
              <span>{t(`musicSheets.${sheet.instrumentKey}` as TranslationKey)}</span>
            </a>
          ))}
          <Separator className="md:hidden" />
          <LikeSongButton className="mx-auto w-fit md:hidden" songId={song.id} />
        </div>
      </PageContainer>
    </LikeProvider>
  );
}
