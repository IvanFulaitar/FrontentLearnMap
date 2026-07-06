import { createContext, useContext, type ReactNode } from "react";
import { useThemeState } from "../hooks/useTheme";

type ThemeContextValue = ReturnType<typeof useThemeState>;

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Provides a single source of truth for theme state across layout and settings. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useThemeState();
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
