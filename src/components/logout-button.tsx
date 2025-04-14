"use client";

import { useTranslations } from "next-intl";

import { DATA_CY_ELEMENTS } from "@/lib/constants";

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

type LogOutButtonProps = {
  handleSignOut: () => void;
};

export function LogoutButton({ handleSignOut }: LogOutButtonProps) {
  const t = useTranslations("LogOutButton");

  return (
    <AlertDialog>
      <AlertDialogTrigger
        data-cy={DATA_CY_ELEMENTS.navbar.logoutTriggerButton}
        className="focus:bg-accent hover:bg-accent focus:text-accent-foreground w-full cursor-pointer rounded-sm px-2 py-1.5 text-left text-sm"
      >
        {t("logOutLabel")}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("dialogTitle")}</AlertDialogTitle>
          <AlertDialogDescription>{t("dialogDescription")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("dialogCancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSignOut}
            data-cy={DATA_CY_ELEMENTS.navbar.logoutButton}
            className={buttonVariants({ variant: "destructive" })}
          >
            {t("logOutLabel")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
