import { Artist } from "@prisma/client";

import { getArtistImages } from "@/data-access/spotify";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { capitalize, cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { badgeVariants } from "@/components/ui/badge";

type ArtistCardProps = Pick<Artist, "slug" | "artistName" | "musicalGenre">;

export async function ArtistCard({ slug, artistName, musicalGenre }: Readonly<ArtistCardProps>) {
  const artistImagesData = await getArtistImages({ artistName });
  const smallImage = artistImagesData?.[2];

  return (
    <div className="bg-secondary hover:bg-primary-foreground relative flex rounded-lg px-5 py-3 shadow-sm transition-colors">
      <div className="flex flex-col gap-2 text-2xl font-medium">
        <Link href={`${AppRoutes.artistsPage}/${slug}`} className="absolute inset-0" />
        <h3>{artistName}</h3>
        {musicalGenre ? (
          <Link
            href={AppRoutes.musicalGenreDetailPage({ musicalGenre })}
            className={cn(badgeVariants(), "z-20 transition-colors")}
          >
            {capitalize(musicalGenre)}
          </Link>
        ) : null}
      </div>
      {smallImage ? (
        <Avatar className="ml-auto size-20">
          <AvatarImage src={smallImage.url} />
        </Avatar>
      ) : null}
    </div>
  );
}
