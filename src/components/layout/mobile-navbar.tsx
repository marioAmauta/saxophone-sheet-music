"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { DATA_CY_ELEMENTS } from "@/lib/constants";
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
      testId: DATA_CY_ELEMENTS.navbar.artistsLink,
      label: tLinks("artists")
    },
    {
      href: AppRoutes.songsPage,
      testId: DATA_CY_ELEMENTS.navbar.songsLink,
      label: tLinks("songs")
    },
    {
      href: AppRoutes.favoriteSongsPage,
      testId: DATA_CY_ELEMENTS.navbar.favoriteSongsLink,
      label: tLinks("favoriteSongs")
    },
    {
      href: AppRoutes.musicalGenresPage,
      label: tLinks("musicalGenres")
    },
    {
      href: AppRoutes.createSongPage,
      testId: DATA_CY_ELEMENTS.navbar.createSongLink,
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
      <DrawerTrigger
        className="flex cursor-pointer flex-col items-center"
        data-testid={DATA_CY_ELEMENTS.navbar.mobileMenuButton}
      >
        <Menu className="size-6" />
        <span>{t("menuLabel")}</span>
      </DrawerTrigger>
      <DrawerContent data-testid={DATA_CY_ELEMENTS.navbar.mobileMenu}>
        <DrawerHeader>
          <DrawerTitle>{t("menuLabel")}</DrawerTitle>
          <DrawerDescription>{t("menuDescription")}</DrawerDescription>
        </DrawerHeader>
        <div className="mx-auto grid w-[80%] max-w-96 gap-6 px-4 pt-8 pb-16">
          {links.map(({ href, testId, label, isAdminLink }) => {
            if (isAdminLink && !isAdmin) {
              return null;
            }

            return (
              <DrawerClose key={`${href}-mobile-navbar`} asChild>
                <Link href={href} data-testid={testId} className={buttonVariants()}>
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
