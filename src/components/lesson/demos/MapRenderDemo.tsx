import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "fixed" | "bug";

const prices = [100, 250, 400];

function doubleWithReturn(price: number): number {
  return price * 2;
}

function doubleWithoutReturn(price: number): undefined {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- intentional: this
  // variable is computed but deliberately never returned, the exact bug this demo shows.
  const doubled = price * 2;
}

/**
 * Live demo for "Map і рендер списків": the SAME array, mapped by a
 * callback that either genuinely returns the doubled price or genuinely
 * forgets to — the rendered list below is built from the REAL result of
 * .map(), including real `undefined` entries in bug mode.
 */
export function MapRenderDemo() {
  const [mode, setMode] = useState<Mode>("fixed");
  const doubled = mode === "fixed" ? prices.map(doubleWithReturn) : prices.map(doubleWithoutReturn);

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Callback у .map()</span>
          <DemoToolbar
            options={[
              { value: "fixed", label: "з return" },
              { value: "bug", label: "без return (баг)" },
            ]}
            value={mode}
            onChange={(v) => setMode(v as Mode)}
          />
        </div>
      </div>

      <DemoPreview label="Реальний результат prices.map(callback), відрендерений як список">
        <div className={styles.semanticBlock}>
          <p>prices = [{prices.join(", ")}]</p>
          <ul>
            {doubled.map((value, i) => (
              <li key={i} style={{ color: value === undefined ? "#c0392b" : "inherit" }}>
                {value === undefined ? "undefined" : value}
              </li>
            ))}
          </ul>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "fixed"
          ? ".map() повертає НОВИЙ масив тієї ж довжини — кожен елемент замінений на значення, яке явно повернув callback."
          : "Callback обчислює doubled, але не повертає його — .map() кладе у новий масив те, що ФАКТИЧНО повернув callback, а це undefined для кожного елемента, попри виконану роботу всередині."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          mode === "fixed"
            ? `function double(price) {\n  return price * 2;\n}\n\nprices.map(double); // [${doubled.join(", ")}]`
            : `function double(price) {\n  const doubled = price * 2; // забутий return!\n}\n\nprices.map(double); // [undefined, undefined, undefined]`
        }
      />

      <DemoKeyTakeaway>
        .map() завжди повертає масив ТІЄЇ Ж довжини, що й оригінал, — кожна позиція заповнюється тим, що callback
        реально повернув. Забутий return у callback-у дає масив undefined, а не помилку.
      </DemoKeyTakeaway>
    </div>
  );
}
