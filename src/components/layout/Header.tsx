import { BookOpen, Menu, Moon, PanelLeftClose, PanelLeftOpen, Sun } from "lucide-react";
import { GlobalSearch } from "../search/GlobalSearch";
import { Button } from "../ui/Button";
import styles from "./Header.module.css";

interface HeaderProps {
  onMenuClick: () => void;
  theme: "light" | "dark" | "high-contrast" | "custom";
  onThemeToggle: () => void;
  isSidebarCollapsed: boolean;
  onSidebarCollapseToggle: () => void;
}

export function Header({ onMenuClick, theme, onThemeToggle, isSidebarCollapsed, onSidebarCollapseToggle }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Button
        className={styles.collapseButton}
        variant="ghost"
        onClick={onSidebarCollapseToggle}
        aria-label={isSidebarCollapsed ? "Показати бічну панель" : "Сховати бічну панель"}
        title={isSidebarCollapsed ? "Показати бічну панель" : "Сховати бічну панель"}
      >
        {isSidebarCollapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
      </Button>
      <div className={styles.brand}>
        <span className={styles.brandIcon}>
          <BookOpen size={19} />
        </span>
        <span>Frontend Roadmap Academy</span>
      </div>
      <GlobalSearch />
      <div className={styles.actions}>
        <Button variant="ghost" onClick={onThemeToggle} aria-label="Перемкнути тему">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
        <Button className={styles.menuButton} variant="ghost" onClick={onMenuClick} aria-label="Відкрити меню">
          <Menu size={19} />
        </Button>
      </div>
    </header>
  );
}
