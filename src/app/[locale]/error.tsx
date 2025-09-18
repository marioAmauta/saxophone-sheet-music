"use client";

import { useEffect } from "react";

import { PageContainer } from "@/components/layout/sections";
import { TypographyH1, TypographyP } from "@/components/typography";
import { Button } from "@/components/ui/button";

type ErrorPageProps = { error: Error; reset(): void };

export default function ErrorPage({ error, reset }: Readonly<ErrorPageProps>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer>
      <TypographyH1>Error Page</TypographyH1>
      <TypographyP className="break-all">{error.message}</TypographyP>
      <Button onClick={reset}>Try Again</Button>
    </PageContainer>
  );
}
