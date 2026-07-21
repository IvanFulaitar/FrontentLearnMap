import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

const ALLOWED_ROLES = ["admin", "editor", "viewer"] as const;
const CANDIDATES = ["admin", "editor", "viewer", "moderator", "guest"];

/**
 * Live demo for "Літеральні типи": the SAME candidate value tried against
 * two different declarations side by side — `role: string` (accepts
 * anything) vs `role: "admin" | "editor" | "viewer"` (accepts only the
 * literal list) — both verdicts computed live from the real candidate.
 */
export function LiteralTypeDemo() {
  const [candidate, setCandidate] = useState("moderator");
  const isValidRole = (ALLOWED_ROLES as readonly string[]).includes(candidate);

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="Той самий рядок, перевірений проти двох різних оголошень типу">
        <DemoToolbar
          options={CANDIDATES.map((value) => ({ value, label: `"${value}"` }))}
          value={candidate}
          onChange={setCandidate}
        />

        <div className={`${styles.tsCompilerBox} ${styles.tsCompilerBoxOk}`}>
          <span className={styles.tsCode}>let role: string = &quot;{candidate}&quot;;</span>
          {"\n"}
          Немає помилок — string дозволяє будь-який рядок, який тільки існує.
        </div>

        <div className={`${styles.tsCompilerBox} ${isValidRole ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          <span className={styles.tsCode}>
            let role: &quot;admin&quot; | &quot;editor&quot; | &quot;viewer&quot; = &quot;{candidate}&quot;;
          </span>
          {"\n"}
          {isValidRole
            ? `Немає помилок — "${candidate}" є однією з трьох дозволених ролей.`
            : `Type '"${candidate}"' is not assignable to type '"admin" | "editor" | "viewer"'.\n→ "${candidate}" — це справжній рядок, але не одна з трьох названих ролей.`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        role: string приймає геть будь-який текст — навіть "moderator" чи випадкову одруківку "admn". Літеральний
        тип "admin" | "editor" | "viewer" звужує дозволені значення до рівно трьох конкретних рядків. Це і є різниця
        між "будь-який рядок" і "один із заздалегідь названих варіантів".
      </DemoExplanation>

      <DemoKeyTakeaway>
        Використовуй літеральний тип, коли реальних варіантів справді обмежена, наперед відома кількість — ролі,
        статуси, розміри, напрямок сортування. Для довільного тексту користувача (ім'я, коментар) залишай звичайний
        string.
      </DemoKeyTakeaway>
    </div>
  );
}
