import { useState } from "react";
import { DemoSection, DemoControls, DemoSelect, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type FieldState = "normal" | "error" | "success" | "disabled" | "readonly";

function buildExplanation(fieldState: FieldState): string {
  switch (fieldState) {
    case "error":
      return "Клас form-input-error додає червону рамку й фон, а текст під полем пояснює, що саме не так — колір сам по собі ніколи не єдиний сигнал помилки.";
    case "success":
      return "Клас form-input-success підтверджує, що поле заповнено правильно — зелена рамка й короткий текст.";
    case "disabled":
      return "disabled: поле неактивне, opacity знижена, cursor: not-allowed, і дані з нього НЕ відправляться разом із формою.";
    case "readonly":
      return "readonly: поле не можна редагувати, але фокус можливий і значення все одно відправиться з формою — це головна відмінність від disabled.";
    default:
      return "Наведи фокус на поле (клікни чи Tab) — border-color і box-shadow змінюються плавно завдяки transition. Обери інший стан вище, щоб побачити error/success/disabled/readonly.";
  }
}

function buildCode(fieldState: FieldState): string {
  if (fieldState === "disabled" || fieldState === "readonly") {
    return `.form-input:disabled {
  background: var(--surface-muted);
  cursor: not-allowed;
}
/* readonly не блокує відправку даних, disabled — блокує */
.form-input[readonly] {
  background: var(--surface-muted);
}`;
  }
  if (fieldState === "error" || fieldState === "success") {
    return `.form-input-error {
  border-color: #c0392b;
  background: #fff5f3;
}
.form-input-success {
  border-color: #2e7d32;
  background: #f3fff5;
}`;
  }
  return `.form-input:focus-visible {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
}`;
}

/**
 * Live demo for the "Форми, ціни і footer" module: a real form field whose
 * validation state (normal/error/success/disabled/readonly) is toggled live,
 * plus a price card with real hover-lift and a flex-grow content block that
 * pins the button to the bottom regardless of description length.
 */
export function FormsPricingDemo() {
  const [fieldState, setFieldState] = useState<FieldState>("normal");

  const inputClassName = [
    styles.fpInput,
    fieldState === "error" ? styles.fpInputError : "",
    fieldState === "success" ? styles.fpInputSuccess : "",
    fieldState === "disabled" ? styles.fpInputDisabled : "",
    fieldState === "readonly" ? styles.fpInputReadonly : "",
  ]
    .filter(Boolean)
    .join(" ");

  const hintClassName = [
    styles.fpHint,
    fieldState === "error" ? styles.fpHintError : fieldState === "success" ? styles.fpHintSuccess : styles.fpHintNeutral,
  ].join(" ");

  const hintText =
    fieldState === "error"
      ? "Введи номер телефону у форматі +380 00 000 00 00."
      : fieldState === "success"
        ? "Поле заповнено правильно."
        : fieldState === "disabled"
          ? "Поле тимчасово недоступне."
          : fieldState === "readonly"
            ? "Значення вже задане й не редагується, але відправиться з формою."
            : "Ми зателефонуємо тільки для підтвердження бронювання.";

  return (
    <DemoSection>
      <DemoControls>
        <DemoSelect
          label="Стан поля"
          value={fieldState}
          onChange={(value) => setFieldState(value as FieldState)}
          options={[
            { value: "normal", label: "Звичайний" },
            { value: "error", label: "Error" },
            { value: "success", label: "Success" },
            { value: "disabled", label: "Disabled" },
            { value: "readonly", label: "Readonly" },
          ]}
        />
      </DemoControls>

      <DemoPreview>
        <div className={styles.fpStage}>
          <div className={styles.fpField}>
            <label className={styles.fpLabel} htmlFor="demo-phone">Телефон</label>
            <input
              id="demo-phone"
              className={inputClassName}
              type="tel"
              defaultValue={fieldState === "readonly" ? "+380 63 000 00 00" : ""}
              placeholder="+380 00 000 00 00"
              disabled={fieldState === "disabled"}
              readOnly={fieldState === "readonly"}
            />
            <p className={hintClassName}>{hintText}</p>
          </div>

          <div className={styles.fpPriceCard}>
            <div className={styles.fpPriceContent}>
              <strong className={styles.fpPriceTitle}>Капучино</strong>
              <p className={styles.fpPriceDescription}>Еспресо, молоко та ніжна пінка.</p>
              <p className={styles.fpPricePrice}>85 грн</p>
            </div>
            <a className={styles.fpPriceButton} href="#booking">Замовити</a>
          </div>
        </div>
      </DemoPreview>

      <DemoExplanation>{buildExplanation(fieldState)}</DemoExplanation>

      <DemoCodeSnippet code={buildCode(fieldState)} />

      <DemoKeyTakeaway>
        Наведи мишку на картку ціни праворуч — вона піднімається (hover), а кнопка «Замовити» завжди лишається
        внизу картки завдяки flex-grow на блоці контенту, незалежно від довжини опису.
      </DemoKeyTakeaway>
    </DemoSection>
  );
}
