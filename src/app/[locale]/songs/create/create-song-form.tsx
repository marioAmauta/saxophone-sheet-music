"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Artist } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

import { createSongAction } from "@/app/songs/actions";

import { useRouter } from "@/i18n/navigation";

import { ApiRoutes } from "@/lib/api-routes";
import { DATA_CY_ELEMENTS } from "@/lib/constants";
import { MusicalGenres } from "@/lib/enums";
import { UploadButton } from "@/lib/uploadthing";
import { createSongSchema, CreateSongSchemaType } from "@/lib/zod-schemas";

import { FormButtonLoading } from "@/components/form-button-loading";
import { OrSeparator } from "@/components/or-separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CreateSongForm() {
  const t = useTranslations("CreateSongForm");
  const tArtist = useTranslations("EditArtistForm");
  const tSong = useTranslations("EditSongForm");
  const tInstruments = useTranslations("EditSongForm.instrumentsSection");

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateSongSchemaType>({
    resolver: zodResolver(createSongSchema({ tArtist, tSong })),
    defaultValues: {
      artist: {
        artistName: "",
        artistNameSelect: "",
        biographyLink: "",
        musicalGenre: ""
      },
      song: {
        title: "",
        youTubeLink: "",
        originalSongLink: "",
        audioFile: {
          fileName: "",
          fileKey: "",
          fileUrl: ""
        },
        sheets: {
          sopranoSax: {
            checkbox: false,
            sheetUrl: "",
            sheetKey: ""
          },
          altoSax: {
            checkbox: false,
            sheetUrl: "",
            sheetKey: ""
          },
          tenorSax: {
            checkbox: false,
            sheetUrl: "",
            sheetKey: ""
          }
        }
      }
    }
  });

  const onSubmit: SubmitHandler<CreateSongSchemaType> = async (data) => {
    const response = await createSongAction(data);

    if (response && !response.success) {
      toast.error(response.errorMessage);
    }
  };

  const [foundArtists, setFoundArtists] = useState<Artist[]>([]);

  const debouncedArtistSearch = useDebouncedCallback((value) => {
    startTransition(async () => {
      const response = await fetch(ApiRoutes.searchArtistQuery({ artistName: value }), {
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 3 // 3 hours
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch artists");
      }

      const foundArtistsInSelect: Artist[] = await response.json();

      if (foundArtistsInSelect) {
        setFoundArtists(foundArtistsInSelect);
      }
    });
  }, 500);

  const { watch, unregister } = form;

  const artistNameValue = watch("artist.artistName");
  const artistNameSelectValue = watch("artist.artistNameSelect");
  const songTitleValue = watch("song.title");
  const isSopranoSaxChecked = watch("song.sheets.sopranoSax.checkbox");
  const isAltoSaxChecked = watch("song.sheets.altoSax.checkbox");
  const isTenorSaxChecked = watch("song.sheets.tenorSax.checkbox");

  useEffect(() => {
    if (!artistNameValue) {
      unregister("artist.artistNameSelect");
    }

    if (artistNameSelectValue) {
      unregister("artist.biographyLink");
      unregister("artist.musicalGenre");
    }

    if (!isSopranoSaxChecked) {
      unregister("song.sheets.sopranoSax.sheetUrl");
    }

    if (!isAltoSaxChecked) {
      unregister("song.sheets.altoSax.sheetUrl");
    }

    if (!isTenorSaxChecked) {
      unregister("song.sheets.tenorSax.sheetUrl");
    }
  }, [unregister, artistNameValue, artistNameSelectValue, isSopranoSaxChecked, isAltoSaxChecked, isTenorSaxChecked]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-4 py-4">
        <FormField
          control={form.control}
          name="artist.artistName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tArtist("artistName.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={tArtist("artistName.placeholder")}
                  data-testid={DATA_CY_ELEMENTS.createSongForm.artistName}
                  {...field}
                  onChange={(event) => {
                    field.onChange(event);
                    debouncedArtistSearch(event.target.value.trim());
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {artistNameValue && foundArtists.length > 0 ? (
          <FormField
            control={form.control}
            name="artist.artistNameSelect"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>{tArtist("artistName.selectLabel")}</FormLabel>
                  {isPending && <Loader2 className="size-3 animate-spin" />}
                </div>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="flex w-full justify-between">
                      <SelectValue placeholder={tArtist("artistName.selectDefaultValueLabel")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {foundArtists.map((artist) => (
                      <SelectItem key={artist.id} value={artist.artistName}>
                        {artist.artistName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        ) : null}
        {!artistNameSelectValue ? (
          <>
            <FormField
              control={form.control}
              name="artist.biographyLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tArtist("biographyLink.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={tArtist("biographyLink.placeholder")}
                      data-testid={DATA_CY_ELEMENTS.createSongForm.biographyLink}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artist.musicalGenre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tArtist("musicalGenre.label")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className="flex w-full justify-between"
                        data-testid={DATA_CY_ELEMENTS.createSongForm.musicalGenre}
                      >
                        <SelectValue placeholder={tArtist("musicalGenre.selectLabel")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(MusicalGenres).map((genre) => (
                        <SelectItem value={genre.toLowerCase()} key={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </>
        ) : null}
        <FormField
          control={form.control}
          name="song.title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tSong("title.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={tSong("title.placeholder")}
                  data-testid={DATA_CY_ELEMENTS.createSongForm.title}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="song.youTubeLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tSong("youTubeLink.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={tSong("youTubeLink.placeholder")}
                  data-testid={DATA_CY_ELEMENTS.createSongForm.youTubeLink}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="song.originalSongLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tSong("originalSongLink.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={tSong("originalSongLink.placeholder")}
                  data-testid={DATA_CY_ELEMENTS.createSongForm.originalSongLink}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="song.audioFile.fileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tSong("audioFileLink.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={tSong("audioFileLink.placeholder")}
                  data-testid={DATA_CY_ELEMENTS.createSongForm.audioFileLink}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <OrSeparator />
        <UploadButton
          endpoint="audioUploader"
          className="ut-button:w-full ut-button:bg-foreground ut-button:text-primary-foreground"
          onClientUploadComplete={(res) => {
            const response = res[0];

            form.setValue("song.audioFile.fileName", `${songTitleValue} - ${artistNameValue}`);
            form.setValue("song.audioFile.fileUrl", response.ufsUrl);
            form.setValue("song.audioFile.fileKey", response.key);
          }}
          onUploadError={(error) => {
            toast.error(error.message);
          }}
        />
        <legend className="mb-2 font-semibold">{tInstruments("legend")}</legend>
        <FormField
          control={form.control}
          name="song.sheets.sopranoSax.checkbox"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>{tInstruments("instruments.sopranoSax.checkboxLabel")}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSopranoSaxChecked ? (
          <>
            <FormField
              control={form.control}
              name="song.sheets.sopranoSax.sheetUrl"
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
            <OrSeparator />
            <UploadButton
              endpoint="pdfUploader"
              className="ut-button:w-full ut-button:bg-foreground ut-button:text-primary-foreground"
              onClientUploadComplete={(res) => {
                const response = res[0];

                form.setValue("song.sheets.sopranoSax.sheetUrl", response.ufsUrl);
                form.setValue("song.sheets.sopranoSax.sheetKey", response.key);
              }}
              onUploadError={(error) => {
                toast.error(error.message);
              }}
            />
          </>
        ) : null}
        <FormField
          control={form.control}
          name="song.sheets.altoSax.checkbox"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>{tInstruments("instruments.altoSax.checkboxLabel")}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {isAltoSaxChecked ? (
          <>
            <FormField
              control={form.control}
              name="song.sheets.altoSax.sheetUrl"
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
            <OrSeparator />
            <UploadButton
              endpoint="pdfUploader"
              className="ut-button:w-full ut-button:bg-foreground ut-button:text-primary-foreground"
              onClientUploadComplete={(res) => {
                const response = res[0];

                form.setValue("song.sheets.altoSax.sheetUrl", response.ufsUrl);
                form.setValue("song.sheets.altoSax.sheetKey", response.key);
              }}
              onUploadError={(error) => {
                toast.error(error.message);
              }}
            />
          </>
        ) : null}
        <FormField
          control={form.control}
          name="song.sheets.tenorSax.checkbox"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>{tInstruments("instruments.tenorSax.checkboxLabel")}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {isTenorSaxChecked ? (
          <>
            <FormField
              control={form.control}
              name="song.sheets.tenorSax.sheetUrl"
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
            <OrSeparator />
            <UploadButton
              endpoint="pdfUploader"
              className="ut-button:w-full ut-button:bg-foreground ut-button:text-primary-foreground"
              onClientUploadComplete={(res) => {
                const response = res[0];

                form.setValue("song.sheets.tenorSax.sheetUrl", response.ufsUrl);
                form.setValue("song.sheets.tenorSax.sheetKey", response.key);
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
          <FormButtonLoading type="submit" loading={form.formState.isSubmitting}>
            {t("submitButton")}
          </FormButtonLoading>
        </div>
      </form>
    </Form>
  );
}
