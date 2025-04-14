import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { cn } from "@/lib/utils";

import { buttonVariants } from "./ui/button";

type LoginLinkProps = {
  className?: string;
  onClick?: () => void;
};

export function LoginLink({ className, onClick }: LoginLinkProps) {
  const t = useTranslations("LoginLink");

  return (
    <Link
      href={AppRoutes.loginPage}
      onClick={onClick}
      className={cn(buttonVariants({ variant: "outline" }), className)}
    >
      {t("label")}
    </Link>
  );
}
