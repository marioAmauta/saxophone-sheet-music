"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { editArtistAction } from "@/app/artists/actions";

import { useRouter } from "@/i18n/navigation";

import { MusicalGenres } from "@/lib/enums";
import { artistSchema, ArtistSchemaType } from "@/lib/zod-schemas";

import { FormButtonLoading } from "@/components/form-button-loading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type EditArtistFormProps = {
  artist: Prisma.ArtistGetPayload<{
    select: {
      id: true;
      slug: true;
      artistName: true;
      musicalGenre: true;
      biographyLink: true;
    };
  }>;
};

export function EditArtistForm({ artist }: Readonly<EditArtistFormProps>) {
  const t = useTranslations("EditArtistForm");

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<ArtistSchemaType>({
    resolver: zodResolver(artistSchema(t)),
    defaultValues: {
      artistName: artist.artistName,
      biographyLink: artist.biographyLink || "",
      musicalGenre: artist.musicalGenre || ""
    }
  });

  const onSubmit: SubmitHandler<ArtistSchemaType> = (data) => {
    startTransition(async () => {
      const response = await editArtistAction({
        ...data,
        id: artist.id,
        slug: artist.slug
      });

      if (response && !response.success) {
        toast.error(response.errorMessage);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-4 py-4">
        <FormField
          control={form.control}
          name="artistName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("artistName.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("artistName.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="biographyLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("biographyLink.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("biographyLink.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="musicalGenre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("musicalGenre.label")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="flex w-full justify-between">
                    <SelectValue placeholder={t("musicalGenre.selectLabel")} />
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
