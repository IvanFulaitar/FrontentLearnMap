import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// interface Discount { code: string; percent?: number; }
interface DiscountCandidate {
  id: string;
  label: string;
  code: string;
  percent: number | undefined;
}

const CANDIDATES: DiscountCandidate[] = [
  { id: "with", label: "З percent", code: '{ code: "SALE10", percent: 10 }', percent: 10 },
  { id: "without", label: "Без percent", code: '{ code: "SALE10" }', percent: undefined },
];

/**
 * Live demo for "Необовʼязкові властивості": models `percent?: number` on
 * a Discount, then shows what happens when code REALLY reads
 * `discount.percent.toFixed(0)` without a guard — a real `undefined` check
 * computed live, mirroring the compiler's forced-narrowing requirement.
 */
export function OptionalPropertyDemo() {
  const [candidateId, setCandidateId] = useState("with");
  const [guarded, setGuarded] = useState(false);
  const candidate = CANDIDATES.find((item) => item.id === candidateId) ?? CANDIDATES[0];

  const isDefined = candidate.percent !== undefined;
  // Without a guard, the compiler always rejects `.toFixed` on a `number | undefined`
  // value, regardless of what the CURRENT candidate happens to hold — the type itself
  // says "might be undefined", so the check is mandatory, not optional.
  const compilerAccepts = guarded;

  let runtimeResult = "";
  if (guarded) {
    runtimeResult = isDefined ? `Знижка: ${(candidate.percent as number).toFixed(0)}%` : "Знижки немає";
  }

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="interface Discount { code: string; percent?: number; }">
        <DemoToolbar
          options={CANDIDATES.map((item) => ({ value: item.id, label: item.label }))}
          value={candidateId}
          onChange={setCandidateId}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>const discount: Discount = {candidate.code};</span>
        </div>

        <DemoToolbar
          options={[
            { value: "no-guard", label: "discount.percent.toFixed(0) — без перевірки" },
            { value: "guard", label: 'if (discount.percent !== undefined) — з перевіркою' },
          ]}
          value={guarded ? "guard" : "no-guard"}
          onChange={(value) => setGuarded(value === "guard")}
        />

        <div className={`${styles.tsCompilerBox} ${compilerAccepts ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {compilerAccepts
            ? `Компілятор дозволяє: усередині перевірки percent звужений до number.\n→ реальний результат: ${runtimeResult}`
            : "Object is possibly 'undefined'.\n→ percent?: number означає \"number АБО взагалі відсутнє\" — компілятор вимагає перевірку перед .toFixed(), незалежно від того, є зараз percent у цьому конкретному обʼєкті чи ні."}
        </div>
      </DemoPreview>

      <DemoExplanation>
        percent?: number — знак ? після назви властивості означає, що вона необовʼязкова: обʼєкт може мати percent
        (тоді це number), а може не мати його взагалі (тоді читання discount.percent поверне undefined). Компілятор
        завжди враховує ОБИДВА випадки одразу, для будь-якого обʼєкта цього типу — тому забороняє .toFixed() без
        перевірки, навіть якщо в конкретному прикладі percent зараз є.
      </DemoExplanation>

      <DemoKeyTakeaway>
        percent?: number — це те саме, що percent: number | undefined, лише коротший запис. Перед використанням
        значення завжди потрібна перевірка на undefined — так само, як зі звичайним union-типом.
      </DemoKeyTakeaway>
    </div>
  );
}
