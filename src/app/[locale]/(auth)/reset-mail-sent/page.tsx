import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import { AppRoutes } from "@/lib/app-routes";

import { PageContainer } from "@/components/layout/sections";
import { TypographyH1 } from "@/components/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";

export const experimental_ppr = true;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ResetMailSentPage() {
  const t = useTranslations("ResetMailSentPage");

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <Alert>
        <CheckCircle2 className="size-5" />
        <AlertTitle>{t("alertTitle")}</AlertTitle>
        <AlertDescription>{t("alertDescription")}</AlertDescription>
      </Alert>
      <div className="flex justify-center">
        <Link href={AppRoutes.forgotPasswordPage} className={buttonVariants({ variant: "link" })}>
          {t("goToRecoverPassword")}
        </Link>
      </div>
    </PageContainer>
  );
}
