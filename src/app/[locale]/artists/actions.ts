"use server";

import prisma from "@/db";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { redirect } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { ActionReturnType } from "@/lib/types";
import { createSlug } from "@/lib/utils";
import { artistSchema } from "@/lib/zod-schemas";

export async function editArtistAction(data: unknown): Promise<ActionReturnType | undefined> {
  const serverErrorMessages = await getTranslations("serverErrorMessages");

  const t = await getTranslations("EditArtistForm");

  const parsedData = artistSchema(t)
    .extend({
      id: z.string(),
      slug: z.string()
    })
    .safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      errorMessage: serverErrorMessages("editArtistError")
    };
  }

  const artistData = parsedData.data;

  let updateResult;

  try {
    updateResult = await prisma.artist.update({
      where: {
        id: artistData.id
      },
      data: {
        slug: createSlug(artistData.artistName),
        artistName: artistData.artistName,
        biographyLink: artistData.biographyLink,
        musicalGenre: artistData.musicalGenre
      }
    });
  } catch (error) {
    console.error(error);
  }

  const url = `${AppRoutes.artistsPage}/${updateResult?.slug}`;

  revalidatePath(url);

  const locale = await getLocale();

  redirect({ href: url, locale });
}

export async function deleteArtist({ artistId }: { artistId: string }) {
  const deletedArtist = await prisma.artist.delete({
    where: {
      id: artistId
    }
  });

  revalidatePath(AppRoutes.artistsPage);

  const locale = await getLocale();
  redirect({ href: AppRoutes.artistsPage, locale });

  return {
    message: `Artist ${deletedArtist.artistName} deleted!`
  };
}
