import { PropsWithChildren } from "react";

export async function SongsList({ children }: PropsWithChildren) {
  return <ul className="grid grid-cols-1 gap-8 py-4 sm:grid-cols-2">{children}</ul>;
}
