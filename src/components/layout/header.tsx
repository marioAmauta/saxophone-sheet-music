import { Suspense } from "react";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { APP_NAME } from "@/lib/constants";
import { getUserSession } from "@/lib/session";
import { cn } from "@/lib/utils";

import { LanguageSwitcher } from "@/components/language-switcher";
import { DesktopNavbar } from "@/components/layout/desktop-navbar";
import { HeaderHider } from "@/components/layout/header-hider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { buttonVariants } from "@/components/ui/button";
import { UserOptionsDropdown } from "@/components/user-options-dropdown";

export async function Header() {
  const { user, isAdmin } = await getUserSession();

  return (
    <HeaderHider className="bg-background sticky top-0 z-50 border-b transition-all">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 p-4 max-[322px]:justify-center">
        <Link href={AppRoutes.homePage} className={cn(buttonVariants({ variant: "link" }), "p-0 text-lg font-bold")}>
          {APP_NAME}
        </Link>
        <DesktopNavbar isAdmin={isAdmin} />
        <div className="flex h-10 items-center gap-2">
          <ThemeSwitcher />
          <Suspense>
            <LanguageSwitcher />
          </Suspense>
          <UserOptionsDropdown user={user} />
        </div>
      </nav>
    </HeaderHider>
  );
}
