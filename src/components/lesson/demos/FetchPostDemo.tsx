import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "correct" | "broken";

/**
 * Live demo for "POST-запити": a real mock server function genuinely
 * inspects `typeof options.body` and, for the broken mode, really calls
 * `String(comment)` on the raw object the same way an HTTP layer would coerce
 * a non-string body — producing an authentic "[object Object]" result, not a
 * scripted string.
 */
export function FetchPostDemo() {
  const [mode, setMode] = useState<Mode>("broken");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const comment = { text: "Чудова кава!", author: "Ірина" };

  function fakeServerReceives(body: unknown): Promise<{ receivedType: string; receivedValue: string }> {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        // Реально те, що відбувається з тілом запиту без JSON.stringify: воно
        // приводиться до рядка так само, як це зробила б мережа.
        resolve({ receivedType: typeof body, receivedValue: String(body) });
      }, 500);
    });
  }

  const run = async () => {
    setRunning(true);
    setResult(null);

    const body = mode === "correct" ? JSON.stringify(comment) : comment;
    const received = await fakeServerReceives(body);

    setResult(
      `Надіслано (typeof body): "${typeof body}"\nЩо "отримав сервер": ${received.receivedValue}`,
    );
    setRunning(false);
  };

  const codeFor: Record<Mode, string> = {
    correct: `fetch("/api/comments", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify(comment), // рядок!\n});`,
    broken: `fetch("/api/comments", {\n  method: "POST",\n  body: comment, // БАГ: сирий обʼєкт, без JSON.stringify()\n});`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Варіант коду</span>
          <DemoToolbar
            options={[
              { value: "broken", label: "З багом (без JSON.stringify)" },
              { value: "correct", label: "Виправлено (JSON.stringify)" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setResult(null);
            }}
          />
        </div>
      </div>

      <DemoPreview label={`Надсилаємо comment = ${JSON.stringify(comment)}`}>
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
          {running ? "Надсилання..." : "Надіслати POST-запит"}
        </button>
        {result && (
          <pre className={styles.semanticBlock} style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>
            {result}
          </pre>
        )}
      </DemoPreview>

      <DemoExplanation>
        {mode === "correct"
          ? "JSON.stringify(comment) перетворює обʼєкт на реальний JSON-рядок — сервер отримує саме текст з полями text і author."
          : "comment переданий напряму, без JSON.stringify() — тіло запиту приводиться до рядка автоматично, і сервер \"бачить\" лише безглузде \"[object Object]\", реальні поля втрачені."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        body завжди має бути рядком. Обʼєкт передається в JSON.stringify() ПЕРЕД тим, як потрапити в body — інакше
        дані втрачаються ще до відправки.
      </DemoKeyTakeaway>
    </div>
  );
}
