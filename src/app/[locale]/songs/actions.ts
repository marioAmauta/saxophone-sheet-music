"use server";

import prisma from "@/db";
import { Prisma, SheetFile } from "@prisma/client";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { redirect } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { PRISMA_ERRORS } from "@/lib/constants";
import { getUserSession } from "@/lib/session";
import { ActionReturnType } from "@/lib/types";
import { createSlug } from "@/lib/utils";
import { createSongSchema, songSchema } from "@/lib/zod-schemas";

export async function createSongAction(data: unknown): Promise<ActionReturnType | undefined> {
  const serverErrorMessages = await getTranslations("serverErrorMessages");

  const tArtist = await getTranslations("EditArtistForm");
  const tSong = await getTranslations("EditSongForm");

  const parsedCreateSongData = createSongSchema({
    tArtist,
    tSong
  }).safeParse(data);

  if (!parsedCreateSongData.success) {
    return {
      success: false,
      errorMessage: serverErrorMessages("createSongError")
    };
  }

  const songData = parsedCreateSongData.data;

  const parsedSheets = songData.song.sheets;

  const sheetsToInsert: Pick<SheetFile, "instrumentKey" | "key" | "url">[] = [];

  for (const key in parsedSheets) {
    const sheetData = parsedSheets[key as keyof typeof parsedSheets];

    const { checkbox: isChecked, sheetKey, sheetUrl } = sheetData;

    if (isChecked) {
      if (!sheetUrl) {
        return {
          success: false,
          errorMessage: serverErrorMessages("sheetLinkMissing")
        };
      }

      sheetsToInsert.push({
        instrumentKey: key,
        key: sheetKey || "",
        url: sheetUrl
      });
    }
  }

  const artistNameData = !songData.artist.artistNameSelect
    ? songData.artist.artistName
    : songData.artist.artistNameSelect;

  try {
    await prisma.song.create({
      data: {
        artist: {
          connectOrCreate: {
            create: {
              slug: createSlug(artistNameData),
              artistName: artistNameData,
              biographyLink: songData.artist.biographyLink,
              musicalGenre: songData.artist.musicalGenre
            },
            where: {
              artistName: artistNameData
            }
          }
        },
        slug: createSlug(songData.song.title, artistNameData),
        title: songData.song.title,
        youTubeLink: songData.song.youTubeLink,
        originalSongLink: songData.song.originalSongLink,
        ...(songData.song.audioFile.fileUrl
          ? {
              audioFiles: {
                create: {
                  fileName: songData.song.audioFile.fileName,
                  url: songData.song.audioFile.fileUrl,
                  key: songData.song.audioFile.fileKey
                }
              }
            }
          : {}),
        ...(sheetsToInsert.length ? { sheets: { createMany: { data: sheetsToInsert } } } : {})
      }
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === PRISMA_ERRORS.uniqueConstraint) {
        if (error.message.includes("slug")) {
          return {
            success: false,
            errorMessage: serverErrorMessages("songAlreadyExists")
          };
        }

        if (error.message.includes("audioFiles")) {
          return {
            success: false,
            errorMessage: serverErrorMessages("uniqueAudioFileError")
          };
        }

        if (error.message.includes("sheets")) {
          return {
            success: false,
            errorMessage: serverErrorMessages("uniqueSheetError")
          };
        }
      }
    }

    return {
      success: false,
      errorMessage: serverErrorMessages("createSongError")
    };
  }

  revalidatePath(AppRoutes.songsPage);

  const locale = await getLocale();

  redirect({ href: AppRoutes.songsPage, locale });
}

