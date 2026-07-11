import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type ProductKind = "withDiscount" | "withoutDiscount";

interface Product {
  name: string;
  price: number;
  discount?: number;
}

const productWithDiscount: Product = { name: "Книга", price: 300, discount: 10 };
const productWithoutDiscount: Product = { name: "Ручка", price: 20 };

function getFinalPrice({ price, discount = 0 }: Product): number {
  return price - price * (discount / 100);
}

function getFinalPriceNoDefault(product: Product): number {
  // Genuine bug: no default for discount
  const { price, discount } = product as { price: number; discount: number };
  return price - price * (discount / 100);
}

/**
 * Live demo for "Деструктуризація": a real destructuring call against two
 * actual product objects, toggling between destructuring WITH a default
 * value (discount = 0) and WITHOUT one — the buggy mode genuinely produces
 * NaN for the product with no discount field, not a described outcome.
 */
export function DestructuringDemo() {
  const [kind, setKind] = useState<ProductKind>("withoutDiscount");
  const [useDefault, setUseDefault] = useState(true);
  const product = kind === "withDiscount" ? productWithDiscount : productWithoutDiscount;
  const price = useDefault ? getFinalPrice(product) : getFinalPriceNoDefault(product);

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Товар</span>
          <DemoToolbar
            options={[
              { value: "withDiscount", label: "зі знижкою" },
              { value: "withoutDiscount", label: "без знижки" },
            ]}
            value={kind}
            onChange={(v) => setKind(v as ProductKind)}
          />
        </div>
        <div className={styles.control}>
          <span>Деструктуризація</span>
          <DemoToolbar
            options={[
              { value: "default", label: "{ discount = 0 }" },
              { value: "noDefault", label: "БАГ: { discount }" },
            ]}
            value={useDefault ? "default" : "noDefault"}
            onChange={(v) => setUseDefault(v === "default")}
          />
        </div>
      </div>

      <DemoPreview label="Реальний результат getFinalPrice(product)">
        <div className={styles.semanticBlock}>
          <p>product: {JSON.stringify(product)}</p>
          <p>
            Кінцева ціна: <strong style={{ color: Number.isNaN(price) ? "#c0392b" : "#2e7d32" }}>
              {Number.isNaN(price) ? "NaN" : price}
            </strong>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {Number.isNaN(price)
          ? "Без значення за умовчанням discount дорівнює undefined для товару без знижки — undefined / 100 дає NaN, і весь розрахунок ламається."
          : "discount = 0 в деструктуризації параметра дає 0 замість undefined, коли властивість discount відсутня — розрахунок працює коректно для будь-якого товару."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          useDefault
            ? `function getFinalPrice({ price, discount = 0 }) {\n  return price - price * (discount / 100);\n}\n// ${price}`
            : `function getFinalPrice({ price, discount }) {\n  return price - price * (discount / 100);\n}\n// ${Number.isNaN(price) ? "NaN" : price}`
        }
      />

      <DemoKeyTakeaway>
        Значення за умовчанням у деструктуризації ({"{ discount = 0 }"}) застосовується лише коли властивість
        дорівнює саме undefined — завжди додавай його для полів, які реально можуть бути відсутні.
      </DemoKeyTakeaway>
    </div>
  );
}
