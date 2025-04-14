"use client";

import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";

export function GoBackButton() {
  const t = useTranslations("GoBackButton");

  const router = useRouter();

  return <Button onClick={() => router.back()}>{t("label")}</Button>;
}
