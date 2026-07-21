import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface PriceOption {
  id: string;
  label: string;
  code: string;
  value: unknown;
}

// Real values — the JS result below is computed live via actual JS `*`,
// not a hardcoded string pretending what would happen.
const OPTIONS: PriceOption[] = [
  { id: "good", label: "65 (число)", code: "65", value: 65 },
  { id: "bad", label: '"100 гривень" (рядок)', code: '"100 гривень"', value: "100 гривень" },
  { id: "numeric-string", label: '"100" (рядок-число)', code: '"100"', value: "100" },
];

/**
 * Live demo for "Чому важливий TypeScript": the exact JS example from the
 * course prompt (calculateTotal(price, quantity)) — pick what gets passed
 * as `price`, see the REAL JavaScript runtime result (computed with the
 * actual `*` operator, including a real NaN when it breaks), next to the
 * TypeScript-side check computed live from `typeof price` — the same
 * check `price: number` would perform at compile time.
 */
export function WhyTypeScriptDemo() {
  const [selectedId, setSelectedId] = useState("bad");
  const selected = OPTIONS.find((option) => option.id === selectedId) ?? OPTIONS[0];
  const quantity = 3;

  // Real JS: no type system, so this always "runs" — sometimes into NaN.
  const jsResult = (selected.value as number) * quantity;

  // Real check — the same thing `price: number` would verify at compile
  // time, computed live from the actual runtime type of the selected value.
  const isNumber = typeof selected.value === "number";

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="Обери, що передати як price — і подивись, що станеться в JS проти того, що показав би TypeScript">
        <DemoToolbar
          options={OPTIONS.map((option) => ({ value: option.id, label: option.label }))}
          value={selectedId}
          onChange={setSelectedId}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>calculateTotal({selected.code}, 3)</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${Number.isNaN(jsResult) ? styles.tsCompilerBoxErr : ""}`}>
          <strong>JavaScript (без TypeScript) — реально виконується зараз:</strong>
          {"\n"}
          {'function calculateTotal(price, quantity) {\n  return price * quantity;\n}'}
          {"\n\n"}
          {"→ результат: "}
          {Number.isNaN(jsResult) ? "NaN (тихо зламалось, без жодної помилки)" : String(jsResult)}
        </div>

        <div className={`${styles.tsCompilerBox} ${isNumber ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          <strong>TypeScript (function calculateTotal(price: number, quantity: number))</strong>
          {"\n\n"}
          {isNumber
            ? "Немає помилок — price справді number, компілятор пропускає код без зауважень."
            : `Type '${typeof selected.value}' is not assignable to parameter of type 'number'.\n→ Тобі кажуть про це ДО запуску, не після.`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        JavaScript ніколи не зупиняє тебе — він завжди спробує виконати price * quantity, навіть коли price
        насправді рядок, і мовчки видасть NaN. TypeScript додає перевірку зверху: анотація price: number каже
        компілятору перевірити ще ДО запуску, чи справді туди передають число, і одразу показати помилку, якщо ні.
      </DemoExplanation>

      <DemoKeyTakeaway>
        TypeScript не змінює, як працює сам JavaScript під час виконання — NaN усе одно можливий у готовому коді.
        Він додає перевірку РАНІШЕ: до того, як програма взагалі запуститься.
      </DemoKeyTakeaway>
    </div>
  );
}
