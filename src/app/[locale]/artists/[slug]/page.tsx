import { Edit } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getArtistBySlug } from "@/data-access/artist";
import { getArtistSongsById, getTotalArtistSongsById } from "@/data-access/song";
import { getArtistImages } from "@/data-access/spotify";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { getUserSession } from "@/lib/session";
import { BreadcrumbItemType, SortOptions } from "@/lib/types";
import { capitalize, getPaginationParams, getSortingOption } from "@/lib/utils";

import { GoBackButton } from "@/components/go-back-button";
import { BreadcrumbControl } from "@/components/layout/breadcrumb-control";
import { PaginationControl } from "@/components/layout/pagination-control";
import { PageContainer } from "@/components/layout/sections";
import { SortingControl, SortingOptionsArray } from "@/components/layout/sorting-control";
import { Message } from "@/components/messages";
import { SongCard } from "@/components/song-card";
import { SongsList } from "@/components/songs-list";
import { TypographyH1, TypographyH2 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { DeleteArtistButton } from "./delete-artist-button";

type ArtistDetailPageProps = {
  params: Params<{ slug: string }>;
  searchParams: SearchParams;
};

export default async function ArtistDetailPage({ params, searchParams }: ArtistDetailPageProps) {
  const awaitedParams = await params;

  const foundArtist = await getArtistBySlug({ slug: awaitedParams.slug });

  if (!foundArtist) {
    notFound();
  }

  const t = await getTranslations("ArtistDetailPage");
  const tSorting = await getTranslations("sorting");

  const { isAdmin } = await getUserSession();

  const awaitedSearchParams = await searchParams;

  const { page, limit, start, end } = getPaginationParams({ searchParams: awaitedSearchParams });

  const sortingOptionsArray: SortingOptionsArray = [
    { label: tSorting("latest"), value: "newest" },
    { label: tSorting("oldest"), value: "oldest" },
    { label: tSorting("az"), value: "azSong" },
    { label: tSorting("za"), value: "zaSong" }
  ];

  const [artistSongs, totalArtistSongs] = await Promise.all([
    getArtistSongsById({
      artistId: foundArtist.id,
      skip: start,
      take: limit,
      sort: getSortingOption((awaitedSearchParams.sort as SortOptions) || sortingOptionsArray[0].value)
    }),
    getTotalArtistSongsById({ artistId: foundArtist.id })
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
    },
    {
      label: foundArtist.artistName
    }
  ];

  const artistImagesData = await getArtistImages({ artistName: foundArtist.artistName });
  const bigImage = artistImagesData?.[0];

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row-reverse md:gap-8">
        {bigImage ? (
          <Image
            src={bigImage.url}
            alt={`${foundArtist.artistName} image`}
            width={bigImage.width}
            height={bigImage.height}
            priority
            className="w-full max-w-[24rem] rounded"
          />
        ) : null}
        <div className="flex flex-col items-center justify-center gap-2">
          <TypographyH1 className="text-balance">{foundArtist.artistName}</TypographyH1>
          {foundArtist.musicalGenre ? (
            <Link href={AppRoutes.musicalGenreDetailPage({ musicalGenre: foundArtist.musicalGenre })}>
              <Badge>{capitalize(foundArtist.musicalGenre)}</Badge>
            </Link>
          ) : null}
          <div className="flex gap-2">
            {isAdmin ? (
              <>
                <DeleteArtistButton id={foundArtist.id} />
                <Link
                  href={AppRoutes.editArtistPage({ slug: foundArtist.slug })}
                  className={buttonVariants({ variant: "outline", className: "flex items-center gap-2" })}
                >
                  <Edit className="size-4" />
                  {t("editArtistButton")}
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <TypographyH2>{t("songs")}</TypographyH2>
        <Separator />
        <BreadcrumbControl breadcrumbItems={breadcrumbItems} />
      </div>
      {artistSongs.length > 0 ? (
        <>
          <Suspense>
            <SortingControl
              quantityLabel={t("quantityLabel")}
              start={start}
              end={end}
              totalItems={totalArtistSongs}
              sortingOptions={sortingOptionsArray}
            />
          </Suspense>
          <SongsList>
            {artistSongs.map((song) => (
              <SongCard
                key={song.slug}
                slug={song.slug}
                title={song.title}
                artist={{
                  slug: foundArtist.slug,
                  artistName: foundArtist.artistName,
                  musicalGenre: foundArtist.musicalGenre
                }}
              />
            ))}
          </SongsList>
          <Suspense>
            <PaginationControl start={start} end={end} page={page} limit={limit} totalItems={totalArtistSongs} />
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
