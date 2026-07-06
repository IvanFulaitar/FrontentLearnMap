import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useProgressState } from "../hooks/useProgress";

type ProgressContextValue = ReturnType<typeof useProgressState>;

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const progress = useProgressState();
  const value = useMemo(() => progress, [progress]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgressContext() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgressContext must be used within ProgressProvider");
  }
  return context;
}
