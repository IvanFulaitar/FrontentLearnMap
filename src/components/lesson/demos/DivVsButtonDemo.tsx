import { useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Семантика як основа доступності": a real `<div onClick>`
 * (no tabindex, no keyboard handling — same bug as the lesson's
 * dontDoThis) next to a real `<button>`. Both respond to a real mouse
 * click; only Tab + Enter/Space reveals the actual difference, because
 * this is genuine browser focus/keyboard behavior, not a simulation.
 */
export function DivVsButtonDemo() {
  const [divCount, setDivCount] = useState(0);
  const [buttonCount, setButtonCount] = useState(0);

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Клікни в цей блок разів, а тоді спробуй дійти сюди тільки клавішею Tab і натиснути Enter або Space">
        <div className={styles.dvbRow}>
          <div className={styles.dvbCard}>
            <p className={styles.lpCaption}>{"<div onClick>"}</p>
            <div className={styles.dvbFakeButton} onClick={() => setDivCount((c) => c + 1)}>
              Купити
            </div>
            <p className={styles.lpHint}>Клік мишею: {divCount}. Спробуй Tab + Enter — нічого не станеться.</p>
          </div>

          <div className={styles.dvbCard}>
            <p className={styles.lpCaption}>{"<button>"}</p>
            <button type="button" className={styles.dvbRealButton} onClick={() => setButtonCount((c) => c + 1)}>
              Купити
            </button>
            <p className={styles.lpHint}>Клік мишею: {buttonCount}. Tab + Enter/Space теж працює.</p>
          </div>
        </div>
      </DemoPreview>

      <DemoExplanation>
        Обидва елементи виглядають однаково і реагують на клік мишею. Різниця — у клавіатурі: спробуй натиснути Tab
        кілька разів від початку цього демо. Фокус узагалі пропускає ліву картку (у div немає tabindex), а на правій
        зупиняється — і Enter чи Space там реально спрацьовує, бо це вбудована поведінка справжнього button.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Це не ілюстрація — це справжня клавіатурна навігація браузера прямо зараз. Саме тому в реальному коді
        div role="button" tabindex="0" onclick — це лише половина рішення: role і tabindex є, а обробки Enter/Space
        усе одно нема без додаткового JavaScript.
      </DemoKeyTakeaway>
    </div>
  );
}
