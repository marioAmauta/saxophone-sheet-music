"use client";

import { useLocalStorage } from "usehooks-ts";

import { AFTER_LOGIN_REDIRECT_KEY } from "@/lib/constants";

export function useAfterLoginRedirect() {
  const [redirectLink, setRedirectLink, removeRedirectLink] = useLocalStorage<string>(AFTER_LOGIN_REDIRECT_KEY, "");

  return {
    redirectLink,
    setRedirectLink,
    removeRedirectLink
  };
}
