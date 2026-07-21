import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// function isValidPrice(value: unknown): value is number
function isValidPrice(value: unknown): value is number {
  return typeof value === "number" && value > 0;
}

const RAW_VALUES: unknown[] = [65, "60", -10, 50, "не число", 0];

/**
 * Live demo for "Функції-предикати": models
 * `function isValidPrice(value: unknown): value is number` and really
 * runs `.filter(isValidPrice)` over a genuinely mixed array, showing the
 * real filtered result — the type predicate lets TypeScript narrow the
 * array's element type to `number[]` after filtering, mirroring what the
 * real runtime check actually verifies.
 */
export function TypePredicateDemo() {
  const [showFiltered, setShowFiltered] = useState(true);

  const filtered = RAW_VALUES.filter(isValidPrice);
  const total = filtered.reduce((sum, price) => sum + price, 0);

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="function isValidPrice(value: unknown): value is number">
        <DemoToolbar
          options={[
            { value: "raw", label: "Початковий масив (unknown[])" },
            { value: "filtered", label: "Після .filter(isValidPrice) (number[])" },
          ]}
          value={showFiltered ? "filtered" : "raw"}
          onChange={(value) => setShowFiltered(value === "filtered")}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>
            {showFiltered ? `[${filtered.join(", ")}]` : `[${RAW_VALUES.map((value) => JSON.stringify(value)).join(", ")}]`}
          </span>
        </div>

        <div className={`${styles.tsCompilerBox} ${styles.tsCompilerBoxOk}`}>
          {showFiltered
            ? `Тип після filter: number[] — компілятор довіряє value is number і дозволяє .reduce() з арифметикою без жодної додаткової перевірки.\n→ реальна сума: ${total}`
            : "Тип масиву: unknown[] — жодна арифметична операція з елементами поки заборонена, доки їх не звузити."}
        </div>
      </DemoPreview>

      <DemoExplanation>
        value is number у типі повернення — це предикат: спеціальна форма запису, яка каже компілятору не просто
        &quot;функція повертає true чи false&quot;, а &quot;якщо функція повернула true, вважай значення типу number
        у цьому місці коду&quot;. isValidPrice реально перевіряє typeof value === &quot;number&quot; && value &gt; 0 —
        і саме ця реальна перевірка виправдовує звуження типу, яке предикат обіцяє компілятору.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Функція-предикат (value is Тип) дозволяє звузити тип не лише всередині одного if, а й через виклики на кшталт
        array.filter(предикат) — компілятор довіряє результату .filter лише тому, що сама перевірка реально
        відповідає обіцяному типу.
      </DemoKeyTakeaway>
    </div>
  );
}
