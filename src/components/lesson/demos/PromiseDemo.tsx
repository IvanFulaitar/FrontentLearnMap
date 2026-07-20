import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, DemoTimeline, useTimelineClock, type TimelineTrack } from "./framework";
import styles from "./demos.module.css";

type Mode = "success" | "failure" | "random";
type State = "idle" | "pending" | "fulfilled" | "rejected";

const SCALE_MS = 2200;

/**
 * Live demo for "Проміси": a real `new Promise` wrapping a real setTimeout
 * that genuinely resolves or rejects depending on mode — .then/.catch/
 * .finally are real handlers reacting to the real settled state. A state
 * diagram highlights the actual current state, and a DemoTimeline (driven
 * by real performance.now() via useTimelineClock) shows the genuine pending
 * duration — including a "random" mode where the delay is real
 * Math.random(), so pending really can last an unpredictable amount of time.
 */
export function PromiseDemo() {
  const [mode, setMode] = useState<Mode>("success");
  const [state, setState] = useState<State>("idle");
  const [log, setLog] = useState<string[]>([]);
  const [track, setTrack] = useState<TimelineTrack | null>(null);
  const { elapsedMs, start, stop } = useTimelineClock();

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));

  function delay(ms: number, shouldFail: boolean): Promise<string> {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (shouldFail) {
          reject(new Error("Симульована помилка мережі"));
        } else {
          resolve(`Дані отримано через ${Math.round(ms)}мс`);
        }
      }, ms);
    });
  }

  const run = () => {
    const ms = mode === "random" ? 300 + Math.random() * 1600 : 900;
    setState("pending");
    setLog([]);
    addLog(`pending: проміс створено, чекаємо ${mode === "random" ? "невідомо скільки" : "900мс"}...`);
    setTrack({ id: "promise", label: "Promise", startMs: 0, status: "paused" });
    start();

    delay(ms, mode === "failure")
      .then((message) => {
        setState("fulfilled");
        addLog(`fulfilled: ${message}`);
        setTrack((prev) => (prev ? { ...prev, status: "done", endMs: ms } : prev));
      })
      .catch((error: Error) => {
        setState("rejected");
        addLog(`rejected: ${error.message}`);
        setTrack((prev) => (prev ? { ...prev, status: "error", endMs: ms } : prev));
      })
      .finally(() => {
        addLog("finally: виконується завжди, незалежно від результату");
        stop();
      });
  };

  const stateColor: Record<State, string> = {
    idle: "var(--muted)",
    pending: "var(--warning)",
    fulfilled: "var(--success)",
    rejected: "var(--danger)",
  };

  const codeFor: Record<Mode, string> = {
    success: `new Promise((resolve, reject) => {\n  setTimeout(() => resolve("дані"), 900);\n});`,
    failure: `new Promise((resolve, reject) => {\n  setTimeout(() => reject(new Error("помилка мережі")), 900);\n});`,
    random: `new Promise((resolve, reject) => {\n  const ms = 300 + Math.random() * 1600; // реально невідомо наперед\n  setTimeout(() => resolve("дані"), ms);\n});`,
  };

  const diagramState = (target: State) => ({
    borderColor: state === target ? stateColor[target] : "var(--border)",
    background: state === target ? `color-mix(in srgb, ${stateColor[target]} 12%, var(--surface))` : "var(--surface-muted)",
    color: state === target ? stateColor[target] : "var(--muted)",
    fontWeight: state === target ? 700 : 600,
  });

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Результат операції</span>
          <DemoToolbar
            options={[
              { value: "success", label: "Успіх (resolve)" },
              { value: "failure", label: "Помилка (reject)" },
              { value: "random", label: "Випадкова затримка" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setState("idle");
              setLog([]);
              setTrack(null);
            }}
          />
        </div>
      </div>

      <div className={styles.semanticBlock} style={{ display: "grid", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ ...diagramState("pending"), border: "2px solid", borderRadius: "8px", padding: "8px 14px" }}>pending</div>
          <span style={{ color: "var(--muted)" }}>→</span>
          <div style={{ ...diagramState("fulfilled"), border: "2px solid", borderRadius: "8px", padding: "8px 14px" }}>fulfilled</div>
          <span style={{ color: "var(--muted)" }}>або</span>
          <div style={{ ...diagramState("rejected"), border: "2px solid", borderRadius: "8px", padding: "8px 14px" }}>rejected</div>
        </div>

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
            justifySelf: "start",
          }}
        >
          Запустити операцію
        </button>

        {track && <DemoTimeline tracks={[track]} nowMs={elapsedMs} scaleMs={SCALE_MS} />}
      </div>

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
        {mode === "random"
          ? "Затримка тут — реальний Math.random(), тож смуга на таймлінії щоразу зупиняється в іншому місці: pending триває справді непередбачувану кількість часу."
          : "Стан переходить з pending рівно в ОДИН з двох станів (fulfilled чи rejected) і більше не змінюється. .finally() спрацьовує в обох випадках."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        Проміс має 3 стани: pending, fulfilled, rejected. Стан фіксується назавжди після першого resolve/reject —
        навіть якщо реальний час очікування наперед невідомий.
      </DemoKeyTakeaway>
    </div>
  );
}
