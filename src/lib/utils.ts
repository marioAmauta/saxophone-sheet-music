import { Prisma } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { SortOptions } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function createSlug(...inputs: string[]) {
  return inputs
    .map((el) => el.split(" ").filter((i) => i))
    .flat()
    .join("-")
    .toLowerCase();
}

export function range({ start, stop, step = 1 }: { start: number; stop: number; step?: number }) {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
}

export function getSortingOption(sort: SortOptions) {
  const options: Record<SortOptions, object> = {
    newest: { createdAt: Prisma.SortOrder.desc },
    oldest: { createdAt: Prisma.SortOrder.asc },
    azSong: { title: Prisma.SortOrder.asc },
    zaSong: { title: Prisma.SortOrder.desc },
    azArtist: { artistName: Prisma.SortOrder.asc },
    zaArtist: { artistName: Prisma.SortOrder.desc },
    newestLiked: { likeDate: Prisma.SortOrder.desc },
    oldestLiked: { likeDate: Prisma.SortOrder.asc },
    azLiked: { song: { title: Prisma.SortOrder.asc } },
    zaLiked: { song: { title: Prisma.SortOrder.desc } }
  };

  return options[sort];
}

export function getPaginationParams({ searchParams }: { searchParams: SearchParamsSync }) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const limit = searchParams.limit ? Number(searchParams.limit) : 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  return { page, limit, start, end };
}

export function eventPreventDefault(event: Event) {
  event.preventDefault();
}
