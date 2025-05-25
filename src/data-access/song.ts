import prisma from "@/db";
import { cache } from "react";

import { getUserSession } from "@/lib/session";
import { PaginationArgs, SongCardDataType } from "@/lib/types";

export const getSongsBySongTitleOrArtistName = cache(
  async ({ userSearch, skip, sort, take }: { userSearch: string } & PaginationArgs) => {
    return await prisma.song.findMany({
      where: {
        OR: [
          {
            title: {
              mode: "insensitive",
              contains: userSearch
            }
          },
          {
            artist: {
              artistName: {
                mode: "insensitive",
                contains: userSearch
              }
            }
          }
        ]
      },
      skip,
      take,
      orderBy: sort,
      select: {
        slug: true,
        title: true,
        artist: {
          select: {
            artistName: true,
            musicalGenre: true
          }
        }
      }
    });
  }
);

export const getSearchedTotalSong = cache(async ({ userSearch }: { userSearch: string }) => {
  return await prisma.song.count({
    where: {
      OR: [
        {
          title: {
            mode: "insensitive",
            contains: userSearch
          }
        },
        {
          artist: {
            artistName: {
              mode: "insensitive",
              contains: userSearch
            }
          }
        }
      ]
    }
  });
});

export const getSongs = cache(async ({ skip, take, sort }: PaginationArgs): Promise<SongCardDataType[]> => {
  return await prisma.song.findMany({
    skip,
    take,
    orderBy: sort,
    select: {
      title: true,
      slug: true,
      artist: {
        select: {
          artistName: true,
          musicalGenre: true
        }
      }
    }
  });
});

export const getArtistSongsById = cache(
  async ({ artistId, skip, take, sort }: { artistId: string } & PaginationArgs) => {
    return await prisma.song.findMany({
      where: {
        artistId
      },
      skip,
      take,
      orderBy: sort,
      select: {
        title: true,
        slug: true
      }
    });
  }
);

export const getTotalArtistSongsById = cache(async ({ artistId }: { artistId: string }) => {
  return await prisma.song.count({
    where: {
      artistId
    }
  });
});

export const getTotalSongs = cache(async () => {
  return await prisma.song.count();
});

export async function isLikedSong({ songId }: { songId: string }) {
  const { user } = await getUserSession();

  if (!user) {
    return false;
  }

  const songLike = await prisma.songLike.findFirst({
    where: {
      userId: user.id,
      songId
    }
  });

  return !!songLike;
}

export const getSongBySlug = cache(async ({ slug }: { slug: string }) => {
  return await prisma.song.findFirst({
    where: {
      slug
    },
    include: {
      artist: true,
      sheets: true,
      audioFiles: true
    }
  });
});

export async function getLikedSongs({ skip, sort, take, userId }: { userId: string } & PaginationArgs) {
  return await prisma.songLike.findMany({
    where: {
      userId
    },
    skip,
    take,
    orderBy: sort,
    select: {
      song: {
        select: {
          title: true,
          slug: true,
          artist: {
            select: {
              artistName: true,
              musicalGenre: true
            }
          }
        }
      }
    }
  });
}

export async function getTotalFavoriteSongs({ userId }: { userId: string }) {
  return await prisma.songLike.count({
    where: {
      userId
    }
  });
}

export const getSongBySlugForEdit = cache(async ({ slug }: { slug: string }) => {
  return await prisma.song.findUnique({
    where: {
      slug
    },
    select: {
      id: true,
      slug: true,
      title: true,
      youTubeLink: true,
      originalSongLink: true,
      audioFiles: true,
      sheets: true,
      artist: {
        select: {
          artistName: true
        }
      }
    }
  });
});
