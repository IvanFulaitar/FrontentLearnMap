import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, DemoTimeline, useTimelineClock, type TimelineTrack } from "./framework";
import styles from "./demos.module.css";

type Mode = "withAwait" | "withoutAwait";

const DELAY_MS = 700;
const SCALE_MS = 900;

/**
 * Live demo for "Async та await": a real async function wrapping a real
 * delayed Promise. A DemoTimeline (driven by real performance.now() via
 * useTimelineClock) shows the function's execution genuinely PAUSING at
 * await for 700ms before resuming — versus the buggy path, where the
 * function returns almost instantly because it never actually waits. In
 * "withoutAwait" mode the demo genuinely omits await and logs
 * String(promise) — the real, actual string a Promise object produces
 * ("[object Promise]") — proving the bug live rather than just describing it.
 */
export function AsyncAwaitDemo() {
  const [mode, setMode] = useState<Mode>("withoutAwait");
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [track, setTrack] = useState<TimelineTrack | null>(null);
  const { elapsedMs, start, stop } = useTimelineClock();

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));

  function fetchUserName(): Promise<string> {
    return new Promise((resolve) => {
      window.setTimeout(() => resolve("Оля"), DELAY_MS);
    });
  }

  async function runWithAwait() {
    setTrack({ id: "greet", label: "greet()", startMs: 0, status: "paused" });
    start();
    addLog("await fetchUserName() — виконання ЗУПИНЯЄТЬСЯ тут...");
    const name = await fetchUserName();
    stop();
    setTrack((prev) => (prev ? { ...prev, status: "done", endMs: DELAY_MS } : prev));
    addLog(`Відновилось через ${DELAY_MS}мс. Результат: "Привіт, ${name}!" (реальне рядкове значення)`);
  }

  async function runWithoutAwait() {
    setTrack({ id: "greet", label: "greet()", startMs: 0, status: "running" });
    start();
    // Genuinely NOT awaiting — nameOrPromise really is a Promise object
    const nameOrPromise = fetchUserName();
    stop();
    setTrack((prev) => (prev ? { ...prev, status: "error", endMs: 1 } : prev));
    addLog(`Без await: функція повернулась МИТТЄВО. "Привіт, ${String(nameOrPromise)}!" (реальний String() від обʼєкта Promise)`);
  }

  const run = async () => {
    setRunning(true);
    setLog([]);
    if (mode === "withAwait") {
      await runWithAwait();
    } else {
      await runWithoutAwait();
    }
    setRunning(false);
  };

  const codeFor: Record<Mode, string> = {
    withAwait: `async function greet() {\n  const name = await fetchUserName(); // пауза тут на ~700мс\n  console.log("Привіт, " + name + "!");\n}`,
    withoutAwait: `async function greet() {\n  const name = fetchUserName(); // БАГ: забули await, паузи НЕМАЄ\n  console.log("Привіт, " + name + "!"); // "Привіт, [object Promise]!"\n}`,
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
              setTrack(null);
            }}
          />
        </div>
      </div>

      <div className={styles.semanticBlock} style={{ display: "grid", gap: "14px" }}>
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
            justifySelf: "start",
          }}
        >
          {running ? "Виконується..." : "Викликати greet()"}
        </button>
        {track && <DemoTimeline tracks={[track]} nowMs={elapsedMs} scaleMs={SCALE_MS} />}
      </div>

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
          ? "На таймлінії смуга миттєво стає \"помилка\" (майже нульова ширина) — функція навіть не намагалась зачекати. Без await змінна містить сам обʼєкт Promise."
          : "На таймлінії видно смугу \"очікує\" (амбер, штрихована) — це реальна пауза виконання функції на ~700мс, доки проміс не виконається."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        Забутий await не ламає програму одразу — він прибирає реальну паузу виконання й дає сам обʼєкт Promise замість
        очікуваного значення, що часто проявляється лише пізніше у вигляді дивного виводу.
      </DemoKeyTakeaway>
    </div>
  );
}
