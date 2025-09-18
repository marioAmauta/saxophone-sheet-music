"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { ChangeEvent, startTransition, useId } from "react";

import { likeSong, unlikeSong } from "@/app/songs/actions";

import { usePathname } from "@/i18n/navigation";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { useAfterLoginRedirect } from "@/hooks/use-after-login-redirect";
import { useLikeContext } from "@/hooks/use-like-context";

import { buttonVariants } from "@/components/ui/button";

type LikeSongButtonProps = {
  songId: string;
  className?: string;
};

export function LikeSongButton({ songId, className }: Readonly<LikeSongButtonProps>) {
  const t = useTranslations("LikeSongButton");

  const id = useId();

  const { isLiked, setIsLiked } = useLikeContext();

  const { setRedirectLink } = useAfterLoginRedirect();

  const session = authClient.useSession();

  const pathname = usePathname();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    startTransition(async () => {
      const isChecked = event.target.checked;

      if (session.data) {
        setIsLiked(isChecked);
      } else {
        setRedirectLink(pathname);
      }

      if (isChecked) {
        await likeSong({ songId });
      } else {
        await unlikeSong({ songId });
      }
    });
  }

  return (
    <>
      <input onChange={handleChange} id={id} type="checkbox" className="hidden" checked={isLiked} />
      <label
        htmlFor={id}
        className={cn(
          buttonVariants({ variant: "outline", className: "flex cursor-pointer items-center gap-2" }),
          className
        )}
      >
        <Heart className={cn("size-4", isLiked && "fill-red-500 stroke-none")} />
        {isLiked ? t("unlikeLabel") : t("likeLabel")}
      </label>
    </>
  );
}
