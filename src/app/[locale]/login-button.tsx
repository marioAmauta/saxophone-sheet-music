import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { getUserSession } from "@/lib/session";

import { buttonVariants } from "@/components/ui/button";

export async function LoginButton() {
  const t = await getTranslations("HomePage.heroSection");

  const { user } = await getUserSession();

  if (user) {
    return null;
  }

  return (
    <Link href={AppRoutes.loginPage} className={buttonVariants()}>
      {t("loginButton")}
    </Link>
  );
}
