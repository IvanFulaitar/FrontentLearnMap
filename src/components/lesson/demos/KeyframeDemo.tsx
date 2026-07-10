import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Variant = "fade-in-up" | "slide-in-left" | "pop";

const VARIANT_CLASS: Record<Variant, string> = {
  "fade-in-up": "kfFadeInUp",
  "slide-in-left": "kfSlideInLeft",
  pop: "kfPop",
};

const VARIANT_CODE: Record<Variant, string> = {
  "fade-in-up": `@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.menu-card {
  animation: fade-in-up 400ms ease-out;
}`,
  "slide-in-left": `@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-24px); }
  to { opacity: 1; transform: translateX(0); }
}

.menu-card {
  animation: slide-in-left 400ms ease-out;
}`,
  pop: `@keyframes pop {
  0% { opacity: 0; transform: scale(0.85); }
  60% { opacity: 1; transform: scale(1.04); }
  100% { transform: scale(1); }
}

.menu-card {
  animation: pop 400ms ease-out;
}`,
};

/**
 * Live demo for "Keyframe-анімації": entrance animations only play once, so
 * a real "▶ Відтворити" button remounts the card (via a changing React key)
 * to retrigger the @keyframes animation on click — the only way to
 * meaningfully demo a one-shot keyframe effect interactively.
 */
export function KeyframeDemo() {
  const [variant, setVariant] = useState<Variant>("fade-in-up");
  const [playCount, setPlayCount] = useState(0);

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "fade-in-up", label: "fade-in-up" },
          { value: "slide-in-left", label: "slide-in-left" },
          { value: "pop", label: "pop" },
        ]}
        value={variant}
        onChange={(value) => {
          setVariant(value as Variant);
          setPlayCount((count) => count + 1);
        }}
      />

      <button type="button" className={styles.kfReplayButton} onClick={() => setPlayCount((count) => count + 1)}>
        ▶ Відтворити анімацію
      </button>

      <DemoPreview label="@keyframes грає один раз при появі елемента — натисни кнопку, щоб побачити ще раз">
        <div key={`${variant}-${playCount}`} className={`${styles.thCard} ${styles[VARIANT_CLASS[variant]]}`}>
          <strong>Латте</strong>
          <span className={styles.thPrice}>75 грн</span>
        </div>
      </DemoPreview>

      <DemoExplanation>
        Кожен клік на "Відтворити" не просто повторює перехід (як :hover у попередньому уроці) — він змушує React
        пересоздати елемент з новим key, і браузер запускає @keyframes {variant} з самого початку (0%) заново.
        Сама анімація в реальному сайті так само спрацьовує один раз — коли елемент вперше з'являється на сторінці.
      </DemoExplanation>

      <DemoCodeSnippet code={VARIANT_CODE[variant]} />

      <DemoKeyTakeaway>
        @keyframes описує самостійний, багатоетапний рух, який не залежить від hover чи будь-якої взаємодії
        користувача — на відміну від transition, він грає сам, один раз, коли елемент з'являється (чи за
        animation: ... infinite — безкінечно).
      </DemoKeyTakeaway>
    </div>
  );
}
