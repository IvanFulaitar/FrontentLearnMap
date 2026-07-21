import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// function formatPrice(value: number): string;
// function formatPrice(value: string): number;
function formatPrice(value: number): string;
function formatPrice(value: string): number;
function formatPrice(value: number | string): number | string {
  if (typeof value === "number") {
    return `${value.toFixed(2)} грн`;
  }
  return Number(value.replace(/[^\d.]/g, ""));
}

interface Candidate {
  id: string;
  label: string;
  code: string;
  value: number | string;
}

const CANDIDATES: Candidate[] = [
  { id: "num", label: "65 (число)", code: "65", value: 65 },
  { id: "str", label: '"65 грн" (рядок)', code: '"65 грн"', value: "65 грн" },
];

/**
 * Live demo for "Перевантаження функцій": models two overload signatures
 * of `formatPrice` — number-in/string-out and string-in/number-out — and
 * really calls the shared implementation for the selected candidate,
 * showing the genuine output type and value that TypeScript's overload
 * resolution would pick for that specific input type.
 */
export function FunctionOverloadDemo() {
  const [candidateId, setCandidateId] = useState("num");
  const candidate = CANDIDATES.find((item) => item.id === candidateId) ?? CANDIDATES[0];

  const result = typeof candidate.value === "number" ? formatPrice(candidate.value) : formatPrice(candidate.value);
  const resultType = typeof result;
  const chosenSignature =
    typeof candidate.value === "number" ? "formatPrice(value: number): string" : "formatPrice(value: string): number";

  return (
    <div className={styles.tsStage}>
      <DemoPreview label={"function formatPrice(value: number): string;\nfunction formatPrice(value: string): number;"}>
        <DemoToolbar options={CANDIDATES.map((item) => ({ value: item.id, label: item.label }))} value={candidateId} onChange={setCandidateId} />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>formatPrice({candidate.code})</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${styles.tsCompilerBoxOk}`}>
          {`Компілятор обирає сигнатуру: ${chosenSignature}\n→ реальний результат (${resultType}): ${JSON.stringify(result)}`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        Перевантаження функції — це кілька заголовків (сигнатур) з однаковою назвою, кожен для свого набору типів
        параметрів і повернення, над однією спільною реалізацією. Коли викликаєш formatPrice(65), компілятор дивиться
        на тип аргументу (number) і обирає ВІДПОВІДНУ сигнатуру — тому результат типізується як string. Коли викликаєш
        formatPrice(&quot;65 грн&quot;), обирається інша сигнатура — і результат типізується як number. Реалізація
        всередині одна, але компілятор показує розробнику, що викликає formatPrice, лише ту сигнатуру, яка підходить
        під конкретний тип аргументу.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Перевантаження дозволяють одній функції по-різному типізувати вхід і вихід залежно від типу аргументу — це
        зручно, коли поведінка функції справді різна для різних типів вхідних даних, а не просто спосіб уникнути
        union-типу.
      </DemoKeyTakeaway>
    </div>
  );
}
