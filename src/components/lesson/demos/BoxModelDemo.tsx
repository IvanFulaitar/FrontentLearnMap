import { useState } from "react";
import { DemoSection, DemoControls, DemoSlider, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, DemoHighlight } from "./framework";
import styles from "./demos.module.css";

/**
 * Live Box Model demo: a realistic product card (image, title, price) with
 * margin/border/padding driven by React state. The margin band and padding
 * band are visually labeled — the same idea DevTools shows, but applied to
 * a real component instead of an abstract box.
 */
export function BoxModelDemo() {
  const [margin, setMargin] = useState(16);
  const [border, setBorder] = useState(2);
  const [padding, setPadding] = useState(16);

  const cardWidth = 140;
  const visibleWidth = cardWidth + border * 2 + padding * 2;

  return (
    <DemoSection>
      <DemoControls>
        <DemoSlider label="margin" value={margin} onChange={setMargin} min={0} max={32} unit="px" />
        <DemoSlider label="border" value={border} onChange={setBorder} min={0} max={10} unit="px" />
        <DemoSlider label="padding" value={padding} onChange={setPadding} min={0} max={32} unit="px" />
      </DemoControls>

      <DemoPreview>
        <DemoHighlight signal={`${margin}-${border}-${padding}`}>
          <div className={styles.boxMarginStage} style={{ padding: `${margin}px` }}>
            <span className={styles.boxTag}>margin</span>
            <div
              className={styles.boxBorderStage}
              style={{ border: `${border}px solid var(--primary)`, padding: `${padding}px` }}
            >
              <span className={styles.boxTag}>padding</span>
              <div className={styles.productCard}>
                <div className={styles.productImage} aria-hidden="true">☕</div>
                <strong>Латте Аромат</strong>
                <span>75 грн</span>
              </div>
            </div>
          </div>
        </DemoHighlight>
      </DemoPreview>

      <DemoExplanation>
        Видима ширина картки (border-box) зараз {visibleWidth}px: {cardWidth}px контенту + border ×2 ({border * 2}px) + padding ×2 ({padding * 2}px).
        margin ({margin}px) у цю ширину НЕ входить — він лише відсуває картку від сусідів, не змінюючи її власний розмір.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`margin: ${margin}px;
border: ${border}px solid;
padding: ${padding}px;`}
      />

      <DemoKeyTakeaway>
        margin змінює відстань до СУСІДІВ, border і padding змінюють видимий розмір самого елемента.
        Це і є найчастіша причина "чому картка стала ширшою, ніж я планував".
      </DemoKeyTakeaway>
    </DemoSection>
  );
}
