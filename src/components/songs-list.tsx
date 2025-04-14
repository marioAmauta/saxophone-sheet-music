import { ReactNode } from "react";

export async function SongsList({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-rows-[1fr_auto]">
      <ul className="grid grid-cols-1 gap-8 py-4 sm:grid-cols-2 lg:grid-cols-3">{children}</ul>
    </div>
  );
}
