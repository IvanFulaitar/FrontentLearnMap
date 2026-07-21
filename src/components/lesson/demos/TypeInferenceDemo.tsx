import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface InferenceExample {
  id: string;
  code: string;
  value: unknown;
  isConst: boolean;
}

const EXAMPLES: InferenceExample[] = [
  { id: "const-str", code: 'const userName = "Оля";', value: "Оля", isConst: true },
  { id: "let-str", code: 'let userName = "Оля";', value: "Оля", isConst: false },
  { id: "const-num", code: "const age = 25;", value: 25, isConst: true },
  { id: "const-bool", code: "const isActive = true;", value: true, isConst: true },
  { id: "const-arr", code: 'const names = ["Оля", "Іван"];', value: ["Оля", "Іван"], isConst: true },
];

// Real inference logic — the same reasoning TypeScript itself uses: for a
// primitive literal assigned to `const` (which can never be reassigned),
// it can safely narrow to the literal value itself, not just the wide
// runtime type.
function inferType(example: InferenceExample): string {
  const { value, isConst } = example;
  if (Array.isArray(value)) {
    const elementTypes = Array.from(new Set(value.map((item) => typeof item)));
    return `${elementTypes.join(" | ")}[]`;
  }
  const runtimeType = typeof value;
  if (isConst && (runtimeType === "string" || runtimeType === "number" || runtimeType === "boolean")) {
    return JSON.stringify(value);
  }
  return runtimeType;
}

/**
 * Live demo for "Виведення типів": pick a real declaration and see the
 * ACTUAL inferred type computed live (via typeof / Array.isArray on the
 * real value) — including the const-vs-let distinction that changes
 * whether TypeScript narrows to a literal type or the wider runtime type.
 */
export function TypeInferenceDemo() {
  const [selectedId, setSelectedId] = useState("const-str");
  const selected = EXAMPLES.find((example) => example.id === selectedId) ?? EXAMPLES[0];
  const inferred = inferType(selected);

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="Обери оголошення — типу ти НЕ пишеш, TypeScript виводить його сам">
        <DemoToolbar
          options={EXAMPLES.map((example) => ({ value: example.id, label: example.code }))}
          value={selectedId}
          onChange={setSelectedId}
        />

        <div className={styles.tsCompilerBox}>
          <span className={styles.tsCode}>{selected.code}</span>
          {"\n\n"}
          {"Виведений тип: "}
          <strong>{inferred}</strong>
        </div>
      </DemoPreview>

      <DemoExplanation>
        Жодного `: тип` тут не написано — TypeScript сам дивиться на значення праворуч від = і визначає тип. Для
        const-рядка/числа/boolean він може звузити тип до самого літерального значення (наприклад, &quot;Оля&quot;,
        а не просто string), бо const гарантує, що змінну більше ніколи не перепризначать. Для let той самий рядок
        дає ширший тип string — значення можна змінити пізніше на будь-який інший рядок.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Не додавай анотацію там, де TypeScript і так правильно виводить тип сам — const userName = "Оля" настільки
        ж безпечний, як const userName: string = "Оля", але коротший.
      </DemoKeyTakeaway>
    </div>
  );
}
