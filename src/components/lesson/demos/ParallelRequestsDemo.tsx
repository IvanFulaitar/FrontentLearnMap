import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "sequential" | "parallel";

const DELAY_MS = 500;

/**
 * Live demo for "Паралельні запити": runs two real 500ms-delayed mock
 * fetches either sequentially (real await, await) or in parallel (real
 * Promise.all) and times the genuine result with performance.now() — the
 * measured milliseconds are real, not scripted to look faster.
 */
export function ParallelRequestsDemo() {
  const [mode, setMode] = useState<Mode>("sequential");
  const [elapsedMs, setElapsedMs] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 4));

  function fetchWeather(): Promise<string> {
    return new Promise((resolve) => window.setTimeout(() => resolve("Сонячно"), DELAY_MS));
  }
  function fetchNews(): Promise<string[]> {
    return new Promise((resolve) => window.setTimeout(() => resolve(["Новина 1", "Новина 2"]), DELAY_MS));
  }

  const run = async () => {
    setRunning(true);
    setLog([]);
    const start = performance.now();

    if (mode === "sequential") {
      addLog("Чекаємо fetchWeather()...");
      const weather = await fetchWeather();
      addLog(`Отримано: ${weather}. Тепер чекаємо fetchNews()...`);
      const news = await fetchNews();
      addLog(`Отримано: ${news.join(", ")}`);
    } else {
      addLog("Запускаємо fetchWeather() і fetchNews() ОДНОЧАСНО...");
      const [weather, news] = await Promise.all([fetchWeather(), fetchNews()]);
      addLog(`Обидва готові: ${weather}, ${news.join(", ")}`);
    }

    const elapsed = performance.now() - start;
    setElapsedMs(elapsed);
    setRunning(false);
  };

  const codeFor: Record<Mode, string> = {
    sequential: `const weather = await fetchWeather(); // ~${DELAY_MS}мс\nconst news = await fetchNews();       // ще ~${DELAY_MS}мс, ПІСЛЯ weather\n// разом: ~${DELAY_MS * 2}мс`,
    parallel: `const [weather, news] = await Promise.all([\n  fetchWeather(), // обидва стартують ОДНОЧАСНО\n  fetchNews(),\n]);\n// разом: ~${DELAY_MS}мс`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Спосіб запуску двох незалежних запитів</span>
          <DemoToolbar
            options={[
              { value: "sequential", label: "Послідовно (await, await)" },
              { value: "parallel", label: "Паралельно (Promise.all)" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setElapsedMs(null);
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальний запуск — виміряний час performance.now()">
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
          {running ? "Виконується..." : "Завантажити weather + news"}
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

      {elapsedMs !== null && (
        <DemoExplanation>
          Реальний вимірений час: <strong>{elapsedMs.toFixed(0)}мс</strong>.{" "}
          {mode === "sequential"
            ? `Приблизно ${DELAY_MS * 2}мс — сума двох затримок, бо fetchNews() чекав завершення fetchWeather().`
            : `Приблизно ${DELAY_MS}мс — обидва запити виконувались одночасно.`}
        </DemoExplanation>
      )}

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        Promise.all запускає незалежні проміси одночасно — загальний час стає максимумом, а не сумою, з часів
        окремих операцій.
      </DemoKeyTakeaway>
    </div>
  );
}
