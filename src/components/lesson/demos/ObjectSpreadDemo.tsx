import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Order = "correct" | "wrong";

const settings = { theme: "dark", fontSize: 14 };

function updateThemeCorrect(newTheme: string) {
  return { ...settings, theme: newTheme };
}

function updateThemeWrong(newTheme: string) {
  // Genuine bug: spread AFTER the field overwrites it back. Built via
  // Object.assign (equivalent runtime order to { theme: newTheme, ...settings })
  // instead of a literal, since TS flags a literal with a duplicate key as
  // an error (TS2783) even when the overwrite is the intentional point.
  return Object.assign({ theme: newTheme }, settings);
}

const codeFor: Record<Order, string> = {
  correct: `return { ...settings, theme: newTheme };\n// спред ПЕРШИМ, theme ПІСЛЯ — theme гарантовано оновлюється`,
  wrong: `return { theme: newTheme, ...settings };\n// БАГ: ...settings йде ПІСЛЯ і перезаписує theme назад`,
};

/**
 * Live demo for "Синтаксис spread": a real object-spread merge, toggling
 * between the correct order ({ ...settings, theme: newTheme }) and the
 * buggy order ({ theme: newTheme, ...settings }) — the resulting object
 * shown is the ACTUAL merge result, proving the order bug live.
 */
export function ObjectSpreadDemo() {
  const [order, setOrder] = useState<Order>("correct");
  const result = order === "correct" ? updateThemeCorrect("light") : updateThemeWrong("light");
  const themeChanged = result.theme === "light";

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Порядок spread</span>
          <DemoToolbar
            options={[
              { value: "correct", label: "{ ...settings, theme }" },
              { value: "wrong", label: "БАГ: { theme, ...settings }" },
            ]}
            value={order}
            onChange={(v) => setOrder(v as Order)}
          />
        </div>
      </div>

      <DemoPreview label="Реальний результат обʼєднання { ...settings, theme: 'light' } vs навпаки">
        <div className={styles.semanticBlock}>
          <p>Оригінал settings: {JSON.stringify(settings)}</p>
          <p>
            Результат: <strong style={{ color: themeChanged ? "#2e7d32" : "#c0392b" }}>
              {JSON.stringify(result)}
            </strong>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {order === "correct"
          ? "...settings розгортається ПЕРШИМ, а theme: newTheme йде ПІСЛЯ — тому нове значення theme гарантовано перезаписує старе з settings."
          : "theme: newTheme встановлюється ПЕРШИМ, але ...settings розгортається ПІСЛЯ і його theme (\"dark\") перезаписує щойно встановлене значення назад — theme НЕ змінюється, хоча код виглядає так, ніби мав."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[order]} />

      <DemoKeyTakeaway>
        У {"{ ...a, ...b }"} властивості, розташовані ПІЗНІШЕ, перезаписують однойменні, розташовані РАНІШЕ.
        Щоб конкретне поле гарантовано "перемогло", спред має йти першим, а поле — останнім.
      </DemoKeyTakeaway>
    </div>
  );
}
