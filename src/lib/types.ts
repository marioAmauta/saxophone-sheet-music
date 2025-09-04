import { Prisma } from "@prisma/client";

import { getUserSession } from "./session";

export type ActionReturnType = { success: boolean; errorMessage: string } | undefined;

export type SongCardDataType = Prisma.SongGetPayload<{
  select: {
    slug: true;
    title: true;
    artist: {
      select: {
        slug: true;
        artistName: true;
        musicalGenre: true;
      };
    };
  };
}>;

export type LinkType = {
  href: string;
  label: string;
  isAdminLink?: boolean;
  testId?: string;
};

export type DeleteButtonProps = {
  id: string;
  label?: string;
  testId?: string;
  onSuccess?: () => void;
};

export type SortOptions =
  | "newest"
  | "oldest"
  | "azSong"
  | "zaSong"
  | "azArtist"
  | "zaArtist"
  | "newestLiked"
  | "oldestLiked"
  | "azLiked"
  | "zaLiked";

export type PaginationArgs = { skip: number; take: number; sort: object };

export type NavbarProps = Pick<Awaited<ReturnType<typeof getUserSession>>, "user" | "isAdmin">;

export type BreadcrumbItemType = {
  label: string;
  href?: string;
};
