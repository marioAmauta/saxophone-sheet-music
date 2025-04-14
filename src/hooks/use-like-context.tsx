"use client";

import { createContext, PropsWithChildren, useContext, useOptimistic } from "react";

type LikeContextType = { isLiked: boolean; setIsLiked: (action: unknown) => void } | null;

const LikeContext = createContext<LikeContextType>(null);

type LikeProviderProps = PropsWithChildren<{ like: boolean }>;

export function LikeProvider({ like, children }: LikeProviderProps) {
  const [isOptimisticLiked, setIsOptimisticLiked] = useOptimistic(like, (_, newState) => Boolean(newState));

  return (
    <LikeContext.Provider value={{ isLiked: isOptimisticLiked, setIsLiked: setIsOptimisticLiked }}>
      {children}
    </LikeContext.Provider>
  );
}

export function useLikeContext() {
  const context = useContext(LikeContext);

  if (!context) {
    throw new Error("useLikeContext must be used within a LikeProvider");
  }

  return context;
}
