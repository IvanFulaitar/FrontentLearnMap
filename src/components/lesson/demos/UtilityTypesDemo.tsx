import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface Product {
  title: string;
  price: number;
  inStock: boolean;
}

const fullProduct: Product = { title: "Латте", price: 65, inStock: true };

type UtilityKind = "partial" | "pick" | "omit";

// Real, working transformations (Partial<T>, Pick<T, K>, Omit<T, K> applied for real):
function toPartialUpdate(product: Product): Partial<Product> {
  return { price: product.price };
}
function toPickedSummary(product: Product): Pick<Product, "title" | "price"> {
  return { title: product.title, price: product.price };
}
function toOmittedPublic(product: Product): Omit<Product, "inStock"> {
  const { title, price } = product;
  return { title, price };
}

const DESCRIPTIONS: Record<UtilityKind, { type: string; result: unknown }> = {
  partial: { type: "Partial<Product>", result: toPartialUpdate(fullProduct) },
  pick: { type: 'Pick<Product, "title" | "price">', result: toPickedSummary(fullProduct) },
  omit: { type: 'Omit<Product, "inStock">', result: toOmittedPublic(fullProduct) },
};

/**
 * Live demo for "Утилітні типи": models the real, built-in TypeScript
 * utility types Partial/Pick/Omit applied to a genuine Product interface,
 * each computed by a real function that actually builds the transformed
 * object — showing the real resulting shape for each utility.
 */
export function UtilityTypesDemo() {
  const [kind, setKind] = useState<UtilityKind>("partial");
  const current = DESCRIPTIONS[kind];

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="interface Product { title: string; price: number; inStock: boolean; }">
        <DemoToolbar
          options={[
            { value: "partial", label: "Partial<Product>" },
            { value: "pick", label: 'Pick<Product, "title" | "price">' },
            { value: "omit", label: 'Omit<Product, "inStock">' },
          ]}
          value={kind}
          onChange={(value) => setKind(value as UtilityKind)}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>{current.type}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${styles.tsCompilerBoxOk}`}>
          {`→ реальний результат: ${JSON.stringify(current.result)}`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        Утилітні типи — це готові, вбудовані в TypeScript інструменти для перетворення вже існуючих типів, без
        потреби переписувати їх вручну. Partial&lt;Product&gt; робить УСІ властивості Product необовʼязковими
        (детальніше про ? — у модулі ts-objects) — корисно для обʼєкта часткового оновлення. Pick&lt;Product,
        &quot;title&quot; | &quot;price&quot;&gt; залишає лише перелічені властивості — корисно для короткого
        підсумку. Omit&lt;Product, &quot;inStock&quot;&gt; робить протилежне: залишає всі властивості, КРІМ
        перелічених, — корисно, щоб приховати внутрішнє поле від публічного інтерфейсу.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Partial, Pick і Omit не змінюють оригінальний тип Product — вони створюють НОВИЙ тип на його основі,
        тому оригінальна форма Product лишається доступною для інших частин коду, які потребують повного обʼєкта.
      </DemoKeyTakeaway>
    </div>
  );
}
