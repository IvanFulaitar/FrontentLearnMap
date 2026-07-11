import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "querySelector" | "querySelectorAll" | "nullBug";

interface RunResult {
  display: string;
  isError: boolean;
}

/**
 * Live demo for "Вибір елементів": runs REAL document.querySelector /
 * querySelectorAll calls against an actual DOM sandbox (via a ref to real
 * rendered cards), including a genuine TypeError caught from reading a
 * property off a real null result — not a described/simulated outcome.
 */
export function SelectElementsDemo() {
  const sandboxRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("querySelector");
  const [result, setResult] = useState<RunResult | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const runQuery = () => {
    const sandbox = sandboxRef.current;
    if (!sandbox) return;

    if (mode === "querySelector") {
      const first = sandbox.querySelector(".card");
      if (first) {
        const index = Array.from(sandbox.querySelectorAll(".card")).indexOf(first);
        setHighlightedIndex(index);
        setResult({ display: `Знайдено: "${first.textContent}"`, isError: false });
      }
    } else if (mode === "querySelectorAll") {
      const all = sandbox.querySelectorAll(".card");
      setHighlightedIndex(null);
      setResult({ display: `Знайдено елементів: ${all.length}`, isError: false });
    } else {
      setHighlightedIndex(null);
      try {
        const missing = sandbox.querySelector(".missing-class");
        // Genuine unsafe access — throws for real, missing is actually null
        const text = (missing as HTMLElement).textContent;
        setResult({ display: `text: ${text}`, isError: false });
      } catch (err) {
        setResult({ display: `Помилка: ${err instanceof Error ? err.message : String(err)}`, isError: true });
      }
    }
  };

  const codeFor: Record<Mode, string> = {
    querySelector: `const first = document.querySelector(".card");\nconsole.log(first.textContent);`,
    querySelectorAll: `const all = document.querySelectorAll(".card");\nconsole.log(all.length);`,
    nullBug: `const missing = document.querySelector(".missing-class");\nconsole.log(missing.textContent); // TypeError!`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Запит</span>
          <DemoToolbar
            options={[
              { value: "querySelector", label: "querySelector('.card')" },
              { value: "querySelectorAll", label: "querySelectorAll('.card')" },
              { value: "nullBug", label: "БАГ: querySelector('.missing-class')" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setResult(null);
              setHighlightedIndex(null);
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальний DOM-піщочок — три картки з класом .card">
        <div ref={sandboxRef} className={styles.semanticBlock}>
          {["Книга", "Ручка", "Зошит"].map((name, i) => (
            <div
              key={name}
              className="card"
              style={{
                display: "inline-block",
                padding: "8px 12px",
                margin: "4px",
                borderRadius: "6px",
                border: highlightedIndex === i ? "2px solid var(--primary)" : "1px solid var(--border)",
                background: highlightedIndex === i ? "var(--primary-soft)" : "var(--surface)",
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </DemoPreview>

      <button
        type="button"
        onClick={runQuery}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          border: "1px solid var(--border)",
          background: "var(--primary)",
          color: "white",
          fontWeight: 600,
          cursor: "pointer",
          width: "fit-content",
        }}
      >
        Виконати запит
      </button>

      {result && (
        <DemoExplanation>
          <span style={{ color: result.isError ? "#c0392b" : "#2e7d32" }}>{result.display}</span>
        </DemoExplanation>
      )}

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        querySelector повертає перший збіг або null; querySelectorAll — усі збіги в статичному списку. Завжди
        перевіряй результат на null перед зверненням до його властивостей.
      </DemoKeyTakeaway>
    </div>
  );
}
