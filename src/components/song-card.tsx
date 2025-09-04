import { Link } from "@/i18n/navigation";

import { ApiRoutes } from "@/lib/api-routes";
import { AppRoutes } from "@/lib/app-routes";
import { SongCardDataType } from "@/lib/types";
import { capitalize, cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { badgeVariants } from "@/components/ui/badge";

type SongCardProps = SongCardDataType;

export async function SongCard({
  slug: songSlug,
  title,
  artist: { slug: artistSlug, artistName, musicalGenre }
}: SongCardProps) {
  const songAlbumImage = await fetch(await ApiRoutes.spotifyApiSong({ songName: title, artistName }), {
    cache: "force-cache",
    next: {
      revalidate: 3600 * 12
    }
  });

  const artistImageData = await songAlbumImage.json();

  const smallImage = artistImageData.images[2];

  return (
    <div className="bg-secondary hover:bg-primary-foreground relative rounded-lg px-5 py-3 shadow-sm transition-colors">
      <div className="flex h-full justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Link href={AppRoutes.songsPageDetail({ slug: songSlug })} className="text-3xl font-medium">
            <span className="absolute inset-0 z-10" />
            {title}
          </Link>
          <Link href={AppRoutes.artistsDetailPage({ slug: artistSlug })} className="z-20 block w-fit hover:underline">
            <h3 className="break-all">{artistName}</h3>
          </Link>
          {musicalGenre ? (
            <Link
              href={AppRoutes.musicalGenreDetailPage({ musicalGenre })}
              className={cn(badgeVariants(), "z-20 transition-colors")}
            >
              {capitalize(musicalGenre)}
            </Link>
          ) : null}
        </div>
        <div className="grid place-content-center">
          {smallImage ? (
            <Avatar className="ml-auto size-20">
              <AvatarImage src={smallImage.url} />
            </Avatar>
          ) : null}
        </div>
      </div>
    </div>
  );
}
