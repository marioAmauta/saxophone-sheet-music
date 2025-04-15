import { z } from "zod";

import { DATA_CY_ELEMENTS } from "./constants";
import { SheetInstrumentKey } from "./enums";

export const searchSchema = z.object({ search: z.string().regex(/^[\p{L}\p{N}\s]+$/u) });

export const registerSchema = (t: (key: IntlPath) => string) =>
  z
    .object({
      name: z
        .string()
        .trim()
        .min(1, { message: t("name.errorMessage") }),
      email: z
        .string()
        .trim()
        .email({ message: t("email.errorMessage") }),
      password: z
        .string()
        .trim()
        .min(4, { message: t("password.errorMessage") }),
      confirmPassword: z
        .string()
        .trim()
        .min(4, { message: t("confirmPassword.errorMessage") })
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: [DATA_CY_ELEMENTS.registerForm.confirmPassword],
      message: t("confirmPassword.errorMatchMessage")
    });

export type RegisterSchemaType = z.infer<ReturnType<typeof registerSchema>>;

export const resetPasswordSchema = (t: (key: IntlPath) => string) =>
  z
    .object({
      password: z
        .string()
        .trim()
        .min(4, { message: t("password.errorMessage") }),
      confirmPassword: z
        .string()
        .trim()
        .min(4, { message: t("confirmPassword.errorMessage") })
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: [DATA_CY_ELEMENTS.registerForm.confirmPassword],
      message: t("confirmPassword.errorMatchMessage")
    });

export type ResetPasswordSchemaType = z.infer<ReturnType<typeof resetPasswordSchema>>;

export const forgotPasswordSchema = (t: (key: IntlPath) => string) =>
  z.object({
    email: z
      .string()
      .trim()
      .email({ message: t("email.errorMessage") })
  });

export type ForgotPasswordSchemaType = z.infer<ReturnType<typeof forgotPasswordSchema>>;

export const loginSchema = (t: (key: IntlPath) => string) =>
  z.object({
    email: z
      .string()
      .trim()
      .email({ message: t("email.errorMessage") }),
    password: z
      .string()
      .trim()
      .min(4, {
        message: t("password.errorMessage")
      })
  });

export type LoginSchemaType = z.infer<ReturnType<typeof loginSchema>>;

export const artistSchema = (t: (key: IntlPath) => string) =>
  z.object({
    artistName: z
      .string()
      .trim()
      .min(1, { message: t("artistName.errorMessage") }),
    artistNameSelect: z.string().trim().optional(),
    biographyLink: z.string().trim().optional(),
    musicalGenre: z.string().trim().optional()
  });

export type ArtistSchemaType = z.infer<ReturnType<typeof artistSchema>>;

export const songSchema = (t: (key: IntlPath) => string) =>
  z.object({
    title: z
      .string()
      .trim()
      .min(1, { message: t("title.errorMessage") }),
    youTubeLink: z
      .string()
      .trim()
      .min(1, { message: t("youTubeLink.errorMessage") }),
    originalSongLink: z
      .string()
      .trim()
      .min(1, { message: t("originalSongLink.errorMessage") }),
    audioFile: z.object({
      id: z.string().trim().optional(),
      fileName: z.string().trim(),
      fileKey: z.string().trim(),
      fileUrl: z
        .string()
        .trim()
        .min(1, { message: t("audioFileLink.errorMessage") })
    }),
    sheets: z.object({
      [SheetInstrumentKey.sopranoSax.toString()]: z.object({
        id: z.string().trim().optional(),
        checkbox: z.boolean(),
        sheetUrl: z.string().trim().optional(),
        sheetKey: z.string().trim().optional()
      }),
      [SheetInstrumentKey.altoSax.toString()]: z.object({
        id: z.string().trim().optional(),
        checkbox: z.boolean(),
        sheetUrl: z.string().trim().optional(),
        sheetKey: z.string().trim().optional()
      }),
      [SheetInstrumentKey.tenorSax.toString()]: z.object({
        id: z.string().trim().optional(),
        checkbox: z.boolean(),
        sheetUrl: z.string().trim().optional(),
        sheetKey: z.string().trim().optional()
      })
    })
  });

export type SongSchemaType = z.infer<ReturnType<typeof songSchema>>;

export const createSongSchema = ({
  tArtist,
  tSong
}: {
  tArtist: (key: IntlPath) => string;
  tSong: (key: IntlPath) => string;
}) =>
  z.object({
    song: songSchema(tSong),
    artist: artistSchema(tArtist)
  });

export type CreateSongSchemaType = z.infer<ReturnType<typeof createSongSchema>>;
