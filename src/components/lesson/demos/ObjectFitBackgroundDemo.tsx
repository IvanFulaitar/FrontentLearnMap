import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "background" | "img";
type Position = "top" | "center" | "bottom";

// A tall (3:4) test photo with a "face" circle near the top, so cropping a
// short landscape box around it makes object-position/background-position
// changes unmistakably visible.
const PHOTO_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect width='300' height='400' fill='%23b45309'/%3E%3Ccircle cx='150' cy='100' r='55' fill='%23f3e0c8'/%3E%3Ctext x='150' y='108' font-size='20' text-anchor='middle' fill='%23b45309' font-family='sans-serif'%3Eобличчя%3C/text%3E%3C/svg%3E";

const POSITION_NOTES: Record<Position, string> = {
  top: "position: top показує верхню частину фото — обличчя видно повністю.",
  center: "position: center (типове значення) — обличчя вже наполовину обрізане.",
  bottom: "position: bottom показує нижню частину фото — обличчя повністю зникає з кадру.",
};

/**
 * Live demo for "Фонові зображення і object-fit": click background-image
 * vs <img> (the accessibility distinction the lesson makes), then click
 * top/center/bottom to see object-position/background-position rescue (or
 * fail to rescue) an off-center subject — using the SAME tall test photo
 * with a face near the top, unlike the square cover/contain/fill demo in
 * the Grid module.
 */
export function ObjectFitBackgroundDemo() {
  const [mode, setMode] = useState<Mode>("background");
  const [position, setPosition] = useState<Position>("center");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "background", label: "background-image (декор)" },
          { value: "img", label: "<img> object-fit (контент)" },
        ]}
        value={mode}
        onChange={(value) => setMode(value as Mode)}
      />
      <DemoToolbar
        options={[
          { value: "top", label: "position: top" },
          { value: "center", label: "position: center" },
          { value: "bottom", label: "position: bottom" },
        ]}
        value={position}
        onChange={(value) => setPosition(value as Position)}
      />

      <DemoPreview label="Те саме високе фото 3:4 з обличчям зверху — кроп у низький прямокутник">
        {mode === "background" ? (
          <div
            className={styles.ofBox}
            style={{ backgroundImage: `url("${PHOTO_SRC}")`, backgroundSize: "cover", backgroundPosition: position }}
            role="img"
            aria-label="Декоративне фонове фото — без alt, бо це CSS background"
          />
        ) : (
          <img
            src={PHOTO_SRC}
            alt="Портрет баристи кав'ярні — реальний контент з описом"
            className={styles.ofBox}
            style={{ objectFit: "cover", objectPosition: position }}
          />
        )}
      </DemoPreview>

      <DemoExplanation>
        {mode === "background"
          ? `background-image не має alt — це суто декоративний спосіб, невидимий для скрінрідера. ${POSITION_NOTES[position]}`
          : `<img> з alt="Портрет баристи..." — це змістовний контент, доступний скрінрідеру. ${POSITION_NOTES[position]}`}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          mode === "background"
            ? `.hero {\n  background-image: url("barista.jpg");\n  background-size: cover;\n  background-position: ${position};\n}`
            : `<img src="barista.jpg" alt="Портрет баристи кав'ярні" />\n\nimg {\n  object-fit: cover;\n  object-position: ${position};\n}`
        }
      />

      <DemoKeyTakeaway>
        background-image і object-fit вирішують однакову задачу (обрізати фото під розмір блоку), але
        background-image годиться лише для декору без смислового навантаження — щойно фото несе інформацію
        (портрет, товар), потрібен справжній &lt;img&gt; з alt, а не CSS-фон.
      </DemoKeyTakeaway>
    </div>
  );
}
