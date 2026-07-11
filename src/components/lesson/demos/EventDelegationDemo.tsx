import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "direct" | "delegated";

let itemCounter = 0;

/**
 * Live demo for "Делегування подій": attaches REAL click listeners either
 * directly to each existing .todo-item (the bug — new items genuinely get
 * no listener) or once on the parent via event delegation (new items
 * genuinely respond) — clicking a real dynamically-added item proves the
 * difference live, not a described outcome.
 */
export function EventDelegationDemo() {
  const listRef = useRef<HTMLUListElement>(null);
  const [mode, setMode] = useState<Mode>("direct");
  const [log, setLog] = useState<string[]>([]);
  const delegatedHandlerAttached = useRef(false);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 4));

  const attachDirectHandler = (li: HTMLLIElement) => {
    li.addEventListener("click", () => {
      addLog(`Клік на "${li.textContent}" — обробник СПРАЦЮВАВ (прямий)`);
    });
  };

  const setupList = () => {
    const list = listRef.current;
    if (!list) return;
    list.innerHTML = "";
    itemCounter = 0;
    delegatedHandlerAttached.current = false;

    ["Купити хліб", "Помити посуд"].forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      li.style.padding = "6px 10px";
      li.style.borderBottom = "1px solid var(--border)";
      li.style.cursor = "pointer";
      list.appendChild(li);
      if (mode === "direct") {
        attachDirectHandler(li);
      }
    });

    if (mode === "delegated" && !delegatedHandlerAttached.current) {
      list.addEventListener("click", (event) => {
        const li = (event.target as HTMLElement).closest("li");
        if (li) {
          addLog(`Клік на "${li.textContent}" — обробник СПРАЦЮВАВ (делегування)`);
        }
      });
      delegatedHandlerAttached.current = true;
    }
  };

  const addNewItem = () => {
    const list = listRef.current;
    if (!list) return;
    itemCounter += 1;
    const li = document.createElement("li");
    li.textContent = `Новий пункт ${itemCounter}`;
    li.style.padding = "6px 10px";
    li.style.borderBottom = "1px solid var(--border)";
    li.style.cursor = "pointer";
    li.style.background = "var(--primary-soft)";
    list.appendChild(li);
    // Genuinely does NOT attach a handler in "direct" mode — that's the bug
    if (mode === "delegated") {
      addLog(`Додано "${li.textContent}" — делегований обробник на #list вже покриває його`);
    } else {
      addLog(`Додано "${li.textContent}" — БЕЗ обробника (клік на ньому нічого не зробить)`);
    }
  };

  const codeFor: Record<Mode, string> = {
    direct: `list.querySelectorAll("li").forEach((li) => {\n  li.addEventListener("click", handleClick);\n});\n// новий li, доданий ПІЗНІШЕ — без обробника`,
    delegated: `list.addEventListener("click", (event) => {\n  const li = event.target.closest("li");\n  if (li) handleClick(li);\n});\n// новий li автоматично покритий цим самим обробником`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Спосіб обробки кліків</span>
          <DemoToolbar
            options={[
              { value: "direct", label: "БАГ: обробник на кожному li" },
              { value: "delegated", label: "Делегування: один обробник на #list" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setLog([]);
              setTimeout(setupList, 0);
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальний список — клікай на пунктах">
        <ul ref={listRef} style={{ margin: 0, padding: 0, listStyle: "none" }} />
      </DemoPreview>

      <button
        type="button"
        onClick={addNewItem}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          border: "1px solid var(--border)",
          background: "var(--primary)",
          color: "white",
          fontWeight: 600,
          cursor: "pointer",
          width: "fit-content",
        }}
      >
        Додати новий пункт динамічно
      </button>

      <DemoPreview label="Журнал реальних кліків (найновіший зверху)">
        <div className={styles.semanticBlock}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Клацни на пункт списку чи додай новий, потім клацни на нього.</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "direct"
          ? "Обробники прикріплені ІНДИВІДУАЛЬНО до елементів, що існували на момент setupList(). Новий пункт, доданий пізніше, реально НЕ має обробника — клік на ньому нічого не логує."
          : "Один обробник на #list слухає спливання подій від БУДЬ-якого нащадка, включно з тими, що зʼявляться пізніше — новий пункт автоматично реагує на клік без додаткового коду."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        Делегування (один обробник на батьку + event.target.closest) автоматично покриває майбутні, динамічно
        додані елементи — на відміну від прямих обробників, прикріплених лише до елементів, що вже існували.
      </DemoKeyTakeaway>
    </div>
  );
}
