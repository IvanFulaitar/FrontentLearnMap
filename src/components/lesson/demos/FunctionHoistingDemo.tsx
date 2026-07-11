import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Kind = "declaration" | "expression";
type Order = "before" | "after";

function getDiscountDeclaration(cartTotal: number): number {
  return cartTotal * 0.2;
}

const getDiscountExpression = (cartTotal: number): number => cartTotal * 0.2;

interface Outcome {
  ok: boolean;
  text: string;
}

function computeOutcome(kind: Kind, order: Order): Outcome {
  // function-declaration works no matter the call order (fully hoisted);
  // function-expression / arrow only works when called after its definition line.
  if (kind === "declaration" || order === "after") {
    const value = kind === "declaration" ? getDiscountDeclaration(1000) : getDiscountExpression(1000);
    return { ok: true, text: `getDiscount(1000) = ${value}` };
  }
  return { ok: false, text: "ReferenceError: Cannot access 'getDiscount' before initialization" };
}

/**
 * Live demo for "Оголошення функцій": toggling declaration/expression style
 * and call order (before/after the definition line) shows exactly when
 * hoisting saves you and when it throws a real ReferenceError.
 */
export function FunctionHoistingDemo() {
  const [kind, setKind] = useState<Kind>("declaration");
  const [order, setOrder] = useState<Order>("before");
  const outcome = computeOutcome(kind, order);

  const declCode =
    order === "before"
      ? `console.log(getDiscount(1000));\n\nfunction getDiscount(cartTotal) {\n  return cartTotal * 0.2;\n}`
      : `function getDiscount(cartTotal) {\n  return cartTotal * 0.2;\n}\n\nconsole.log(getDiscount(1000));`;

  const exprCode =
    order === "before"
      ? `console.log(getDiscount(1000)); // виклик ДО визначення\n\nconst getDiscount = (cartTotal) => cartTotal * 0.2;`
      : `const getDiscount = (cartTotal) => cartTotal * 0.2;\n\nconsole.log(getDiscount(1000)); // виклик ПІСЛЯ визначення`;

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Стиль оголошення</span>
          <DemoToolbar
            options={[
              { value: "declaration", label: "function decl." },
              { value: "expression", label: "const = () =>" },
            ]}
            value={kind}
            onChange={(value) => setKind(value as Kind)}
          />
        </div>
        <div className={styles.control}>
          <span>Коли викликати</span>
          <DemoToolbar
            options={[
              { value: "before", label: "до визначення" },
              { value: "after", label: "після визначення" },
            ]}
            value={order}
            onChange={(value) => setOrder(value as Order)}
          />
        </div>
      </div>

      <DemoPreview label="Результат виклику getDiscount(1000) для обраної комбінації">
        <div className={styles.semanticBlock}>
          <p>
            Результат: <strong style={{ color: outcome.ok ? "#2e7d32" : "#c0392b" }}>{outcome.ok ? "успіх" : "помилка"}</strong>
          </p>
          <p>
            <code>{outcome.text}</code>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {kind === "declaration"
          ? "function-declaration піднімається наверх ПОВНІСТЮ, разом з тілом — виклик працює незалежно від порядку в коді."
          : order === "before"
            ? "const-присвоєння (включно зі стрілковою функцією) піднімається лише як змінна, без значення — звернення до неї до рядка визначення кидає ReferenceError."
            : "Викликана ПІСЛЯ рядка визначення, стрілкова функція працює без проблем — TDZ вже завершилась."}
      </DemoExplanation>

      <DemoCodeSnippet code={kind === "declaration" ? declCode : exprCode} />

      <DemoKeyTakeaway>
        function-declaration прощає будь-який порядок викликів завдяки повному hoisting. function-expression і стрілкові
        функції прощають лише порядок "спочатку визначення, потім виклик".
      </DemoKeyTakeaway>
    </div>
  );
}
