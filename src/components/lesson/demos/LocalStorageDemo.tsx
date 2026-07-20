import { useState, type CSSProperties } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "correct" | "broken";

const STORAGE_KEY = "demo-cart-lesson";

/**
 * Live demo for "Патерни LocalStorage": genuinely calls the browser's real
 * localStorage.setItem/getItem — in "broken" mode it really passes the raw
 * object (which really becomes the literal string "[object Object]" once
 * read back), in "correct" mode it really round-trips through
 * JSON.stringify/JSON.parse.
 */
export function LocalStorageDemo() {
  const [mode, setMode] = useState<Mode>("broken");
  const [saved, setSaved] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<string | null>(null);

  const cart = [{ name: "Кава", price: 65 }];

  const handleSave = () => {
    if (mode === "correct") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } else {
      // Реально передаємо обʼєкт напряму — localStorage сам приведе його до рядка.
      localStorage.setItem(STORAGE_KEY, cart as unknown as string);
    }
    setSaved(localStorage.getItem(STORAGE_KEY));
    setLoaded(null);
  };

  const handleLoad = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (mode === "correct") {
      const restored = raw ? JSON.parse(raw) : [];
      setLoaded(`restored[0].name = "${restored[0]?.name}" (реальний обʼєкт)`);
    } else {
      const restored = raw as unknown as { name: string }[];
      setLoaded(`restored[0]?.name = ${restored[0]?.name} (raw — це рядок, не масив!)`);
    }
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSaved(null);
    setLoaded(null);
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Варіант коду</span>
          <DemoToolbar
            options={[
              { value: "broken", label: "З багом (без JSON.stringify)" },
              { value: "correct", label: "Виправлено (JSON.stringify/parse)" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setSaved(null);
              setLoaded(null);
              localStorage.removeItem(STORAGE_KEY);
            }}
          />
        </div>
      </div>

      <DemoPreview label={`cart = ${JSON.stringify(cart)} — справжній localStorage браузера`}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button type="button" onClick={handleSave} style={btnStyle}>
            localStorage.setItem("cart", ...)
          </button>
          <button type="button" onClick={handleLoad} style={btnStyle}>
            localStorage.getItem("cart")
          </button>
          <button type="button" onClick={handleClear} style={{ ...btnStyle, background: "var(--border)", color: "var(--text)" }}>
            Очистити
          </button>
        </div>
        <div className={styles.semanticBlock} style={{ marginTop: "10px" }}>
          <p>Реально збережено в localStorage: <strong>{saved ?? "(нічого)"}</strong></p>
          {loaded && <p style={{ marginTop: "6px" }}>{loaded}</p>}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "correct"
          ? "JSON.stringify(cart) зберігає коректний JSON-текст; JSON.parse(raw) відновлює реальний масив обʼєктів при читанні."
          : "cart передано напряму — localStorage.setItem приводить обʼєкт до рядка автоматично, тому реально збережено безглузде \"[object Object]\", і читання дає рядок, а не масив."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          mode === "correct"
            ? `localStorage.setItem("cart", JSON.stringify(cart));\nconst restored = JSON.parse(localStorage.getItem("cart"));\nrestored[0].name; // "Кава"`
            : `localStorage.setItem("cart", cart); // БАГ: немає JSON.stringify()\nlocalStorage.getItem("cart"); // "[object Object]"`
        }
      />

      <DemoKeyTakeaway>
        localStorage зберігає лише рядки. Обʼєкти й масиви завжди проходять через JSON.stringify() перед записом і
        JSON.parse() після читання.
      </DemoKeyTakeaway>
    </div>
  );
}

const btnStyle: CSSProperties = {
  padding: "8px 14px",
  borderRadius: "6px",
  border: "1px solid var(--border)",
  background: "var(--primary)",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: "0.85rem",
};
