import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// The real union, encoded as an actual array so membership is checked for
// real below — not asserted as static text.
const ALLOWED_STATUSES = ["idle", "loading", "success", "error"] as const;

const CANDIDATES = ["idle", "loading", "success", "error", "finished", "done"];

/**
 * Live demo for "Union-типи": try assigning different real string values
 * to a variable typed as "idle" | "loading" | "success" | "error", and see
 * a real pass/fail computed via actual array membership — the same check
 * a union type performs at compile time.
 */
export function UnionTypeDemo() {
  const [candidate, setCandidate] = useState("finished");
  const isAllowed = (ALLOWED_STATUSES as readonly string[]).includes(candidate);

  return (
    <div className={styles.tsStage}>
      <DemoPreview label='Тип: let status: "idle" | "loading" | "success" | "error" — обери значення для присвоєння'>
        <DemoToolbar
          options={CANDIDATES.map((value) => ({ value, label: `"${value}"` }))}
          value={candidate}
          onChange={setCandidate}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>status = &quot;{candidate}&quot;;</span>
          <span className={isAllowed ? styles.tsBadgeOk : styles.tsBadgeErr}>
            {isAllowed ? "дозволено" : "помилка"}
          </span>
        </div>

        <div className={`${styles.tsCompilerBox} ${isAllowed ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {isAllowed
            ? `Немає помилок — "${candidate}" є одним із перелічених варіантів union-типу.`
            : `Type '"${candidate}"' is not assignable to type '"idle" | "loading" | "success" | "error"'.\n→ Значення "${candidate}" не входить у перелік дозволених станів.`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        Union-тип — це буквально перелік дозволених варіантів через |. Значення "idle", "loading", "success" і
        "error" входять у цей перелік, тому компілятор пропускає їх без питань. "finished" і "done" виглядають як
        цілком нормальні рядки, але їх немає в переліку — і саме тому TypeScript їх забороняє, хоча жодних технічних
        причин для помилки в самому JavaScript немає.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Union-тип не забороняє "неправильні" рядки взагалі — він забороняє конкретні рядки, яких немає в списку
        дозволених варіантів. Це робить неможливий стан інтерфейсу (наприклад, статус "fnished" через одруківку)
        помилкою ще до запуску, а не багом, знайденим користувачем.
      </DemoKeyTakeaway>
    </div>
  );
}
