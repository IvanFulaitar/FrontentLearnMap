import { useState } from "react";
import { DemoSection, DemoControls, DemoSelect, DemoSlider, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, DemoHighlight } from "./framework";
import styles from "./demos.module.css";

const MENU_ITEMS = [
  { name: "Латте", price: "75 грн", image: "/images/latte.svg" },
  { name: "Капучино", price: "70 грн", image: "/images/latte.svg" },
  { name: "Круасан", price: "55 грн", image: "/images/croissant.svg" },
  { name: "Чізкейк", price: "95 грн", image: "/images/cheesecake.svg" },
  { name: "Американо", price: "60 грн", image: "/images/latte.svg" },
  { name: "Флет-вайт", price: "80 грн", image: "/images/latte.svg" },
];

function buildExplanation(autoFit: boolean, columns: number, gap: number): string {
  if (autoFit) {
    return `repeat(auto-fit, minmax(140px, 1fr)) сам вирішує, скільки колонок влазить — звузь прев'ю (чи уяви вужчий екран), і кількість колонок зменшиться сама, без жодного медіазапиту. gap: ${gap}px додає однаковий відступ між усіма картками, і по горизонталі, і по вертикалі.`;
  }
  return `Зараз ${columns} ${columns === 1 ? "колонка" : columns < 5 ? "колонки" : "колонок"} однакової ширини (repeat(${columns}, 1fr)). gap: ${gap}px додає відступ між картками — на відміну від Flexbox, тут його ніщо не "маскує", бо колонки завжди ділять весь доступний простір порівну.`;
}

/**
 * Live Grid demo: a realistic café menu card grid whose column count and
 * gap are driven by React state — real HTML/CSS, not an illustration.
 * Shows how repeat()/minmax() change the same markup live.
 */
export function GridDemo() {
  const [columns, setColumns] = useState(3);
  const [gap, setGap] = useState(12);
  const [autoFit, setAutoFit] = useState(false);

  const gridTemplateColumns = autoFit
    ? "repeat(auto-fit, minmax(140px, 1fr))"
    : `repeat(${columns}, 1fr)`;

  return (
    <DemoSection>
      <DemoControls>
        <DemoSelect
          label="Режим колонок"
          value={autoFit ? "auto" : "fixed"}
          onChange={(value) => setAutoFit(value === "auto")}
          options={[
            { value: "fixed", label: "Фіксована кількість" },
            { value: "auto", label: "auto-fit + minmax" },
          ]}
        />
        {!autoFit ? (
          <DemoSlider label="Колонок" value={columns} onChange={setColumns} min={1} max={6} />
        ) : null}
        <DemoSlider label="gap" value={gap} onChange={setGap} min={0} max={32} unit="px" />
      </DemoControls>

      <DemoPreview>
        <DemoHighlight signal={`${gridTemplateColumns}-${gap}`}>
          <div
            className={styles.gridPreview}
            style={{
              display: "grid",
              gridTemplateColumns,
              gap: `${gap}px`,
            }}
          >
            {MENU_ITEMS.map((item) => (
              <div className={styles.menuCard} key={item.name}>
                <img src={item.image} alt={item.name} width={400} height={300} className={styles.menuCardImage} />
                <strong>{item.name}</strong>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
        </DemoHighlight>
      </DemoPreview>

      <DemoExplanation>{buildExplanation(autoFit, columns, gap)}</DemoExplanation>

      <DemoCodeSnippet
        code={`display: grid;
grid-template-columns: ${gridTemplateColumns};
gap: ${gap}px;`}
      />

      <DemoKeyTakeaway>
        У Grid gap завжди чистий, передбачуваний відступ між треками — на відміну від Flexbox, тут немає
        властивості на кшталт justify-content, що могла б "поглинути" його ефект. Наведи мишку на будь-яку
        картку вище — легкий підйом картки й збільшення+затемнення фото (transform: scale + filter:
        brightness) — той самий прийом, що в уроці про галерею фото кав'ярні.
      </DemoKeyTakeaway>
    </DemoSection>
  );
}
