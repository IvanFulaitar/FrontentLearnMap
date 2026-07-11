import { useState } from "react";
import { DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Події input і change": a real <textarea> with both real
 * input and change listeners counting genuine firings separately, plus a
 * real checkbox proving change fires immediately for it (no blur needed) —
 * all counts come from actual browser events, not simulated timers.
 */
export function InputChangeDemo() {
  const [text, setText] = useState("");
  const [inputCount, setInputCount] = useState(0);
  const [changeCount, setChangeCount] = useState(0);
  const [lastChangeValue, setLastChangeValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkboxChangeCount, setCheckboxChangeCount] = useState(0);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
    setInputCount((c) => c + 1);
  };

  const handleChange = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setChangeCount((c) => c + 1);
    setLastChangeValue(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setCheckboxChangeCount((c) => c + 1);
  };

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Реальне текстове поле — набирай текст, потім клацни поза полем">
        <textarea
          value={text}
          onInput={handleInput}
          onBlur={handleChange}
          placeholder="Набирай тут..."
          rows={3}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            fontSize: "1rem",
            fontFamily: "inherit",
          }}
        />
      </DemoPreview>

      <div className={styles.semanticBlock}>
        <p style={{ margin: "2px 0" }}>
          Спрацювань <strong>input</strong>: <strong>{inputCount}</strong> (на кожен символ)
        </p>
        <p style={{ margin: "2px 0" }}>
          Спрацювань <strong>change</strong>: <strong>{changeCount}</strong> (лише при втраті фокусу)
        </p>
        {lastChangeValue && (
          <p style={{ margin: "2px 0", color: "var(--muted)" }}>
            Останнє зафіксоване change-значення: &quot;{lastChangeValue}&quot;
          </p>
        )}
      </div>

      <DemoPreview label="Реальний checkbox — change спрацьовує миттєво, без blur">
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
          Я погоджуюсь
        </label>
        <p style={{ margin: "6px 0 0" }}>
          change для checkbox спрацював <strong>{checkboxChangeCount}</strong> раз(и) — миттєво, без втрати фокусу
        </p>
      </DemoPreview>

      <DemoExplanation>
        Лічильник input росте на КОЖЕН символ під час набору. Лічильник change для textarea росте лише коли поле
        втрачає фокус (клацни поза текстовим полем, щоб побачити). Для checkbox change натомість спрацьовує одразу.
      </DemoExplanation>

      <DemoCodeSnippet code={`textarea.addEventListener("input", () => {\n  // спрацьовує на КОЖЕН символ\n});\ntextarea.addEventListener("change", () => {\n  // спрацьовує лише при втраті фокусу (blur)\n});`} />

      <DemoKeyTakeaway>
        input — миттєво на кожну зміну значення. change — при фіксації значення: blur для тексту, одразу для
        checkbox/radio/select.
      </DemoKeyTakeaway>
    </div>
  );
}
