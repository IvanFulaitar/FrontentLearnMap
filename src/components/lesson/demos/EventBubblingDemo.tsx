import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "buggy" | "fixed";

/**
 * Live demo for "Спливання подій (bubbling)": a real nested card with a
 * real delete button inside it. React's onClick is built on real native
 * DOM event delegation/bubbling, so a click on the button genuinely bubbles
 * to the card's own onClick unless event.stopPropagation() is really
 * called — the log below reflects real click order, not a scripted one.
 */
export function EventBubblingDemo() {
  const [mode, setMode] = useState<Mode>("buggy");
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));

  const handleCardClick = () => {
    addLog("card: спрацював обробник картки (\"відкрито деталі\")");
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    if (mode === "fixed") {
      event.stopPropagation();
    }
    addLog(`button: спрацював обробник кнопки (\"видалено\")${mode === "fixed" ? " — stopPropagation викликано" : ""}`);
  };

  const codeFor: Record<Mode, string> = {
    buggy: `deleteButton.addEventListener("click", () => {\n  deleteItem(); // немає stopPropagation — клік спливе до card\n});`,
    fixed: `deleteButton.addEventListener("click", (event) => {\n  event.stopPropagation(); // зупиняє спливання до card\n  deleteItem();\n});`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Обробник кнопки Видалити</span>
          <DemoToolbar
            options={[
              { value: "buggy", label: "БАГ: без stopPropagation" },
              { value: "fixed", label: "Правильно: зі stopPropagation" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setLog([]);
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальна картка — клацни на кнопку Видалити">
        <div
          onClick={handleCardClick}
          style={{
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "var(--surface-muted, #f5f5f5)",
            cursor: "pointer",
          }}
        >
          <p style={{ margin: "0 0 10px" }}>Товар: Навушники (клікни будь-де на картці — теж спрацює)</p>
          <button
            type="button"
            onClick={handleDeleteClick}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: "var(--primary)",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Видалити
          </button>
        </div>
      </DemoPreview>

      <DemoPreview label="Журнал реальних кліків (найновіше зверху)">
        <div className={styles.semanticBlock}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Клацни на кнопку чи на картку.</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "buggy"
          ? "Клік на кнопці спливає до картки — у журналі бачиш ОБИДВА записи (button, потім card) при кліку саме на кнопці."
          : "event.stopPropagation() у обробнику кнопки зупиняє спливання — при кліку на кнопці в журналі бачиш ЛИШЕ запис button, без card."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        Клік на нащадку спливає до всіх предків з обробниками того самого типу події, доки щось явно не викличе
        event.stopPropagation().
      </DemoKeyTakeaway>
    </div>
  );
}
