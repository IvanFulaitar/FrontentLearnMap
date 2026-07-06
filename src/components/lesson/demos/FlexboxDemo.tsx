import { useState } from "react";
import { DemoSection, DemoControls, DemoSelect, DemoSlider, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, DemoHighlight, DemoAxis } from "./framework";
import styles from "./demos.module.css";

type Direction = "row" | "column";
type Justify = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
type Align = "flex-start" | "center" | "flex-end" | "stretch";

const SPACE_JUSTIFY_VALUES: Justify[] = ["space-between", "space-around", "space-evenly"];

function buildExplanation(direction: Direction, justify: Justify, align: Align, gap: number): string {
  const axisWord = direction === "row" ? "горизонтальна (зліва направо)" : "вертикальна (згори вниз)";
  let sentence = `Головна вісь зараз ${axisWord}: justify-content: ${justify} вирівнює елементи вздовж неї, align-items: ${align} — впоперек.`;
  if (SPACE_JUSTIFY_VALUES.includes(justify) && gap > 0) {
    sentence += ` Через "${justify}" вільний простір контейнера й так розподіляється між елементами — тому зміна gap (зараз ${gap}px) може бути малопомітною: "${justify}" вже додає значно більший відступ, а gap лише встановлює мінімум.`;
  } else {
    sentence += ` gap: ${gap}px — чистий, завжди присутній відступ між елементами.`;
  }
  return sentence;
}

/**
 * Live Flexbox demo: a realistic café nav bar (logo + 3 links + a CTA
 * button) whose layout is fully driven by React state. Changing a control
 * re-renders the SAME real HTML/CSS, not an illustration — students see the
 * actual browser result update as they experiment.
 *
 * Default justify-content is "flex-start" (not "space-between") on purpose:
 * with space-between as the starting point, gap's own effect is masked by
 * the much larger space-between distribution, and the gap slider looks
 * broken on first load. flex-start shows gap's effect immediately.
 */
export function FlexboxDemo() {
  const [direction, setDirection] = useState<Direction>("row");
  const [justify, setJustify] = useState<Justify>("flex-start");
  const [align, setAlign] = useState<Align>("center");
  const [gap, setGap] = useState(16);

  return (
    <DemoSection>
      <DemoControls>
        <DemoSelect
          label="flex-direction"
          value={direction}
          onChange={setDirection}
          options={[
            { value: "row", label: "row" },
            { value: "column", label: "column" },
          ]}
        />
        <DemoSelect
          label="justify-content"
          value={justify}
          onChange={setJustify}
          options={[
            { value: "flex-start", label: "flex-start" },
            { value: "center", label: "center" },
            { value: "flex-end", label: "flex-end" },
            { value: "space-between", label: "space-between" },
            { value: "space-around", label: "space-around" },
            { value: "space-evenly", label: "space-evenly" },
          ]}
        />
        <DemoSelect
          label="align-items"
          value={align}
          onChange={setAlign}
          options={[
            { value: "flex-start", label: "flex-start" },
            { value: "center", label: "center" },
            { value: "flex-end", label: "flex-end" },
            { value: "stretch", label: "stretch" },
          ]}
        />
        <DemoSlider label="gap" value={gap} onChange={setGap} min={0} max={40} unit="px" />
      </DemoControls>

      <DemoAxis direction={direction} />

      <DemoPreview>
        <DemoHighlight signal={`${direction}-${justify}-${align}-${gap}`}>
          <div
            className={styles.navPreview}
            style={{
              display: "flex",
              flexDirection: direction,
              justifyContent: justify,
              alignItems: align,
              gap: `${gap}px`,
            }}
          >
            <span className={styles.navLogo}>☕ Аромат</span>
            <span className={styles.navLink}>Меню</span>
            <span className={styles.navLink}>Про нас</span>
            <span className={styles.navLink}>Контакти</span>
            <span className={styles.navCta}>Забронювати</span>
          </div>
        </DemoHighlight>
      </DemoPreview>

      <DemoExplanation>{buildExplanation(direction, justify, align, gap)}</DemoExplanation>

      <DemoCodeSnippet
        code={`display: flex;
flex-direction: ${direction};
justify-content: ${justify};
align-items: ${align};
gap: ${gap}px;`}
      />

      <DemoKeyTakeaway>
        gap задає МІНІМАЛЬНИЙ відступ між елементами. Якщо justify-content розподіляє вільний простір
        (space-between/around/evenly), реальна відстань може бути більшою за gap — це не помилка, а очікувана взаємодія цих двох властивостей.
      </DemoKeyTakeaway>
    </DemoSection>
  );
}
