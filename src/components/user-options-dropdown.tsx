"use client";

import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import { startTransition, useState } from "react";

import { Link, useRouter } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { authClient } from "@/lib/auth-client";
import { NavbarProps } from "@/lib/types";
import { eventPreventDefault } from "@/lib/utils";

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

export function UserOptionsDropdown({ user }: UserOptionsDropdownProps) {
  const t = useTranslations("UserOptionsDropdown");

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  async function handleSignOut() {
    setIsOpen(false);

    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess() {
            router.refresh();
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
          <>
            <DropdownMenuItem onSelect={eventPreventDefault} asChild>
              <LogoutButton handleSignOut={handleSignOut} />
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link href={AppRoutes.loginPage} className="cursor-pointer">
              {t("loginLabel")}
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
