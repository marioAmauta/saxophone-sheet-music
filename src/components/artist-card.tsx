import { Artist } from "@prisma/client";

import { Link } from "@/i18n/navigation";

import { ApiRoutes } from "@/lib/api-routes";
import { AppRoutes } from "@/lib/app-routes";
import { capitalize } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarImage } from "./ui/avatar";

type ArtistCardProps = Pick<Artist, "slug" | "artistName" | "musicalGenre">;

export async function ArtistCard({ slug, artistName, musicalGenre }: ArtistCardProps) {
  const artistImage = await fetch(await ApiRoutes.spotifyApiArtist({ artistName }), {
    cache: "force-cache",
    next: {
      revalidate: 3600 * 12
    }
  });

  const artistImageData = await artistImage.json();

  const smallImage = artistImageData.images[2];

  return (
    <div className="bg-secondary hover:bg-primary-foreground relative rounded-lg px-5 py-3 shadow-sm transition-colors">
      <Link href={`${AppRoutes.artistsPage}/${slug}`} className="flex gap-4">
        <div className="flex flex-col justify-center gap-2 text-2xl font-medium">
          <span className="absolute inset-0" />
          <h3>{artistName}</h3>
          {musicalGenre ? <Badge>{capitalize(musicalGenre)}</Badge> : null}
        </div>
        {smallImage ? (
          <Avatar className="ml-auto size-20">
            <AvatarImage src={smallImage.url} />
          </Avatar>
        ) : null}
      </Link>
    </div>
  );
}
