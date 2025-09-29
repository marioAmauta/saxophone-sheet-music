import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";

import { MessageWithLink } from "@/components/layout/message-with-link";
import { PageContainer } from "@/components/layout/sections";
import { LoginForm } from "@/components/login-form";
import { TypographyH1 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";

export default function LoginPage() {
  const t = useTranslations("LoginPage");

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <LoginForm />
      <MessageWithLink href={AppRoutes.registerPage} linkLabel={t("registerLink")} messageText={t("noAccount")} />
      <div className="flex justify-center">
        <Link
          href={AppRoutes.forgotPasswordPage}
          className={buttonVariants({ variant: "link", className: "font-semibold" })}
        >
          {t("forgotPasswordLink")}
        </Link>
      </div>
    </PageContainer>
  );
}
