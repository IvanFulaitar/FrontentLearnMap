import { useState, type CSSProperties } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Theme = "light" | "dark";

const THEME_VARS: Record<Theme, CSSProperties> = {
  light: {
    "--stm-bg": "#fdfaf5",
    "--stm-surface": "#ffffff",
    "--stm-text": "#1f2937",
    "--stm-muted": "#6b7280",
  } as CSSProperties,
  dark: {
    "--stm-bg": "#111827",
    "--stm-surface": "#1f2937",
    "--stm-text": "#f3f4f6",
    "--stm-muted": "#9ca3af",
  } as CSSProperties,
};

/**
 * Live demo for "prefers-color-scheme і темна тема": a toolbar stands in
 * for the user's SYSTEM theme setting (not a manual on-page switch — that
 * mechanism belongs to the next lesson's ThemeSwitchDemo). Toggling it
 * flips a real CSS `color-scheme` property on the wrapper, so the native
 * <input type="checkbox"> and <input type="date"> below genuinely repaint
 * in the browser's own dark-mode form-control style — nothing here is
 * simulated with custom colors, it's the real feature the lesson teaches.
 */
export function SystemThemeDemo() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "light", label: "☀️ Система: світла" },
          { value: "dark", label: "🌙 Система: темна" },
        ]}
        value={theme}
        onChange={(value) => setTheme(value as Theme)}
      />

      <DemoPreview label="prefers-color-scheme спрацьовує так, ніби це реальне налаштування ОС">
        <div className={styles.systemThemeStage} style={{ ...THEME_VARS[theme], colorScheme: theme }}>
          <div className={styles.systemThemeCard}>
            <strong>Латте</strong>
            <span className={styles.systemThemeMuted}>75 грн</span>
          </div>
          <label className={styles.systemThemeRow}>
            <input type="checkbox" defaultChecked /> Отримувати акції поштою
          </label>
          <label className={styles.systemThemeRow}>
            Дата бронювання: <input type="date" defaultValue="2026-07-15" />
          </label>
          <span className={styles.systemThemeMuted}>color-scheme: {theme} — checkbox і date вище намальовані самим браузером</span>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {theme === "light"
          ? "Система світла: color-scheme: light підказує браузеру малювати чекбокс і поле дати у звичайному світлому стилі — так само як prefers-color-scheme: light за замовчуванням."
          : "Система темна: те саме color-scheme, значення dark — і той самий, жодного разу не перестильований вручну чекбокс і поле дати справді перемальовані браузером у темному варіанті. Це і є те, що обіцяє color-scheme: light dark у :root."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={`:root {
  color-scheme: light dark;
  --color-bg: #fdfaf5;
  --color-text: #1f2937;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #111827;
    --color-text: #f3f4f6;
  }
}

/* зараз: системна тема — ${theme} */`}
      />

      <DemoKeyTakeaway>
        prefers-color-scheme читає системне налаштування ОС, а не клік користувача на сайті — саме тому в цьому
        демо перемикач підписаний "Система", а не "Тема сайту". color-scheme: light dark на :root — єдиний рядок,
        що безкоштовно перефарбовує нативні checkbox/date/скролбар під активну тему, без жодного додаткового CSS.
      </DemoKeyTakeaway>
    </div>
  );
}
