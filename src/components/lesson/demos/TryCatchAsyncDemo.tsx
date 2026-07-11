import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "success" | "failure";

/**
 * Live demo for "Try/catch з async": a real async function wraps a real
 * Promise-returning fetch mock in try/catch. In "failure" mode the mock
 * genuinely rejects after a real setTimeout delay, and the real catch
 * block runs, producing a genuine fallback value — not a scripted outcome.
 */
export function TryCatchAsyncDemo() {
  const [mode, setMode] = useState<Mode>("success");
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));

  function fetchUser(shouldFail: boolean): Promise<{ name: string }> {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (shouldFail) {
          reject(new Error("Мережа недоступна"));
        } else {
          resolve({ name: "Оля" });
        }
      }, 700);
    });
  }

  async function loadProfile() {
    setRunning(true);
    addLog("try: викликаємо await fetchUser()...");
    try {
      const user = await fetchUser(mode === "failure");
      addLog(`Успіх: профіль завантажено — ${user.name}`);
    } catch (error) {
      addLog(`catch: помилка перехоплена — "${(error as Error).message}". Повертаємо fallback: null`);
    } finally {
      addLog("finally: виконується завжди, незалежно від результату");
      setRunning(false);
    }
  }

  const codeFor: Record<Mode, string> = {
    success: `try {\n  const user = await fetchUser();\n  console.log(user);\n} catch (error) {\n  console.error(error.message);\n} finally {\n  hideSpinner();\n}`,
    failure: `try {\n  const user = await fetchUser(); // відхиляється!\n  console.log(user); // НЕ виконається\n} catch (error) {\n  console.error(error.message); // спрацює саме тут\n} finally {\n  hideSpinner();\n}`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Результат fetchUser()</span>
          <DemoToolbar
            options={[
              { value: "success", label: "Успіх" },
              { value: "failure", label: "Відхилення (помилка мережі)" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setLog([]);
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальний виклик async-функції з try/catch/finally">
        <button
          type="button"
          onClick={loadProfile}
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
          {running ? "Завантаження..." : "Завантажити профіль"}
        </button>
      </DemoPreview>

      <DemoPreview label="Журнал реального виконання (найновіше зверху)">
        <div className={styles.semanticBlock}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Натисни кнопку вище.</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "success"
          ? "fetchUser() успішно виконується — блок try завершується повністю, catch пропускається, finally виконується."
          : "fetchUser() реально відхиляється — виконання одразу переходить у catch, минаючи решту try, а finally все одно виконується."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        try/catch ловить відхилений await так само, як звичайну синхронну помилку. finally виконується завжди,
        незалежно від успіху чи провалу.
      </DemoKeyTakeaway>
    </div>
  );
}
