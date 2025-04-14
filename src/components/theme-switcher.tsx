"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export function ThemeSwitcher() {
  const t = useTranslations("ThemeSwitcher");

  const [mounted, setMounted] = useState(false);

  const { setTheme, theme } = useTheme();

  const themes = [
    {
      label: t("lightLabel"),
      value: "light",
      Icon: Sun
    },
    {
      label: t("darkLabel"),
      value: "dark",
      Icon: Moon
    },
    {
      label: t("systemLabel"),
      value: "system",
      Icon: Monitor
    }
  ];

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Skeleton className="h-full w-16" />;
  }

  return (
    <Select defaultValue={theme} onValueChange={setTheme}>
      <SelectTrigger className="h-full w-16 cursor-pointer">
        {themes.map(({ Icon, value }) =>
          theme === value ? <Icon key={`${value}-icon`} className="stroke-primary size-4" /> : null
        )}
      </SelectTrigger>
      <SelectContent align="center">
        {themes.map(({ label, value }) => (
          <SelectItem key={value} value={value} className="cursor-pointer">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
