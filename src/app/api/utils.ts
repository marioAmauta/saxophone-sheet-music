import { headers } from "next/headers";
import { cache } from "react";

export const getHostUrl = cache(async () => {
  const headersList = await headers();

  const hostUrl = `${headersList.get("x-forwarded-proto")}://${headersList.get("host")}`;

  return hostUrl;
});
