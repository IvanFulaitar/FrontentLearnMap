import { useState, type ChangeEvent, type FormEvent } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Типізація подій": a REAL controlled input with a
 * genuinely typed onChange handler `(e: ChangeEvent<HTMLInputElement>) =>
 * void` and a real onSubmit handler `(e: FormEvent<HTMLFormElement>) =>
 * void` that calls the real `e.preventDefault()` — typing the actual DOM
 * event object React hands to the handler, not a fabricated one.
 */
export function EventTypingDemo() {
  const [value, setValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    // event.target is really typed as HTMLInputElement here — .value is real.
    setValue(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSubmittedValue(value);
  }

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="function handleChange(event: ChangeEvent<HTMLInputElement>): void">
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}
        >
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Назва напою"
            className={styles.tsCode}
            style={{ border: "1px solid var(--border)", padding: "4px 8px" }}
          />
          <button type="submit" className={styles.tsBadgeOk} style={{ cursor: "pointer" }}>
            Надіслати
          </button>
        </form>

        <div className={`${styles.tsCompilerBox} ${styles.tsCompilerBoxOk}`}>
          {`event.target.value (реальне, живе значення поля): "${value}"\n${
            submittedValue !== null ? `Останнє відправлене значення (після onSubmit): "${submittedValue}"` : "Форму ще не надсилали"
          }`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        ChangeEvent&lt;HTMLInputElement&gt; — це реальний тип події, яку React передає в onChange для конкретно
        input-елемента: event.target тут типізований як HTMLInputElement, тому event.target.value справді доступний
        і типізований як string, без потреби перевіряти чи приводити тип вручну. FormEvent&lt;HTMLFormElement&gt;
        аналогічно типізує подію onSubmit форми — event.preventDefault() тут реальний метод, який справді зупиняє
        типове перезавантаження сторінки браузером.
      </DemoExplanation>

      <DemoKeyTakeaway>
        React надає власні типи подій (ChangeEvent, FormEvent, MouseEvent із React, а не з чистого DOM) — вони
        типізують саме той обʼєкт події, який React реально передає обробнику, з правильним типом .target для
        конкретного елемента.
      </DemoKeyTakeaway>
    </div>
  );
}
