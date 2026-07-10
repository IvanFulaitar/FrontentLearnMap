import { useState } from "react";
import { DemoToolbar, DemoSlider, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Preset = "tight" | "normal" | "loose";

const LINE_HEIGHTS: Record<Preset, number> = {
  tight: 1,
  normal: 1.6,
  loose: 1.9,
};

const TEXT =
  "«Аромат» — маленька кав'ярня в центрі міста, де кожна чашка кави готується вручну зі свіжообсмажених зерен. У нас завжди свіжа випічка, затишні столики біля вікна і плейлист, який не набридає навіть після третьої чашки. Завітайте на сніданок, чи просто на каву з круасаном — команда бариста завжди рада гостям.";

export function LineHeightDemo() {
  const [preset, setPreset] = useState<Preset>("tight");
  const [chWidth, setChWidth] = useState(75);

  const lineHeight = LINE_HEIGHTS[preset];

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "tight", label: "line-height: 1" },
          { value: "normal", label: "line-height: 1.6" },
          { value: "loose", label: "line-height: 1.9" },
        ]}
        value={preset}
        onChange={(value) => setPreset(value as Preset)}
      />
      <DemoSlider label="max-width" value={chWidth} onChange={setChWidth} min={30} max={90} unit="ch" />

      <div className={styles.lhStage}>
        <p className={styles.lhParagraph} style={{ lineHeight, maxWidth: `${chWidth}ch` }}>
          {TEXT}
        </p>
      </div>

      <DemoExplanation>
        {preset === "tight"
          ? `line-height: 1 і рядок шириною ${chWidth}ch — рядки абзацу майже торкаються одне одного, очам ніде "дихати" між ними, особливо на такому довгому тексті.`
          : preset === "normal"
            ? `line-height: 1.6 — стандартна, комфортна відстань для абзацу; при ширині ${chWidth}ch рядок ще й не надто довгий, щоб очі губились у пошуку початку наступного рядка.`
            : `line-height: 1.9 дає багато повітря — годиться для дуже довгих статей, але для звичайного опису кав'ярні вже трохи розтягує текст без реальної користі.`}
      </DemoExplanation>

      <DemoCodeSnippet
        code={`.about-text {
  line-height: ${lineHeight};
  max-width: ${chWidth}ch;
}`}
      />

      <DemoKeyTakeaway>
        line-height (без одиниць) і max-width в ch — два незалежні важелі читабельності: перший керує повітрям МІЖ
        рядками, другий — тим, наскільки довгий сам рядок. Змінюй їх окремо і дивись, як по-різному вони впливають
        на той самий текст.
      </DemoKeyTakeaway>
    </div>
  );
}
