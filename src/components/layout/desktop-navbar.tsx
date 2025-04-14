"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { Link, usePathname } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { DATA_CY_ELEMENTS } from "@/lib/constants";
import { LinkType, NavbarProps } from "@/lib/types";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

type DesktopNavbarProps = { isAdmin: NavbarProps["isAdmin"] };

export function DesktopNavbar({ isAdmin }: DesktopNavbarProps) {
  const t = useTranslations("navbar");

  const links: LinkType[] = [
    {
      href: AppRoutes.searchPage,
      label: t("search")
    },
    {
      href: AppRoutes.artistsPage,
      testId: DATA_CY_ELEMENTS.navbar.artistsLink,
      label: t("artists")
    },
    {
      href: AppRoutes.songsPage,
      testId: DATA_CY_ELEMENTS.navbar.songsLink,
      label: t("songs")
    },
    {
      href: AppRoutes.favoriteSongsPage,
      testId: DATA_CY_ELEMENTS.navbar.favoriteSongsLink,
      label: t("favoriteSongs")
    },
    {
      href: AppRoutes.musicalGenresPage,
      label: t("musicalGenres")
    },
    {
      href: AppRoutes.createSongPage,
      testId: DATA_CY_ELEMENTS.navbar.createSongLink,
      label: t("createSong"),
      isAdminLink: true
    }
  ];

  const params = useParams();
  const paramsArray = Object.values(params);

  const separator = "/";

  const pathname = usePathname();
  const pathnameArray = pathname.split(separator);
  const pathnameWithoutParams = pathnameArray.filter((path) => !paramsArray.includes(path)).join(separator);

  return (
    <div className="hidden items-center gap-4 md:flex">
      {links.map(({ href, testId, label, isAdminLink }) => {
        if (isAdminLink && !isAdmin) {
          return null;
        }

        return (
          <Link
            key={`${href}-desktop-link`}
            href={href}
            data-testid={testId}
            className={cn(
              buttonVariants({
                variant: "link",
                className: "size-min p-0"
              }),
              href === pathnameWithoutParams && "underline"
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
