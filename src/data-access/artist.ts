import prisma from "@/db";
import { cache } from "react";

import { PaginationArgs } from "@/lib/types";

export const getArtists = cache(async ({ skip, take, sort }: PaginationArgs) => {
  return await prisma.artist.findMany({
    skip,
    take,
    orderBy: sort,
    select: {
      slug: true,
      artistName: true,
      musicalGenre: true
    }
  });
});

export const getTotalArtists = cache(async () => {
  return await prisma.artist.count();
});

export const getArtistBySlug = cache(async ({ slug }: { slug: string }) => {
  return await prisma.artist.findUnique({
    where: {
      slug
    }
  });
});

export const getArtistsByName = cache(async ({ artistName }: { artistName: string }) => {
  return await prisma.artist.findMany({
    where: {
      artistName: {
        mode: "insensitive",
        contains: artistName
      }
    }
  });
});

export const getArtistsByMusicalGenre = cache(
  async ({ musicalGenre, skip, sort, take }: { musicalGenre: string } & PaginationArgs) => {
    return await prisma.artist.findMany({
      skip,
      take,
      orderBy: sort,
      where: {
        musicalGenre: {
          mode: "insensitive",
          equals: musicalGenre
        }
      }
    });
  }
);

export const getTotalArtistsByMusicalGenre = cache(async ({ musicalGenre }: { musicalGenre: string }) => {
  return await prisma.artist.count({
    where: {
      musicalGenre: {
        mode: "insensitive",
        equals: musicalGenre
      }
    }
  });
});

export const getAvailableMusicalGenres = cache(async () => {
  return await prisma.artist.findMany({
    where: {
      musicalGenre: {
        not: null
      }
    },
    select: {
      musicalGenre: true
    },
    distinct: ["musicalGenre"]
  });
});
