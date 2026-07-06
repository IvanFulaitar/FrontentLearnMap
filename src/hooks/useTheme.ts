import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "high-contrast" | "custom";
const THEME_KEY = "frontend-academy:theme";

export function useThemeState() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(THEME_KEY) as Theme) || "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "light" ? "dark" : "light"));
  const setThemeMode = (nextTheme: Theme) => setTheme(nextTheme);

  return { theme, toggleTheme, setThemeMode };
}
