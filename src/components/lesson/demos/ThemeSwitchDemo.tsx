import { useState, type CSSProperties } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Theme = "light" | "dark";

const THEME_VARS: Record<Theme, CSSProperties> = {
  light: {
    "--tsw-bg": "#fdfaf5",
    "--tsw-surface": "#ffffff",
    "--tsw-text": "#1f2937",
    "--tsw-muted": "#6b7280",
    "--tsw-border": "#e5e7eb",
    "--tsw-primary": "#b45309",
  } as CSSProperties,
  dark: {
    "--tsw-bg": "#111827",
    "--tsw-surface": "#1f2937",
    "--tsw-text": "#f3f4f6",
    "--tsw-muted": "#9ca3af",
    "--tsw-border": "#374151",
    "--tsw-primary": "#f59e0b",
  } as CSSProperties,
};

const CODE: Record<Theme, string> = {
  light: `html.theme-light {
  --color-bg: #fdfaf5;
  --color-surface: #ffffff;
  --color-text: #1f2937;
}`,
  dark: `html.theme-dark {
  --color-bg: #111827;
  --color-surface: #1f2937;
  --color-text: #f3f4f6;
}`,
};

const EXPLANATION: Record<Theme, string> = {
  light:
    "Клас html.theme-light активний: усі --color-* токени встановлені на світлі значення. Натисни \"Темна\" — той самий клік, який пізніше в курсі JavaScript зробить кнопка-перемикач.",
  dark:
    "Клас html.theme-dark активний: ті самі токени (--color-bg, --color-surface, --color-text, --color-primary) отримали інші значення — жодне правило .themeSwitchCard чи .themeSwitchCta при цьому не змінювалось.",
};

/**
 * Live demo for "Перемикач теми на класі": a real toggle button switches
 * a whole mini café card between light and dark by swapping ONE set of
 * --tsw-* custom properties (standing in for --color-*) — exactly the
 * html.theme-light / html.theme-dark class mechanism the lesson teaches.
 * Colors here never depend on the course site's own theme.
 */
export function ThemeSwitchDemo() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "light", label: "☀️ Світла (.theme-light)" },
          { value: "dark", label: "🌙 Темна (.theme-dark)" },
        ]}
        value={theme}
        onChange={(value) => setTheme(value as Theme)}
      />

      <DemoPreview label="Той самий CSS, лише клас на html змінився">
        <div className={styles.themeSwitchStage} style={THEME_VARS[theme]}>
          <div className={styles.themeSwitchHeader}>
            <span className={styles.themeSwitchLogo}>☕ Аромат</span>
            <span className={styles.themeSwitchCta}>Забронювати</span>
          </div>
          <div className={styles.themeSwitchCard}>
            <strong>Латте</strong>
            <span className={styles.themeSwitchPrice}>75 грн</span>
          </div>
          <a href="#" onClick={(event) => event.preventDefault()} className={styles.themeSwitchLink}>
            Переглянути все меню →
          </a>
          <span className={styles.themeSwitchMuted}>
            html.theme-{theme} зараз активний
          </span>
        </div>
      </DemoPreview>

      <DemoExplanation>{EXPLANATION[theme]}</DemoExplanation>

      <DemoCodeSnippet code={CODE[theme]} />

      <DemoKeyTakeaway>
        Клас на html — це ручний перемикач: він перевизначає той самий набір токенів кольору, що й
        prefers-color-scheme, тому жоден компонент (кнопка, картка, посилання) не потребує окремих
        правил під кожну тему — досить одного разу підключити var(--color-...).
      </DemoKeyTakeaway>
    </div>
  );
}
