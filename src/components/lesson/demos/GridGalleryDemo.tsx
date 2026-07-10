import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Fit = "cover" | "contain" | "fill";

// A self-contained 4:3 test photo (rectangle + circle) so object-fit's effect
// on shape/cropping is unambiguous, independent of any real site asset.
const PHOTO_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f3e0c8'/%3E%3Ccircle cx='200' cy='150' r='90' fill='%23b45309'/%3E%3Ctext x='200' y='158' font-size='30' text-anchor='middle' fill='%23fff' font-family='sans-serif'%3E4:3%3C/text%3E%3C/svg%3E";

const FIT_NOTES: Record<Fit, string> = {
  cover:
    "cover заповнює квадратну область повністю, обрізаючи зайве по краях — коло лишається ідеально круглим, просто частина прямокутного фото 4:3 виходить за межі й не показується.",
  contain:
    "contain уміщає все фото 4:3 цілком у квадратну область без обрізання — коло лишається круглим, але з боків з'являються порожні смуги (letterboxing), бо пропорції фото й контейнера різні.",
  fill: "fill розтягує фото під точний розмір квадратної області, ігноруючи оригінальні пропорції — коло перетворюється на овал, фото виглядає спотвореним.",
};

/**
 * Live demo for "Галерея кав'ярні на Grid": click through cover / contain /
 * fill on the SAME 4:3 test photo inside a square cell — the circle in the
 * photo makes the distortion (or lack of it) immediately visible, unlike
 * the shared grid-demo which never touches object-fit at all.
 */
export function GridGalleryDemo() {
  const [fit, setFit] = useState<Fit>("cover");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "cover", label: "object-fit: cover" },
          { value: "contain", label: "object-fit: contain" },
          { value: "fill", label: "object-fit: fill" },
        ]}
        value={fit}
        onChange={(value) => setFit(value as Fit)}
      />

      <DemoPreview label="Те саме фото 4:3 у квадратній клітинці сітки — дивись, що стається з колом">
        <div className={styles.ggStage}>
          <img
            src={PHOTO_SRC}
            alt="Тестове фото 4:3 з колом для демонстрації object-fit"
            className={styles.ggPhoto}
            style={{ objectFit: fit }}
            width={400}
            height={300}
          />
        </div>
      </DemoPreview>

      <DemoExplanation>{FIT_NOTES[fit]}</DemoExplanation>

      <DemoCodeSnippet
        code={`.gallery img {\n  width: 100%;\n  aspect-ratio: 1 / 1;\n  object-fit: ${fit};\n}`}
      />

      <DemoKeyTakeaway>
        cover — стандартний безпечний вибір для галерей: обрізає, але ніколи не спотворює пропорції. contain
        уникає обрізання ціною порожнього простору. fill — єдиний із трьох, що спотворює саме зображення, тому
        його майже завжди варто уникати.
      </DemoKeyTakeaway>
    </div>
  );
}
