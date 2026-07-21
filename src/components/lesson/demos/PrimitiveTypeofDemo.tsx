import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface PrimitiveOption {
  id: string;
  label: string;
  code: string;
  value: unknown;
}

// Real runtime values — typeof/===/Boolean() below are computed live on
// these actual values, not hardcoded strings pretending what the result is.
const OPTIONS: PrimitiveOption[] = [
  { id: "string", label: '"Кава"', code: '"Кава"', value: "Кава" },
  { id: "number", label: "65", code: "65", value: 65 },
  { id: "boolean", label: "true", code: "true", value: true },
  { id: "undefined", label: "undefined", code: "undefined", value: undefined },
  { id: "null", label: "null", code: "null", value: null },
  { id: "nan", label: "NaN", code: "NaN", value: NaN },
  { id: "bigint", label: "123n", code: "123n", value: BigInt(123) },
  { id: "boolObj", label: "new Boolean(false)", code: "new Boolean(false)", value: new Boolean(false) },
];

/**
 * Live demo for "Примітивні типи": pick a real value and see the browser's
 * ACTUAL `typeof`, self-equality (===) and truthiness (in a real `if`) for
 * it — including the two classic traps (typeof null and new Boolean(false))
 * computed live, not asserted as text.
 */
export function PrimitiveTypeofDemo() {
  const [selectedId, setSelectedId] = useState("null");
  const selected = OPTIONS.find((option) => option.id === selectedId) ?? OPTIONS[0];

  const typeofResult = typeof selected.value;
  const selfEqual = selected.value === selected.value;
  const isTruthy = Boolean(selected.value);

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Обери значення — нижче реальний результат typeof, === і перевірки в if для нього">
        <DemoToolbar
          options={OPTIONS.map((option) => ({ value: option.id, label: option.label }))}
          value={selectedId}
          onChange={setSelectedId}
        />
        <div className={styles.semanticBlock}>
          <p>
            <code>typeof {selected.code}</code> → <strong>&quot;{typeofResult}&quot;</strong>
          </p>
          <p>
            <code>
              {selected.code} === {selected.code}
            </code>{" "}
            → <strong>{String(selfEqual)}</strong>
          </p>
          <p>
            <code>if ({selected.code}) ...</code> →{" "}
            <strong>{isTruthy ? "виконається (truthy)" : "не виконається (falsy)"}</strong>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        Кожен рядок вище — не заготовлений текст, а реальний виклик typeof, === і Boolean() на обраному значенні
        прямо зараз у твоєму браузері. Обери null і побач, що typeof дає &quot;object&quot; (історичний баг мови).
        Обери NaN і побач, що NaN === NaN дає false — єдине значення, яке не дорівнює само собі. Обери new
        Boolean(false) і побач, що воно truthy в if, хоча всередині лежить false.
      </DemoExplanation>

      <DemoKeyTakeaway>
        typeof, === і truthy-перевірки поводяться однаково для будь-якого примітива в JavaScript — але null і
        обгортки на кшталт new Boolean() є винятками, які варто памʼятати, а не вгадувати.
      </DemoKeyTakeaway>
    </div>
  );
}
