import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Style = "default" | "branded";

/**
 * Live demo for "Стилізація форми бронювання": toggle real browser-default
 * vs branded styling on real input/select/textarea. The select is a genuine
 * native dropdown (click to open, pick an option) and the textarea has real
 * resize: vertical you can drag by its corner handle — actual browser
 * interactions, not an illustration of them.
 */
export function FieldStylingDemo() {
  const [style, setStyle] = useState<Style>("default");
  const branded = style === "branded";

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "default", label: "Браузер за замовчуванням" },
          { value: "branded", label: "Стилізовано під бренд" },
        ]}
        value={style}
        onChange={(value) => setStyle(value as Style)}
      />

      <DemoPreview label="Справжні поля — обери опцію в select і потягни за нижній правий кут textarea">
        <div className={styles.fsStage}>
          <label className={styles.fsLabel} htmlFor="demo-field-name">
            Ваше ім'я
          </label>
          <input
            id="demo-field-name"
            className={branded ? styles.fsBranded : styles.fsUnstyled}
            placeholder="Ваше ім'я"
          />

          <label className={styles.fsLabel} htmlFor="demo-field-select">
            Напій
          </label>
          <select
            id="demo-field-select"
            className={branded ? `${styles.fsBranded} ${styles.fsSelectBranded}` : styles.fsUnstyled}
          >
            <option>Латте</option>
            <option>Капучино</option>
            <option>Американо</option>
          </select>

          <label className={styles.fsLabel} htmlFor="demo-field-textarea">
            Коментар (можна потягти за кут)
          </label>
          <textarea
            id="demo-field-textarea"
            className={branded ? `${styles.fsBranded} ${styles.fsTextareaBranded}` : styles.fsUnstyled}
            placeholder="Побажання до замовлення..."
          />
        </div>
      </DemoPreview>

      <DemoExplanation>
        {branded
          ? "font: inherit, однаковий border-radius і padding роблять усі три поля частиною дизайну сайту. У select прибрано системну стрілку (appearance: none) і намальовано власну через background-image."
          : "Це справжній вигляд браузера за замовчуванням: своя стрілка select, свій шрифт, гострі кути — жодне з трьох полів не схоже на решту сайту кав'ярні."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          branded
            ? `input, select, textarea {\n  font: inherit;\n  padding: 10px 12px;\n  border-radius: 8px;\n}\n\nselect {\n  appearance: none;\n  background-image: linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%);\n}\n\ntextarea {\n  resize: vertical;\n  min-height: 80px;\n}`
            : `/* без жодного стилю — кожен браузер і кожна ОС малюють поля по-своєму */`
        }
      />

      <DemoKeyTakeaway>
        Потягни за нижній правий кут textarea вище — resize: vertical дозволяє зробити поле вищим, не ламаючи
        ширину форми. Це справжня поведінка браузера, а не намальована ілюстрація.
      </DemoKeyTakeaway>
    </div>
  );
}
