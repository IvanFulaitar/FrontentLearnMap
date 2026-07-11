import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "success" | "failure";
type State = "idle" | "pending" | "fulfilled" | "rejected";

/**
 * Live demo for "Проміси": a real `new Promise` wrapping a real setTimeout
 * that genuinely resolves or rejects depending on mode — .then/.catch/
 * .finally are real handlers reacting to the real settled state, and the
 * displayed state (pending/fulfilled/rejected) is read from actual promise
 * resolution timing, not a scripted animation.
 */
export function PromiseDemo() {
  const [mode, setMode] = useState<Mode>("success");
  const [state, setState] = useState<State>("idle");
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));

  function delay(ms: number, shouldFail: boolean): Promise<string> {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (shouldFail) {
          reject(new Error("Симульована помилка мережі"));
        } else {
          resolve(`Дані отримано через ${ms}мс`);
        }
      }, ms);
    });
  }

  const run = () => {
    setState("pending");
    addLog("pending: проміс створено, чекаємо 900мс...");
    delay(900, mode === "failure")
      .then((message) => {
        setState("fulfilled");
        addLog(`fulfilled: ${message}`);
      })
      .catch((error: Error) => {
        setState("rejected");
        addLog(`rejected: ${error.message}`);
      })
      .finally(() => {
        addLog("finally: виконується завжди, незалежно від результату");
      });
  };

  const stateColor: Record<State, string> = {
    idle: "var(--muted)",
    pending: "#e0a800",
    fulfilled: "#2e7d32",
    rejected: "#c0392b",
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Результат операції</span>
          <DemoToolbar
            options={[
              { value: "success", label: "Успіх (resolve)" },
              { value: "failure", label: "Помилка (reject)" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setState("idle");
              setLog([]);
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальний Promise — запусти й дивись стан">
        <button
          type="button"
          onClick={run}
          disabled={state === "pending"}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--primary)",
            color: "white",
            fontWeight: 600,
            cursor: state === "pending" ? "default" : "pointer",
            opacity: state === "pending" ? 0.6 : 1,
          }}
        >
          Запустити операцію
        </button>
        <p style={{ marginTop: "10px" }}>
          Стан: <strong style={{ color: stateColor[state] }}>{state}</strong>
        </p>
      </DemoPreview>

      <DemoPreview label="Журнал реальних подій проміса (найновіше зверху)">
        <div className={styles.semanticBlock}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Натисни кнопку вище.</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        Стан переходить з pending рівно в ОДИН з двох станів (fulfilled чи rejected) і більше не змінюється.
        .finally() спрацьовує в обох випадках.
      </DemoExplanation>

      <DemoCodeSnippet code={`delay(900)\n  .then((msg) => console.log("fulfilled:", msg))\n  .catch((err) => console.log("rejected:", err.message))\n  .finally(() => console.log("завжди виконується"));`} />

      <DemoKeyTakeaway>
        Проміс має 3 стани: pending, fulfilled, rejected. Стан фіксується назавжди після першого resolve/reject.
      </DemoKeyTakeaway>
    </div>
  );
}
