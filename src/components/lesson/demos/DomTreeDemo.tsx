import { useState } from "react";
import { DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type NodeId = "body" | "h1" | "p" | "button";

const NODE_INFO: Record<NodeId, { tag: string; text: string; note: string }> = {
  body: { tag: "body", text: "(батьківський вузол)", note: "Батько для h1, p і button — саме до нього вони всі \"приєднані\" в дереві." },
  h1: { tag: "h1", text: "Кав'ярня «Аромат»", note: "Текстовий вузол усередині h1 — саме його міняє textContent у прикладі нижче." },
  p: { tag: "p", text: "Смачна кава з 8:00", note: "Звичайний абзац — окремий незалежний вузол-сусід (sibling) для h1 і button." },
  button: { tag: "button", text: "Купити", note: "На цей вузол у реальному коді вішають addEventListener(\"click\", ...)." },
};

/**
 * Live demo for "Що таке DOM": click a node in a simplified tree to
 * inspect it (tag/text/note), and click a separate button to genuinely
 * mutate the previewed h1's text — mirroring the lesson's own
 * `textContent` example, but as something the student actually triggers
 * instead of only reading about.
 */
export function DomTreeDemo() {
  const [selected, setSelected] = useState<NodeId>("h1");
  const [titleChanged, setTitleChanged] = useState(false);
  const info = NODE_INFO[selected];

  return (
    <div className={styles.demoStack}>
      <div className={styles.domLayout}>
        <div className={styles.domTree}>
          <button type="button" className={`${styles.domNode} ${selected === "body" ? styles.domNodeActive : ""}`} onClick={() => setSelected("body")}>
            body
          </button>
          <button type="button" className={`${styles.domNode} ${styles.domNodeChild} ${selected === "h1" ? styles.domNodeActive : ""}`} onClick={() => setSelected("h1")}>
            h1
          </button>
          <button type="button" className={`${styles.domNode} ${styles.domNodeChild} ${selected === "p" ? styles.domNodeActive : ""}`} onClick={() => setSelected("p")}>
            p
          </button>
          <button type="button" className={`${styles.domNode} ${styles.domNodeChild} ${selected === "button" ? styles.domNodeActive : ""}`} onClick={() => setSelected("button")}>
            button
          </button>
        </div>

        <div className={styles.domPreview}>
          <h1 style={{ margin: 0, fontSize: "1.1rem" }}>{titleChanged ? "Ласкаво просимо!" : "Кав'ярня «Аромат»"}</h1>
          <p style={{ margin: 0 }}>Смачна кава з 8:00</p>
          <button type="button" className={styles.domPreviewButton} onClick={() => setTitleChanged((value) => !value)}>
            {titleChanged ? "Повернути h1.textContent" : "Симулювати h1.textContent = ..."}
          </button>
          <p className={styles.domInfo}>
            Обраний вузол: {info.tag} → "{info.text}"
          </p>
        </div>
      </div>

      <DemoExplanation>{info.note}</DemoExplanation>

      <DemoCodeSnippet
        code={`document.getElementById("title").textContent =
  "${titleChanged ? "Ласкаво просимо!" : "Кав'ярня «Аромат»"}";

// вихідний HTML-файл при цьому НЕ змінюється —
// змінюється лише DOM у пам'яті браузера`}
      />

      <DemoKeyTakeaway>
        DOM — це не сам HTML-файл, а жива структура вузлів (Node) у пам'яті браузера. Клік по кнопці вище викликає
        рівно те саме, що робить document.getElementById(...).textContent у реальному JavaScript: змінюється те, що
        бачить користувач, а файл на диску лишається незмінним.
      </DemoKeyTakeaway>
    </div>
  );
}
