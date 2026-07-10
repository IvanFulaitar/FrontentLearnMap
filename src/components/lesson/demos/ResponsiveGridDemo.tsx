import { useState } from "react";
import { DemoViewport, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

const ITEMS = ["Латте", "Круасан", "Чізкейк"];

function columnsFor(width: number): 1 | 2 | 3 {
  if (width < 768) return 1;
  if (width < 1200) return 2;
  return 3;
}

/**
 * Live demo for "Mobile-first і медіазапити": drag the viewport-width
 * slider through the two real breakpoints the lesson teaches (768px,
 * 1200px) and watch the same menu grid genuinely reflow from 1 to 2 to 3
 * columns — the mobile-first base style plus min-width additions, made
 * visible rather than just described.
 */
export function ResponsiveGridDemo() {
  const [width, setWidth] = useState(600);
  const columns = columnsFor(width);

  return (
    <div className={styles.demoStack}>
      <DemoViewport width={width} onWidthChange={setWidth} min={320} max={1300}>
        <div className={styles.rgGrid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {ITEMS.map((item) => (
            <div className={styles.rgCard} key={item}>
              {item}
            </div>
          ))}
        </div>
      </DemoViewport>

      <DemoExplanation>
        {columns === 1
          ? `Ширина ${width}px — це базовий, mobile-first стиль без жодного медіазапиту: одна колонка.`
          : columns === 2
            ? `Ширина ${width}px перетнула @media (min-width: 768px) — додались 2 колонки поверх базового стилю.`
            : `Ширина ${width}px перетнула @media (min-width: 1200px) — додалась ще одна колонка, тепер їх 3.`}
      </DemoExplanation>

      <DemoCodeSnippet
        code={`.menu-grid {
  grid-template-columns: 1fr; /* база: телефон */
}

@media (min-width: 768px) {
  .menu-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1200px) {
  .menu-grid { grid-template-columns: repeat(3, 1fr); }
}

/* зараз активно: ${columns} ${columns === 1 ? "колонка" : "колонки"} */`}
      />

      <DemoKeyTakeaway>
        Кожен медіазапит лише ДОДАЄ стилі поверх базових — це і є суть mobile-first: почни з найвужчого екрана,
        потім розширюй, а не навпаки.
      </DemoKeyTakeaway>
    </div>
  );
}
