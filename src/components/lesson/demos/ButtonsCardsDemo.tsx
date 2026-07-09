import { useState } from "react";
import { DemoSection, DemoControls, DemoSelect, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type ButtonState = "normal" | "disabled";

function buildExplanation(buttonState: ButtonState): string {
  if (buttonState === "disabled") {
    return "Кнопка тепер disabled: opacity знижена, cursor: not-allowed, і hover/active стилі більше не спрацьовують — саме так користувач розуміє, що дія недоступна.";
  }
  return "Наведи мишку на кнопку (hover), натисни Tab, щоб побачити focus-visible, і клікни для active. Наведи на посилання зі стрілкою й на підкреслене посилання — обидва ефекти через ::after. Наведи на картку — вона піднімається, а значок «Хіт» — теж ::after.";
}

/**
 * Live demo for the "Кнопки і картки" module: real interactive button
 * states (hover/focus-visible/active/disabled), a hover-underline link and
 * an arrow link built with ::after, and a menu-card with hover lift plus a
 * pseudo-element badge — all genuinely live CSS, nothing illustrated.
 */
export function ButtonsCardsDemo() {
  const [buttonState, setButtonState] = useState<ButtonState>("normal");

  return (
    <DemoSection>
      <DemoControls>
        <DemoSelect
          label="Стан кнопки"
          value={buttonState}
          onChange={(value) => setButtonState(value as ButtonState)}
          options={[
            { value: "normal", label: "Активна" },
            { value: "disabled", label: "Disabled" },
          ]}
        />
      </DemoControls>

      <DemoPreview>
        <div className={styles.bcStage}>
          <div className={styles.bcRow}>
            <button type="button" className={styles.bcButton} disabled={buttonState === "disabled"}>
              Забронювати столик
            </button>
            <a className={styles.bcArrowLink} href="#menu">Переглянути меню</a>
            <a className={styles.bcUnderlineLink} href="#contacts">Як нас знайти</a>
          </div>
          <div className={styles.bcRow}>
            <div className={styles.bcCard}>
              <strong>Капучино</strong>
              <span>75 грн</span>
            </div>
          </div>
        </div>
      </DemoPreview>

      <DemoExplanation>{buildExplanation(buttonState)}</DemoExplanation>

      <DemoCodeSnippet
        code={
          buttonState === "disabled"
            ? `.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`
            : `.link-arrow::after {
  content: "→";
  transition: transform 150ms ease;
}
.link-arrow:hover::after {
  transform: translateX(4px);
}

.link-underline::after {
  content: "";
  transform: scaleX(0);
  transition: transform 200ms ease;
}
.link-underline:hover::after {
  transform: scaleX(1);
}

.menu-card::after {
  content: "Хіт";
  position: absolute;
  top: -8px;
  right: -8px;
}`
        }
      />

      <DemoKeyTakeaway>
        Стрілка, підкреслення й значок «Хіт» — це не окремі HTML-елементи, а ::after псевдоелементи.
        Наведи мишку на кожен елемент вище, щоб побачити, як CSS-стан керує тим, що взагалі не існує в розмітці.
      </DemoKeyTakeaway>
    </DemoSection>
  );
}
