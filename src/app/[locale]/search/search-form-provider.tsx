"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { searchSchema } from "@/lib/zod-schemas";

type SearchFormProps = PropsWithChildren<{
  userSearch: string;
}>;

export function SearchFormProvider({ children, userSearch }: SearchFormProps) {
  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: userSearch || ""
    }
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}
