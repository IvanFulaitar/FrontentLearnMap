import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Style = "function" | "arrow";
type HasReturn = "yes" | "no";

function calcWithReturn(price: number, qty: number): number {
  const total = price * qty;
  return total;
}

function calcWithoutReturn(price: number, qty: number): undefined {
  const total = price * qty; // computed, but never handed back to the caller
}

const doubleImplicit = (n: number): number => n * 2;
const doubleBlockNoReturn = (n: number): undefined => {
  n * 2; // computed, but the block body never returns it
};

/**
 * Live demo for "Значення, що повертаються": the SAME calculation, with and
 * without a real `return`, shown for both a regular function and an arrow
 * function's block body — genuinely returns `undefined` when the return is
 * missing, not a described abstraction.
 */
export function ReturnValueDemo() {
  const [style, setStyle] = useState<Style>("function");
  const [hasReturn, setHasReturn] = useState<HasReturn>("no");

  let result: number | undefined;
  if (style === "function") {
    result = hasReturn === "yes" ? calcWithReturn(150, 3) : calcWithoutReturn(150, 3);
  } else {
    result = hasReturn === "yes" ? doubleImplicit(5) : doubleBlockNoReturn(5);
  }

  const ok = result !== undefined;

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Стиль функції</span>
          <DemoToolbar
            options={[
              { value: "function", label: "function calcTotal" },
              { value: "arrow", label: "(n) => {...} блок" },
            ]}
            value={style}
            onChange={(value) => setStyle(value as Style)}
          />
        </div>
        <div className={styles.control}>
          <span>return у тілі</span>
          <DemoToolbar
            options={[
              { value: "yes", label: "є return" },
              { value: "no", label: "немає return" },
            ]}
            value={hasReturn}
            onChange={(value) => setHasReturn(value as HasReturn)}
          />
        </div>
      </div>

      <DemoPreview label="Реальний виклик функції для обраної комбінації">
        <div className={styles.semanticBlock}>
          <p>
            Результат: <strong style={{ color: ok ? "#2e7d32" : "#c0392b" }}>{ok ? result : "undefined"}</strong>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {hasReturn === "yes"
          ? "Обчислене значення явно повертається через return (чи implicit return без {}) — викликаючий код отримує реальний результат."
          : "Значення обчислюється всередині функції, але без return воно нікуди не передається — виклик функції дає undefined, навіть попри виконану роботу."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          style === "function"
            ? hasReturn === "yes"
              ? `function calculateTotal(price, qty) {\n  const total = price * qty;\n  return total;\n}\n\ncalculateTotal(150, 3); // ${result}`
              : `function calculateTotal(price, qty) {\n  const total = price * qty; // забутий return!\n}\n\ncalculateTotal(150, 3); // undefined`
            : hasReturn === "yes"
              ? `const double = (n) => n * 2; // implicit return, без {}\n\ndouble(5); // ${result}`
              : `const double = (n) => {\n  n * 2; // забутий return усередині {}\n};\n\ndouble(5); // undefined`
        }
      />

      <DemoKeyTakeaway>
        Функція без return завжди дає undefined, незалежно від того, скільки корисної роботи виконано всередині —
        для стрілкової функції з {"{}"} те саме правило: implicit return працює лише без фігурних дужок.
      </DemoKeyTakeaway>
    </div>
  );
}
