import { useState } from "react";
import { DemoSection, DemoControls, DemoSlider, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, DemoHighlight } from "./framework";
import styles from "./demos.module.css";

/**
 * Margin vs Padding, side by side on two identical real menu rows: the left
 * row's margin changes (pushing it away from its neighbor, own size fixed),
 * the right row's padding changes (growing the row's own visible size).
 * Same two sliders drive both stages so the difference is directly
 * comparable, not just described.
 */
export function MarginPaddingDemo() {
  const [margin, setMargin] = useState(16);
  const [padding, setPadding] = useState(16);

  return (
    <DemoSection>
      <DemoControls>
        <DemoSlider label="margin (лівий рядок)" value={margin} onChange={setMargin} min={0} max={32} unit="px" />
        <DemoSlider label="padding (правий рядок)" value={padding} onChange={setPadding} min={0} max={32} unit="px" />
      </DemoControls>

      <DemoPreview>
        <div className={styles.comparePair}>
          <div className={styles.compareColumn}>
            <span className={styles.compareLabel}>Тільки margin</span>
            <DemoHighlight signal={margin}>
              <div className={styles.boxMarginStage} style={{ padding: `${margin}px` }}>
                <span className={styles.boxTag}>margin</span>
                <div className={styles.menuRow}>
                  <strong>Круасан</strong>
                  <span>55 грн</span>
                </div>
              </div>
            </DemoHighlight>
          </div>
          <div className={styles.compareColumn}>
            <span className={styles.compareLabel}>Тільки padding</span>
            <DemoHighlight signal={padding}>
              <div className={styles.boxBorderStage} style={{ border: "2px dashed var(--border)", padding: `${padding}px` }}>
                <span className={styles.boxTag}>padding</span>
                <div className={styles.menuRow}>
                  <strong>Круасан</strong>
                  <span>55 грн</span>
                </div>
              </div>
            </DemoHighlight>
          </div>
        </div>
      </DemoPreview>

      <DemoExplanation>
        Лівий рядок: margin: {margin}px лише відсуває картку від сусідів — сама картка не змінює розмір, фон не поширюється на цю зону.
        Правий рядок: padding: {padding}px збільшує ВИДИМИЙ розмір самої картки — фон і рамка ростуть разом із вмістом.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`.only-margin  { margin: ${margin}px; }
.only-padding { padding: ${padding}px; }`}
      />

      <DemoKeyTakeaway>
        Питання-тест: "це відступ УСЕРЕДИНІ картки чи ЗОВНІ, до сусідів?" Перше — padding, друге — margin.
      </DemoKeyTakeaway>
    </DemoSection>
  );
}
