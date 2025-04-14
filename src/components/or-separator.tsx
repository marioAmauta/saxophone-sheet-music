import { useTranslations } from "next-intl";

import { Separator } from "@/components/ui/separator";

export function OrSeparator() {
  const t = useTranslations("OrSeparator");

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <Separator />
      <span className="uppercase">{t("label")}</span>
      <Separator />
    </div>
  );
}
