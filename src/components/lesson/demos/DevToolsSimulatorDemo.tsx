import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Tab = "table" | "breakpoint";

const CART = [
  { name: "Кава", price: 65, quantity: 2 },
  { name: "Круасан", price: 45, quantity: 1 },
];

/**
 * Live demo for "Дебагінг у DevTools": since real browser DevTools can't be
 * embedded, this simulates the two core habits the lesson teaches —
 * console.table() rendering an array of objects as a real table, and a
 * breakpoint pausing a loop so the student can step through and see item /
 * total at each iteration, instead of only reading about it.
 */
export function DevToolsSimulatorDemo() {
  const [tab, setTab] = useState<Tab>("table");
  const [tableShown, setTableShown] = useState(false);
  const [step, setStep] = useState(0);

  const runningTotal = CART.slice(0, step).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const currentItem = step < CART.length ? CART[step] : null;
  const isDone = step >= CART.length;

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "table", label: "console.table" },
          { value: "breakpoint", label: "Точка зупину" },
        ]}
        value={tab}
        onChange={(value) => setTab(value as Tab)}
      />

      {tab === "table" ? (
        <DemoPreview label="Натисни, щоб побачити, що покаже консоль">
          <div className={styles.semanticBlock}>
            <button type="button" onClick={() => setTableShown(true)}>
              Запустити console.table(cart)
            </button>
            {tableShown ? (
              <table style={{ marginTop: 12, borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", borderBottom: "1px solid currentColor", paddingRight: 12 }}>(index)</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid currentColor", paddingRight: 12 }}>name</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid currentColor", paddingRight: 12 }}>price</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid currentColor" }}>quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {CART.map((item, index) => (
                    <tr key={item.name}>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Консоль порожня — натисни кнопку вище.</p>
            )}
          </div>
        </DemoPreview>
      ) : (
        <DemoPreview label="Крокуй по циклу, як з breakpoint — видно item і total на кожному кроці">
          <div className={styles.semanticBlock}>
            <p>
              Крок: {Math.min(step, CART.length)} / {CART.length}
            </p>
            <p>
              item:{" "}
              {currentItem
                ? `{ name: "${currentItem.name}", price: ${currentItem.price}, quantity: ${currentItem.quantity} }`
                : "—"}
            </p>
            <p>total: {runningTotal}</p>
            <div>
              <button type="button" onClick={() => setStep((s) => Math.min(s + 1, CART.length))} disabled={isDone}>
                {isDone ? "Готово" : "Наступний крок"}
              </button>
              <button type="button" onClick={() => setStep(0)} style={{ marginLeft: 8 }}>
                Скинути
              </button>
            </div>
          </div>
        </DemoPreview>
      )}

      <DemoExplanation>
        {tab === "table"
          ? "console.table(cart) малює масив об'єктів як таблицю з колонками — так само, як бачиш вище. Це набагато швидше сканується оком, ніж розгорнутий console.log(cart)."
          : "Breakpoint зупиняє виконання на певному рядку — на кожному кроці циклу видно ТОЧНІ значення item і total у цей момент, а не лише те, що вирішив вивести заздалегідь через console.log."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          tab === "table"
            ? `const cart = [\n  { name: "Кава", price: 65, quantity: 2 },\n  { name: "Круасан", price: 45, quantity: 1 },\n];\n\nconsole.table(cart);`
            : `function getCartTotal(items) {\n  let total = 0;\n  for (const item of items) {\n    debugger; // виконання зупиниться тут\n    total += item.price * item.quantity;\n  }\n  return total;\n}`
        }
      />

      <DemoKeyTakeaway>
        console.table — швидкий спосіб побачити масив об'єктів одним поглядом. Breakpoint / debugger — коли потрібно
        зрозуміти, ЩО САМЕ відбувається на кожному кроці складної логіки, а не лише фінальний результат.
      </DemoKeyTakeaway>
    </div>
  );
}
