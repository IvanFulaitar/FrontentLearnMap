import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "withAwait" | "withoutAwait";

/**
 * Live demo for "Async та await": a real async function wrapping a real
 * delayed Promise. In "withoutAwait" mode the demo genuinely omits await
 * and logs String(promise) — the real, actual string a Promise object
 * produces ("[object Promise]") — proving the bug live rather than just
 * describing it. In "withAwait" mode the real awaited value is logged.
 */
export function AsyncAwaitDemo() {
  const [mode, setMode] = useState<Mode>("withoutAwait");
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));

  function fetchUserName(): Promise<string> {
    return new Promise((resolve) => {
      window.setTimeout(() => resolve("Оля"), 700);
    });
  }

  async function runWithAwait() {
    addLog("await fetchUserName() — очікуємо реальний проміс...");
    const name = await fetchUserName();
    addLog(`Результат: "Привіт, ${name}!" (реальне рядкове значення)`);
  }

  async function runWithoutAwait() {
    // Genuinely NOT awaiting — nameOrPromise really is a Promise object
    const nameOrPromise = fetchUserName();
    addLog(`Без await: "Привіт, ${String(nameOrPromise)}!" (реальний String() від обʼєкта Promise)`);
  }

  const run = async () => {
    setRunning(true);
    if (mode === "withAwait") {
      await runWithAwait();
    } else {
      await runWithoutAwait();
    }
    setRunning(false);
  };

  const codeFor: Record<Mode, string> = {
    withAwait: `async function greet() {\n  const name = await fetchUserName();\n  console.log("Привіт, " + name + "!");\n}`,
    withoutAwait: `async function greet() {\n  const name = fetchUserName(); // БАГ: забули await\n  console.log("Привіт, " + name + "!"); // "Привіт, [object Promise]!"\n}`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Виклик fetchUserName()</span>
          <DemoToolbar
            options={[
              { value: "withoutAwait", label: "БАГ: без await" },
              { value: "withAwait", label: "Правильно: з await" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setLog([]);
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальний async-виклик — натисни й дивись результат">
        <button
          type="button"
          onClick={run}
          disabled={running}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--primary)",
            color: "white",
            fontWeight: 600,
            cursor: running ? "default" : "pointer",
            opacity: running ? 0.6 : 1,
          }}
        >
          {running ? "Виконується..." : "Викликати greet()"}
        </button>
      </DemoPreview>

      <DemoPreview label="Журнал реальних результатів (найновіше зверху)">
        <div className={styles.semanticBlock}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Натисни кнопку вище.</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "withoutAwait"
          ? "Без await змінна містить сам обʼєкт Promise — рядкове перетворення дає буквально \"[object Promise]\", а не імʼя."
          : "З await змінна отримує РЕАЛЬНЕ значення, яким зрештою завершився проміс — рядок \"Оля\"."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        Забутий await не ламає програму одразу — він дає сам обʼєкт Promise замість очікуваного значення, що часто
        проявляється лише пізніше у вигляді дивного виводу.
      </DemoKeyTakeaway>
    </div>
  );
}
