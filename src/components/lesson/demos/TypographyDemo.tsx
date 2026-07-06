import { useState } from "react";
import { DemoSection, DemoControls, DemoSelect, DemoSlider, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, DemoHighlight } from "./framework";
import styles from "./demos.module.css";

type Weight = "400" | "600" | "700";

function buildExplanation(fontSize: number, lineHeight: number, letterSpacing: number, weight: Weight): string {
  let sentence = `font-size: ${fontSize}px, line-height: ${lineHeight} — рядки абзацу відстоять один від одного приблизно на ${Math.round(fontSize * lineHeight - fontSize)}px додаткового простору.`;
  if (lineHeight < 1.3) {
    sentence += " При такому щільному line-height довгий абзац буде важко читати — рядки майже торкаються.";
  }
  if (letterSpacing > 1) {
    sentence += ` letter-spacing: ${letterSpacing}px помітно розсуває літери — це годиться для КОРОТКИХ написів капсом, але шкодить читабельності довгого тексту.`;
  }
  if (weight === "400") sentence += " font-weight: 400 — звичайна вага, для основного тексту.";
  else sentence += ` font-weight: ${weight} — виразний акцент, годиться для заголовків, не для довгих абзаців.`;
  return sentence;
}

/**
 * Live typography demo: a real café heading + paragraph + link, with
 * font-size/line-height/letter-spacing/weight all driven by React state.
 */
export function TypographyDemo() {
  const [fontSize, setFontSize] = useState(17);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [weight, setWeight] = useState<Weight>("400");

  return (
    <DemoSection>
      <DemoControls>
        <DemoSlider label="font-size" value={fontSize} onChange={setFontSize} min={13} max={28} unit="px" />
        <DemoSlider label="line-height" value={lineHeight} onChange={setLineHeight} min={1} max={2.2} step={0.1} />
        <DemoSlider label="letter-spacing" value={letterSpacing} onChange={setLetterSpacing} min={-1} max={4} step={0.5} unit="px" />
        <DemoSelect
          label="font-weight"
          value={weight}
          onChange={setWeight}
          options={[
            { value: "400", label: "400 (звичайний)" },
            { value: "600", label: "600 (напівжирний)" },
            { value: "700", label: "700 (жирний)" },
          ]}
        />
      </DemoControls>

      <DemoPreview>
        <DemoHighlight signal={`${fontSize}-${lineHeight}-${letterSpacing}-${weight}`}>
          <div className={styles.typographyStage}>
            <p
              className={styles.typographyText}
              style={{ fontSize: `${fontSize}px`, lineHeight, letterSpacing: `${letterSpacing}px`, fontWeight: weight }}
            >
              «Аромат» — маленька кав&apos;ярня в центрі міста, де кожна чашка кави готується вручну зі свіжообсмажених
              зерен. Завітайте на сніданок або просто на каву з круасаном.{" "}
              <a href="#" onClick={(event) => event.preventDefault()} className={styles.typographyLink}>Переглянути меню</a>.
            </p>
          </div>
        </DemoHighlight>
      </DemoPreview>

      <DemoExplanation>{buildExplanation(fontSize, lineHeight, letterSpacing, weight)}</DemoExplanation>

      <DemoCodeSnippet
        code={`font-size: ${fontSize}px;
line-height: ${lineHeight};
letter-spacing: ${letterSpacing}px;
font-weight: ${weight};`}
      />

      <DemoKeyTakeaway>
        Читабельність довгого тексту залежить в основному від line-height (1.5-1.6) і розумного letter-spacing (близько 0).
        Великий font-weight і letter-spacing годяться для коротких акцентів, не для абзаців.
      </DemoKeyTakeaway>
    </DemoSection>
  );
}
