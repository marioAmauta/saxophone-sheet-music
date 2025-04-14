import { useLocalStorage } from "usehooks-ts";

import { RECENT_SEARCHES_KEY } from "@/lib/constants";

export function useRecentSearches() {
  const [searches, setSearches, removeSearches] = useLocalStorage<string[]>(RECENT_SEARCHES_KEY, []);

  function updateRecentSearches({ searchValue }: { searchValue: string }) {
    setSearches((prev) => Array.from(new Set([searchValue, ...prev])).slice(0, 10));
  }

  return {
    searches,
    setSearches,
    removeSearches,
    updateRecentSearches
  };
}
