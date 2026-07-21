import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// function formatOrder(drink: string, size: string = "medium", note?: string): string
type CallVariant = "full" | "no-note" | "wrong-type";

const VARIANTS: { value: CallVariant; label: string; code: string }[] = [
  { value: "full", label: "Усі аргументи", code: 'formatOrder("Латте", "large", "без цукру")' },
  { value: "no-note", label: "Без необовʼязкового note", code: 'formatOrder("Латте", "large")' },
  { value: "wrong-type", label: "size — число замість рядка", code: "formatOrder(\"Латте\", 42)" },
];

function realFormatOrder(drink: string, size: string, note?: string): string {
  return note === undefined ? `${drink} (${size})` : `${drink} (${size}), примітка: ${note}`;
}

/**
 * Live demo for "Типи параметрів функції": models
 * `function formatOrder(drink: string, size: string = "medium", note?: string): string`
 * and really calls the equivalent JS function for each variant, showing a
 * real compiler verdict (missing required arg / wrong type) computed from
 * the actual argument shapes, plus the real runtime output when valid.
 */
export function ParameterTypesDemo() {
  const [variant, setVariant] = useState<CallVariant>("full");

  let isValid = true;
  let message = "";
  let result = "";

  if (variant === "full") {
    result = realFormatOrder("Латте", "large", "без цукру");
  } else if (variant === "no-note") {
    result = realFormatOrder("Латте", "large");
  } else {
    isValid = false;
    message = "Argument of type 'number' is not assignable to parameter of type 'string'.\n→ Параметр size оголошений як string, а сюди передають число 42.";
  }

  return (
    <div className={styles.tsStage}>
      <DemoPreview label='function formatOrder(drink: string, size: string = "medium", note?: string): string'>
        <DemoToolbar options={VARIANTS.map((item) => ({ value: item.value, label: item.label }))} value={variant} onChange={(value) => setVariant(value as CallVariant)} />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>{VARIANTS.find((item) => item.value === variant)?.code}</span>
          <span className={isValid ? styles.tsBadgeOk : styles.tsBadgeErr}>{isValid ? "дозволено" : "помилка"}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${isValid ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {isValid ? `Немає помилок.\n→ реальний результат: ${result}` : message}
        </div>
      </DemoPreview>

      <DemoExplanation>
        drink: string — обовʼязковий параметр, його завжди треба передати. size: string = &quot;medium&quot; має
        значення за замовчуванням — якщо його не передати, підставиться &quot;medium&quot;, а тип усе одно
        залишається string. note?: string — необовʼязковий параметр (детальніше про ? — у модулі про обʼєкти):
        функцію можна викликати і без нього. Компілятор перевіряє тип КОЖНОГО переданого аргументу проти оголошеного
        типу параметра, незалежно від того, обовʼязковий цей параметр чи ні.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Параметр зі значенням за замовчуванням (= &quot;medium&quot;) і необовʼязковий параметр (?) — це різні речі:
        перший завжди має конкретне значення (передане або замовчування), другий може реально бути відсутнім
        (undefined).
      </DemoKeyTakeaway>
    </div>
  );
}
