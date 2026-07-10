import { useState } from "react";
import { DemoSlider, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Одиниці виміру та CSS-змінні": drag the slider to change
 * the root (<html>) font-size — exactly like a user increasing text size
 * in browser settings for accessibility — and watch a real rem-sized box
 * scale live while a px-sized box next to it stays frozen.
 */
export function UnitsDemo() {
  const [rootFontSize, setRootFontSize] = useState(16);

  const remPixels = Math.round(2 * rootFontSize);

  return (
    <div className={styles.demoStack}>
      <DemoSlider
        label="Розмір шрифту браузера (html { font-size })"
        value={rootFontSize}
        onChange={setRootFontSize}
        min={12}
        max={32}
        unit="px"
      />

      <DemoPreview label="Тягни повзунок — так поводиться сайт, коли користувач збільшує шрифт у налаштуваннях браузера">
        <div className={styles.unRow}>
          <div className={styles.unBox} style={{ fontSize: `${remPixels}px` }}>
            2rem
            <span className={styles.unBoxNote}>{remPixels}px зараз</span>
          </div>
          <div className={styles.unBox} style={{ fontSize: "32px" }}>
            32px
            <span className={styles.unBoxNote}>завжди 32px</span>
          </div>
        </div>
      </DemoPreview>

      <DemoExplanation>
        html { "{"} font-size: {rootFontSize}px {"}"} — так поводиться браузер, коли користувач змінює масштаб тексту
        в налаштуваннях. Блок у 2rem зараз має {remPixels}px, бо rem завжди рахується від кореневого html. Блок у
        32px лишається рівно 32px незалежно від повзунка — фіксовані пікселі ніколи не реагують на налаштування
        користувача.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`html {
  font-size: ${rootFontSize}px; /* зазвичай 16px, тут — умовне налаштування користувача */
}

.rem-box {
  font-size: 2rem; /* = ${remPixels}px при поточному html font-size */
}

.px-box {
  font-size: 32px; /* завжди 32px, ігнорує налаштування користувача */
}`}
      />

      <DemoKeyTakeaway>
        rem — це не "просто інша одиниця", а спосіб поважати вибір користувача: якщо хтось збільшує шрифт браузера
        для кращої читабельності, весь текст у rem виросте разом з ним, а текст у px залишиться того самого розміру
        і може стати відносно замалим.
      </DemoKeyTakeaway>
    </div>
  );
}
