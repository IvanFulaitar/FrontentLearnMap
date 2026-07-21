import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// interface Order { id: number; customer: { name: string; address?: { city: string } } }
interface OrderCandidate {
  id: string;
  label: string;
  code: string;
  customer: { name: string; address?: { city: string } };
}

const CANDIDATES: OrderCandidate[] = [
  {
    id: "full",
    label: "Із повною адресою",
    code: '{ name: "Оля", address: { city: "Львів" } }',
    customer: { name: "Оля", address: { city: "Львів" } },
  },
  {
    id: "no-address",
    label: "Без адреси",
    code: '{ name: "Оля" }',
    customer: { name: "Оля" },
  },
];

/**
 * Live demo for "Вкладені моделі": models a nested `customer.address?.city`
 * path, then reads it two ways — unsafe direct access vs real optional
 * chaining (?.) — computing the real result (including a real crash-style
 * TypeError message for the unsafe path when address is missing).
 */
export function NestedModelDemo() {
  const [candidateId, setCandidateId] = useState("full");
  const [safe, setSafe] = useState(true);
  const candidate = CANDIDATES.find((item) => item.id === candidateId) ?? CANDIDATES[0];

  const hasAddress = candidate.customer.address !== undefined;
  const compilerAccepts = safe || hasAddress;

  let result: string;
  if (safe) {
    result = candidate.customer.address?.city ?? "місто не вказане";
  } else if (hasAddress) {
    result = (candidate.customer.address as { city: string }).city;
  } else {
    result = "TypeError: Cannot read properties of undefined (reading 'city')";
  }

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="interface Order { customer: { name: string; address?: { city: string } } }">
        <DemoToolbar
          options={CANDIDATES.map((item) => ({ value: item.id, label: item.label }))}
          value={candidateId}
          onChange={setCandidateId}
        />

        <div className={styles.tsRow}>
          <span>customer: {candidate.code}</span>
        </div>

        <DemoToolbar
          options={[
            { value: "unsafe", label: "order.customer.address.city — напряму" },
            { value: "safe", label: "order.customer.address?.city — optional chaining" },
          ]}
          value={safe ? "safe" : "unsafe"}
          onChange={(value) => setSafe(value === "safe")}
        />

        <div className={`${styles.tsCompilerBox} ${compilerAccepts ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {compilerAccepts
            ? `Компілятор дозволяє.\n→ реальний результат: ${result}`
            : "Object is possibly 'undefined'.\n→ address?: { city: string } означає, що address може бути відсутнім — компілятор забороняє .city напряму без ?. чи перевірки."}
        </div>
      </DemoPreview>

      <DemoExplanation>
        Вкладена модель — це коли одна властивість обʼєкта сама є обʼєктом зі своєю формою: тут customer має name і
        необовʼязковий address, а address, у свою чергу, має city. Читати глибоко вкладені поля напряму (a.b.c)
        небезпечно, якщо хоч один рівень посередині може бути відсутнім, — саме для цього існує optional chaining
        (?.): він перериває весь ланцюжок і повертає undefined, щойно натрапляє на відсутню ланку, замість того щоб
        зламати виконання програми помилкою.
      </DemoExplanation>

      <DemoKeyTakeaway>
        У вкладених моделях перевіряй кожен необовʼязковий рівень окремо — optional chaining (?.) і ?? (значення за
        замовчуванням) читаються глибокі шляхи безпечно, там, де прямий доступ міг би зламатись.
      </DemoKeyTakeaway>
    </div>
  );
}
