import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "broken" | "correct";

const ROUTES: Record<string, string> = {
  "#/menu": "Меню кав'ярні",
  "#/cart": "Кошик",
  "#/about": "Про нас",
};

/**
 * Live demo for "Прості патерни роутингу": simulates window.location.hash /
 * hashchange with real, isolated component state (so it never touches the
 * page's actual address bar) but runs the REAL routing logic — the same
 * `routes[hash] || fallback` lookup and the same "hashchange only fires on
 * a genuine change" rule. In "broken" mode the initial render call is
 * genuinely skipped, so the view really stays blank until a real
 * (simulated) hash change occurs.
 */
export function HashRoutingDemo() {
  const [mode, setMode] = useState<Mode>("broken");
  const [simulatedHash, setSimulatedHash] = useState("#/cart"); // сторінка "щойно завантажена" саме з цим hash
  const [viewText, setViewText] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));

  const handleRouteChange = (hash: string) => {
    const render = ROUTES[hash] ?? "Меню кав'ярні (fallback за замовчуванням)";
    setViewText(render);
    addLog(`handleRouteChange("${hash}") -> "${render}"`);
  };

  const reset = (next: Mode) => {
    setMode(next);
    setSimulatedHash("#/cart");
    setViewText("");
    setLog([`Сторінка "завантажена" з location.hash = "#/cart" в адресному рядку`]);
    if (next === "correct") {
      // Явний виклик одразу після налаштування слухача.
      handleRouteChange("#/cart");
    }
  };

  const navigate = (hash: string) => {
    if (hash === simulatedHash) {
      addLog(`hash не змінився ("${hash}") — подія hashchange НЕ спрацьовує`);
      return;
    }
    setSimulatedHash(hash);
    addLog(`location.hash змінився на "${hash}" — подія hashchange спрацювала`);
    handleRouteChange(hash);
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Варіант коду</span>
          <DemoToolbar
            options={[
              { value: "broken", label: "З багом (немає виклику при завантаженні)" },
              { value: "correct", label: "Виправлено (виклик одразу)" },
            ]}
            value={mode}
            onChange={(v) => reset(v as Mode)}
          />
        </div>
      </div>

      <DemoPreview label={`Симуляція адресного рядка: location.hash = "${simulatedHash}"`}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
          <button type="button" onClick={() => navigate("#/menu")} style={btnStyle}>#/menu</button>
          <button type="button" onClick={() => navigate("#/cart")} style={btnStyle}>#/cart</button>
          <button type="button" onClick={() => navigate("#/about")} style={btnStyle}>#/about</button>
        </div>
        <div className={styles.semanticBlock}>
          <p>#view: <strong>{viewText || "(порожньо)"}</strong></p>
        </div>
        <div className={styles.semanticBlock} style={{ marginTop: "10px" }}>
          {log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "correct"
          ? "handleRouteChange() викликається одразу при завантаженні — #view коректно показує \"Кошик\" ще ДО будь-якого кліку."
          : "Немає виклику при завантаженні — #view лишається порожнім, поки не станеться РЕАЛЬНА зміна hash (клік на інше посилання)."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          mode === "correct"
            ? `window.addEventListener("hashchange", handleRouteChange);\nhandleRouteChange(); // ОБОВ'ЯЗКОВО одразу`
            : `window.addEventListener("hashchange", handleRouteChange);\n// БАГ: немає виклику тут — #view порожній до першої зміни hash`
        }
      />

      <DemoKeyTakeaway>
        Подія hashchange спрацьовує лише при РЕАЛЬНІЙ зміні hash — для вже наявного значення при завантаженні
        потрібен явний виклик функції рендеру одразу після налаштування слухача.
      </DemoKeyTakeaway>
    </div>
  );
}

const btnStyle = {
  padding: "8px 14px",
  borderRadius: "6px",
  border: "1px solid var(--border)",
  background: "var(--primary)",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: "0.85rem",
} as const;
