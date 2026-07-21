import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// type Result<T> = { ok: true; value: T } | { ok: false; error: string };
type Result<T> = { ok: true; value: T } | { ok: false; error: string };

function divide(a: number, b: number): Result<number> {
  if (b === 0) {
    return { ok: false, error: "Ділення на нуль" };
  }
  return { ok: true, value: a / b };
}

interface Candidate {
  id: string;
  label: string;
  code: string;
  a: number;
  b: number;
}

const CANDIDATES: Candidate[] = [
  { id: "ok", label: "10 / 2", code: "divide(10, 2)", a: 10, b: 2 },
  { id: "zero", label: "10 / 0", code: "divide(10, 0)", a: 10, b: 0 },
];

/**
 * Live demo for "Типи результату з помилкою": models
 * `type Result<T> = { ok: true; value: T } | { ok: false; error: string }`
 * and really calls `divide()`, narrowing the discriminated union on the
 * real `ok` field to safely access either `.value` or `.error` — no
 * exceptions thrown, the failure case is just another real branch.
 */
export function ResultTypeDemo() {
  const [candidateId, setCandidateId] = useState("ok");
  const candidate = CANDIDATES.find((item) => item.id === candidateId) ?? CANDIDATES[0];

  const result = divide(candidate.a, candidate.b);

  return (
    <div className={styles.tsStage}>
      <DemoPreview label={"type Result<T> = { ok: true; value: T } | { ok: false; error: string };"}>
        <DemoToolbar options={CANDIDATES.map((item) => ({ value: item.id, label: item.label }))} value={candidateId} onChange={setCandidateId} />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>const result = {candidate.code};</span>
          <span className={result.ok ? styles.tsBadgeOk : styles.tsBadgeErr}>{result.ok ? "ok: true" : "ok: false"}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${result.ok ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {result.ok
            ? `if (result.ok) { ... } звужує тип до { ok: true; value: number } — .value доступний.\n→ реальне значення: ${result.value}`
            : `else { ... } звужує тип до { ok: false; error: string } — .error доступний, .value тут узагалі не існує.\n→ реальна помилка: ${result.error}`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        Result&lt;T&gt; — це дискримінована спілка (union із спільним полем-\"перемикачем\", тут — ok), яка описує
        два взаємовиключні варіанти результату функції: успіх (ok: true, є value) або невдача (ok: false, є error, і
        НЕМАЄ value). Замість того щоб функція кидала виняток (throw) при діленні на нуль — що змусило б кожного, хто
        її викликає, памʼятати про try/catch, — вона повертає звичайне значення, форма якого сама показує, що саме
        сталося. Перевірка if (result.ok) звужує тип рівно так само, як typeof чи in з попередніх уроків, — і
        компілятор дозволяє .value лише в гілці, де ok справді true.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Result&lt;T&gt;-тип перетворює можливу помилку на звичайне, типізоване значення результату — компілятор
        змушує явно обробити обидва випадки (успіх і невдачу), перш ніж дозволити доступ до value.
      </DemoKeyTakeaway>
    </div>
  );
}
