import { useState } from "react";
import { DemoViewport, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "clamp, min і max": drag the frame-width slider and watch a
 * REAL clamp(1rem, 6cqw, 2.5rem) heading and a REAL width: min(90%, 260px)
 * bar respond live — both use container query units (cqw/%) tied to the
 * resizable frame itself (via container-type: inline-size), so the values
 * are genuinely computed by the browser, not simulated in JS.
 */
export function ClampMinMaxDemo() {
  const [width, setWidth] = useState(400);

  const clampZone = width <= 267 ? "мінімум (1rem)" : width >= 667 ? "максимум (2.5rem)" : "плавно росте (6cqw)";
  const minCapped = width * 0.9 >= 260;

  return (
    <div className={styles.demoStack}>
      <DemoViewport width={width} onWidthChange={setWidth} min={260} max={720}>
        <div className={styles.cmStage}>
          <h3 className={styles.cmHeading}>Кав&apos;ярня «Аромат»</h3>
          <div className={styles.cmMinBarTrack}>
            <div className={styles.cmMinBar} />
          </div>
          <span className={styles.cmMinBarNote}>
            width: min(90%, 260px) — зараз {minCapped ? "капіровано на 260px" : `≈${Math.round(width * 0.9)}px (90%)`}
          </span>
        </div>
      </DemoViewport>

      <DemoExplanation>
        Заголовок використовує font-size: clamp(1rem, 6cqw, 2.5rem) — зараз він у зоні: {clampZone}. Смужка
        нижче — справжній width: min(90%, 260px): на вузькому контейнері вона займає 90% ширини, а щойно 90%
        перевищує 260px, ширина фіксується на 260px і більше не росте.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`h3 {
  font-size: clamp(1rem, 6cqw, 2.5rem); /* зараз: ${clampZone} */
}

.bar {
  width: min(90%, 260px); /* зараз: ${minCapped ? "260px (капіровано)" : `${Math.round(width * 0.9)}px (90%)`} */
}`}
      />

      <DemoKeyTakeaway>
        clamp() тримає значення в межах мінімуму й максимуму, плавно масштабуючи його між ними — без жодного
        медіазапиту-"стрибка". min() просто обирає менше з двох значень, і саме тому ширина рано чи пізно
        перестає рости й "впирається" в фіксовану межу.
      </DemoKeyTakeaway>
    </div>
  );
}
