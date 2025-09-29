import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { getUserSession } from "@/lib/session";

import { buttonVariants } from "@/components/ui/button";

export async function SignUpButton() {
  const t = await getTranslations("SignUpButton");

  const { user } = await getUserSession();

  if (user) {
    return null;
  }

  return (
    <Link href={AppRoutes.registerPage} className={buttonVariants()}>
      {t("label")}
    </Link>
  );
}
