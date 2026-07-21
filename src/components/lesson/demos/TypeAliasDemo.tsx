import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// type OrderStatus = "new" | "paid" | "shipped";
// type Discount = number | `${number}%`;
const STATUS_VALUES = ["new", "paid", "shipped"] as const;

interface Candidate {
  id: string;
  label: string;
  code: string;
  status: string;
  discount: string;
}

const CANDIDATES: Candidate[] = [
  { id: "ok", label: "paid, знижка 10", code: 'status: "paid", discount: 10', status: "paid", discount: "10" },
  { id: "bad-status", label: 'status: "done"', code: 'status: "done", discount: 10', status: "done", discount: "10" },
  { id: "ok-percent", label: "shipped, знижка “15%”", code: 'status: "shipped", discount: "15%"', status: "shipped", discount: "15%" },
  { id: "bad-discount", label: 'discount: "багато"', code: 'status: "new", discount: "багато"', status: "new", discount: "багато" },
];

const isValidStatus = (value: string): value is (typeof STATUS_VALUES)[number] =>
  (STATUS_VALUES as readonly string[]).includes(value);

const PERCENT_RE = /^\d+%$/;
const isValidDiscount = (value: string): boolean => !isNaN(Number(value)) || PERCENT_RE.test(value);

/**
 * Live demo for "Псевдоніми типів (type aliases)": two type aliases —
 * a literal-union alias (OrderStatus) and a union-of-shapes alias
 * (Discount = number | `${number}%`) — checked live against real candidate
 * values with real membership/regex checks mirroring the compiler's rules.
 */
export function TypeAliasDemo() {
  const [candidateId, setCandidateId] = useState("ok");
  const candidate = CANDIDATES.find((item) => item.id === candidateId) ?? CANDIDATES[0];

  const statusOk = isValidStatus(candidate.status);
  const discountOk = isValidDiscount(candidate.discount);
  const isValid = statusOk && discountOk;

  const problems: string[] = [];
  if (!statusOk) {
    problems.push(`Type '"${candidate.status}"' is not assignable to type 'OrderStatus'.\n→ Дозволені лише: ${STATUS_VALUES.join(", ")}.`);
  }
  if (!discountOk) {
    problems.push(`Type '"${candidate.discount}"' is not assignable to type 'Discount'.\n→ Потрібне число або рядок-відсоток типу "15%".`);
  }

  return (
    <div className={styles.tsStage}>
      <DemoPreview label={"type OrderStatus = \"new\" | \"paid\" | \"shipped\";\ntype Discount = number | `${number}%`;"}>
        <DemoToolbar
          options={CANDIDATES.map((item) => ({ value: item.id, label: item.label }))}
          value={candidateId}
          onChange={setCandidateId}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>const order: Order = {"{"} {candidate.code} {"}"};</span>
          <span className={isValid ? styles.tsBadgeOk : styles.tsBadgeErr}>{isValid ? "дозволено" : "помилка"}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${isValid ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {isValid ? "Немає помилок — обидва значення відповідають своїм псевдонімам типів." : problems.join("\n\n")}
        </div>
      </DemoPreview>

      <DemoExplanation>
        type OrderStatus = ... і type Discount = ... — це псевдоніми типів (type aliases): просто зручні імена для
        вже існуючих типів (тут — для union-типів). Псевдонім нічого нового не додає до системи типів — він лише
        дає короткому запису довге, повторюване визначення власне імʼя, яке можна використовувати в багатьох місцях
        коду замість того, щоб щоразу переписувати весь union.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Псевдонім типу (type X = ...) — це ім'я для типу, а не новий тип сам по собі: перевірка значення відбувається
        рівно так само, якби union написали прямо в анотації без жодного імені.
      </DemoKeyTakeaway>
    </div>
  );
}
