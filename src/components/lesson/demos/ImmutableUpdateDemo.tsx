import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Operation = "add" | "remove" | "replace";

const original = ["Книга", "Ручка", "Зошит"];

function runImmutableUpdate(op: Operation): string[] {
  if (op === "add") {
    return [...original, "Лінійка"];
  }
  if (op === "remove") {
    return original.filter((_, index) => index !== 1);
  }
  return original.map((item, index) => (index === 0 ? "Блокнот" : item));
}

const codeFor: Record<Operation, string> = {
  add: `const updated = [...original, "Лінійка"];\n// original не змінився`,
  remove: `const updated = original.filter((_, i) => i !== 1);\n// прибрано елемент з індексом 1, original не змінився`,
  replace: `const updated = original.map((item, i) =>\n  i === 0 ? "Блокнот" : item\n);\n// замінено елемент з індексом 0, original не змінився`,
};

/**
 * Live demo for "Незмінні (immutable) оновлення масивів": a real spread/
 * filter/map call against the same original array, showing the ACTUAL
 * resulting array side by side with the untouched original — proving the
 * original reference never changes, not just describing the concept.
 */
export function ImmutableUpdateDemo() {
  const [op, setOp] = useState<Operation>("add");
  const updated = runImmutableUpdate(op);

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Операція</span>
          <DemoToolbar
            options={[
              { value: "add", label: "додати ([...arr, x])" },
              { value: "remove", label: "видалити (filter)" },
              { value: "replace", label: "замінити (map)" },
            ]}
            value={op}
            onChange={(v) => setOp(v as Operation)}
          />
        </div>
      </div>

      <DemoPreview label="Реальний результат операції поруч з незміненим оригіналом">
        <div className={styles.semanticBlock}>
          <p>Оригінал (не змінюється): [{original.join(", ")}]</p>
          <p>
            Новий масив: <strong style={{ color: "#2e7d32" }}>[{updated.join(", ")}]</strong>
          </p>
          <p>original === updated: <strong>false</strong> — це різні масиви в памʼяті</p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {op === "add" && "Spread-оператор [...original, \"Лінійка\"] розгортає всі елементи оригіналу в НОВИЙ масив-літерал і додає новий елемент — original залишається тим самим масивом, яким був."}
        {op === "remove" && "filter((_, i) => i !== 1) створює новий масив з усіх елементів, КРІМ того, чий індекс дорівнює 1 — оригінал не мутується, .splice() зробив би це на місці."}
        {op === "replace" && "map() завжди повертає новий масив: для кожного елемента перевіряється індекс, і повертається або нове значення (для index === 0), або те саме без змін."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[op]} />

      <DemoKeyTakeaway>
        У кожному режимі оригінальний масив залишається тим самим об'єктом у пам'яті (original === updated дає
        false) — саме через це React бачить зміну й перерендерює компонент, на відміну від push/splice/sort напряму.
      </DemoKeyTakeaway>
    </div>
  );
}
