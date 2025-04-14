import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { AppRoutes } from "@/lib/app-routes";
import { BreadcrumbItemType } from "@/lib/types";

import { BreadcrumbControl } from "@/components/layout/breadcrumb-control";
import { PageContainer } from "@/components/layout/sections";
import { SimpleLoader } from "@/components/simple-loader";
import { TypographyH1 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";

import { SearchForm } from "./search-form";
import { SearchFormProvider } from "./search-form-provider";
import { SearchResults } from "./search-results";

type SearchPageProps = {
  searchParams: SearchParams<{ q: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const t = await getTranslations("SearchPage");

  const { q: userSearch } = await searchParams;

  const tNavbar = await getTranslations("navbar");

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      href: AppRoutes.homePage,
      label: tNavbar("home")
    },
    {
      href: AppRoutes.searchPage,
      label: tNavbar("search")
    }
  ];

  return (
    <PageContainer>
      <TypographyH1>{t("title")}</TypographyH1>
      <Separator />
      <BreadcrumbControl breadcrumbItems={breadcrumbItems} />
      <SearchFormProvider key={userSearch} userSearch={userSearch}>
        <>
          <SearchForm />
          <Suspense fallback={<SimpleLoader />}>
            <SearchResults userSearch={userSearch} />
          </Suspense>
        </>
      </SearchFormProvider>
    </PageContainer>
  );
}
