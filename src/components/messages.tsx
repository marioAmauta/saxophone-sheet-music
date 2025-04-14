import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import { TypographyP } from "./typography";

type MessageProps = PropsWithChildren<{ className?: string }>;

export function Message({ children, className }: MessageProps) {
  return <TypographyP className={cn("text-center text-xl", className)}>{children}</TypographyP>;
}
