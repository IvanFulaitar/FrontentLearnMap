import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface OrderResult {
  message: string;
  guard: string;
}

function processOrder(hasItems: boolean, isLoggedIn: boolean, hasAddress: boolean): OrderResult {
  if (!hasItems) return { message: "Кошик порожній", guard: "if (!hasItems) return ..." };
  if (!isLoggedIn) return { message: "Спочатку увійдіть в акаунт", guard: "if (!isLoggedIn) return ..." };
  if (!hasAddress) return { message: "Вкажіть адресу доставки", guard: "if (!hasAddress) return ..." };
  return { message: "Замовлення оформлено!", guard: "жодна guard-умова не спрацювала — основний шлях" };
}

const YES_NO = [
  { value: "yes", label: "так" },
  { value: "no", label: "ні" },
];

/**
 * Live demo for "Guard-конструкції": three real yes/no toggles (кошик,
 * вхід, адреса) feed a genuine guard-clause function — flipping any switch
 * shows live which guard fired first and what message the user would see,
 * instead of describing early-return logic in the abstract.
 */
export function GuardClauseDemo() {
  const [hasItems, setHasItems] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [hasAddress, setHasAddress] = useState(false);

  const result = processOrder(hasItems, isLoggedIn, hasAddress);

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Є товари в кошику?</span>
          <DemoToolbar options={YES_NO} value={hasItems ? "yes" : "no"} onChange={(value) => setHasItems(value === "yes")} />
        </div>
        <div className={styles.control}>
          <span>Користувач увійшов?</span>
          <DemoToolbar options={YES_NO} value={isLoggedIn ? "yes" : "no"} onChange={(value) => setIsLoggedIn(value === "yes")} />
        </div>
        <div className={styles.control}>
          <span>Адреса вказана?</span>
          <DemoToolbar options={YES_NO} value={hasAddress ? "yes" : "no"} onChange={(value) => setHasAddress(value === "yes")} />
        </div>
      </div>

      <DemoPreview label="Результат функції processOrder для обраних значень">
        <div className={styles.semanticBlock}>
          <p>
            Результат: <strong>{result.message}</strong>
          </p>
          <p>
            <small>Спрацювала умова: <code>{result.guard}</code></small>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        Кожна guard-умова перевіряє один невалідний стан і одразу виходить через return — перша, що спрацює,
        визначає результат, решта навіть не перевіряється. "Щасливий" результат ("Замовлення оформлено!") стоїть
        останнім, без жодної вкладеності.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`function processOrder(hasItems, isLoggedIn, hasAddress) {
  if (!hasItems) return "Кошик порожній";
  if (!isLoggedIn) return "Спочатку увійдіть в акаунт";
  if (!hasAddress) return "Вкажіть адресу доставки";

  return "Замовлення оформлено!";
}

processOrder(${hasItems}, ${isLoggedIn}, ${hasAddress}); // "${result.message}"`}
      />

      <DemoKeyTakeaway>
        Guard-конструкції перевіряють "що не так" першими і одразу виходять — тому основна логіка (тут: успішне
        оформлення) завжди лишається останньою і без вкладених if.
      </DemoKeyTakeaway>
    </div>
  );
}
