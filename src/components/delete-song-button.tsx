"use client";

import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { deleteSong } from "@/app/songs/actions";

import { useRouter } from "@/i18n/navigation";

import { DeleteButtonProps } from "@/lib/types";

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
import { buttonVariants } from "@/components/ui/button";

export function DeleteSongButton({ id }: Readonly<DeleteButtonProps>) {
  const t = useTranslations("DeleteSongButton");

  const router = useRouter();

  async function onActionClick() {
    const deletedSongResponse = await deleteSong({ songId: id });

    toast.success(deletedSongResponse.message);

    router.back();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: "destructive", className: "flex gap-2" })}>
        <Trash className="size-4" />
        <span>{t("dialogAction")}</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("dialogTitle")}</AlertDialogTitle>
          <AlertDialogDescription>{t("dialogDescription")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("dialogCancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={onActionClick} className={buttonVariants({ variant: "destructive" })}>
            {t("dialogAction")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
