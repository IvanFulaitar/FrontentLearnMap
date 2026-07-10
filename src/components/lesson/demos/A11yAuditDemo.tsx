import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "before" | "after";

/**
 * Live demo for "Аудит продуктивності й доступності стилів": a click
 * toggle between the pre-audit and post-audit styles of the same
 * subtitle+button pair, plus a "Показати фокус" button that simulates
 * :focus-visible so the outline difference (present after the audit,
 * missing before) is genuinely visible without requiring real Tab
 * navigation inside an embedded demo.
 */
export function A11yAuditDemo() {
  const [mode, setMode] = useState<Mode>("before");
  const [showFocus, setShowFocus] = useState(false);

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "before", label: "До аудиту" },
          { value: "after", label: "Після аудиту" },
        ]}
        value={mode}
        onChange={(value) => setMode(value as Mode)}
      />

      <button type="button" className={styles.kfReplayButton} onClick={() => setShowFocus((value) => !value)}>
        {showFocus ? "Прибрати симуляцію фокусу" : "Симулювати фокус клавіатурою"}
      </button>

      <DemoPreview label={mode === "before" ? "Контраст ~2.3:1, outline: none" : "Контраст ~7:1, видимий :focus-visible"}>
        <div className={styles.a11yStage}>
          <p className={mode === "before" ? styles.a11ySubtitleBad : styles.a11ySubtitleGood}>
            Свіжа кава щоранку з 8:00
          </p>
          <button
            type="button"
            className={`${mode === "before" ? styles.a11yButtonBad : styles.a11yButtonGood} ${
              showFocus && mode === "after" ? styles.a11yFocusRing : ""
            }`}
          >
            Забронювати столик
          </button>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "before"
          ? "До аудиту: підзаголовок #a3a3a3 на білому фоні дає контраст лише ~2.3:1 (значно нижче мінімуму WCAG AA 4.5:1), а кнопка має outline: none без жодної заміни — натисни \"Симулювати фокус\", і побачиш, що для користувача клавіатури взагалі немає індикатора, де саме фокус."
          : "Після аудиту: той самий текст тепер #595959 — контраст ~7:1, з запасом проходить WCAG AA. Кнопка отримала :focus-visible з власним видимим outline — натисни \"Симулювати фокус\" і порівняй із версією \"До аудиту\"."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          mode === "before"
            ? `.hero-subtitle { color: #a3a3a3; } /* контраст ~2.3:1 — не проходить WCAG AA */
.btn:focus { outline: none; } /* немає жодної заміни */`
            : `.hero-subtitle { color: #595959; } /* контраст ~7:1 — проходить WCAG AA */
.btn:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}`
        }
      />

      <DemoKeyTakeaway>
        Аудит доступності — це не суб'єктивна думка "виглядає нормально", а перевірка за конкретними числами:
        контраст мінімум 4.5:1 (WCAG AA) і обов'язковий видимий стиль :focus-visible на кожному інтерактивному
        елементі. Обидві проблеми легко пропустити на екрані розробника й неможливо не помітити реальному
        користувачу клавіатури чи людині зі слабким зором.
      </DemoKeyTakeaway>
    </div>
  );
}
