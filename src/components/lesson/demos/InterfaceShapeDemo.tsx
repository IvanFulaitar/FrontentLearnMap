import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface CandidateObject {
  id: string;
  label: string;
  code: string;
  data: Record<string, unknown>;
}

// The interface being taught, expressed as a real runtime check:
// interface Product { title: string; price: number; }
const REQUIRED_SHAPE: { key: string; type: "string" | "number" }[] = [
  { key: "title", type: "string" },
  { key: "price", type: "number" },
];

const CANDIDATES: CandidateObject[] = [
  { id: "valid", label: "Правильний обʼєкт", code: '{ title: "Латте", price: 65 }', data: { title: "Латте", price: 65 } },
  { id: "missing", label: "Без price", code: '{ title: "Латте" }', data: { title: "Латте" } },
  { id: "wrong-type", label: 'price як рядок', code: '{ title: "Латте", price: "65" }', data: { title: "Латте", price: "65" } },
  { id: "extra", label: "Із зайвим полем", code: '{ title: "Латте", price: 65, weight: 300 }', data: { title: "Латте", price: 65, weight: 300 } },
];

/**
 * Live demo for "Інтерфейси": checks a real candidate object against the
 * real fields/types an `interface Product { title: string; price: number }`
 * would require — using genuine `in` + `typeof` checks, mirroring what the
 * compiler's structural check verifies.
 */
export function InterfaceShapeDemo() {
  const [candidateId, setCandidateId] = useState("valid");
  const candidate = CANDIDATES.find((item) => item.id === candidateId) ?? CANDIDATES[0];

  const allowedKeys = REQUIRED_SHAPE.map((field) => field.key);
  const problems: string[] = [];
  for (const field of REQUIRED_SHAPE) {
    if (!(field.key in candidate.data)) {
      problems.push(`Property '${field.key}' is missing in type '{ ${Object.keys(candidate.data).join(", ")} }' but required in type 'Product'.`);
      continue;
    }
    const actual = typeof candidate.data[field.key];
    if (actual !== field.type) {
      problems.push(`Type '${actual}' is not assignable to type '${field.type}'. (${field.key})`);
    }
  }
  const excessKeys = Object.keys(candidate.data).filter((key) => !allowedKeys.includes(key));
  for (const key of excessKeys) {
    problems.push(`Object literal may only specify known properties, and '${key}' does not exist in type 'Product'.`);
  }
  const isValid = problems.length === 0;

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="interface Product { title: string; price: number; } — перевір реальний обʼєкт">
        <DemoToolbar
          options={CANDIDATES.map((item) => ({ value: item.id, label: item.label }))}
          value={candidateId}
          onChange={setCandidateId}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>const item: Product = {candidate.code};</span>
          <span className={isValid ? styles.tsBadgeOk : styles.tsBadgeErr}>{isValid ? "дозволено" : "помилка"}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${isValid ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {isValid
            ? "Немає помилок — обʼєкт має всі властивості інтерфейсу Product з правильними типами."
            : problems.join("\n")}
        </div>
      </DemoPreview>

      <DemoExplanation>
        interface Product описує ФОРМУ обʼєкта: які властивості обовʼязкові і якого вони типу. Компілятор порівнює
        реальний обʼєкт із цією формою: чи є всі потрібні поля (title, price), чи збігаються їхні типи — і, коли
        обʼєкт записаний одразу як літерал (у фігурних дужках, прямо тут), додатково перевіряє, чи немає в ньому
        зайвих полів, яких немає в Product (weight тут саме такий випадок).
      </DemoExplanation>

      <DemoKeyTakeaway>
        Інтерфейс — це не клас і не шаблон для створення обʼєктів, а опис форми, яку компілятор звіряє з реальними
        обʼєктами: чи є потрібні властивості, чи мають вони правильний тип, і (для обʼєктів-літералів) чи немає
        зайвих полів.
      </DemoKeyTakeaway>
    </div>
  );
}
