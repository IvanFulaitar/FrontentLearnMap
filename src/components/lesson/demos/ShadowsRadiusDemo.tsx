import { useState } from "react";
import { DemoToolbar, DemoControls, DemoSlider, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type ShadowPreset = "flat" | "soft" | "deep" | "floating";

const SHADOWS: Record<ShadowPreset, { label: string; shadow: string; codeLabel: string }> = {
  flat: { label: "Пласка", shadow: "0 1px 2px rgb(0 0 0 / 0.08)", codeLabel: "0 1px 2px rgb(0 0 0 / 0.08)" },
  soft: { label: "М'яка", shadow: "0 4px 12px rgb(0 0 0 / 0.10)", codeLabel: "0 4px 12px rgb(0 0 0 / 0.10)" },
  deep: { label: "Глибока", shadow: "0 10px 24px rgb(0 0 0 / 0.18)", codeLabel: "0 10px 24px rgb(0 0 0 / 0.18)" },
  floating: { label: "Плаваюча", shadow: "0 20px 40px rgb(0 0 0 / 0.22)", codeLabel: "0 20px 40px rgb(0 0 0 / 0.22)" },
};

/**
 * Live demo for "Тіні та радіуси": click a shadow preset to see box-shadow
 * change on a real card, drag the radius slider to round its corners live,
 * and hover the card itself to see a genuine CSS lift (extra shadow +
 * transform) — real, poke-able states, not a static picture.
 */
export function ShadowsRadiusDemo() {
  const [preset, setPreset] = useState<ShadowPreset>("soft");
  const [radius, setRadius] = useState(12);

  const current = SHADOWS[preset];

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={Object.entries(SHADOWS).map(([value, cfg]) => ({ value, label: cfg.label }))}
        value={preset}
        onChange={(value) => setPreset(value as ShadowPreset)}
      />

      <DemoControls>
        <DemoSlider label="border-radius" value={radius} onChange={setRadius} min={0} max={32} unit="px" />
      </DemoControls>

      <DemoPreview label="Наведи мишку на картку, щоб побачити додаткову тінь-«підйом» поверх обраного пресету">
        <div className={styles.srStage}>
          <div
            className={styles.srCard}
            style={{ boxShadow: current.shadow, borderRadius: `${radius}px` }}
          >
            <strong className={styles.srCardTitle}>Раф з лавандою</strong>
            <span className={styles.srCardPrice}>65 грн</span>
          </div>
        </div>
      </DemoPreview>

      <DemoExplanation>
        Пресет «{current.label}» задає box-shadow: {current.codeLabel}. Radius {radius}px округлює кути картки —
        спробуй перетягнути повзунок до 0 (гострі кути) чи до 32px (майже капсула). Наведи мишку на саму картку:
        CSS :hover додає ще глибшу тінь і трохи піднімає картку (transform: translateY), незалежно від того, який
        пресет обрано зараз.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`.price-card {
  border-radius: ${radius}px;
  box-shadow: ${current.codeLabel};
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.price-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgb(0 0 0 / 0.20);
}`}
      />

      <DemoKeyTakeaway>
        Тінь створює відчуття "висоти" картки над фоном (чим більший blur і зсув по Y, тим вища картка виглядає),
        а border-radius керує м'якістю кутів окремо від тіні. :hover може тимчасово поглибити тінь — це той самий
        трюк, що робить картки меню "живими" при наведенні, не змінюючи жодного HTML-елемента.
      </DemoKeyTakeaway>
    </div>
  );
}
