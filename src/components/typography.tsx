import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type TypographyProps = PropsWithChildren<{ className?: string }>;

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl", className)}>
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn("scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0 md:text-4xl lg:text-5xl", className)}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: TypographyProps) {
  return <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>{children}</h3>;
}

export function TypographyLead({ children, className }: TypographyProps) {
  return <p className={cn("text-muted-foreground text-xl", className)}>{children}</p>;
}

export function TypographyLarge({ children, className }: TypographyProps) {
  return <div className={cn("text-lg font-semibold", className)}>{children}</div>;
}

export function TypographyP({ children, className }: TypographyProps) {
  return <p className={cn("leading-7 not-first:mt-6", className)}>{children}</p>;
}

export function TypographyMuted({ children, className }: TypographyProps) {
  return <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>;
}
