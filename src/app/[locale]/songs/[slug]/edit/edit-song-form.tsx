"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { editSongAction } from "@/app/songs/actions";

import { useRouter } from "@/i18n/navigation";

import { SheetInstrumentKey } from "@/lib/enums";
import { UploadButton } from "@/lib/uploadthing";
import { songSchema, SongSchemaType } from "@/lib/zod-schemas";

import { FormButtonLoading } from "@/components/form-button-loading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { DeleteSheetButton } from "./delete-sheet-button";

type EditSongFormProps = {
  song: Prisma.SongGetPayload<{
    select: {
      id: true;
      slug: true;
      title: true;
      youTubeLink: true;
      originalSongLink: true;
      audioFiles: true;
      sheets: true;
      artist: {
        select: {
          artistName: true;
        };
      };
    };
  }>;
};

export function EditSongForm({ song }: Readonly<EditSongFormProps>) {
  const t = useTranslations("EditSongForm");
  const tInstruments = useTranslations("EditSongForm.instrumentsSection");

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const audioFile = song.audioFiles[0];

  const sopranoSaxSheet = song.sheets.find((sheet) => sheet.instrumentKey === SheetInstrumentKey.sopranoSax);
  const altoSaxSheet = song.sheets.find((sheet) => sheet.instrumentKey === SheetInstrumentKey.altoSax);
  const tenorSaxSheet = song.sheets.find((sheet) => sheet.instrumentKey === SheetInstrumentKey.tenorSax);

  const form = useForm<SongSchemaType>({
    resolver: zodResolver(songSchema(t)),
    defaultValues: {
      title: song.title,
      youTubeLink: song.youTubeLink,
      originalSongLink: song.originalSongLink,
      audioFile: {
        id: audioFile.id,
        fileName: audioFile.fileName,
        fileKey: audioFile.key,
        fileUrl: audioFile.url
      },
      sheets: {
        sopranoSax: {
          id: sopranoSaxSheet?.id || "",
          checkbox: !!sopranoSaxSheet?.url,
          sheetUrl: sopranoSaxSheet?.url || "",
          sheetKey: sopranoSaxSheet?.key || ""
        },
        altoSax: {
          id: altoSaxSheet?.id || "",
          checkbox: !!altoSaxSheet?.url,
          sheetUrl: altoSaxSheet?.url || "",
          sheetKey: altoSaxSheet?.key || ""
        },
        tenorSax: {
          id: tenorSaxSheet?.id || "",
          checkbox: !!tenorSaxSheet?.url,
          sheetUrl: tenorSaxSheet?.url || "",
          sheetKey: tenorSaxSheet?.key || ""
        }
      }
    }
  });

  const onSubmit: SubmitHandler<SongSchemaType> = (data) => {
    startTransition(async () => {
      const response = await editSongAction({
        ...data,
        id: song.id,
        slug: song.slug,
        artistName: song.artist.artistName
      });

      if (response && !response.success) {
        toast.error(response.errorMessage);
      }
    });
  };

  const { watch } = form;

  const songTitleValue = watch("title");
  const isSopranoSaxChecked = watch("sheets.sopranoSax.checkbox");
  const isAltoSaxChecked = watch("sheets.altoSax.checkbox");
  const isTenorSaxChecked = watch("sheets.tenorSax.checkbox");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-4 py-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("title.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("title.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="youTubeLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("youTubeLink.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("youTubeLink.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="originalSongLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("originalSongLink.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("originalSongLink.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="audioFile.fileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("audioFileLink.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("audioFileLink.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <UploadButton
          endpoint="audioUploader"
          className="ut-button:w-full ut-button:bg-foreground ut-button:text-primary-foreground"
          onClientUploadComplete={(res) => {
            const response = res[0];

            form.setValue("audioFile.fileName", `${songTitleValue} - ${song?.artist.artistName}`);
            form.setValue("audioFile.fileUrl", response.ufsUrl);
            form.setValue("audioFile.fileKey", response.key);
          }}
          onUploadError={(error) => {
            toast.error(error.message);
          }}
        />
        <legend className="mb-2 font-semibold">{tInstruments("legend")}</legend>
        <FormField
          control={form.control}
          name="sheets.sopranoSax.checkbox"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>{tInstruments("instruments.sopranoSax.checkboxLabel")}</FormLabel>
                {isSopranoSaxChecked && sopranoSaxSheet?.id ? (
                  <div className="ml-auto">
                    <DeleteSheetButton
                      id={sopranoSaxSheet.id}
                      label={tInstruments("instruments.sopranoSax.checkboxLabel")}
                      onSuccess={() => {
                        form.setValue("sheets.sopranoSax.checkbox", false);
                        form.setValue("sheets.sopranoSax.id", "");
                        form.setValue("sheets.sopranoSax.sheetUrl", "");
                        form.setValue("sheets.sopranoSax.sheetKey", "");
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSopranoSaxChecked ? (
          <>
            <FormField
              control={form.control}
              name="sheets.sopranoSax.sheetUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tInstruments("instruments.sopranoSax.sheetLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder={tInstruments("instruments.sopranoSax.sheetPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <UploadButton
              endpoint="pdfUploader"
              className="ut-button:w-full ut-button:bg-foreground ut-button:text-primary-foreground"
              onClientUploadComplete={(res) => {
                const response = res[0];

                form.setValue("sheets.sopranoSax.sheetUrl", response.ufsUrl);
                form.setValue("sheets.sopranoSax.sheetKey", response.key);
              }}
              onUploadError={(error) => {
                toast.error(error.message);
              }}
            />
          </>
        ) : null}
        <FormField
          control={form.control}
          name="sheets.altoSax.checkbox"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>{tInstruments("instruments.altoSax.checkboxLabel")}</FormLabel>
                {isAltoSaxChecked && altoSaxSheet?.id ? (
                  <div className="ml-auto">
                    <DeleteSheetButton
                      id={altoSaxSheet.id}
                      label={tInstruments("instruments.altoSax.checkboxLabel")}
                      onSuccess={() => {
                        form.setValue("sheets.altoSax.checkbox", false);
                        form.setValue("sheets.altoSax.id", "");
                        form.setValue("sheets.altoSax.sheetUrl", "");
                        form.setValue("sheets.altoSax.sheetKey", "");
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {isAltoSaxChecked ? (
          <>
            <FormField
              control={form.control}
              name="sheets.altoSax.sheetUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tInstruments("instruments.altoSax.sheetLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder={tInstruments("instruments.altoSax.sheetPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <UploadButton
              endpoint="pdfUploader"
              className="ut-button:w-full ut-button:bg-foreground ut-button:text-primary-foreground"
              onClientUploadComplete={(res) => {
                const response = res[0];

                form.setValue("sheets.altoSax.sheetUrl", response.ufsUrl);
                form.setValue("sheets.altoSax.sheetKey", response.key);
              }}
              onUploadError={(error) => {
                toast.error(error.message);
              }}
            />
          </>
        ) : null}
        <FormField
          control={form.control}
          name="sheets.tenorSax.checkbox"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>{tInstruments("instruments.tenorSax.checkboxLabel")}</FormLabel>
                {isTenorSaxChecked && tenorSaxSheet?.id ? (
                  <div className="ml-auto">
                    <DeleteSheetButton
                      id={tenorSaxSheet.id}
                      label={tInstruments("instruments.tenorSax.checkboxLabel")}
                      onSuccess={() => {
                        form.setValue("sheets.tenorSax.checkbox", false);
                        form.setValue("sheets.tenorSax.id", "");
                        form.setValue("sheets.tenorSax.sheetUrl", "");
                        form.setValue("sheets.tenorSax.sheetKey", "");
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {isTenorSaxChecked ? (
          <>
            <FormField
              control={form.control}
              name="sheets.tenorSax.sheetUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tInstruments("instruments.tenorSax.sheetLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder={tInstruments("instruments.tenorSax.sheetPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <UploadButton
              endpoint="pdfUploader"
              className="ut-button:w-full ut-button:bg-foreground ut-button:text-primary-foreground"
              onClientUploadComplete={(res) => {
                const response = res[0];

                form.setValue("sheets.tenorSax.sheetUrl", response.ufsUrl);
                form.setValue("sheets.tenorSax.sheetKey", response.key);
              }}
              onUploadError={(error) => {
                toast.error(error.message);
              }}
            />
          </>
        ) : null}
        <div className="grid grid-cols-2 gap-2 pt-4">
          <Button variant="destructive" type="button" onClick={() => router.back()}>
            {t("cancelButton")}
          </Button>
          <FormButtonLoading type="submit" loading={isPending}>
            {t("submitButton")}
          </FormButtonLoading>
        </div>
      </form>
    </Form>
  );
}
