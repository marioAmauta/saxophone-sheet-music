"use server";

import prisma from "@/db";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";

import { redirect } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { getUserSession } from "@/lib/session";

export async function likeSong({ songId }: { songId: string }) {
  const { user } = await getUserSession();

  if (!user) {
    const locale = await getLocale();
    return redirect({ href: AppRoutes.accountRequiredPage, locale });
  }

  try {
    await prisma.songLike.create({
      data: {
        userId: user.id,
        songId
      }
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath(AppRoutes.songsPage);
}

export async function unlikeSong({ songId }: { songId: string }) {
  const { user } = await getUserSession();

  if (!user) {
    const locale = await getLocale();
    return redirect({ href: AppRoutes.accountRequiredPage, locale });
  }

  try {
    await prisma.songLike.deleteMany({
      where: {
        userId: user.id,
        songId
      }
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath(AppRoutes.songsPage);
}
