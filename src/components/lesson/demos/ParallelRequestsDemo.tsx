import { useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, DemoTimeline, useTimelineClock, type TimelineTrack } from "./framework";
import styles from "./demos.module.css";

type Mode = "sequential" | "parallel";

const REQUESTS = [
  { id: "weather", label: "weather", delayMs: 500 },
  { id: "news", label: "news", delayMs: 350 },
  { id: "reviews", label: "reviews", delayMs: 650 },
];

const SCALE_MS = 2200;

/**
 * Live demo for "Паралельні запити": runs three real mock fetches (each
 * with its own real setTimeout delay) either sequentially (real await,
 * await, await) or in parallel (real Promise.all), and renders their actual
 * progress on a DemoTimeline driven by useTimelineClock's real
 * requestAnimationFrame + performance.now() loop — the bars you see are
 * genuinely growing in real time, not a scripted animation.
 */
export function ParallelRequestsDemo() {
  const [mode, setMode] = useState<Mode>("sequential");
  const [running, setRunning] = useState(false);
  const [tracks, setTracks] = useState<TimelineTrack[]>([]);
  const [totalMs, setTotalMs] = useState<number | null>(null);
  const { elapsedMs, start, stop } = useTimelineClock();

  function fetchOne(id: string, delayMs: number): Promise<string> {
    return new Promise((resolve) => window.setTimeout(() => resolve(`дані:${id}`), delayMs));
  }

  const run = async () => {
    setRunning(true);
    setTotalMs(null);
    setTracks(REQUESTS.map((r) => ({ id: r.id, label: r.label, startMs: 0, status: "running" })));
    start();
    const realStart = performance.now();

    if (mode === "sequential") {
      let offset = 0;
      for (const r of REQUESTS) {
        setTracks((prev) => prev.map((t) => (t.id === r.id ? { ...t, startMs: offset } : t)));
        const stepStart = performance.now();
        await fetchOne(r.id, r.delayMs);
        const stepElapsed = performance.now() - stepStart;
        offset += stepElapsed;
        setTracks((prev) => prev.map((t) => (t.id === r.id ? { ...t, status: "done", endMs: offset } : t)));
      }
    } else {
      await Promise.all(
        REQUESTS.map(async (r) => {
          await fetchOne(r.id, r.delayMs);
          const endMs = performance.now() - realStart;
          setTracks((prev) => prev.map((t) => (t.id === r.id ? { ...t, status: "done", endMs } : t)));
        }),
      );
    }

    setTotalMs(performance.now() - realStart);
    stop();
    setRunning(false);
  };

  const codeFor: Record<Mode, string> = {
    sequential: `const weather = await fetchOne("weather"); // ~500мс\nconst news = await fetchOne("news");       // ще ~350мс, ПІСЛЯ weather\nconst reviews = await fetchOne("reviews"); // ще ~650мс, ПІСЛЯ news\n// разом: ~1500мс — сума всіх затримок`,
    parallel: `const [weather, news, reviews] = await Promise.all([\n  fetchOne("weather"), // усі старту­ють ОДНОЧАСНО\n  fetchOne("news"),\n  fetchOne("reviews"),\n]);\n// разом: ~650мс — максимум з трьох затримок`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Спосіб запуску трьох незалежних запитів</span>
          <DemoToolbar
            options={[
              { value: "sequential", label: "Послідовно (await, await, await)" },
              { value: "parallel", label: "Паралельно (Promise.all)" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setTracks([]);
              setTotalMs(null);
            }}
          />
        </div>
      </div>

      <div className={styles.semanticBlock} style={{ display: "grid", gap: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
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
            {running ? "Виконується..." : "Завантажити weather + news + reviews"}
          </button>
          {totalMs !== null && (
            <span>
              Реальний час: <strong>{totalMs.toFixed(0)}мс</strong>
            </span>
          )}
        </div>

        {tracks.length > 0 && <DemoTimeline tracks={tracks} nowMs={elapsedMs} scaleMs={SCALE_MS} />}
      </div>

      {totalMs !== null && (
        <DemoExplanation>
          {mode === "sequential"
            ? "Кожен наступний запит чекав завершення попереднього — смуги на таймлінії йдуть одна за одною, а не одночасно."
            : "Усі три запити стартували в одну мить — смуги на таймлінії ростуть паралельно, і загальний час дорівнює найдовшому запиту (reviews, ~650мс), а не сумі всіх трьох."}
        </DemoExplanation>
      )}

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        Promise.all запускає незалежні проміси одночасно — загальний час стає максимумом, а не сумою, з часів
        окремих операцій. На таймлінії це видно напряму: паралельні смуги ростуть разом, послідовні — одна за одною.
      </DemoKeyTakeaway>
    </div>
  );
}
