import { useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Структура форми та підписи": two REAL fields side by side —
 * one with only a placeholder, one with a genuine <label htmlFor>. Type in
 * both to see the placeholder vanish (real browser behavior, not scripted)
 * and click the label text to see focus really jump into its input.
 */
export function LabelPlaceholderDemo() {
  const [placeholderValue, setPlaceholderValue] = useState("");
  const [labelValue, setLabelValue] = useState("");

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Друкуй в обидва поля — і клікни на підпис «Ім'я» праворуч">
        <div className={styles.lpRow}>
          <div className={styles.lpField}>
            <p className={styles.lpCaption}>Тільки placeholder</p>
            <input
              className={styles.lpInput}
              placeholder="Ім'я"
              value={placeholderValue}
              onChange={(event) => setPlaceholderValue(event.target.value)}
            />
            <p className={styles.lpHint}>
              {placeholderValue ? "Підказка зникла — тепер незрозуміло, що це було за поле." : "Підказка видна, поки поле порожнє."}
            </p>
          </div>

          <div className={styles.lpField}>
            <p className={styles.lpCaption}>label + input</p>
            <label className={styles.lpLabel} htmlFor="demo-label-name">
              Ім'я
            </label>
            <input
              id="demo-label-name"
              className={styles.lpInput}
              value={labelValue}
              onChange={(event) => setLabelValue(event.target.value)}
            />
            <p className={styles.lpHint}>Підпис лишається видимим, скільки б тексту не було введено.</p>
          </div>
        </div>
      </DemoPreview>

      <DemoExplanation>
        Клік по слову «Ім'я» зліва ні на що не впливає — це просто текст, не зв'язаний з полем. Клік по «Ім'я»
        праворуч ставить фокус у сусідній input, бо for="demo-label-name" зв'язує його саме з тим id — це справжня
        поведінка браузера, а не намальована ілюстрація.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Введи кілька символів у ліве поле — підказка зникає без сліду. Праве поле показує те саме ім'я і в
        підписі, і у введеному тексті одночасно — саме тому label, а не placeholder, є офіційною назвою поля.
      </DemoKeyTakeaway>
    </div>
  );
}
