"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { startTransition, useState } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";

import { SortOptions } from "@/lib/types";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type SortingOptionsArray = { label: string; value: SortOptions }[];

type SortingControlProps = {
  quantityLabel: string;
  start: number;
  end: number;
  totalItems: number;
  sortingOptions: SortingOptionsArray;
};

export function SortingControl({ quantityLabel, start, end, totalItems, sortingOptions }: SortingControlProps) {
  const t = useTranslations("sorting");

  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const sortKey = "sort";

  const [selected, setSelected] = useState(searchParams.get(sortKey) || sortingOptions[0].value);

  function onChange(value: string) {
    startTransition(() => {
      setSelected(value);

      const params = new URLSearchParams(searchParams);
      params.set(sortKey, value);

      router.push(`${pathname}?${params}`);
    });
  }

  return (
    <div className="flex items-center justify-between gap-4 md:flex-row md:items-center">
      <p>{`${start + 1}-${end > totalItems ? end - (end - totalItems) : end} ${t("ofLabel")} ${totalItems} ${quantityLabel}`}</p>
      {totalItems > 1 ? (
        <Select defaultValue={selected} onValueChange={onChange}>
          <SelectTrigger className="w-max">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="center">
            {Object.values(sortingOptions).map(({ value, label }) => (
              <SelectItem key={value} value={value} className="cursor-pointer">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null}
    </div>
  );
}
