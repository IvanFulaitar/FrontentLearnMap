import { useEffect, useRef, useState } from "react";
import { DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Callback-и та таймери": a real setTimeout scheduling a
 * genuine delayed message (timed with real Date.now()), and a real
 * setInterval with a genuine tick counter that must be explicitly cleared
 * — both timers are real window.setTimeout/setInterval calls, not
 * simulated with a fake progress bar.
 */
export function CallbackTimerDemo() {
  const [timeoutLog, setTimeoutLog] = useState<string[]>([]);
  const [scheduled, setScheduled] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  const [intervalRunning, setIntervalRunning] = useState(false);
  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  const scheduleTimeout = () => {
    setScheduled(true);
    const startedAt = Date.now();
    setTimeoutLog((prev) => [`Заплановано о ${new Date(startedAt).toLocaleTimeString()} — чекаємо 2с...`, ...prev].slice(0, 5));
    window.setTimeout(() => {
      const elapsed = Date.now() - startedAt;
      setScheduled(false);
      setTimeoutLog((prev) => [`Callback реально спрацював через ${elapsed}мс`, ...prev].slice(0, 5));
    }, 2000);
  };

  const startInterval = () => {
    if (intervalIdRef.current !== null) return;
    setIntervalRunning(true);
    const id = window.setInterval(() => {
      setTickCount((c) => c + 1);
    }, 500);
    intervalIdRef.current = id;
  };

  const stopInterval = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setIntervalRunning(false);
  };

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Реальний setTimeout — заплануй виклик і почекай">
        <button
          type="button"
          onClick={scheduleTimeout}
          disabled={scheduled}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--primary)",
            color: "white",
            fontWeight: 600,
            cursor: scheduled ? "default" : "pointer",
            opacity: scheduled ? 0.6 : 1,
          }}
        >
          {scheduled ? "Очікування..." : "Запланувати виклик через 2с"}
        </button>
      </DemoPreview>

      <DemoPreview label="Реальний setInterval — тікає, доки не зупиниш">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            type="button"
            onClick={intervalRunning ? stopInterval : startInterval}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: intervalRunning ? "#c0392b" : "var(--primary)",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {intervalRunning ? "Зупинити (clearInterval)" : "Запустити setInterval"}
          </button>
          <span>Тіків: <strong>{tickCount}</strong></span>
        </div>
      </DemoPreview>

      <DemoPreview label="Журнал реальних callback-подій (найновіше зверху)">
        <div className={styles.semanticBlock}>
          {timeoutLog.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Заплануй виклик вище, щоб побачити журнал.</p>
          ) : (
            timeoutLog.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        Час у журналі — реальний вимірений час (Date.now()), не описаний. setInterval продовжує тікати нескінченно,
        доки реально не викликати clearInterval.
      </DemoExplanation>

      <DemoCodeSnippet code={`const id = setInterval(() => {\n  tick();\n}, 500);\n\n// пізніше:\nclearInterval(id); // без цього тікає нескінченно`} />

      <DemoKeyTakeaway>
        setTimeout планує один відкладений виклик; setInterval повторює, доки не викликати clearInterval з тим самим
        ID.
      </DemoKeyTakeaway>
    </div>
  );
}
