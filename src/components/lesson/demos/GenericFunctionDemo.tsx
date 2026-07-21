import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// function firstItem<T>(items: T[]): T | undefined
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

type ArrayKind = "strings" | "numbers" | "booleans";

const ARRAYS: Record<ArrayKind, { code: string; values: (string | number | boolean)[] }> = {
  strings: { code: '["Латте", "Капучино", "Американо"]', values: ["Латте", "Капучино", "Американо"] },
  numbers: { code: "[65, 60, 50]", values: [65, 60, 50] },
  booleans: { code: "[true, false, true]", values: [true, false, true] },
};

/**
 * Live demo for "Дженерик-функції": models
 * `function firstItem<T>(items: T[]): T | undefined` and really calls it
 * on three genuinely different array types, showing that the SAME
 * function preserves the exact element type of whatever array is passed
 * — computed live via `typeof` on the real returned value.
 */
export function GenericFunctionDemo() {
  const [kind, setKind] = useState<ArrayKind>("strings");
  const current = ARRAYS[kind];
  const result = firstItem(current.values);
  const resultType = typeof result;

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="function firstItem<T>(items: T[]): T | undefined">
        <DemoToolbar
          options={[
            { value: "strings", label: "string[]" },
            { value: "numbers", label: "number[]" },
            { value: "booleans", label: "boolean[]" },
          ]}
          value={kind}
          onChange={(value) => setKind(value as ArrayKind)}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>firstItem({current.code})</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${styles.tsCompilerBoxOk}`}>
          {`T тут виводиться як: ${resultType}\n→ реальний результат: ${JSON.stringify(result)}`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        &lt;T&gt; одразу після назви функції — це параметр типу: місце-заповнювач для типу, який компілятор підставить
        РЕАЛЬНИМ типом аргументу в момент виклику. Коли передаєш string[], T стає string, і функція повертає string |
        undefined. Коли передаєш number[], T стає number — та сама функція, той самий код, але для іншого виклику T
        підставляється по-іншому. Дженерик дозволяє написати firstItem один раз для БУДЬ-ЯКОГО типу масиву, замість
        окремої функції для рядків, окремої для чисел і так далі.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Параметр типу &lt;T&gt; — це не конкретний тип, а змінна для типу: компілятор підставляє в неї реальний тип
        аргументу окремо для кожного виклику, зберігаючи точний тип результату без втрати інформації.
      </DemoKeyTakeaway>
    </div>
  );
}
