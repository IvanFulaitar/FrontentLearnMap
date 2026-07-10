import { useState } from "react";
import { DemoToolbar, DemoViewport, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "auto-fit" | "auto-fill";

const ITEMS = ["Латте", "Круасан", "Чізкейк"];

/**
 * Live demo for "repeat, minmax і auto-fit": toggle auto-fit vs auto-fill
 * with only 3 real cards inside a resizable viewport — at a width wide
 * enough for 5+ columns, auto-fit stretches the 3 cards to fill the row
 * while auto-fill leaves the extra tracks empty. This is the one
 * distinction the shared grid-demo (column-count slider) never shows.
 */
export function GridAutoFitDemo() {
  const [mode, setMode] = useState<Mode>("auto-fit");
  const [width, setWidth] = useState(640);

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "auto-fit", label: "auto-fit" },
          { value: "auto-fill", label: "auto-fill" },
        ]}
        value={mode}
        onChange={(value) => setMode(value as Mode)}
      />

      <DemoViewport width={width} onWidthChange={setWidth} min={220} max={720}>
        <div className={styles.gaGrid} style={{ gridTemplateColumns: `repeat(${mode}, minmax(140px, 1fr))` }}>
          {ITEMS.map((item) => (
            <div className={styles.gaCard} key={item}>
              {item}
            </div>
          ))}
        </div>
      </DemoViewport>

      <DemoExplanation>
        {mode === "auto-fit"
          ? `Лише ${ITEMS.length} картки, але вони розтягуються на всю доступну ширину — auto-fit "з'їдає" порожні треки і віддає їхній простір наявним елементам.`
          : `Ті самі ${ITEMS.length} картки, але auto-fill залишає порожні (невидимі) треки праворуч, якщо ширина дозволяє більше колонок — картки НЕ розтягуються, лишаючись по 140px.`}
      </DemoExplanation>

      <DemoCodeSnippet code={`grid-template-columns: repeat(${mode}, minmax(140px, 1fr));`} />

      <DemoKeyTakeaway>
        auto-fit і auto-fill підбирають однакову кількість треків — різниця лише в тому, що відбувається із
        "зайвим" простором, коли елементів менше за можливу кількість колонок: auto-fit віддає його наявним
        елементам, auto-fill залишає порожнім.
      </DemoKeyTakeaway>
    </div>
  );
}
