import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "pure" | "coupled";

function validateEmailPure(email: string): { valid: boolean; message: string } {
  if (!email.includes("@")) return { valid: false, message: "Email має містити @" };
  return { valid: true, message: "" };
}

function validateEmailCoupled(email: string): boolean {
  if (!email.includes("@")) {
    // Реально звертається до елемента, якого НЕМАЄ в цьому пісочному прев'ю —
    // так само, як валідатор, "прив'язаний" до конкретної розмітки однієї форми,
    // ламається, якщо цієї розмітки немає.
    document.querySelector("#error-message-that-does-not-exist-here")!.textContent = "Некоректний email";
    return false;
  }
  return true;
}

/**
 * Live demo for "Логіка валідації": a real text input feeds a real function
 * call. The "coupled" validator genuinely reaches into the DOM for a
 * specific element that doesn't exist in this sandbox, and really throws
 * (a real TypeError from a real null dereference) — proving live why a
 * validator that touches the DOM directly can't be reused elsewhere. The
 * "pure" validator never touches the DOM and always safely returns a result.
 */
export function ValidationLogicDemo() {
  const [mode, setMode] = useState<Mode>("coupled");
  const [email, setEmail] = useState("test");
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));

  const run = () => {
    if (mode === "pure") {
      const result = validateEmailPure(email);
      addLog(result.valid ? "✓ valid: true" : `✗ valid: false, message: "${result.message}"`);
    } else {
      try {
        const ok = validateEmailCoupled(email);
        addLog(`Повернулось: ${ok}`);
      } catch (error) {
        addLog(`Реальна помилка виконання: ${(error as Error).message}`);
      }
    }
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Реалізація валідатора</span>
          <DemoToolbar
            options={[
              { value: "coupled", label: "Прив'язаний до DOM (крихкий)" },
              { value: "pure", label: "Чиста функція (повертає результат)" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setLog([]);
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальне поле вводу — спробуй email без @ (наприклад, 'test')">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid var(--border)", width: "100%", maxWidth: "260px" }}
        />
        <button
          type="button"
          onClick={run}
          style={{
            marginTop: "10px",
            marginLeft: "8px",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--primary)",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Перевірити
        </button>
        <div className={styles.semanticBlock} style={{ marginTop: "10px" }}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Введи email і натисни "Перевірити".</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "coupled"
          ? "Для email без @ ця функція реально намагається записати текст у КОНКРЕТНИЙ елемент DOM, якого немає в цьому середовищі — і кидає справжню помилку замість того, щоб просто повідомити про некоректність email."
          : "validateEmailPure ніколи не чіпає DOM — вона просто повертає { valid, message }, тому працює однаково надійно в БУДЬ-ЯКОМУ середовищі, незалежно від розмітки."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          mode === "coupled"
            ? `function validateEmail(email) {\n  if (!email.includes("@")) {\n    document.querySelector("#error").textContent = "Некоректний email"; // БАГ\n    return false;\n  }\n  return true;\n}`
            : `function validateEmail(email) {\n  if (!email.includes("@")) return { valid: false, message: "Email має містити @" };\n  return { valid: true, message: "" };\n}`
        }
      />

      <DemoKeyTakeaway>
        Валідатор повинен лише ПОВЕРТАТИ результат перевірки, ніколи не змінювати DOM усередині себе — так його можна
        перевикористати для будь-якого поля чи форми, і навіть протестувати без реального DOM.
      </DemoKeyTakeaway>
    </div>
  );
}
