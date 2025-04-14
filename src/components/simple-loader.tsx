import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type SimpleLoaderProps = {
  className?: string;
};

export function SimpleLoader({ className }: SimpleLoaderProps) {
  return (
    <div className="flex justify-center">
      <Loader2 className={cn("size-5 animate-spin", className)} />
    </div>
  );
}
