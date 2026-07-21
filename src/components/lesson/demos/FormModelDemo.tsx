import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// Layer 1: raw form values — everything from real form fields is a string.
interface OrderFormValues {
  quantity: string;
  email: string;
}

// Layer 2: parsed, validated data — real types, ready for use.
interface OrderData {
  quantity: number;
  email: string;
}

// Layer 3: ValidationResult<T> — real success/failure discriminated union.
type ValidationResult<T> = { valid: true; data: T } | { valid: false; errors: string[] };

function validateOrderForm(values: OrderFormValues): ValidationResult<OrderData> {
  const errors: string[] = [];
  const quantity = Number(values.quantity);

  if (values.quantity.trim() === "" || Number.isNaN(quantity) || quantity <= 0) {
    errors.push("Кількість повинна бути додатним числом");
  }
  if (!values.email.includes("@")) {
    errors.push("Некоректна email-адреса");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true, data: { quantity, email: values.email } };
}

type Scenario = "valid" | "bad-quantity" | "bad-email";

const SCENARIOS: Record<Scenario, OrderFormValues> = {
  valid: { quantity: "3", email: "ivan@example.com" },
  "bad-quantity": { quantity: "абв", email: "ivan@example.com" },
  "bad-email": { quantity: "3", email: "не-емейл" },
};

/**
 * Live demo for "Багаторазові моделі форм": models the real three-layer
 * pattern — raw string form values → parsed/validated OrderData →
 * ValidationResult<OrderData> — and really runs validateOrderForm() on
 * genuinely different raw inputs, showing the real errors array or the
 * real parsed data depending on actual input correctness.
 */
export function FormModelDemo() {
  const [scenario, setScenario] = useState<Scenario>("valid");
  const values = SCENARIOS[scenario];
  const result = validateOrderForm(values);

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="OrderFormValues (рядки) → validateOrderForm → ValidationResult<OrderData>">
        <DemoToolbar
          options={[
            { value: "valid", label: "Коректні дані" },
            { value: "bad-quantity", label: 'quantity: "абв"' },
            { value: "bad-email", label: 'email: "не-емейл"' },
          ]}
          value={scenario}
          onChange={(value) => setScenario(value as Scenario)}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>
            {`{ quantity: "${values.quantity}", email: "${values.email}" }`}
          </span>
          <span className={result.valid ? styles.tsBadgeOk : styles.tsBadgeErr}>{result.valid ? "valid: true" : "valid: false"}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${result.valid ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {result.valid
            ? `if (result.valid) звужує тип до { valid: true; data: OrderData } — доступ до .data безпечний.\n→ реальні дані: quantity: ${result.data.quantity} (число), email: "${result.data.email}"`
            : `if (!result.valid) звужує тип до { valid: false; errors: string[] } — доступ до .errors безпечний, .data тут узагалі не існує.\n→ реальні помилки: ${result.errors.join("; ")}`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        Форма проходить три шари типів. OrderFormValues — те, що реально приходить із полів форми: ЗАВЖДИ рядки
        (навіть quantity, хоч і виглядає як число). validateOrderForm реально перевіряє й перетворює ці рядки —
        Number(values.quantity) та перевірка email — і повертає ValidationResult&lt;OrderData&gt;: дискримінована
        спілка (детальніше — у модулі ts-functions) з полем valid як перемикачем. OrderData — це вже РЕАЛЬНІ типи
        (quantity: number, а не рядок), доступні лише після успішної валідації.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Розділяй три шари форми: сирі рядкові значення з полів → функція валідації, що реально перевіряє й
        перетворює їх → типізований результат (ValidationResult&lt;T&gt;), який змушує обробити і успіх, і невдачу,
        перш ніж отримати доступ до готових, типізованих даних.
      </DemoKeyTakeaway>
    </div>
  );
}
