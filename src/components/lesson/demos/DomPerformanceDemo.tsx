import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "thrashing" | "batched";

const ITEM_COUNT = 150;

/**
 * Live demo for "Основи продуктивності DOM": runs a REAL layout-thrashing
 * loop (alternating reads of offsetWidth with writes to style.width across
 * 150 real DOM nodes) versus a REAL batched version (all reads, then all
 * writes), timing both with performance.now() — the measured milliseconds
 * are genuine browser timings, not simulated numbers.
 */
export function DomPerformanceDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("thrashing");
  const [elapsedMs, setElapsedMs] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  const run = () => {
    const container = containerRef.current;
    if (!container) return;
    setRunning(true);

    // Ensure exactly ITEM_COUNT real DOM nodes exist
    container.innerHTML = "";
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < ITEM_COUNT; i++) {
      const div = document.createElement("div");
      div.style.width = "40px";
      div.style.height = "6px";
      div.style.display = "inline-block";
      div.style.margin = "1px";
      div.style.background = "var(--primary-soft)";
      fragment.appendChild(div);
    }
    container.appendChild(fragment);
    const items = Array.from(container.children) as HTMLElement[];

    const start = performance.now();
    if (mode === "thrashing") {
      items.forEach((item) => {
        item.style.width = "45px"; // write
        void item.offsetWidth; // read — forces a real synchronous layout
      });
    } else {
      const widths = items.map((item) => item.offsetWidth); // all reads first
      items.forEach((item, i) => {
        item.style.width = widths[i] + 5 + "px"; // all writes after
      });
    }
    const elapsed = performance.now() - start;

    setElapsedMs(elapsed);
    setRunning(false);
  };

  const codeFor: Record<Mode, string> = {
    thrashing: `items.forEach((item) => {\n  item.style.width = "45px"; // запис\n  item.offsetWidth; // читання — ЗМУШУЄ перерахунок макета\n});\n// приблизно ${ITEM_COUNT} примусових перерахунків`,
    batched: `const widths = items.map((item) => item.offsetWidth); // усі читання\nitems.forEach((item, i) => {\n  item.style.width = widths[i] + 5 + "px"; // усі записи окремо\n});\n// приблизно 1 перерахунок`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Шаблон на {ITEM_COUNT} реальних DOM-вузлах</span>
          <DemoToolbar
            options={[
              { value: "thrashing", label: "БАГ: читання/запис чергуються" },
              { value: "batched", label: "Правильно: читання, потім запис" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setElapsedMs(null);
            }}
          />
        </div>
      </div>

      <DemoPreview label={`${ITEM_COUNT} реальних елементів — клацни, щоб виконати й виміряти`}>
        <div ref={containerRef} style={{ maxHeight: "80px", overflow: "hidden" }} />
      </DemoPreview>

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
          width: "fit-content",
          opacity: running ? 0.6 : 1,
        }}
      >
        Виконати й виміряти
      </button>

      {elapsedMs !== null && (
        <DemoExplanation>
          Реальний вимірений час (performance.now()):{" "}
          <strong style={{ color: mode === "thrashing" ? "#c0392b" : "#2e7d32" }}>
            {elapsedMs.toFixed(2)} мс
          </strong>{" "}
          для {ITEM_COUNT} елементів. Спробуй обидва режими кілька разів і порівняй — на такій кількості
          елементів різниця зазвичай помітна, хоч і залежить від конкретного браузера й пристрою.
        </DemoExplanation>
      )}

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        Читання геометрії (offsetWidth тощо) відразу після запису стилю змушує браузер перераховувати макет на
        кожній ітерації. Групування всіх читань перед усіма записами зводить це до одного перерахунку.
      </DemoKeyTakeaway>
    </div>
  );
}
