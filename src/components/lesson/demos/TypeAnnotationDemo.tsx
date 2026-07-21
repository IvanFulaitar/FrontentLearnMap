import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type DeclaredType = "string" | "number" | "boolean";

interface CandidateValue {
  id: string;
  label: string;
  code: string;
  value: unknown;
}

const DECLARED_TYPES: { value: DeclaredType; label: string }[] = [
  { value: "string", label: "userName: string" },
  { value: "number", label: "age: number" },
  { value: "boolean", label: "isActive: boolean" },
];

const CANDIDATES: CandidateValue[] = [
  { id: "str", label: '"Оля"', code: '"Оля"', value: "Оля" },
  { id: "num", label: "25", code: "25", value: 25 },
  { id: "bool", label: "true", code: "true", value: true },
  { id: "numeric-str", label: '"25"', code: '"25"', value: "25" },
];

/**
 * Live demo for "Анотації типів": pick a declared type (the annotation),
 * then try assigning different real values to it. The accept/reject
 * verdict below is computed live via a real `typeof` check against the
 * chosen annotation — the exact rule TypeScript enforces at compile time.
 */
export function TypeAnnotationDemo() {
  const [declared, setDeclared] = useState<DeclaredType>("number");
  const [candidateId, setCandidateId] = useState("num");
  const candidate = CANDIDATES.find((item) => item.id === candidateId) ?? CANDIDATES[0];

  const actualType = typeof candidate.value;
  const isAllowed = actualType === declared;

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="Обери анотацію змінної, потім обери значення, яке в неї присвоюється">
        <DemoToolbar
          options={DECLARED_TYPES.map((type) => ({ value: type.value, label: type.label }))}
          value={declared}
          onChange={(value) => setDeclared(value as DeclaredType)}
        />

        <div className={styles.tsRow}>
          <span>Значення для присвоєння:</span>
          <DemoToolbar
            options={CANDIDATES.map((item) => ({ value: item.id, label: item.label }))}
            value={candidateId}
            onChange={setCandidateId}
          />
        </div>

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>
            let value: {declared} = {candidate.code};
          </span>
          <span className={isAllowed ? styles.tsBadgeOk : styles.tsBadgeErr}>
            {isAllowed ? "дозволено" : "помилка"}
          </span>
        </div>

        <div className={`${styles.tsCompilerBox} ${isAllowed ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {isAllowed
            ? "Немає помилок — тип значення збігається з анотацією."
            : `Type '${actualType}' is not assignable to type '${declared}'.\n→ У змінну, яка повинна містити ${declared}, намагаються записати значення типу ${actualType}.`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        Анотація (: {declared}) — це обіцянка, яку дає розробник компілятору: &quot;у цій змінній завжди буде саме
        {" "}{declared}&quot;. Значення &quot;25&quot; (рядок) виглядає схожим на число, але typeof показує, що це
        рядок, — і TypeScript довіряє саме реальному типу значення, а не тому, як воно виглядає на очах.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Анотація типу нічого не перевіряє сама під час виконання — усю перевірку робить компілятор ще до запуску,
        порівнюючи оголошений тип зі справжнім типом значення.
      </DemoKeyTakeaway>
    </div>
  );
}
