import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type SortMode = "none" | "noComparator" | "numericAsc" | "numericDesc";

const original = [10, 1, 21, 2];

function runSort(mode: SortMode): { result: number[]; mutatedOriginal: boolean } {
  if (mode === "none") {
    return { result: [...original], mutatedOriginal: false };
  }
  const copy = [...original];
  if (mode === "noComparator") {
    copy.sort();
  } else if (mode === "numericAsc") {
    copy.sort((a, b) => a - b);
  } else {
    copy.sort((a, b) => b - a);
  }
  return { result: copy, mutatedOriginal: false };
}

const codeFor: Record<SortMode, string> = {
  none: `const scores = [10, 1, 21, 2];\n// ще не відсортовано`,
  noComparator: `const scores = [10, 1, 21, 2];\nscores.sort();\n// [1, 10, 2, 21] — рядкове порівняння!`,
  numericAsc: `const scores = [10, 1, 21, 2];\nscores.sort((a, b) => a - b);\n// [1, 2, 10, 21] — правильно, зростання`,
  numericDesc: `const scores = [10, 1, 21, 2];\nscores.sort((a, b) => b - a);\n// [21, 10, 2, 1] — правильно, спадання`,
};

/**
 * Live demo for "Сортування даних": a real .sort() call on [10, 1, 21, 2],
 * toggling between no comparator (genuine lexicographic string-sort bug),
 * numeric ascending, and numeric descending — the array shown is the ACTUAL
 * result of that real .sort() call, not a described/simulated outcome.
 */
export function SortDemo() {
  const [mode, setMode] = useState<SortMode>("none");
  const { result } = runSort(mode);

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>scores.sort(...)</span>
          <DemoToolbar
            options={[
              { value: "none", label: "оригінал" },
              { value: "noComparator", label: "без компаратора" },
              { value: "numericAsc", label: "a - b (зростання)" },
              { value: "numericDesc", label: "b - a (спадання)" },
            ]}
            value={mode}
            onChange={(v) => setMode(v as SortMode)}
          />
        </div>
      </div>

      <DemoPreview label="Реальний результат scores.sort(...) для обраного режиму">
        <div className={styles.semanticBlock}>
          <p>Оригінал: [{original.join(", ")}]</p>
          <p>
            Результат: <strong style={{ color: mode === "noComparator" ? "#c0392b" : "#2e7d32" }}>
              [{result.join(", ")}]
            </strong>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "none" && "Це оригінальний, ще не відсортований масив. Обери один з режимів сортування вище."}
        {mode === "noComparator" && "Без компаратора .sort() перетворює кожне число на рядок і порівнює лексикографічно: \"1\" < \"10\" < \"2\" < \"21\" — довжина числа не враховується, тому результат для чисел неправильний."}
        {mode === "numericAsc" && "Компаратор (a, b) => a - b повертає від'ємне число, коли a менше за b — тому менші числа опиняються попереду: справжнє числове зростання."}
        {mode === "numericDesc" && "Компаратор (a, b) => b - a — дзеркальне до попереднього: більші числа опиняються попереду, даючи спадання."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        .sort() без компаратора сортує рядково, навіть числа. Для чисел завжди передавай компаратор{" "}
        (a, b) {"=>"} a - b (чи b - a) — і памʼятай, що .sort() мутує масив, на якому його викликали.
      </DemoKeyTakeaway>
    </div>
  );
}
