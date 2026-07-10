import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Motion = "full" | "reduced";

/**
 * Live demo for "prefers-reduced-motion": a toolbar stands in for the
 * user's OS-level "зменшити рух" setting (same pattern as SystemThemeDemo
 * for prefers-color-scheme, applied here to motion instead of color). The
 * duration below is a REAL CSS custom property read by animation-duration,
 * so toggling it genuinely changes how long the replayed entrance
 * animation takes — not a simulated difference.
 */
export function ReducedMotionDemo() {
  const [motion, setMotion] = useState<Motion>("full");
  const [playCount, setPlayCount] = useState(0);
  const duration = motion === "full" ? 500 : 1;

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "full", label: "Система: рух увімкнено" },
          { value: "reduced", label: "Система: зменшити рух" },
        ]}
        value={motion}
        onChange={(value) => {
          setMotion(value as Motion);
          setPlayCount((count) => count + 1);
        }}
      />

      <button type="button" className={styles.kfReplayButton} onClick={() => setPlayCount((count) => count + 1)}>
        ▶ Відтворити появу картки
      </button>

      <DemoPreview label={`animation-duration: ${duration}ms — так, ніби це @media (prefers-reduced-motion: reduce)`}>
        <div
          key={`${motion}-${playCount}`}
          className={`${styles.thCard} ${styles.kfFadeInUp}`}
          style={{ animationDuration: `${duration}ms` }}
        >
          <strong>Латте</strong>
          <span className={styles.thPrice}>75 грн</span>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {motion === "full"
          ? "Система з рухом: картка плавно з'являється й трохи зсувається знизу за 500ms — приємно для більшості відвідувачів, але саме такий рух може викликати дискомфорт у людей із вестибулярними розладами."
          : "Система зі зменшеним рухом: та сама анімація тепер триває 1ms — по суті миттєва. Контент з'являється відразу, без різкого руху, що і вимагає prefers-reduced-motion: reduce."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={`.menu-card {
  animation: fade-in-up 500ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* зараз: ${motion === "full" ? "рух увімкнено — 500ms" : "зменшити рух — практично 0ms"} */`}
      />

      <DemoKeyTakeaway>
        prefers-reduced-motion читає системну настройку ОС, так само як prefers-color-scheme читає тему, — і так
        само не потребує окремого коду для кожного компонента: одне глобальне правило з * і !important миттєво
        "гасить" animation-duration і transition-duration по всьому сайту.
      </DemoKeyTakeaway>
    </div>
  );
}
