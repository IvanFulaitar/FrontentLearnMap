import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Variant = "correct" | "missing-branch" | "wrong-type";

const VARIANTS: { value: Variant; label: string }[] = [
  { value: "correct", label: "Обидві гілки повертають number" },
  { value: "missing-branch", label: "Гілка else нічого не повертає" },
  { value: "wrong-type", label: "Одна гілка повертає рядок" },
];

// function getDeliveryFee(orderTotal: number): number
function realGetDeliveryFee(orderTotal: number): number {
  return orderTotal >= 500 ? 0 : 49;
}

/**
 * Live demo for "Типи значень, що повертаються": models
 * `function getDeliveryFee(orderTotal: number): number` and shows the real
 * compiler complaint for two common return-type bugs (a branch with no
 * return, a branch returning the wrong type), computed from the selected
 * variant, plus the real computed fee for the correct version.
 */
export function ReturnTypeDemo() {
  const [variant, setVariant] = useState<Variant>("correct");
  const orderTotal = 350;

  const isValid = variant === "correct";
  let message = "";
  if (variant === "missing-branch") {
    message = "Function lacks ending return statement and return type does not include 'undefined'.\n→ Гілка else нічого не повертає, а оголошений тип — number, без undefined.";
  } else if (variant === "wrong-type") {
    message = "Type 'string' is not assignable to type 'number'.\n→ Одна з гілок функції повертає рядок, хоча оголошений тип повернення — number.";
  }

  const realFee = realGetDeliveryFee(orderTotal);

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="function getDeliveryFee(orderTotal: number): number">
        <DemoToolbar options={VARIANTS.map((item) => ({ value: item.value, label: item.label }))} value={variant} onChange={(value) => setVariant(value as Variant)} />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>getDeliveryFee({orderTotal})</span>
          <span className={isValid ? styles.tsBadgeOk : styles.tsBadgeErr}>{isValid ? "дозволено" : "помилка"}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${isValid ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {isValid ? `Немає помилок.\n→ реальний результат: ${realFee} грн` : message}
        </div>
      </DemoPreview>

      <DemoExplanation>
        : number після дужок параметрів — це анотація типу значення, яке функція ЗОБОВʼЯЗАНА повернути в кожній
        можливій гілці коду. Компілятор перевіряє КОЖЕН шлях виконання функції: якщо хоч одна гілка (наприклад, else)
        не має return, або повертає значення іншого типу (рядок замість числа), — це помилка ще до запуску, а не
        сюрприз, знайдений під час виконання, коли десь у коді раптом опиниться undefined там, де очікувалось число.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Тип повернення перевіряється для КОЖНОГО можливого шляху виконання функції одразу — забута гілка без return
        чи неправильний тип в одній із гілок ловиться компілятором так само, як і в основному шляху.
      </DemoKeyTakeaway>
    </div>
  );
}
