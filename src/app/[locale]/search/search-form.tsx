"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { startTransition } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

import { useRouter } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { searchSchema } from "@/lib/zod-schemas";

import { useRecentSearches } from "@/hooks/use-recent-searches";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function SearchForm() {
  const t = useTranslations("SearchForm");

  const router = useRouter();

  const form = useFormContext();

  const searchValue = form.watch("search");

  const { updateRecentSearches } = useRecentSearches();

  const debounced = useDebouncedCallback((value) => {
    startTransition(() => {
      if (value) {
        const valueTrimmed = value.trim();

        const isValidValue = searchSchema.safeParse({ search: valueTrimmed });

        if (!isValidValue.success) {
          toast.error(t("errorMessage"));

          return;
        }

        router.push({ pathname: AppRoutes.searchPage, query: { q: valueTrimmed } });

        updateRecentSearches({ searchValue: valueTrimmed });
      }
    });
  }, 500);

  return (
    <form onSubmit={form.handleSubmit(() => debounced.flush())} className="mx-auto flex max-w-lg gap-2">
      <FormField
        control={form.control}
        name="search"
        render={({ field }) => {
          field.onChange = (event) => {
            const value = event.target.value;

            form.setValue("search", value);

            debounced(value);
          };

          return (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative flex items-center">
                  <Input placeholder={t("placeholder")} className="pe-8" autoFocus {...field} />
                  {searchValue ? (
                    <button
                      onClick={() => {
                        router.push({ pathname: AppRoutes.searchPage });

                        form.setValue("search", "");
                        form.setFocus("search");
                      }}
                    >
                      <X className="absolute top-1/2 right-2 size-5 -translate-y-1/2 cursor-pointer p-0" />
                    </button>
                  ) : null}
                </div>
              </FormControl>
            </FormItem>
          );
        }}
      />
      <Button type="submit">{t("submitLabel")}</Button>
    </form>
  );
}
