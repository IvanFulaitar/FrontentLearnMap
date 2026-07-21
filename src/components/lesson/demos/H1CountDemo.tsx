import { useEffect, useRef, useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Hero-секція і картки": toggle a second real <h1> into
 * the stage and see a genuine document.querySelectorAll("h1").length
 * count recompute against the actual rendered DOM inside the stage —
 * not a hardcoded number.
 */
export function H1CountDemo() {
  const [extraH1, setExtraH1] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (stageRef.current) {
      setCount(stageRef.current.querySelectorAll("h1").length);
    }
  }, [extraH1]);

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Постав галочку — і подивись, що реально знаходить querySelectorAll('h1') на цій сторінці">
        <label className={styles.sfToggle}>
          <input type="checkbox" checked={extraH1} onChange={(event) => setExtraH1(event.target.checked)} />
          Додати другий h1 у "hero" (типова помилка)
        </label>

        <div ref={stageRef} className={styles.hcStage}>
          <h1 className={styles.hcHeading}>Кав'ярня «Аромат»</h1>
          {extraH1 ? <h1 className={styles.hcHeading}>Свіжа кава щодня</h1> : <p className={styles.hcSubtitle}>Свіжа кава щодня</p>}
        </div>

        <p className={styles.itValidity}>
          document.querySelectorAll("h1").length у цьому блоці зараз повертає: <strong>{count}</strong>
        </p>
      </DemoPreview>

      <DemoExplanation>
        {count > 1
          ? "Два h1 одночасно — Google не розуміє, яка з двох тем головна, а структура заголовків сторінки (Headings Outline у DevTools) показує дублікат найвищого рівня."
          : "Один h1 — головна тема сторінки однозначна і для людини, і для пошукової системи."}
      </DemoExplanation>

      <DemoKeyTakeaway>
        Число вище — реальний підрахунок по щойно відрендереному DOM цього демо, а не заготовлений текст: постав і
        прибери галочку кілька разів і побач, як воно змінюється синхронно.
      </DemoKeyTakeaway>
    </div>
  );
}
