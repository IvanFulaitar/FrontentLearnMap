import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type CartPreset = "filled" | "empty";
type ReduceMode = "withInitial" | "withoutInitial";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

const filledCart: CartItem[] = [
  { name: "Книга", price: 300, quantity: 2 },
  { name: "Ручка", price: 20, quantity: 5 },
];
const emptyCart: CartItem[] = [];

function runReduce(cart: CartItem[], mode: ReduceMode): { result?: number; error?: string } {
  try {
    if (mode === "withInitial") {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { result: total };
    }
    // без початкового значення reduce бере ПЕРШИЙ елемент масиву як стартовий
    // акумулятор — це сам обʼєкт CartItem, а не число, тому колбек нижче
    // навмисно "нетипізований" (as any[]), як і виглядала б ця реальна помилка
    // в звичайному JavaScript без типів; а на порожньому масиві виклик без
    // початкового значення кидає справжній TypeError
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- intentional: shows the
    // untyped-JS mistake for real; typing this properly would make TS reject the bug entirely.
    const total = (cart as any[]).reduce((sum: any, item: any) =>
      (typeof sum === "number" ? sum : sum.price) + item.price
    );
    return { result: total };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Live demo for "Reduce для підсумків": a real .reduce() call, including
 * the genuine TypeError JavaScript throws when .reduce() is called on an
 * EMPTY array with no initial value — caught and displayed as the real
 * thrown error message, not a described abstraction.
 */
export function ReduceTotalsDemo() {
  const [preset, setPreset] = useState<CartPreset>("filled");
  const [mode, setMode] = useState<ReduceMode>("withInitial");
  const cart = preset === "filled" ? filledCart : emptyCart;
  const { result, error } = runReduce(cart, mode);

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Кошик</span>
          <DemoToolbar
            options={[
              { value: "filled", label: "з товарами" },
              { value: "empty", label: "порожній" },
            ]}
            value={preset}
            onChange={(v) => setPreset(v as CartPreset)}
          />
        </div>
        <div className={styles.control}>
          <span>reduce(...)</span>
          <DemoToolbar
            options={[
              { value: "withInitial", label: "з початковим 0" },
              { value: "withoutInitial", label: "без початкового значення" },
            ]}
            value={mode}
            onChange={(v) => setMode(v as ReduceMode)}
          />
        </div>
      </div>

      <DemoPreview label="Реальний виклик cart.reduce(...) для обраної комбінації">
        <div className={styles.semanticBlock}>
          <p>cart: {cart.length} товар(и)</p>
          <p>
            Результат: {error ? (
              <strong style={{ color: "#c0392b" }}>Помилка: {error}</strong>
            ) : (
              <strong style={{ color: "#2e7d32" }}>{result} грн</strong>
            )}
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {error
          ? "Без початкового значення reduce намагається взяти першим акумулятором сам перший елемент масиву — якщо масив порожній, немає навіть цього першого елемента, і JavaScript кидає справжній TypeError."
          : "Початкове значення 0 гарантує коректний старт підсумку незалежно від того, скільки елементів у масиві — навіть якщо масив порожній, результат буде 0, а не помилка."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          mode === "withInitial"
            ? `const total = cart.reduce(\n  (sum, item) => sum + item.price * item.quantity,\n  0 // початкове значення\n);\n// ${error ? "помилка" : `${result} грн`}`
            : `const total = cart.reduce(\n  (sum, item) => sum + item.price * item.quantity\n  // без початкового значення!\n);\n// ${error ? `TypeError: ${error}` : `${result} (працює лише випадково)`}`
        }
      />

      <DemoKeyTakeaway>
        Завжди передавай початкове значення в reduce — без нього код може випадково "працювати" на непорожніх
        масивах, але кидає реальну помилку саме на порожньому масиві, найчастіше в production, а не при тестуванні.
      </DemoKeyTakeaway>
    </div>
  );
}
