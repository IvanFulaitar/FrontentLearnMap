import { useMemo, useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Viewport = "mobile" | "tablet" | "desktop";

const VIEWPORTS: { value: Viewport; label: string; width: number }[] = [
  { value: "mobile", label: "📱 Телефон (390px)", width: 390 },
  { value: "tablet", label: "📲 Планшет (768px)", width: 768 },
  { value: "desktop", label: "🖥️ Монітор (1600px)", width: 1600 },
];

const CANDIDATES = [
  { file: "interior-480.jpg", width: 480, size: "45 КБ" },
  { file: "interior-800.jpg", width: 800, size: "120 КБ" },
  { file: "interior-1600.jpg", width: 1600, size: "340 КБ" },
];

const SRCSET_CODE = `<img
  src="interior-800.jpg"
  srcset="interior-480.jpg 480w, interior-800.jpg 800w, interior-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 640px"
  alt="Затишний зал кав'ярні «Аромат»"
  width="640" height="420"
  loading="lazy"
/>`;

function getEffectiveSlotWidth(viewportWidth: number): number {
  // Mirrors the lesson's real sizes="(max-width: 600px) 100vw, 640px":
  // below 600px the image fills the viewport, above it the slot is a fixed 640px.
  return viewportWidth <= 600 ? viewportWidth : 640;
}

function pickCandidate(effectiveWidth: number) {
  const sorted = [...CANDIDATES].sort((a, b) => a.width - b.width);
  return sorted.find((c) => c.width >= effectiveWidth) ?? sorted[sorted.length - 1];
}

/**
 * Live demo for "Адаптивні зображення: picture, srcset і lazy loading":
 * switch between 3 real viewport widths and watch the exact same
 * srcset/sizes calculation the browser performs, live — which candidate
 * file gets picked and why, instead of just reading that "the browser
 * chooses the best one."
 */
export function ResponsiveImageDemo() {
  const [viewport, setViewport] = useState<Viewport>("mobile");

  const current = VIEWPORTS.find((v) => v.value === viewport) ?? VIEWPORTS[0];
  const effectiveWidth = useMemo(() => getEffectiveSlotWidth(current.width), [current.width]);
  const chosen = useMemo(() => pickCandidate(effectiveWidth), [effectiveWidth]);

  const frameScale = Math.min(1, current.width / 1600);

  return (
    <div className={styles.demoStack}>
      <DemoToolbar options={VIEWPORTS.map(({ value, label }) => ({ value, label }))} value={viewport} onChange={(value) => setViewport(value as Viewport)} />

      <div className={styles.riFrameOuter}>
        <div className={styles.riFrame} style={{ width: `${180 * frameScale + 60}px` }}>
          <p className={styles.riFrameLabel}>{chosen.file}</p>
          <p className={styles.riFrameSize}>{chosen.size}</p>
        </div>
      </div>

      <DemoExplanation>
        Ширина екрана — {current.width}px. За sizes слот під картинку —{" "}
        {effectiveWidth === current.width ? `${effectiveWidth}px (100vw, бо ширина ≤ 600px)` : `${effectiveWidth}px (фіксовано, бо ширина > 600px)`}. Браузер бере найменший файл зі srcset, який
        не менший за цей слот: <strong>{chosen.file}</strong> ({chosen.size}).
      </DemoExplanation>

      <DemoCodeSnippet code={SRCSET_CODE} />

      <DemoKeyTakeaway>
        Той самий тег img завантажує різний файл залежно від пристрою — 45 КБ на телефоні замість 340 КБ на моніторі
        для одного й того самого фото. У реальному браузері до розрахунку ще додається density pixel ratio екрана, але
        принцип "менший слот → менший файл" лишається той самий.
      </DemoKeyTakeaway>
    </div>
  );
}
