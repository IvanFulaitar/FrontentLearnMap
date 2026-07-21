import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// function processOrders(orders: number[], onEach: (order: number, index: number) => string): string[]
const ORDERS = [65, 60, 50];

type CallbackVariant = "correct" | "wrong-return" | "wrong-param-use";

const VARIANTS: { value: CallbackVariant; label: string; code: string }[] = [
  { value: "correct", label: "Правильний колбек", code: "(price, index) => `#${index}: ${price} грн`" },
  { value: "wrong-return", label: "Колбек повертає число", code: "(price, index) => price * 2" },
  { value: "wrong-param-use", label: "Колбек викликає .toUpperCase() на числі", code: "(price) => price.toUpperCase()" },
];

function realProcessOrders(orders: number[], onEach: (order: number, index: number) => string): string[] {
  return orders.map(onEach);
}

/**
 * Live demo for "Типи колбеків": models
 * `function processOrders(orders: number[], onEach: (order: number, index: number) => string): string[]`
 * and really runs `.map()` with the callback that matches the selected
 * variant's REAL shape when it type-checks, showing the genuine array
 * result — and a realistic compiler message for the two invalid variants.
 */
export function CallbackTypeDemo() {
  const [variant, setVariant] = useState<CallbackVariant>("correct");
  const current = VARIANTS.find((item) => item.value === variant) ?? VARIANTS[0];

  const isValid = variant === "correct";
  let message = "";
  let result: string[] = [];

  if (variant === "correct") {
    result = realProcessOrders(ORDERS, (price, index) => `#${index}: ${price} грн`);
  } else if (variant === "wrong-return") {
    message = "Type 'number' is not assignable to type 'string'.\n→ Тип колбека — (order: number, index: number) => string, а ця функція повертає число.";
  } else {
    message = "Property 'toUpperCase' does not exist on type 'number'.\n→ Перший параметр колбека — order: number, а .toUpperCase() існує лише в string.";
  }

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="function processOrders(orders: number[], onEach: (order: number, index: number) => string): string[]">
        <DemoToolbar options={VARIANTS.map((item) => ({ value: item.value, label: item.label }))} value={variant} onChange={(value) => setVariant(value as CallbackVariant)} />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>processOrders([{ORDERS.join(", ")}], {current.code})</span>
          <span className={isValid ? styles.tsBadgeOk : styles.tsBadgeErr}>{isValid ? "дозволено" : "помилка"}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${isValid ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {isValid ? `Немає помилок.\n→ реальний результат: [${result.map((item) => `"${item}"`).join(", ")}]` : message}
        </div>
      </DemoPreview>

      <DemoExplanation>
        onEach: (order: number, index: number) =&gt; string — це тип колбека: функції, яку передають ІНШІЙ функції як
        аргумент. Тип колбека описує форму, якої компілятор очікує від будь-якої функції, переданої на це місце:
        скільки параметрів, якого вони типу, і що функція повинна повернути. Якщо передана функція повертає не той
        тип (число замість рядка) чи намагається викликати метод, якого немає в оголошеному типі параметра
        (.toUpperCase() на number), компілятор ловить це так само, як і для звичайних функцій.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Тип колбека — це контракт для функції-аргумента: параметри й тип повернення функції, яку передають, повинні
        відповідати оголошеному типу колбека, так само, як звичайні аргументи відповідають типам звичайних параметрів.
      </DemoKeyTakeaway>
    </div>
  );
}
