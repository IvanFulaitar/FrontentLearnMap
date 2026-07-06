import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { CommandPalette } from "../../features/commandPalette/CommandPalette";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useTheme } from "../../context/ThemeContext";
import styles from "./AppLayout.module.css";

interface AppLayoutProps {
  children: ReactNode;
}

const SIDEBAR_COLLAPSED_KEY = "frontend-academy:sidebar-collapsed";

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(
    () => localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1",
  );
  const [isCommandOpen, setCommandOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const shortcutActions = useMemo(() => ({
    openSearch: () => setCommandOpen(true),
    openCommands: () => setCommandOpen(true),
    close: () => {
      setCommandOpen(false);
      setSidebarOpen(false);
    },
  }), []);
  useKeyboardShortcuts(shortcutActions);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, isSidebarCollapsed ? "1" : "0");
  }, [isSidebarCollapsed]);

  return (
    <div className={styles.shell}>
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        theme={theme}
        onThemeToggle={toggleTheme}
        isSidebarCollapsed={isSidebarCollapsed}
        onSidebarCollapseToggle={() => setSidebarCollapsed((value) => !value)}
      />
      <div
        className={styles.body}
        style={{ "--sidebar-col-width": isSidebarCollapsed ? "64px" : "var(--sidebar-width)" } as CSSProperties}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onCollapseToggle={() => setSidebarCollapsed((value) => !value)}
        />
        {isSidebarOpen ? <div className={styles.overlay} onClick={() => setSidebarOpen(false)} /> : null}
        <main className={styles.main}>{children}</main>
      </div>
      <CommandPalette open={isCommandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  );
}
