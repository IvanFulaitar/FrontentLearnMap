import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "success" | "failure" | "invalid";
type Stage = "idle" | "try" | "catch" | "finally";

/**
 * Live demo for "Try/catch з async": a real async function wraps a real
 * Promise-returning fetch mock in try/catch/finally. A live pipeline diagram
 * highlights the block that is ACTUALLY executing right now, driven by real
 * await timing (not a scripted animation) — including a third scenario
 * where fetchUser() genuinely throws SYNCHRONOUSLY (before any await, on
 * invalid input) to show try/catch also catches ordinary synchronous
 * errors, not just rejected promises.
 */
export function TryCatchAsyncDemo() {
  const [mode, setMode] = useState<Mode>("success");
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [outcome, setOutcome] = useState<"success" | "error" | null>(null);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 6));

  function validateInput(shouldBeInvalid: boolean) {
    if (shouldBeInvalid) {
      throw new Error("Невалідні дані: імʼя користувача порожнє");
    }
  }

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
    setOutcome(null);
    setStage("try");
    addLog("try: виконання почалось...");
    try {
      validateInput(mode === "invalid");
      addLog("try: await fetchUser()...");
      const user = await fetchUser(mode === "failure");
      addLog(`Успіх: профіль завантажено — ${user.name}`);
      setOutcome("success");
    } catch (error) {
      setStage("catch");
      setOutcome("error");
      addLog(`catch: помилка перехоплена — "${(error as Error).message}". Повертаємо fallback: null`);
      await new Promise((r) => window.setTimeout(r, 300));
    } finally {
      setStage("finally");
      addLog("finally: виконується завжди, незалежно від результату");
      await new Promise((r) => window.setTimeout(r, 300));
      setRunning(false);
    }
  }

  const codeFor: Record<Mode, string> = {
    success: `try {\n  validateInput(input);\n  const user = await fetchUser();\n  console.log(user);\n} catch (error) {\n  console.error(error.message);\n} finally {\n  hideSpinner();\n}`,
    failure: `try {\n  validateInput(input);\n  const user = await fetchUser(); // відхиляється!\n  console.log(user); // НЕ виконається\n} catch (error) {\n  console.error(error.message); // спрацює саме тут\n} finally {\n  hideSpinner();\n}`,
    invalid: `try {\n  validateInput(input); // кидає СИНХРОННО, до будь-якого await!\n  const user = await fetchUser(); // НЕ виконається взагалі\n  console.log(user);\n} catch (error) {\n  console.error(error.message); // ловить і звичайний throw теж\n} finally {\n  hideSpinner();\n}`,
  };

  const stageStyle = (target: Stage, color: string) => {
    const isActive = stage === target;
    return {
      borderColor: isActive ? color : "var(--border)",
      background: isActive ? `color-mix(in srgb, ${color} 12%, var(--surface))` : "var(--surface-muted)",
      color: isActive ? color : "var(--muted)",
    };
  };

  const tryColor = outcome === "error" && stage !== "try" ? "var(--muted)" : "var(--primary)";

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Результат fetchUser()</span>
          <DemoToolbar
            options={[
              { value: "success", label: "Успіх" },
              { value: "failure", label: "Відхилення (мережа)" },
              { value: "invalid", label: "Синхронна помилка (невалідні дані)" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setLog([]);
              setStage("idle");
              setOutcome(null);
            }}
          />
        </div>
      </div>

      <div className={styles.semanticBlock} style={{ display: "grid", gap: "14px" }}>
        <div className={styles.pipelineRow}>
          <div className={styles.pipelineStage} style={stageStyle("try", tryColor)}>
            try
          </div>
          <div className={styles.pipelineArrow}>→</div>
          <div className={styles.pipelineStage} style={stageStyle("catch", "var(--danger)")}>
            catch
          </div>
          <div className={styles.pipelineArrow}>→</div>
          <div className={styles.pipelineStage} style={stageStyle("finally", "var(--success)")}>
            finally
          </div>
        </div>

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
            justifySelf: "start",
          }}
        >
          {running ? "Завантаження..." : "Завантажити профіль"}
        </button>
      </div>

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
        {mode === "success" &&
          "fetchUser() успішно виконується — блок try завершується повністю, catch пропускається, finally виконується."}
        {mode === "failure" &&
          "fetchUser() реально відхиляється ПІСЛЯ await (через 700мс) — виконання переходить у catch, минаючи решту try, а finally все одно виконується."}
        {mode === "invalid" &&
          "validateInput() кидає звичайну синхронну помилку ДО await fetchUser() — await навіть не встигає почати виконуватись, а catch все одно ловить цю помилку так само, як і відхилений проміс."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        try/catch ловить і відхилений await, і звичайний синхронний throw — обидва потрапляють у той самий catch.
        finally виконується завжди, незалежно від того, де саме сталася помилка і чи сталася вона взагалі.
      </DemoKeyTakeaway>
    </div>
  );
}
