import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// function getLength<T extends { length: number }>(item: T): number
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

interface Candidate {
  id: string;
  label: string;
  code: string;
  hasLength: boolean;
  value: string | number[] | number;
}

const CANDIDATES: Candidate[] = [
  { id: "string", label: '"Латте" (рядок)', code: '"Латте"', hasLength: true, value: "Латте" },
  { id: "array", label: "[65, 60, 50] (масив)", code: "[65, 60, 50]", hasLength: true, value: [65, 60, 50] },
  { id: "number", label: "65 (число)", code: "65", hasLength: false, value: 65 },
];

/**
 * Live demo for "Обмеження дженериків": models
 * `function getLength<T extends { length: number }>(item: T): number` and
 * really checks each candidate for a real `length` property before calling
 * the function, showing the genuine compiler rejection for `number`
 * (which has no `.length`) versus real results for string/array.
 */
export function GenericConstraintDemo() {
  const [candidateId, setCandidateId] = useState("string");
  const candidate = CANDIDATES.find((item) => item.id === candidateId) ?? CANDIDATES[0];

  const isValid = candidate.hasLength;
  const result = isValid ? getLength(candidate.value as string | number[]) : null;

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="function getLength<T extends { length: number }>(item: T): number">
        <DemoToolbar options={CANDIDATES.map((item) => ({ value: item.id, label: item.label }))} value={candidateId} onChange={setCandidateId} />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>getLength({candidate.code})</span>
          <span className={isValid ? styles.tsBadgeOk : styles.tsBadgeErr}>{isValid ? "дозволено" : "помилка"}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${isValid ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {isValid
            ? `Немає помилок — тип має реальну властивість length.\n→ реальний результат: ${result}`
            : "Argument of type 'number' does not satisfy the constraint '{ length: number }'.\n→ number не має властивості length — обмеження extends { length: number } забороняє цей виклик."}
        </div>
      </DemoPreview>

      <DemoExplanation>
        &lt;T extends {"{ length: number }"}&gt; — це обмеження дженерика: T усе ще може бути будь-яким типом, але
        ЛИШЕ таким, що реально має властивість length типу number. Рядки й масиви мають .length за своєю природою —
        вони проходять це обмеження. Число не має жодної властивості length узагалі — компілятор забороняє виклик
        ще до запуску, а не дозволяє коду впасти під час виконання на спробі прочитати неіснуючу властивість.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Обмеження дженерика (extends) звужує &quot;будь-який тип&quot; до &quot;будь-якого типу з конкретними
        властивостями&quot; — це дозволяє безпечно використовувати ці властивості всередині функції, залишаючись
        гнучким щодо конкретного типу вхідних даних.
      </DemoKeyTakeaway>
    </div>
  );
}
