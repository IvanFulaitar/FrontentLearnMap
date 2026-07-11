import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Style = "arrow" | "regular";

interface CartLike {
  items: string[];
}

const cartData: CartLike = { items: ["Книга", "Ручка"] };

// A real regular function that expects `this` to be a CartLike — exactly the
// shape of a callback handed to setTimeout/addEventListener without binding.
function regularCallback(this: CartLike) {
  return this.items.join(", ");
}

function runRegular(): string {
  const detached = regularCallback;
  try {
    // @ts-expect-error genuine demonstration: calling without a bound `this`,
    // the same way setTimeout/addEventListener invoke a plain callback.
    return detached();
  } catch {
    return "undefined (this не вказує на cartData)";
  }
}

function runArrow(): string {
  const arrowCallback = () => cartData.items.join(", ");
  return arrowCallback();
}

/**
 * Live demo for "Стрілкові функції": the SAME callback shape, called the
 * way setTimeout/addEventListener would call it (no explicit `this`
 * binding) — a regular function genuinely loses `this` and throws, while
 * the arrow version genuinely keeps it via lexical scope.
 */
export function ArrowThisDemo() {
  const [style, setStyle] = useState<Style>("arrow");
  const result = style === "arrow" ? runArrow() : runRegular();
  const ok = style === "arrow";

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "arrow", label: "Стрілкова функція" },
          { value: "regular", label: "Звичайна function" },
        ]}
        value={style}
        onChange={(value) => setStyle(value as Style)}
      />

      <DemoPreview label="cart.items прочитаний усередині callback-а без явного зв'язування this">
        <div className={styles.semanticBlock}>
          <p>
            Результат: <strong style={{ color: ok ? "#2e7d32" : "#c0392b" }}>{result}</strong>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {style === "arrow"
          ? "Стрілкова функція не має власного this — вона лексично бачить cartData із зовнішньої області визначення, тому cartData.items доступний завжди, незалежно від того, як callback викликаний."
          : "Звичайна function отримує власний this у момент ВИКЛИКУ. Викликана без явного звʼязування (як це робить setTimeout чи addEventListener), this не вказує на cartData — звернення до this.items падає з помилкою."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          style === "arrow"
            ? `const cartData = { items: ["Книга", "Ручка"] };\n\nconst arrowCallback = () => cartData.items.join(", ");\n\nsetTimeout(arrowCallback, 100); // "Книга, Ручка" — this не потрібен, є лексичний cartData`
            : `const cartData = { items: ["Книга", "Ручка"] };\n\nfunction regularCallback() {\n  return this.items.join(", ");\n}\n\nsetTimeout(regularCallback, 100); // помилка — this тут НЕ вказує на cartData`
        }
      />

      <DemoKeyTakeaway>
        Якщо callback передається в інший код (таймер, слухач подій) без явного звʼязування — стрілкова функція
        безпечна за замовчуванням, бо взагалі не залежить від this під час виклику.
      </DemoKeyTakeaway>
    </div>
  );
}
