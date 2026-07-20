import { useEffect, useRef, useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, DemoTimeline, useTimelineClock, type TimelineTrack } from "./framework";
import styles from "./demos.module.css";

type Scenario = "race" | "interval";

const RACE_TIMERS = [
  { id: "timer-a", label: "Таймер A (2500мс)", delayMs: 2500 },
  { id: "timer-b", label: "Таймер B (900мс)", delayMs: 900 },
  { id: "timer-c", label: "Таймер C (1600мс)", delayMs: 1600 },
];
const RACE_SCALE_MS = 2800;
const TICK_MS = 500;
const MAX_DOTS = 10;

/**
 * Live demo for "Callback-и та таймери": two real scenarios built on genuine
 * window.setTimeout/setInterval calls. "race" schedules 3 real timers with
 * different delays in code order A,B,C but renders their real completion on
 * a shared DemoTimeline — B finishes first even though it was scheduled
 * second, proving code order != completion order. "interval" runs a real
 * setInterval and lights up a real tick counter, animated on a real elapsed
 * clock, until genuinely cleared with clearInterval.
 */
export function CallbackTimerDemo() {
  const [scenario, setScenario] = useState<Scenario>("race");
  const { elapsedMs, running, start, stop } = useTimelineClock();
  const [tracks, setTracks] = useState<TimelineTrack[]>([]);
  const [tickCount, setTickCount] = useState(0);
  const [intervalRunning, setIntervalRunning] = useState(false);
  const timeoutIdsRef = useRef<number[]>([]);
  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
      if (intervalIdRef.current !== null) window.clearInterval(intervalIdRef.current);
    };
  }, []);

  const clearTimers = () => {
    timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutIdsRef.current = [];
  };

  const runRace = () => {
    clearTimers();
    setTracks(RACE_TIMERS.map((t) => ({ id: t.id, label: t.label, startMs: 0, status: "running" })));
    start();
    const ids = RACE_TIMERS.map((t) =>
      window.setTimeout(() => {
        setTracks((prev) => prev.map((track) => (track.id === t.id ? { ...track, status: "done", endMs: t.delayMs } : track)));
      }, t.delayMs),
    );
    const stopId = window.setTimeout(() => stop(), Math.max(...RACE_TIMERS.map((t) => t.delayMs)) + 150);
    timeoutIdsRef.current = [...ids, stopId];
  };

  const startInterval = () => {
    if (intervalIdRef.current !== null) return;
    setTickCount(0);
    setIntervalRunning(true);
    start();
    const id = window.setInterval(() => {
      setTickCount((c) => c + 1);
    }, TICK_MS);
    intervalIdRef.current = id;
  };

  const stopInterval = () => {
    if (intervalIdRef.current !== null) {
      window.clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setIntervalRunning(false);
    stop();
  };

  const litCount = tickCount === 0 ? 0 : ((tickCount - 1) % MAX_DOTS) + 1;
  const dots = Array.from({ length: MAX_DOTS }, (_, i) => i < litCount);

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Сценарій</span>
          <DemoToolbar
            options={[
              { value: "race", label: "Кілька таймерів одночасно" },
              { value: "interval", label: "setInterval, що тікає" },
            ]}
            value={scenario}
            onChange={(v) => {
              stopInterval();
              clearTimers();
              stop();
              setTracks([]);
              setScenario(v as Scenario);
            }}
          />
        </div>
      </div>

      {scenario === "race" ? (
        <div className={styles.semanticBlock} style={{ display: "grid", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              type="button"
              onClick={runRace}
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
              {running ? "Таймери йдуть..." : "Запланувати A, B, C у цьому порядку в коді"}
            </button>
          </div>
          {tracks.length > 0 && <DemoTimeline tracks={tracks} nowMs={elapsedMs} scaleMs={RACE_SCALE_MS} />}
        </div>
      ) : (
        <div className={styles.semanticBlock} style={{ display: "grid", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              type="button"
              onClick={intervalRunning ? stopInterval : startInterval}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                background: intervalRunning ? "var(--danger)" : "var(--primary)",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {intervalRunning ? "Зупинити (clearInterval)" : "Запустити setInterval (500мс)"}
            </button>
            <span>
              Минуло реального часу: <strong>{intervalRunning ? Math.round(elapsedMs) : 0}мс</strong>
            </span>
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {dots.map((lit, i) => (
              <span
                key={i}
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: lit ? "var(--primary)" : "var(--surface-muted)",
                  border: "1px solid var(--border)",
                  transition: "background 150ms ease",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <DemoExplanation>
        {scenario === "race"
          ? "У коді таймер A планується першим, з найбільшою затримкою (2500мс). Але на таймлінії видно, що B (900мс) реально завершується першим, потім C (1600мс), і лише тоді A — черга виклику НЕ визначає порядок завершення."
          : "Кожен кружечок — реальний тік (500мс). setInterval продовжує тікати нескінченно, доки реально не викликати clearInterval."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          scenario === "race"
            ? `setTimeout(() => console.log("A"), 2500);\nsetTimeout(() => console.log("B"), 900);\nsetTimeout(() => console.log("C"), 1600);\n// порядок у консолі: B, C, A — НЕ A, B, C`
            : `const id = setInterval(() => {\n  tick();\n}, 500);\n\n// пізніше:\nclearInterval(id); // без цього тікає нескінченно`
        }
      />

      <DemoKeyTakeaway>
        setTimeout планує один відкладений виклик, і порядок завершення визначається затримкою кожного таймера, а не
        порядком виклику в коді. setInterval повторює виклик, доки не викликати clearInterval з тим самим ID.
      </DemoKeyTakeaway>
    </div>
  );
}
