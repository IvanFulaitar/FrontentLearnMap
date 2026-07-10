import { useState } from "react";
import { DemoViewport, DemoControls, DemoSelect, DemoSlider, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Justify = "flex-start" | "center" | "space-between" | "space-around" | "space-evenly";

const ITEMS = ["Еспресо", "Капучино", "Лате", "Раф", "Чізкейк", "Круасан"];

/**
 * Live demo for "Вирівнювання, перенос і gap": drag the viewport-width
 * slider down and watch a real flex row genuinely wrap onto new lines
 * (flex-wrap: wrap) — the one behavior the shared flexbox-demo never
 * shows, since it always renders at full width. justify-content and gap
 * are also live so the two properties can be compared side by side.
 */
export function FlexWrapGapDemo() {
  const [width, setWidth] = useState(560);
  const [justify, setJustify] = useState<Justify>("flex-start");
  const [gap, setGap] = useState(12);

  return (
    <div className={styles.demoStack}>
      <DemoControls>
        <DemoSelect
          label="justify-content"
          value={justify}
          onChange={setJustify}
          options={[
            { value: "flex-start", label: "flex-start" },
            { value: "center", label: "center" },
            { value: "space-between", label: "space-between" },
            { value: "space-around", label: "space-around" },
            { value: "space-evenly", label: "space-evenly" },
          ]}
        />
        <DemoSlider label="gap" value={gap} onChange={setGap} min={0} max={32} unit="px" />
      </DemoControls>

      <DemoViewport width={width} onWidthChange={setWidth} min={280} max={720}>
        <div
          className={styles.fwRow}
          style={{ justifyContent: justify, gap: `${gap}px` }}
        >
          {ITEMS.map((item) => (
            <span key={item} className={styles.fwChip}>{item}</span>
          ))}
        </div>
      </DemoViewport>

      <DemoExplanation>
        Перетягни повзунок ширини вниз — коли 6 пунктів меню перестають вміщатися в один рядок, flex-wrap: wrap
        переносить зайві на новий рядок замість того, щоб стискати їх чи виштовхувати за межі контейнера. gap:{" "}
        {gap}px працює однаково і в межах рядка, і МІЖ рядками — це один із небагатьох способів отримати рівний
        вертикальний відступ між рядками flex-переносу без додаткового margin.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`.menu-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: ${justify};
  gap: ${gap}px;
}`}
      />

      <DemoKeyTakeaway>
        flex-wrap: wrap і gap — стандартна пара для рядів елементів, які повинні поводитись коректно на будь-якій
        ширині ще до написання жодного медіазапиту: gap лишається однаковим і в рядку, і між рядками переносу.
      </DemoKeyTakeaway>
    </div>
  );
}
