import { Link } from "@/i18n/navigation";

import { SongCardDataType } from "@/lib/types";
import { capitalize } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

type SongCardProps = Omit<SongCardDataType, "slug"> & {
  href: string;
};

export function SongCard({ href, title, artist: { artistName, musicalGenre } }: SongCardProps) {
  return (
    <div className="bg-secondary hover:bg-primary-foreground relative rounded-lg px-5 py-3 shadow-sm transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="break-all">{artistName}</h3>
        {musicalGenre ? <Badge>{capitalize(musicalGenre)}</Badge> : null}
      </div>
      <Link href={href} className="text-3xl font-medium">
        <span className="absolute inset-0" />
        {title}
      </Link>
    </div>
  );
}
