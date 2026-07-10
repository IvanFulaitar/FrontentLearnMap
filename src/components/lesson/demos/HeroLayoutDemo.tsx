import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Layout = "centered" | "split";

/**
 * Live demo for "Hero-секція": click between a centered flex hero (no
 * photo) and a two-column grid hero (text + image) — the two patterns the
 * lesson teaches — on the same real heading/description/button content.
 */
export function HeroLayoutDemo() {
  const [layout, setLayout] = useState<Layout>("centered");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "centered", label: "Центрований (без фото)" },
          { value: "split", label: "Дві колонки (текст + фото)" },
        ]}
        value={layout}
        onChange={(value) => setLayout(value as Layout)}
      />

      <DemoPreview label="Той самий контент hero у двох поширених розкладках">
        <div className={layout === "centered" ? styles.hlCentered : styles.hlSplit}>
          <div className={styles.hlText}>
            <p className={styles.hlLabel}>Specialty Coffee</p>
            <h3 className={styles.hlTitle}>Кава, заради якої хочеться сповільнитись</h3>
            <p className={styles.hlDescription}>Затишна кав&apos;ярня в центрі міста зі свіжообсмаженою кавою.</p>
            <div className={styles.hlActions}>
              <a className={styles.hlButtonPrimary} href="#menu" onClick={(e) => e.preventDefault()}>
                Переглянути меню
              </a>
              <a className={styles.hlButtonSecondary} href="#booking" onClick={(e) => e.preventDefault()}>
                Забронювати
              </a>
            </div>
          </div>
          {layout === "split" ? <div className={styles.hlImage} /> : null}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {layout === "centered"
          ? "Flex-колонка з align-items: center і text-align: center — стандартний спосіб відцентрувати заголовок, опис і кнопки без фото. min-height (не height) дозволяє блоку вирости, якщо текст довший."
          : "Grid у дві рівні колонки (1fr 1fr): текст ліворуч, фото праворуч — стандартний патерн комерційних hero-секцій. На вузькому екрані медіазапит перемикає grid-template-columns в один стовпчик."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          layout === "centered"
            ? `.hero {\n  min-height: 70vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  gap: 16px;\n}`
            : `.hero {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 48px;\n  align-items: center;\n}\n\n@media (max-width: 768px) {\n  .hero {\n    grid-template-columns: 1fr;\n  }\n}`
        }
      />

      <DemoKeyTakeaway>
        Обидва варіанти використовують min-height замість height — якщо переклад чи довший текст не влізе в
        очікувану висоту, секція виросте, а не обріже контент.
      </DemoKeyTakeaway>
    </div>
  );
}
