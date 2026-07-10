import { useState } from "react";
import { DemoToolbar, DemoViewport, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Theme = "light" | "dark";

/**
 * Live demo for "Фінальний лендінг кав'ярні": a compact mini landing page
 * (header, hero, menu cards, footer) combines a REAL resizable viewport
 * (mobile-first grid reflow) with a REAL light/dark theme toggle at the
 * same time — the capstone lesson's whole point is that every technique
 * from earlier modules (responsive layout, dark theme tokens, card grid)
 * has to keep working together, not just in isolation.
 */
export function LandingPreviewDemo() {
  const [width, setWidth] = useState(700);
  const [theme, setTheme] = useState<Theme>("light");
  const columns = width < 560 ? 1 : width < 820 ? 2 : 3;

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "light", label: "☀️ Світла тема" },
          { value: "dark", label: "🌙 Темна тема" },
        ]}
        value={theme}
        onChange={(value) => setTheme(value as Theme)}
      />

      <DemoViewport width={width} onWidthChange={setWidth} min={340} max={900}>
        <div className={`${styles.lpPage} ${theme === "dark" ? styles.lpPageDark : ""}`}>
          <header className={styles.lpHeader}>
            <span className={styles.lpLogo}>☕ Аромат</span>
            <nav className={styles.lpNav}>
              <span>Меню</span>
              <span>Про нас</span>
              <span>Контакти</span>
            </nav>
          </header>
          <section className={styles.lpHero}>
            <h2 className={styles.lpHeroTitle}>Кава, що починає ранок правильно</h2>
            <button type="button" className={styles.lpHeroButton}>
              Переглянути меню
            </button>
          </section>
          <section className={styles.lpGrid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {["Латте", "Круасан", "Чізкейк"].map((item) => (
              <div key={item} className={styles.lpCard}>
                {item}
              </div>
            ))}
          </section>
          <footer className={styles.lpFooter}>© Аромат, {columns === 1 ? "мобільна версія" : "десктопна версія"}</footer>
        </div>
      </DemoViewport>

      <DemoExplanation>
        Ширина {width}px дає {columns} {columns === 1 ? "колонку" : "колонки"} у сітці меню, а {theme === "light" ? "світла" : "темна"} тема
        перевизначає лише CSS-змінні кольору — sticky-подібний header, hero, картки й footer при цьому не
        потребують жодного окремого правила під тему чи ширину: вони вже побудовані на var(--...) і адаптивній
        сітці з попередніх модулів.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`:root {
  --bg: #fdfaf5;
  --surface: #ffffff;
  --text: #1f2937;
}

@media (prefers-color-scheme: dark) {
  :root { --bg: #14181a; --surface: #1f2937; --text: #f3f4f6; }
}

.menu-grid {
  grid-template-columns: repeat(${columns}, 1fr); /* зараз: ${width}px */
}`}
      />

      <DemoKeyTakeaway>
        Фінальний лендінг — не нова техніка, а перевірка, що адаптивність (модуль "Адаптивний дизайн") і темна тема
        (модуль "CSS-змінні і темна тема") працюють РАЗОМ, одночасно, на тих самих компонентах — а не лише
        по одній технці за раз, як у попередніх уроках.
      </DemoKeyTakeaway>
    </div>
  );
}
