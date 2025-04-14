import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, useState } from "react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";

export function PasswordInput({ className, ref, ...props }: ComponentProps<typeof Input>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input ref={ref} type={showPassword ? "text" : "password"} className={cn("pe-10", className)} {...props} />
      <button
        type="button"
        title={showPassword ? "Hide password" : "Show password"}
        onClick={() => setShowPassword(!showPassword)}
        className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 transform"
      >
        {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
    </div>
  );
}
