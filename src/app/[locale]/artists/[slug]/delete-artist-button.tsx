"use client";

import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { deleteArtist } from "@/app/artists/actions";

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

export function DeleteArtistButton({ id }: Readonly<DeleteButtonProps>) {
  const t = useTranslations("DeleteArtistButton");

  const router = useRouter();

  async function onActionClick() {
    const deletedArtistResponse = await deleteArtist({ artistId: id });

    toast.success(deletedArtistResponse.message);

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
