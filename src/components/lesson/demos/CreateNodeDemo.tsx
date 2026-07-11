import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "createElement" | "innerHtmlBug";

const items = ["Книга", "Ручка", "Зошит"];

/**
 * Live demo for "Створення DOM-вузлів": renders REAL <li> elements into an
 * actual DOM list via a ref, toggling between document.createElement +
 * appendChild (each click adds one genuine new node) and the innerHTML +=
 * bug (each click genuinely re-parses the whole list, which we surface by
 * counting real re-parses).
 */
export function CreateNodeDemo() {
  const listRef = useRef<HTMLUListElement>(null);
  const [mode, setMode] = useState<Mode>("createElement");
  const [addedCount, setAddedCount] = useState(0);
  const [reparseCount, setReparseCount] = useState(0);

  const addItem = () => {
    const list = listRef.current;
    if (!list) return;
    const nextItem = items[addedCount % items.length];

    if (mode === "createElement") {
      const li = document.createElement("li");
      li.textContent = `${nextItem} (createElement)`;
      list.appendChild(li);
    } else {
      // Genuine bug: this REALLY re-parses the whole innerHTML, destroying
      // and recreating every existing <li>, not a described simulation.
      list.innerHTML += `<li>${nextItem} (innerHTML+=)</li>`;
      setReparseCount((n) => n + 1);
    }
    setAddedCount((n) => n + 1);
  };

  const reset = () => {
    const list = listRef.current;
    if (list) list.innerHTML = "";
    setAddedCount(0);
    setReparseCount(0);
  };

  const codeFor: Record<Mode, string> = {
    createElement: `const li = document.createElement("li");\nli.textContent = "${items[addedCount % items.length]}";\nlist.appendChild(li);\n// існуючі <li> НЕ торкаються — додається лише новий вузол`,
    innerHtmlBug: `list.innerHTML += "<li>${items[addedCount % items.length]}</li>";\n// БАГ: перепарсює ВЕСЬ список — усі попередні <li> знищуються й створюються заново\n// реальних перепарсингів за цю сесію: ${reparseCount}`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Спосіб додавання</span>
          <DemoToolbar
            options={[
              { value: "createElement", label: "createElement + appendChild" },
              { value: "innerHtmlBug", label: "БАГ: innerHTML +=" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              reset();
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальний DOM-список — кожен клік додає справжній вузол">
        <ul ref={listRef} style={{ margin: 0, paddingLeft: "20px" }} />
      </DemoPreview>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={addItem}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--primary)",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Додати товар
        </button>
        <button
          type="button"
          onClick={reset}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Очистити
        </button>
      </div>

      <DemoExplanation>
        {mode === "createElement"
          ? "createElement створює новий вузол у памʼяті, а appendChild додає ЛИШЕ його — попередні <li> залишаються тими самими вузлами, без перебудови."
          : `innerHTML += реально перепарсює ВЕСЬ вміст списку на кожному кліку — станом на зараз відбулось ${reparseCount} повних перепарсингів усього списку, навіть для елементів, доданих раніше.`}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        createElement + appendChild додає рівно ОДИН новий вузол за раз. innerHTML += перебудовує ВЕСЬ контейнер
        щоразу — повільніше й руйнує стан (фокус, обробники подій) уже існуючих елементів.
      </DemoKeyTakeaway>
    </div>
  );
}
