import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";

export function ContributeButton() {
  const t = useTranslations("ContributeButton");

  return (
    <a href={`mailto:saxsheet@gmail.com?subject=${t("subject")}`} className={buttonVariants()}>
      {t("label")}
    </a>
  );
}
