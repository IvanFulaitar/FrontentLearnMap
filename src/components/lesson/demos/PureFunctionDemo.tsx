import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Approach = "pure" | "impure";

function addItemPure(cart: number[], price: number): number[] {
  return [...cart, price]; // new array — original cart is never touched
}

function addItemImpure(cart: number[], price: number): number[] {
  cart.push(price); // mutates the original array in place
  return cart;
}

const INITIAL_CART = [100, 250];

/**
 * Live demo for "Чисті функції": a real shared array (kept in a ref so it
 * survives across calls like a real "original" object) is passed into
 * either a pure or an impure add-item function. The impure version
 * genuinely mutates the original array — you can watch its contents grow
 * even though only the "result" was supposed to change.
 */
export function PureFunctionDemo() {
  const [approach, setApproach] = useState<Approach>("impure");
  const cartRef = useRef<number[]>([...INITIAL_CART]);
  const [resultCart, setResultCart] = useState<number[] | null>(null);
  const [, forceRerender] = useState(0);

  const reset = (next: Approach) => {
    setApproach(next);
    cartRef.current = [...INITIAL_CART];
    setResultCart(null);
  };

  const handleAdd = () => {
    const price = 50;
    const result = approach === "pure" ? addItemPure(cartRef.current, price) : addItemImpure(cartRef.current, price);
    setResultCart(result);
    forceRerender((t) => t + 1);
  };

  const originalMutated = approach === "impure" && resultCart !== null;

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Реалізація addItem</span>
          <DemoToolbar
            options={[
              { value: "pure", label: "чиста: [...cart, price]" },
              { value: "impure", label: "нечиста: cart.push(price)" },
            ]}
            value={approach}
            onChange={(value) => reset(value as Approach)}
          />
        </div>
      </div>

      <DemoPreview label="Реальний оригінальний масив і результат addItem(originalCart, 50)">
        <div className={styles.semanticBlock}>
          <p>
            Оригінальний масив (originalCart): <strong style={{ color: originalMutated ? "#c0392b" : "#2e7d32" }}>
              [{cartRef.current.join(", ")}]
            </strong>
          </p>
          <p>
            Результат функції: <strong>{resultCart ? `[${resultCart.join(", ")}]` : "ще не викликано"}</strong>
          </p>
          {originalMutated && (
            <p><small>Оригінальний масив ЗМІНИВСЯ, хоча очікувалось, що addItem лише поверне новий результат.</small></p>
          )}
          <button type="button" onClick={handleAdd}>
            Викликати addItem(originalCart, 50)
          </button>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {approach === "pure"
          ? "addItemPure повертає НОВИЙ масив через spread — originalCart залишається незмінним після виклику, результат живе окремо."
          : "addItemImpure викликає cart.push(...) на переданому масиві — це та сама структура в пам'яті, що й originalCart, тому зміна видима одразу й там, звідки originalCart використовується деінде."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          approach === "pure"
            ? `function addItem(cart, price) {\n  return [...cart, price]; // новий масив\n}\n\nconst originalCart = [100, 250];\nconst result = addItem(originalCart, 50);\n// originalCart: [100, 250] — не змінився\n// result: [100, 250, 50]`
            : `function addItem(cart, price) {\n  cart.push(price); // мутація!\n  return cart;\n}\n\nconst originalCart = [100, 250];\nconst result = addItem(originalCart, 50);\n// originalCart: [100, 250, 50] — змінився!\n// result === originalCart (те саме посилання)`
        }
      />

      <DemoKeyTakeaway>
        Чиста функція — однакові аргументи завжди дають однаковий результат і НЕ змінюють нічого поза собою. Нечиста
        функція, що мутує переданий масив/обʼєкт, створює побічний ефект, який легко пропустити при код-рев'ю.
      </DemoKeyTakeaway>
    </div>
  );
}
