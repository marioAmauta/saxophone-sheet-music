import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type SectionProps = PropsWithChildren<{
  className?: string;
}>;

export function PageContainer({ children, className }: SectionProps) {
  return <div className={cn("mx-auto w-full max-w-5xl space-y-8 p-4", className)}>{children}</div>;
}

export function SectionContainer({ children, className }: SectionProps) {
  return (
    <section className={cn("mx-auto w-full max-w-5xl space-y-8 px-4 py-12 md:py-24 lg:py-32", className)}>
      {children}
    </section>
  );
}
