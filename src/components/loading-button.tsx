import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface LoadingButtonProps extends ComponentProps<typeof Button> {
  loading: boolean;
}

export function LoadingButton({ loading, disabled, className, ...props }: LoadingButtonProps) {
  return (
    <Button disabled={disabled || loading} className={cn("flex items-center gap-2", className)} {...props}>
      {loading ? <Loader2 className="size-5 animate-spin" /> : null}
      {props.children}
    </Button>
  );
}
