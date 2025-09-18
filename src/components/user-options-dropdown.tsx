"use client";

import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import { startTransition, useState } from "react";

import { Link, usePathname, useRouter } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { authClient } from "@/lib/auth-client";
import { NavbarProps } from "@/lib/types";
import { eventPreventDefault } from "@/lib/utils";

import { useAfterLoginRedirect } from "@/hooks/use-after-login-redirect";

import { LogoutButton } from "@/components/logout-button";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

type UserOptionsDropdownProps = { user: NavbarProps["user"] };

export function UserOptionsDropdown({ user }: Readonly<UserOptionsDropdownProps>) {
  const t = useTranslations("UserOptionsDropdown");

  const router = useRouter();

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const { setRedirectLink, removeRedirectLink } = useAfterLoginRedirect();

  function onLoginClick() {
    if (pathname !== AppRoutes.accountRequiredPage) {
      setRedirectLink(pathname);
    }
  }

  async function handleSignOut() {
    setIsOpen(false);

    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess() {
            router.refresh();

            removeRedirectLink();
          }
        }
      });
    });
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className={buttonVariants({ variant: "outline" })}>
        <User className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("myAccountLabel")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem onSelect={eventPreventDefault} asChild>
            <LogoutButton handleSignOut={handleSignOut} />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href={AppRoutes.loginPage} onClick={onLoginClick} className="cursor-pointer">
              {t("loginLabel")}
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