export async function editSongAction(data: unknown): Promise<ActionReturnType | undefined> {
  const serverErrorMessages = await getTranslations("serverErrorMessages");

  const t = await getTranslations("EditSongForm");

  const parsedEditSongData = songSchema(t)
    .extend({
      id: z.string(),
      slug: z.string(),
      artistName: z.string()
    })
    .safeParse(data);

  if (!parsedEditSongData.success) {
    return {
      success: false,
      errorMessage: serverErrorMessages("editSongError")
    };
  }

  const songData = parsedEditSongData.data;

  const parsedSheets = songData.sheets;

  const sheetsToInsert: Pick<SheetFile, "id" | "instrumentKey" | "key" | "url">[] = [];

  for (const key in parsedSheets) {
    const sheetData = parsedSheets[key as keyof typeof parsedSheets];

    const { id, checkbox: isChecked, sheetKey, sheetUrl } = sheetData;

    if (isChecked) {
      if (!sheetUrl) {
        return {
          success: false,
          errorMessage: serverErrorMessages("sheetLinkMissing")
        };
      }

      sheetsToInsert.push({
        id: id || "",
        instrumentKey: key,
        key: sheetKey || "",
        url: sheetUrl
      });
    }
  }

  let updateResult;

  try {
    updateResult = await prisma.$transaction(async (tx) => {
      const songUpdateResult = await tx.song.update({
        where: {
          id: songData.id
        },
        data: {
          slug: createSlug(songData.title, songData.artistName),
          title: songData.title,
          youTubeLink: songData.youTubeLink,
          originalSongLink: songData.originalSongLink,
          ...(songData.audioFile.id
            ? {
                audioFiles: {
                  update: {
                    where: {
                      id: songData.audioFile.id
                    },
                    data: {
                      fileName: songData.audioFile.fileName,
                      url: songData.audioFile.fileUrl,
                      key: songData.audioFile.fileKey
                    }
                  }
                }
              }
            : {
                audioFiles: {
                  create: {
                    fileName: songData.audioFile.fileName,
                    url: songData.audioFile.fileUrl,
                    key: songData.audioFile.fileKey
                  }
                }
              })
        }
      });

      const sheetUpdates = sheetsToInsert.map((sheet) =>
        sheet.id
          ? tx.sheetFile.update({
              where: {
                id: sheet.id
              },
              data: {
                instrumentKey: sheet.instrumentKey,
                key: sheet.key,
                url: sheet.url,
                song: {
                  connect: {
                    id: songData.id
                  }
                }
              }
            })
          : tx.sheetFile.create({
              data: {
                instrumentKey: sheet.instrumentKey,
                key: sheet.key,
                url: sheet.url,
                song: {
                  connect: {
                    id: songData.id
                  }
                }
              }
            })
      );

      await Promise.all(sheetUpdates);

      return songUpdateResult;
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === PRISMA_ERRORS.uniqueConstraint) {
        if (error.message.includes("audioFiles")) {
          return {
            success: false,
            errorMessage: serverErrorMessages("uniqueAudioFileError")
          };
        }

        if (error.message.includes("sheets")) {
          return {
            success: false,
            errorMessage: serverErrorMessages("uniqueSheetError")
          };
        }
      }
    }

    return {
      success: false,
      errorMessage: serverErrorMessages("editSongError")
    };
  }

  const url = `${AppRoutes.songsPage}/${updateResult.slug}`;

  revalidatePath(url);

  const locale = await getLocale();

  redirect({ href: url, locale });
}

export async function deleteSong({ songId }: { songId: string }) {
  const serverSuccessMessages = await getTranslations("serverSuccessMessages");

  await prisma.song.delete({
    where: {
      id: songId
    }
  });

  revalidatePath(AppRoutes.songsPage);

  return {
    message: serverSuccessMessages("songDeleted")
  };
}

export async function deleteSheet({ sheetId }: { sheetId: string }) {
  const serverSuccessMessages = await getTranslations("serverSuccessMessages");

  const deletedSheet = await prisma.sheetFile.delete({
    where: {
      id: sheetId
    },
    select: {
      song: {
        select: {
          slug: true
        }
      }
    }
  });

  revalidatePath(`${AppRoutes.songsPage}/${deletedSheet.song?.slug}/edit`);

  return {
    message: serverSuccessMessages("sheetDeleted")
  };
}

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
