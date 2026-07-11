import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "withAbort" | "withoutAbort";

/**
 * Live demo for "Основи скасування запитів": a real <input> triggers a
 * real mock "search" request per keystroke, each with a genuinely random
 * delay (300-900ms) so slower, staler requests can really resolve after
 * newer ones. In "withAbort" mode a real AbortController genuinely cancels
 * the previous in-flight request before starting a new one; in
 * "withoutAbort" mode nothing is cancelled, so a real race condition can
 * genuinely occur and be observed live.
 */
export function AbortControllerDemo() {
  const [mode, setMode] = useState<Mode>("withoutAbort");
  const [query, setQuery] = useState("");
  const [displayedResult, setDisplayedResult] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const controllerRef = useRef<AbortController | null>(null);
  const requestCounter = useRef(0);

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

    if (mode === "withAbort" && controllerRef.current) {
      controllerRef.current.abort();
      addLog(`Скасовано попередній запит (перед запитом #${requestId})`);
    }

    const controller = mode === "withAbort" ? new AbortController() : undefined;
    if (controller) controllerRef.current = controller;

    addLog(`Запит #${requestId} відправлено: "${value}"`);

    fetchSearch(value, controller?.signal)
      .then((result) => {
        addLog(`Запит #${requestId} завершився: ${result}`);
        setDisplayedResult(result);
      })
      .catch((error: Error) => {
        if (error.name === "AbortError") {
          addLog(`Запит #${requestId} скасовано (AbortError) — результат ігнорується`);
        }
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
              setDisplayedResult("");
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
          ? "Кожен запит має випадкову затримку (300-900мс) — набери швидко кілька символів і подивись, чи \"Показаний результат\" іноді стає застарілим (не відповідає останньому введеному тексту)."
          : "Кожен новий символ скасовує попередній незавершений запит — \"Показаний результат\" завжди відповідає останньому введеному тексту."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        AbortController.signal, переданий у fetch, дозволяє скасувати застарілий запит через controller.abort() —
        це запобігає race condition, коли повільна стара відповідь перезаписує новішу.
      </DemoKeyTakeaway>
    </div>
  );
}
