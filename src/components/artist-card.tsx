import { Artist } from "@prisma/client";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { capitalize } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

type ArtistCardProps = Pick<Artist, "slug" | "artistName" | "musicalGenre">;

export function ArtistCard({ slug, artistName, musicalGenre }: ArtistCardProps) {
  return (
    <div className="bg-secondary hover:bg-primary-foreground relative rounded-lg px-5 py-3 shadow-sm transition-colors">
      <Link
        href={`${AppRoutes.artistsPage}/${slug}`}
        className="flex items-center justify-between text-2xl font-medium"
      >
        <span className="absolute inset-0" />
        <h3>{artistName}</h3>
        {musicalGenre ? <Badge>{capitalize(musicalGenre)}</Badge> : null}
      </Link>
    </div>
  );
}
