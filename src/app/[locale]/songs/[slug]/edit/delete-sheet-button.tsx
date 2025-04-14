"use client";

import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";

import { deleteSheet } from "@/app/songs/actions";

import { DeleteButtonProps } from "@/lib/types";

import { SimpleLoader } from "@/components/simple-loader";
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

export function DeleteSheetButton({ id, onSuccess }: DeleteButtonProps) {
  const t = useTranslations("DeleteSheetButton");

  const [isPending, startTransition] = useTransition();

  function onActionClick() {
    startTransition(async () => {
      const deletedSheetResponse = await deleteSheet({ sheetId: id });

      toast.success(deletedSheetResponse.message);

      onSuccess?.();
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: "destructive", className: "flex gap-2" })}>
        {isPending && <SimpleLoader />}
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
