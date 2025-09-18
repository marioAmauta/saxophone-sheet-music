"use client";

import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { startTransition, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";

import { useRecentSearches } from "@/hooks/use-recent-searches";

import { Message } from "@/components/messages";
import { SimpleLoader } from "@/components/simple-loader";
import { TypographyP } from "@/components/typography";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function RecentSearches() {
  const t = useTranslations("RecentSearches");

  const router = useRouter();

  const form = useFormContext();

  const [mounted, setMounted] = useState(false);

  const { searches, removeSearches, updateRecentSearches } = useRecentSearches();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SimpleLoader />;
  }

  function onSearchItemClick(search: string) {
    startTransition(() => {
      router.push({ pathname: AppRoutes.searchPage, query: { q: search } });

      updateRecentSearches({ searchValue: search });

      form.setValue("search", search);
      form.setFocus("search");
    });
  }

  return (
    <>
      <div className="flex items-center">
        <TypographyP className="flex-1 text-lg">{t("title")}</TypographyP>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={searches.length === 0}>
              {t("clearButton")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("clearQuestion")}</AlertDialogTitle>
              <AlertDialogDescription>{t("clearDescription")}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("clearCancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={removeSearches}>{t("clearConfirm")}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {searches.length > 0 ? (
        <ul className="space-y-3">
          {searches.map((search, index) => (
            <li key={`${search}-${index}`}>
              <button
                onClick={() => onSearchItemClick(search)}
                className="flex w-fit cursor-pointer items-center gap-2 underline"
              >
                <span className="flex-1 break-all">{search}</span>
                <ExternalLink className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <Message className="text-center">{t("noSearches")}</Message>
      )}
    </>
  );
}
