import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "literal" | "computed" | "wrongComputed";

function buildProduct(mode: Mode): Record<string, unknown> {
  const fieldName = "category";
  if (mode === "literal") {
    return { name: "Зошит", price: 45 };
  }
  if (mode === "computed") {
    return { name: "Зошит", [fieldName]: "Канцелярія" };
  }
  // wrongComputed: genuine bug — no brackets, key is literally "fieldName"
  return { name: "Зошит", fieldName: "Канцелярія" };
}

const codeFor: Record<Mode, string> = {
  literal: `const product = {\n  name: "Зошит",\n  price: 45,\n};`,
  computed: `const fieldName = "category";\nconst product = {\n  name: "Зошит",\n  [fieldName]: "Канцелярія",\n};`,
  wrongComputed: `const fieldName = "category";\nconst product = {\n  name: "Зошит",\n  fieldName: "Канцелярія", // БАГ: без дужок!\n};`,
};

/**
 * Live demo for "Обʼєктні літерали": builds a REAL object with
 * Object.keys()/JSON.stringify() shown for each mode, including the actual
 * bug of a missing computed-key bracket producing a literal "fieldName" key.
 */
export function ObjectLiteralDemo() {
  const [mode, setMode] = useState<Mode>("literal");
  const product = buildProduct(mode);

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Обʼєкт</span>
          <DemoToolbar
            options={[
              { value: "literal", label: "звичайний літерал" },
              { value: "computed", label: "обчислюваний ключ [fieldName]" },
              { value: "wrongComputed", label: "БАГ: без дужок" },
            ]}
            value={mode}
            onChange={(v) => setMode(v as Mode)}
          />
        </div>
      </div>

      <DemoPreview label="Реальний результат JSON.stringify(product)">
        <div className={styles.semanticBlock}>
          <p>Ключі: {Object.keys(product).join(", ")}</p>
          <p>
            product.category:{" "}
            <strong style={{ color: "category" in product ? "#2e7d32" : "#c0392b" }}>
              {String((product as Record<string, unknown>).category)}
            </strong>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "literal" && "Звичайний обʼєктний літерал з двома статичними властивостями — name і price."}
        {mode === "computed" && "[fieldName] обчислює значення змінної fieldName (\"category\") і використовує РЕЗУЛЬТАТ як імʼя ключа — тому зʼявляється властивість category, а не fieldName."}
        {mode === "wrongComputed" && "Без квадратних дужок fieldName сприймається як буквальне імʼя ключа — властивість називається саме \"fieldName\", а product.category дає undefined."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        [expr]: value обчислює вираз і використовує результат як імʼя ключа. Без дужок текст перед двокрапкою
        завжди буквальне імʼя властивості, навіть якщо він збігається з назвою якоїсь змінної.
      </DemoKeyTakeaway>
    </div>
  );
}
