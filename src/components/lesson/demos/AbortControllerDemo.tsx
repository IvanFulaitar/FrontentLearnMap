import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, DemoTimeline, useTimelineClock, type TimelineTrack } from "./framework";
import styles from "./demos.module.css";

type Mode = "withAbort" | "withoutAbort";

const SCALE_MS = 1400;
const MAX_TRACKS = 4;

/**
 * Live demo for "Основи скасування запитів": a real <input> triggers a real
 * mock "search" request per keystroke, each with a genuinely random delay
 * (300-900ms) so slower, staler requests can really resolve after newer
 * ones. A DemoTimeline (driven by real performance.now() via
 * useTimelineClock, whose t0 resets each time a fresh burst of typing
 * begins) shows each keystroke's request as its own bar — aborted ones cut
 * off in real time (withAbort mode), or racing to a possibly-stale finish
 * (withoutAbort mode).
 */
export function AbortControllerDemo() {
  const [mode, setMode] = useState<Mode>("withoutAbort");
  const [query, setQuery] = useState("");
  const [displayedResult, setDisplayedResult] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [tracks, setTracks] = useState<TimelineTrack[]>([]);
  const { elapsedMs, running, start, stop } = useTimelineClock();
  const controllerRef = useRef<AbortController | null>(null);
  const requestCounter = useRef(0);
  const lastFinishedRef = useRef(0);
  const inFlightRef = useRef(0);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 6));

  function fetchSearch(q: string, signal?: AbortSignal): Promise<string> {
    return new Promise((resolve, reject) => {
      const delay = 300 + Math.random() * 600;
      const timeoutId = window.setTimeout(() => {
        resolve(`Результати для "${q}"`);
      }, delay);

      if (signal) {
        signal.addEventListener("abort", () => {
          window.clearTimeout(timeoutId);
          reject(new DOMException("Aborted", "AbortError"));
        });
      }
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    requestCounter.current += 1;
    const requestId = requestCounter.current;
    const trackId = `req-${requestId}`;

    // Fresh burst of typing (no request currently ticking) — reset the
    // shared real-time clock so this new batch starts at 0 on the timeline.
    const startMs = running ? elapsedMs : 0;
    if (!running) start();
    // t0 lets the .then/.catch callbacks below (which fire much later, after
    // this render's elapsedMs closure is stale) compute a fresh, genuinely
    // real endMs via performance.now() instead of a frozen React state value.
    const t0 = performance.now() - startMs;

    setTracks((prev) => [...prev, { id: trackId, label: `#${requestId} "${value || "…"}"`, startMs, status: "running" as const }].slice(-MAX_TRACKS));

    if (mode === "withAbort" && controllerRef.current) {
      controllerRef.current.abort();
      addLog(`Скасовано попередній запит (перед запитом #${requestId})`);
    }

    const controller = mode === "withAbort" ? new AbortController() : undefined;
    if (controller) controllerRef.current = controller;

    addLog(`Запит #${requestId} відправлено: "${value}"`);
    inFlightRef.current += 1;

    const settle = () => {
      inFlightRef.current = Math.max(0, inFlightRef.current - 1);
      if (inFlightRef.current === 0) stop();
    };

    fetchSearch(value, controller?.signal)
      .then((result) => {
        const endMs = performance.now() - t0;
        const isStale = requestId < lastFinishedRef.current;
        lastFinishedRef.current = Math.max(lastFinishedRef.current, requestId);
        addLog(`Запит #${requestId} завершився: ${result}${isStale ? " (застаріле — прийшло після новішого!)" : ""}`);
        setDisplayedResult(result);
        setTracks((prev) =>
          prev.map((t) => (t.id === trackId ? { ...t, status: "done" as const, endMs, note: isStale ? "застаріле!" : undefined } : t)),
        );
        settle();
      })
      .catch((error: Error) => {
        if (error.name === "AbortError") {
          const endMs = performance.now() - t0;
          addLog(`Запит #${requestId} скасовано (AbortError) — результат ігнорується`);
          setTracks((prev) => (prev.map((t) => (t.id === trackId ? { ...t, status: "aborted" as const, endMs } : t))));
        }
        settle();
      });
  };

  const codeFor: Record<Mode, string> = {
    withoutAbort: `function search(query) {\n  return fetch(\`/api/search?q=\${query}\`); // немає скасування\n}\n// застаріла повільна відповідь може прийти ПІЗНІШЕ за новішу`,
    withAbort: `let currentController = null;\nfunction search(query) {\n  if (currentController) currentController.abort();\n  currentController = new AbortController();\n  return fetch(\`/api/search?q=\${query}\`, { signal: currentController.signal });\n}`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Скасування попереднього запиту</span>
          <DemoToolbar
            options={[
              { value: "withoutAbort", label: "БАГ: без AbortController" },
              { value: "withAbort", label: "Правильно: з AbortController" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setLog([]);
              setTracks([]);
              setDisplayedResult("");
              stop();
              if (controllerRef.current) {
                controllerRef.current.abort();
                controllerRef.current = null;
              }
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальне поле — набирай швидко, кожен символ = новий запит">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Наприклад: набери 'a', потім швидко 'ab'"
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
          }}
        />
        <p style={{ marginTop: "8px" }}>
          Показаний результат: <strong>{displayedResult || "—"}</strong>
        </p>
      </DemoPreview>

      {tracks.length > 0 && (
        <div className={styles.semanticBlock}>
          <DemoTimeline tracks={tracks} nowMs={elapsedMs} scaleMs={SCALE_MS} />
        </div>
      )}

      <DemoPreview label="Журнал реальних запитів (найновіше зверху)">
        <div className={styles.semanticBlock}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Набирай текст у полі вище.</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "withoutAbort"
          ? "Кожен запит має випадкову затримку (300-900мс) — набери швидко кілька символів і подивись на таймлінію: смуга старішого запиту іноді завершується ПІСЛЯ новішого (позначено \"застаріле!\"), і саме його результат тоді показується."
          : "Кожен новий символ реально скасовує попередній незавершений запит — на таймлінії видно, як стара смуга обривається (сірим), щойно починається нова."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        AbortController.signal, переданий у fetch, дозволяє скасувати застарілий запит через controller.abort() —
        це запобігає race condition, коли повільна стара відповідь перезаписує новішу. На таймлінії різниця між
        обірваною сірою смугою (withAbort) і "застарілою" зеленою смугою, що прийшла запізно (withoutAbort), видно
        напряму.
      </DemoKeyTakeaway>
    </div>
  );
}
