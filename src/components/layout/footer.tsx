import { Home, Search } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { DATA_CY_ELEMENTS } from "@/lib/constants";
import { getUserSession } from "@/lib/session";

import { MobileNavbar } from "@/components/layout/mobile-navbar";

export async function Footer() {
  const t = await getTranslations("footer");

  const { isAdmin } = await getUserSession();

  const links = [
    {
      href: AppRoutes.homePage,
      label: t("homeLink"),
      Icon: Home
    },
    {
      href: AppRoutes.searchPage,
      label: t("searchLink"),
      dataCy: DATA_CY_ELEMENTS.navbar.searchButton,
      Icon: Search
    }
  ];

  return (
    <footer className="bg-background sticky bottom-0 z-50 flex items-center justify-around border-t py-4 md:hidden">
      {links.map(({ href, label, dataCy, Icon }) => (
        <Link key={label} href={href} className="flex flex-col items-center" data-cy={dataCy}>
          <Icon className="size-6 cursor-pointer" />
          <span>{label}</span>
        </Link>
      ))}
      <MobileNavbar isAdmin={isAdmin} />
    </footer>
  );
}
