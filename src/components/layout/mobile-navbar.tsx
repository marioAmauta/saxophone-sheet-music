"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { LinkType, NavbarProps } from "@/lib/types";

import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

type MobileNavbarProps = { isAdmin: NavbarProps["isAdmin"] };

export function MobileNavbar({ isAdmin }: Readonly<MobileNavbarProps>) {
  const t = useTranslations("MobileNavbar");
  const tLinks = useTranslations("navbar");

  const [open, setOpen] = useState(false);

  const links: LinkType[] = [
    {
      href: AppRoutes.artistsPage,
      label: tLinks("artists")
    },
    {
      href: AppRoutes.songsPage,
      label: tLinks("songs")
    },
    {
      href: AppRoutes.favoriteSongsPage,
      label: tLinks("favoriteSongs")
    },
    {
      href: AppRoutes.musicalGenresPage,
      label: tLinks("musicalGenres")
    },
    {
      href: AppRoutes.createSongPage,
      label: tLinks("createSong"),
      isAdminLink: true
    }
  ];

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex cursor-pointer flex-col items-center">
        <Menu className="size-6" />
        <span>{t("menuLabel")}</span>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("menuLabel")}</DrawerTitle>
          <DrawerDescription>{t("menuDescription")}</DrawerDescription>
        </DrawerHeader>
        <div className="mx-auto grid w-[80%] max-w-96 gap-6 px-4 pt-8 pb-16">
          {links.map(({ href, label, isAdminLink }) => {
            if (isAdminLink && !isAdmin) {
              return null;
            }

            return (
              <DrawerClose key={`${href}-mobile-navbar`} asChild>
                <Link href={href} className={buttonVariants()}>
                  {label}
                </Link>
              </DrawerClose>
            );
          })}
          <Separator />
          <DrawerClose className={buttonVariants()}>{t("closeLabel")}</DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
