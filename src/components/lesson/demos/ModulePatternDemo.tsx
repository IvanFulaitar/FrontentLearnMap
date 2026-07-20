import { useRef, useState, type CSSProperties } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "encapsulated" | "leaky";

interface EncapsulatedModule {
  addItem: (item: string) => void;
  getItems: () => string[];
  items?: undefined;
}
interface LeakyModule {
  addItem: (item: string) => void;
  items: string[];
}

function createEncapsulatedModule(): EncapsulatedModule {
  const items: string[] = []; // приватна — недосяжна ззовні
  return {
    addItem: (item: string) => {
      items.push(item);
    },
    getItems: () => [...items],
  };
}

function createLeakyModule(): LeakyModule {
  const items: string[] = [];
  return {
    addItem: (item: string) => {
      items.push(item);
    },
    items, // БАГ: пряме посилання на приватний масив
  };
}

/**
 * Live demo for "Модульний патерн": two genuinely separate module objects
 * (created via real closures, not simulated) — one exposes only methods, the
 * other leaks its internal array directly. Clicking "обхід" really tries to
 * mutate the module's state from outside; for the encapsulated version this
 * really throws a TypeError (module.items is really undefined), while for
 * the leaky version it really succeeds because it's the same array in memory.
 */
export function ModulePatternDemo() {
  const [mode, setMode] = useState<Mode>("leaky");
  const moduleRef = useRef<EncapsulatedModule | LeakyModule>(createLeakyModule());
  const [, forceRerender] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));

  const reset = (next: Mode) => {
    setMode(next);
    moduleRef.current = next === "encapsulated" ? createEncapsulatedModule() : createLeakyModule();
    setLog([]);
    forceRerender((t) => t + 1);
  };

  const handleAdd = () => {
    moduleRef.current.addItem("Кава");
    addLog('Викликано module.addItem("Кава") — публічний метод');
    forceRerender((t) => t + 1);
  };

  const handleBypass = () => {
    try {
      // Реальна спроба обійти публічний API й змінити стан напряму.
      (moduleRef.current as LeakyModule).items.push("Зламано ззовні");
      addLog('module.items.push("Зламано ззовні") — РЕАЛЬНО спрацювало, стан змінено в обхід addItem!');
    } catch (error) {
      addLog(`module.items.push(...) кинуло реальну помилку: ${(error as Error).message}`);
    }
    forceRerender((t) => t + 1);
  };

  const currentItems = mode === "encapsulated" ? (moduleRef.current as EncapsulatedModule).getItems() : (moduleRef.current as LeakyModule).items;

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Реалізація модуля</span>
          <DemoToolbar
            options={[
              { value: "leaky", label: "Витікає (items повернуто напряму)" },
              { value: "encapsulated", label: "Інкапсульований (лише методи)" },
            ]}
            value={mode}
            onChange={(v) => reset(v as Mode)}
          />
        </div>
      </div>

      <DemoPreview label="Реальний обʼєкт-модуль, створений через IIFE + замикання">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button type="button" onClick={handleAdd} style={btnStyle}>
            module.addItem("Кава")
          </button>
          <button type="button" onClick={handleBypass} style={{ ...btnStyle, background: "#c0392b" }}>
            Спробувати обхід (module.items.push)
          </button>
        </div>
        <div className={styles.semanticBlock} style={{ marginTop: "10px" }}>
          <p>Поточний стан: <strong>[{currentItems.join(", ") || "порожньо"}]</strong></p>
          <p style={{ marginTop: "6px" }}>module.items напряму: <strong>{mode === "encapsulated" ? "undefined" : `[${(moduleRef.current as LeakyModule).items.join(", ")}]`}</strong></p>
        </div>
        <div className={styles.semanticBlock} style={{ marginTop: "10px" }}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Спробуй кнопки вище.</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "encapsulated"
          ? "getItems() повертає КОПІЮ масиву через [...items] — module.items узагалі не існує як властивість, тому спроба module.items.push(...) кидає реальну помилку (не можна викликати push на undefined)."
          : "items повернуто як пряме посилання на приватний масив всередині замикання — module.items.push(...) реально мутує internal стан модуля, повністю в обхід addItem()."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          mode === "encapsulated"
            ? `function createModule() {\n  let items = [];\n  return {\n    addItem: (item) => items.push(item),\n    getItems: () => [...items], // копія\n  };\n}`
            : `function createModule() {\n  const items = [];\n  return {\n    addItem: (item) => items.push(item),\n    items, // БАГ: пряме посилання\n  };\n}`
        }
      />

      <DemoKeyTakeaway>
        Публічний API модуля повинен повертати лише МЕТОДИ для роботи зі станом, ніколи сам приватний масив/обʼєкт
        напряму — інакше зовнішній код отримує реальну можливість змінювати internal дані в обхід контрольованих
        методів.
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
