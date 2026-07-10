import { useState } from "react";
import { DemoControls, DemoSlider, DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type BoundaryMode = "correct" | "buggy";

const ALL_ITEMS = ["Ноутбук", "Мишка", "Клавіатура", "Монітор", "Навушники", "Вебкамера", "Килимок", "USB-хаб"];

function runLoop(items: string[], mode: BoundaryMode): string[] {
  const limit = mode === "correct" ? items.length : items.length + 1;
  const result: string[] = [];
  for (let i = 0; i < limit; i++) {
    result.push(items[i] === undefined ? "undefined" : `${i + 1}. ${items[i]}`);
  }
  return result;
}

/**
 * Live demo for "Цикли та ітерація": a real `for` loop renders a slider-sized
 * slice of a product array, with a toggle between the correct boundary
 * (`i < items.length`) and the classic off-by-one bug (`i <= items.length`)
 * — flipping the toggle makes an extra `undefined` row appear live.
 */
export function LoopDemo() {
  const [itemCount, setItemCount] = useState(4);
  const [mode, setMode] = useState<BoundaryMode>("correct");
  const items = ALL_ITEMS.slice(0, itemCount);
  const output = runLoop(items, mode);
  const condition = mode === "correct" ? "i < items.length" : "i <= items.length";

  return (
    <div className={styles.demoStack}>
      <DemoControls>
        <DemoSlider label="Кількість товарів" value={itemCount} onChange={setItemCount} min={2} max={8} step={1} />
      </DemoControls>

      <DemoToolbar
        options={[
          { value: "correct", label: "i < items.length" },
          { value: "buggy", label: "i <= items.length" },
        ]}
        value={mode}
        onChange={(value) => setMode(value as BoundaryMode)}
      />

      <DemoPreview label="Результат циклу for над масивом товарів">
        <div className={styles.semanticBlock}>
          {output.map((line, index) => (
            <p key={index} style={line === "undefined" ? { color: "#c0392b", fontWeight: 700 } : undefined}>
              {line}
            </p>
          ))}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "correct"
          ? "i < items.length зупиняється рівно на останньому валідному індексі — усі товари виводяться, без зайвих рядків."
          : "i <= items.length дозволяє i дійти до items.length, а такого індексу в масиві немає — останній рядок виводить undefined."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={`for (let i = 0; ${condition}; i++) {
  console.log(items[i]);
}
// ${mode === "correct" ? `усі ${items.length} товарів виведені коректно` : "останній рядок: undefined — off-by-one помилка"}`}
      />

      <DemoKeyTakeaway>
        Правило просте: для .length завжди &lt; , ніколи &lt;=. Один зайвий символ означає звернення за межі масиву й
        undefined замість реального значення.
      </DemoKeyTakeaway>
    </div>
  );
}
