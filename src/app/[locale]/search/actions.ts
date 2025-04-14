"use server";

import prisma from "@/db";

export async function getSongsBySongTitleOrArtistName({ userSearch }: { userSearch: string }) {
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
    select: {
      slug: true,
      title: true,
      artist: {
        select: {
          artistName: true,
          musicalGenre: true
        }
      }
    },
    orderBy: {
      title: "asc"
    }
  });
}
