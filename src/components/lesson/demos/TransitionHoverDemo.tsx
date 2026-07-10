import { useState } from "react";
import { DemoToolbar, DemoSlider, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Easing = "ease" | "linear" | "ease-in-out";

export function TransitionHoverDemo() {
  const [duration, setDuration] = useState(200);
  const [easing, setEasing] = useState<Easing>("ease");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "ease", label: "ease" },
          { value: "linear", label: "linear" },
          { value: "ease-in-out", label: "ease-in-out" },
        ]}
        value={easing}
        onChange={(value) => setEasing(value as Easing)}
      />
      <DemoSlider label="transition-duration" value={duration} onChange={setDuration} min={100} max={800} step={50} unit="ms" />

      <DemoPreview label="Наведи курсор на картку (реальний :hover, не симуляція)">
        <div
          className={styles.thCard}
          style={{ transition: `transform ${duration}ms ${easing}, box-shadow ${duration}ms ${easing}` }}
        >
          <strong>Латте</strong>
          <span className={styles.thPrice}>75 грн</span>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {duration <= 200
          ? `${duration}ms з ${easing} — швидкий, "клацаючий" перехід, типовий для дрібних UI-взаємодій (кнопки, картки).`
          : duration <= 400
            ? `${duration}ms з ${easing} — усе ще комфортно, але вже відчутно повільніше, ніж типові 150-250ms для hover-ефектів.`
            : `${duration}ms з ${easing} — помітно повільно для звичайного hover-ефекту картки; на такій тривалості інтерфейс починає здаватись млявим.`}
      </DemoExplanation>

      <DemoCodeSnippet
        code={`.menu-card {
  transition: transform ${duration}ms ${easing}, box-shadow ${duration}ms ${easing};
}

.menu-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}`}
      />

      <DemoKeyTakeaway>
        transition оживляє лише перехід МІЖ двома реальними станами (звичайний і :hover) — рухом керує сам браузер
        під час наведення курсора, а не JavaScript. Конкретні властивості (transform, box-shadow) замість all і
        150-250ms — комфортний стандарт для більшості UI-переходів.
      </DemoKeyTakeaway>
    </div>
  );
}
