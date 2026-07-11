import { useRef, useState } from "react";
import { DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Події клавіатури": a real <input> with a real keydown
 * listener reporting the genuine event.key, event.code, and modifier flags
 * for whatever the user actually types — not simulated values.
 */
export function KeyboardEventDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastKey, setLastKey] = useState("");
  const [lastCode, setLastCode] = useState("");
  const [modifiers, setModifiers] = useState<string[]>([]);
  const [enterCount, setEnterCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 4));

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setLastKey(event.key);
    setLastCode(event.code);
    const mods: string[] = [];
    if (event.shiftKey) mods.push("Shift");
    if (event.ctrlKey) mods.push("Ctrl");
    if (event.altKey) mods.push("Alt");
    if (event.metaKey) mods.push("Meta");
    setModifiers(mods);

    if (event.key === "Enter") {
      setEnterCount((c) => c + 1);
      addLog(`Enter натиснуто${event.ctrlKey ? " разом з Ctrl" : ""} — реальна дія відправки могла б спрацювати тут`);
    }
  };

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Реальне поле — набирай текст, спробуй Enter, Shift, Ctrl+Enter">
        <input
          ref={inputRef}
          type="text"
          placeholder="Друкуй тут..."
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            fontSize: "1rem",
          }}
        />
      </DemoPreview>

      <div className={styles.semanticBlock}>
        <p style={{ margin: "2px 0" }}>
          event.key: <strong>{lastKey ? `"${lastKey}"` : "—"}</strong>
        </p>
        <p style={{ margin: "2px 0" }}>
          event.code: <strong>{lastCode ? `"${lastCode}"` : "—"}</strong>
        </p>
        <p style={{ margin: "2px 0" }}>
          Модифікатори: <strong>{modifiers.length ? modifiers.join(" + ") : "немає"}</strong>
        </p>
        <p style={{ margin: "2px 0" }}>
          Натискань Enter зафіксовано: <strong>{enterCount}</strong>
        </p>
      </div>

      <DemoPreview label="Журнал реальних Enter-подій (найновіше зверху)">
        <div className={styles.semanticBlock}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Натисни Enter у полі вище, щоб побачити журнал.</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        Спробуй набрати ту саму букву без і з Shift — event.key зміниться (наприклад "a" → "A"), а event.code
        залишиться тим самим ("KeyA"), бо це та сама фізична клавіша.
      </DemoExplanation>

      <DemoCodeSnippet code={`input.addEventListener("keydown", (event) => {\n  if (event.key === "Enter" && event.ctrlKey) {\n    // Ctrl+Enter — окрема дія\n  }\n});`} />

      <DemoKeyTakeaway>
        event.key — реальний символ з урахуванням розкладки й Shift; event.code — завжди та сама фізична клавіша,
        незалежно від регістру чи розкладки.
      </DemoKeyTakeaway>
    </div>
  );
}
