import { Link } from "@/i18n/navigation";

import { ApiRoutes } from "@/lib/api-routes";
import { SongCardDataType } from "@/lib/types";
import { capitalize } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarImage } from "./ui/avatar";

type SongCardProps = Omit<SongCardDataType, "slug"> & {
  href: string;
};

export async function SongCard({ href, title, artist: { artistName, musicalGenre } }: SongCardProps) {
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
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Link href={href} className="text-3xl font-medium">
            <span className="absolute inset-0" />
            {title}
          </Link>
          {musicalGenre ? <Badge>{capitalize(musicalGenre)}</Badge> : null}
        </div>
        <div className="grid">
          {smallImage ? (
            <Avatar className="ml-auto size-20">
              <AvatarImage src={smallImage.url} />
            </Avatar>
          ) : null}
          <h3 className="break-all">{artistName}</h3>
        </div>
      </div>
    </div>
  );
}
