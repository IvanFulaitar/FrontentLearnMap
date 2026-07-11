import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Method = "keys" | "values" | "entries" | "freeze";

const inventory = { apples: 5, bananas: 0, oranges: 12 };

function runMethod(method: Method): { display: string; note: string } {
  if (method === "keys") {
    return { display: JSON.stringify(Object.keys(inventory)), note: "масив імен властивостей" };
  }
  if (method === "values") {
    return { display: JSON.stringify(Object.values(inventory)), note: "масив значень у тому самому порядку" };
  }
  if (method === "entries") {
    return { display: JSON.stringify(Object.entries(inventory)), note: "масив пар [ключ, значення]" };
  }
  // freeze
  const frozen = Object.freeze({ limits: { max: 10 } });
  (frozen as any).limits.max = 999; // nested object is NOT frozen — this genuinely succeeds
  return { display: JSON.stringify(frozen), note: `рівень 1 захищений, але frozen.limits.max реально змінився на ${frozen.limits.max}` };
}

const codeFor: Record<Method, string> = {
  keys: `Object.keys(inventory)\n// ${JSON.stringify(Object.keys(inventory))}`,
  values: `Object.values(inventory)\n// ${JSON.stringify(Object.values(inventory))}`,
  entries: `Object.entries(inventory)\n// ${JSON.stringify(Object.entries(inventory))}`,
  freeze: `const frozen = Object.freeze({ limits: { max: 10 } });\nfrozen.limits.max = 999; // ПРАЦЮЄ — рівень 2 не заморожений\n// frozen.limits.max === 999`,
};

/**
 * Live demo for "Методи обʼєктів": real Object.keys/values/entries calls on
 * an actual inventory object, plus a genuine Object.freeze() demonstration
 * proving the nested object is NOT protected — the mutation really succeeds.
 */
export function ObjectMethodsDemo() {
  const [method, setMethod] = useState<Method>("entries");
  const { display, note } = runMethod(method);

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Object.</span>
          <DemoToolbar
            options={[
              { value: "keys", label: "keys()" },
              { value: "values", label: "values()" },
              { value: "entries", label: "entries()" },
              { value: "freeze", label: "freeze()" },
            ]}
            value={method}
            onChange={(v) => setMethod(v as Method)}
          />
        </div>
      </div>

      <DemoPreview label="Реальний результат викликаного методу">
        <div className={styles.semanticBlock}>
          <p>inventory: {JSON.stringify(inventory)}</p>
          <p>
            Результат: <strong style={{ color: "#2e7d32" }}>{display}</strong>
          </p>
          <p style={{ fontSize: "0.85em", color: "var(--muted)" }}>{note}</p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {method === "keys" && "Object.keys() повертає масив ІМЕН усіх власних перелічуваних властивостей inventory."}
        {method === "values" && "Object.values() повертає масив ЗНАЧЕНЬ тих самих властивостей — у тому самому порядку, що і keys()."}
        {method === "entries" && "Object.entries() повертає масив пар [ключ, значення] — зручно для деструктуризації в циклах чи map/filter."}
        {method === "freeze" && "Object.freeze() захищає лише ПЕРШИЙ рівень обʼєкта frozen — вкладений limits залишається звичайним мутабельним обʼєктом, тому limits.max = 999 реально спрацьовує."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[method]} />

      <DemoKeyTakeaway>
        Object.keys/values/entries дають лише ВЛАСНІ властивості (на відміну від for...in). Object.freeze()
        захищає лише перший рівень — вкладені обʼєкти потребують окремого заморожування.
      </DemoKeyTakeaway>
    </div>
  );
}
