import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "classListAdd" | "classNameBug";

/**
 * Live demo for "Оновлення класів і стилів": mutates a REAL DOM element's
 * className via classList.add (safe) or direct className assignment (the
 * genuine bug that wipes existing classes) — the displayed className string
 * is read back from the actual DOM node after each real mutation.
 */
export function UpdateClassesStylesDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("classListAdd");
  const [currentClassName, setCurrentClassName] = useState("card product-card");
  const [applied, setApplied] = useState(false);

  const reset = () => {
    const card = cardRef.current;
    if (card) {
      card.className = "card product-card";
      setCurrentClassName(card.className);
    }
    setApplied(false);
  };

  const apply = () => {
    const card = cardRef.current;
    if (!card) return;
    if (mode === "classListAdd") {
      card.classList.add("featured");
    } else {
      // Genuine bug: this really wipes card/product-card, not simulated
      card.className = "featured";
    }
    setCurrentClassName(card.className);
    setApplied(true);
  };

  const codeFor: Record<Mode, string> = {
    classListAdd: `card.classList.add("featured");\n// className стає: "${applied ? currentClassName : "card product-card featured"}"`,
    classNameBug: `card.className = "featured"; // БАГ!\n// className стає: "${applied ? currentClassName : "featured"}" — card і product-card ЗНИКЛИ`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Додавання класу</span>
          <DemoToolbar
            options={[
              { value: "classListAdd", label: "classList.add('featured')" },
              { value: "classNameBug", label: "БАГ: className = 'featured'" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              reset();
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальна картка — стилі card і product-card задають базовий вигляд">
        <div
          ref={cardRef}
          className="card product-card"
          style={{
            padding: "16px",
            borderRadius: "8px",
            border: applied && mode === "classNameBug" ? "1px dashed #c0392b" : "1px solid var(--border)",
            background: applied && mode === "classNameBug" ? "transparent" : "var(--surface)",
          }}
        >
          Товар
        </div>
      </DemoPreview>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={apply}
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
          Позначити як featured
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
          Скинути
        </button>
      </div>

      <DemoPreview label="Реальний card.className після операції">
        <div className={styles.semanticBlock}>
          <code style={{ color: applied && mode === "classNameBug" ? "#c0392b" : "#2e7d32" }}>
            "{currentClassName}"
          </code>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "classListAdd"
          ? "classList.add(\"featured\") додає лише цей клас — card і product-card залишаються на місці, тому базові стилі картки не зникають."
          : "className = \"featured\" ПОВНІСТЮ перезаписує атрибут class — card і product-card реально зникають, і картка (як бачиш вище) втрачає базове оформлення."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        classList.add/remove/toggle керують ОКРЕМИМ класом безпечно. Пряме присвоєння className повністю
        замінює весь атрибут class — легко ненавмисно знищити базові стилі елемента.
      </DemoKeyTakeaway>
    </div>
  );
}
