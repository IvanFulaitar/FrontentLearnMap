import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Scenario = "200" | "404" | "500";
type CheckMode = "unchecked" | "checked";

interface FakeResponse {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
}

/**
 * Live demo for "Обробка HTTP-статусів": a real mock fetch genuinely
 * resolves (never rejects) for 404/500, exactly like the real fetch API —
 * proving with real code execution that try/catch alone does not catch
 * these, and that only a real `if (!response.ok)` check does.
 */
export function HttpStatusDemo() {
  const [scenario, setScenario] = useState<Scenario>("404");
  const [checkMode, setCheckMode] = useState<CheckMode>("unchecked");
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));

  function fakeFetch(status: number): Promise<FakeResponse> {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve({
          ok: status >= 200 && status < 300,
          status,
          json: () => Promise.resolve(status === 200 ? { name: "Кава" } : { error: "Сторінка помилки сервера" }),
        });
      }, 500);
    });
  }

  const run = async () => {
    setRunning(true);
    setLog([]);
    const statusNumber = Number(scenario);

    try {
      addLog(`await fetch(...) — статус сервера: ${statusNumber}`);
      const response = await fakeFetch(statusNumber);
      addLog(`Проміс fetch УСПІШНО виконався (fulfilled) — response.ok = ${response.ok}`);

      if (checkMode === "checked" && !response.ok) {
        throw new Error(`Помилка ${response.status}`);
      }

      const data = await response.json();
      addLog(`Дані прочитано: ${JSON.stringify(data)}`);
    } catch (error) {
      addLog(`catch спрацював: ${(error as Error).message}`);
    }
    setRunning(false);
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Статус, що повертає сервер</span>
          <DemoToolbar
            options={[
              { value: "200", label: "200 Успіх" },
              { value: "404", label: "404 Не знайдено" },
              { value: "500", label: "500 Помилка сервера" },
            ]}
            value={scenario}
            onChange={(v) => {
              setScenario(v as Scenario);
              setLog([]);
            }}
          />
        </div>
        <div className={styles.control}>
          <span>Обробка помилок</span>
          <DemoToolbar
            options={[
              { value: "unchecked", label: "Лише try/catch (без response.ok)" },
              { value: "checked", label: "З перевіркою response.ok" },
            ]}
            value={checkMode}
            onChange={(v) => {
              setCheckMode(v as CheckMode);
              setLog([]);
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальний виклик — журнал справжнього виконання (найновіше зверху)">
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
          {running ? "Виконується..." : "Викликати fetch"}
        </button>
        <div className={styles.semanticBlock} style={{ marginTop: "10px" }}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Натисни кнопку вище.</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {scenario !== "200" && checkMode === "unchecked"
          ? "fetch НЕ кидає помилку для 404/500 — catch тут не спрацьовує, а код намагається читати дані з тіла помилки."
          : scenario !== "200" && checkMode === "checked"
            ? "if (!response.ok) явно кидає помилку — саме тому catch тепер реально ловить цю ситуацію."
            : "Статус 200 — response.ok true в обох режимах, дані читаються нормально."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          checkMode === "checked"
            ? `const response = await fetch(url);\nif (!response.ok) {\n  throw new Error(\`Помилка \${response.status}\`);\n}\nconst data = await response.json();`
            : `const response = await fetch(url);\n// немає перевірки response.ok!\nconst data = await response.json(); // виконається навіть для 404/500`
        }
      />

      <DemoKeyTakeaway>
        fetch відхиляє проміс лише при збої мережі. HTTP-помилки (404/500) — це УСПІШНО отримана відповідь;
        перевіряти їх потрібно вручну через response.ok.
      </DemoKeyTakeaway>
    </div>
  );
}
