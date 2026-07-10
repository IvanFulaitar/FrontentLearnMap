import { useEffect, useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "figure" | "details" | "dialog";

const CODE: Record<Mode, string> = {
  figure: `<figure>\n  <img src="interior.jpg" alt="Зал кав'ярні" width="640" height="420" />\n  <figcaption>Наш зал вранці, до відкриття</figcaption>\n</figure>`,
  details: `<details>\n  <summary>Чи є Wi-Fi?</summary>\n  <p>Так, безкоштовний для всіх відвідувачів.</p>\n</details>`,
  dialog: `<dialog id="welcome">\n  <p>Замовлення оформлено.</p>\n  <button onclick="this.closest('dialog').close()">Закрити</button>\n</dialog>\n<button onclick="welcome.showModal()">Відкрити</button>`,
};

const EXPLANATION: Record<Mode, string> = {
  figure: "figcaption зв'язує підпис саме із цим зображенням — це не просто <p> поруч, а семантично пов'язана пара.",
  details: "Клікни на питання нижче — блок розкривається без жодного рядка JavaScript, це вбудована браузером поведінка.",
  dialog: "Натисни «Відкрити» — це РЕАЛЬНИЙ елемент <dialog>, викликаний через showModal(): фон блокується, Esc закриває.",
};

/**
 * Live demo for "Figure, figcaption, details, summary і dialog": all three
 * behaviors are real, native browser behavior rather than divs simulating
 * state — a real <details> toggles on click, and a real <dialog> opens as a
 * true modal via showModal()/close(), backdrop included.
 */
export function FigureDetailsDialogDemo() {
  const [mode, setMode] = useState<Mode>("figure");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (mode !== "dialog") {
      dialogRef.current?.close();
    }
  }, [mode]);

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "figure", label: "figure + figcaption" },
          { value: "details", label: "details + summary" },
          { value: "dialog", label: "dialog" },
        ]}
        value={mode}
        onChange={(value) => setMode(value as Mode)}
      />

      <DemoPreview>
        {mode === "figure" ? (
          <figure className={styles.semanticBlock}>
            <div className={styles.brokenImageBox} style={{ width: 240, height: 150 }}>
              <span className={styles.brokenImageIcon} aria-hidden="true">
                🖼️
              </span>
            </div>
            <figcaption>Наш зал вранці, до відкриття</figcaption>
          </figure>
        ) : null}

        {mode === "details" ? (
          <details className={styles.semanticBlock}>
            <summary>Чи є Wi-Fi?</summary>
            <p>Так, безкоштовний для всіх відвідувачів.</p>
          </details>
        ) : null}

        {mode === "dialog" ? (
          <div className={styles.semanticBlock}>
            <button type="button" onClick={() => dialogRef.current?.showModal()}>
              Відкрити
            </button>
            <dialog ref={dialogRef} className={styles.demoDialog}>
              <p>Замовлення оформлено.</p>
              <button type="button" onClick={() => dialogRef.current?.close()}>
                Закрити
              </button>
            </dialog>
          </div>
        ) : null}
      </DemoPreview>

      <DemoExplanation>{EXPLANATION[mode]}</DemoExplanation>

      <DemoCodeSnippet code={CODE[mode]} />

      <DemoKeyTakeaway>
        Усі три елементи дають готову поведінку без JavaScript (figure/figcaption — семантичний зв'язок, details —
        розкриття) або з мінімумом JS (dialog.showModal()). Спробуй кожен режим вище — це справжня, а не імітована
        поведінка браузера.
      </DemoKeyTakeaway>
    </div>
  );
}
