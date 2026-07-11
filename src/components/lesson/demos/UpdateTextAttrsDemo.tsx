import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "textContent" | "innerHTML";

const userInput = "<b>Небезпечний</b> текст";

/**
 * Live demo for "Оновлення тексту й атрибутів": writes the SAME string
 * containing real HTML tags into an actual DOM node via either
 * textContent or innerHTML, then reads back the real rendered result —
 * proving live whether the tags rendered or showed as literal text.
 */
export function UpdateTextAttrsDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("textContent");
  const [rendered, setRendered] = useState(false);

  const apply = () => {
    const box = boxRef.current;
    if (!box) return;
    if (mode === "textContent") {
      box.textContent = userInput;
    } else {
      box.innerHTML = userInput;
    }
    setRendered(true);
  };

  const codeFor: Record<Mode, string> = {
    textContent: `box.textContent = "${userInput}";\n// теги показуються буквально, як текст`,
    innerHTML: `box.innerHTML = "${userInput}";\n// теги РОЗПАРСОВУЮТЬСЯ і рендеряться як реальні елементи`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Спосіб запису</span>
          <DemoToolbar
            options={[
              { value: "textContent", label: "textContent (безпечно)" },
              { value: "innerHTML", label: "innerHTML (ризик)" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setRendered(false);
              if (boxRef.current) boxRef.current.textContent = "";
            }}
          />
        </div>
      </div>

      <DemoPreview label={`Реальний вміст DOM-вузла після box.${mode} = "${userInput}"`}>
        <div
          ref={boxRef}
          className={styles.semanticBlock}
          style={{ minHeight: "24px" }}
        />
      </DemoPreview>

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
          width: "fit-content",
        }}
      >
        Записати вхідний рядок
      </button>

      {rendered && (
        <DemoExplanation>
          {mode === "textContent"
            ? "textContent екранує < і > — тег <b> показується буквально як текст \"<b>Небезпечний</b>\", а не як жирне слово."
            : "innerHTML РОЗПАРСОВУЄ рядок як реальний HTML — тег <b> справді рендериться, і слово \"Небезпечний\" стає жирним. Для недовіреного тексту користувача це реальний XSS-ризик."}
        </DemoExplanation>
      )}

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        textContent завжди безпечний для недовіреного тексту — теги ніколи не рендеряться. innerHTML рендерить
        теги як реальні елементи, тому підходить лише для заздалегідь довіреної розмітки.
      </DemoKeyTakeaway>
    </div>
  );
}
