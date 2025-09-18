"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";

import { cn, range } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type PaginationControlProps = {
  start: number;
  end: number;
  page: number;
  limit: number;
  totalItems: number;
};

export function PaginationControl({ start, end, page, limit, totalItems }: Readonly<PaginationControlProps>) {
  const t = useTranslations("pagination");

  const searchKey = "page";

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParamsObject = Object.fromEntries(searchParams);

  const [selectedPage, setSelectedPage] = useState(searchParams.get(searchKey) ?? "1");

  const hasNextPage = end < totalItems;
  const hasPreviousPage = start > 0;
  const availablePages = range({ start: 1, stop: Math.ceil(totalItems / limit) });

  function onSelectChange(value: string) {
    setSelectedPage(value);

    const params = new URLSearchParams(searchParams);
    params.set(searchKey, value);

    router.push(`${pathname}?${params}`);
  }

  useEffect(() => {
    const lastPage = availablePages[availablePages.length - 1];
    const isPageGreaterThanLastPage = page > lastPage;
    const isLimitGreaterThanTotalItems = limit > totalItems;

    if (isPageGreaterThanLastPage || (isPageGreaterThanLastPage && isLimitGreaterThanTotalItems)) {
      return router.back();
    }

    setSelectedPage(String(page));
  }, [page, availablePages, limit, totalItems]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Pagination className={cn("hidden pb-12", totalItems > limit && "flex")}>
      <PaginationContent className="grid grid-cols-3 place-items-center">
        {hasPreviousPage ? (
          <PaginationItem>
            <PaginationPrevious href={{ pathname, query: { ...searchParamsObject, page: page - 1, limit } }} />
          </PaginationItem>
        ) : (
          <li className="pointer-events-none select-none" />
        )}
        <Select value={selectedPage} onValueChange={onSelectChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="center">
            {availablePages.map((pageNumber) => (
              <SelectItem key={pageNumber} value={String(pageNumber)} className="cursor-pointer">
                {t("pageNumber", { pageNumber: pageNumber.toString() })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasNextPage ? (
          <PaginationItem>
            <PaginationNext href={{ pathname, query: { ...searchParamsObject, page: page + 1, limit } }} />
          </PaginationItem>
        ) : (
          <li className="pointer-events-none select-none" />
        )}
      </PaginationContent>
    </Pagination>
  );
}
