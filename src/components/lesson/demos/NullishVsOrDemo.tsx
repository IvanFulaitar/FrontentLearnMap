import { useState } from "react";
import { DemoControls, DemoSlider, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Оператори та вирази": a stock-quantity slider (0-10) feeding
 * both `quantity || 5` and `quantity ?? 5` at the same time, so the classic
 * "0 gets silently replaced" bug becomes visible instead of theoretical —
 * dragging to 0 makes the two results diverge in front of the student.
 */
export function NullishVsOrDemo() {
  const [quantity, setQuantity] = useState(3);

  const withOr = quantity || 5;
  const withNullish = quantity ?? 5;
  const isBuggy = withOr !== withNullish;

  return (
    <div className={styles.demoStack}>
      <DemoControls>
        <DemoSlider label="Кількість на складі" value={quantity} onChange={setQuantity} min={0} max={10} />
      </DemoControls>

      <DemoPreview label="Обидва вирази рахують з одного й того самого значення">
        <div className={styles.semanticBlock}>
          <p>
            <code>quantity || 5</code> → <strong>{withOr}</strong>
          </p>
          <p>
            <code>quantity ?? 5</code> → <strong>{withNullish}</strong>
          </p>
          {isBuggy ? (
            <p style={{ color: "var(--color-danger, #dc2626)" }}>
              Розбіжність! При quantity = 0, || вважає його "порожнім" і підставляє запасне значення 5 — це і є
              прихований баг. ?? підставляє запасне значення лише для null/undefined, тому чесно лишає 0.
            </p>
          ) : (
            <p>Постав повзунок на 0, щоб побачити, де || і ?? розходяться.</p>
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        quantity ?? 5 підставляє 5 лише якщо quantity дорівнює null або undefined. quantity || 5 підставляє 5 для
        БУДЬ-ЯКОГО falsy значення — і 0 потрапляє під цю категорію, хоча 0 — цілком легітимна кількість товару на
        складі.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`const quantity = ${quantity};

const withOr = quantity || 5;
console.log(withOr); // ${withOr}

const withNullish = quantity ?? 5;
console.log(withNullish); // ${withNullish}`}
      />

      <DemoKeyTakeaway>
        Правило простими словами: якщо 0, "" чи false можуть бути справжніми, коректними даними — використовуй ??.
        Використовуй || лише коли будь-яке falsy значення справді має вважатись "порожнім".
      </DemoKeyTakeaway>
    </div>
  );
}
