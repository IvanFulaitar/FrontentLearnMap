import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface Product {
  title: string;
  price: number;
  inStock: boolean;
}

const product: Product = { title: "Латте", price: 65, inStock: true };

// function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const VALID_KEYS: (keyof Product)[] = ["title", "price", "inStock"];
const CANDIDATES = [...VALID_KEYS, "weight"];

/**
 * Live demo for "Основи keyof": models
 * `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]` and
 * really reads the selected key from a genuine Product object — keyof
 * Product real-world evaluates to "title" | "price" | "inStock", so a key
 * like "weight" (not part of the real object) is rejected before it could
 * ever cause a real `undefined` read.
 */
export function KeyofDemo() {
  const [key, setKey] = useState("title");
  const isValidKey = (VALID_KEYS as string[]).includes(key);

  const result = isValidKey ? getProperty(product, key as keyof Product) : undefined;

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]">
        <DemoToolbar options={CANDIDATES.map((item) => ({ value: item, label: item }))} value={key} onChange={setKey} />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>getProperty(product, &quot;{key}&quot;)</span>
          <span className={isValidKey ? styles.tsBadgeOk : styles.tsBadgeErr}>{isValidKey ? "дозволено" : "помилка"}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${isValidKey ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {isValidKey
            ? `keyof Product тут: "title" | "price" | "inStock" — "${key}" входить у цей список.\n→ реальний результат: ${JSON.stringify(result)}`
            : `Argument of type '"${key}"' is not assignable to parameter of type '"title" | "price" | "inStock"'.\n→ keyof Product містить лише реальні назви властивостей Product — "${key}" серед них немає.`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        keyof T — це оператор типу, що перетворює всі назви властивостей типу T на union рядкових літералів
        (детальніше про union і літеральні типи — у модулі ts-basics). Для Product це буквально &quot;title&quot; |
        &quot;price&quot; | &quot;inStock&quot; — рівно ті властивості, які реально є в обʼєкті, і жодної вигаданої.
        K extends keyof T обмежує параметр key лише реальними назвами властивостей T — компілятор не дозволить
        передати рядок, якого серед полів обʼєкта немає, а T[K] — тип значення саме цієї властивості (наприклад,
        Product[&quot;price&quot;] — це number).
      </DemoExplanation>

      <DemoKeyTakeaway>
        keyof T перетворює список властивостей типу на перевірюваний union — це не дає передати назву поля, якого в
        обʼєкті реально немає, і дозволяє T[K] точно знати тип значення для кожного дозволеного ключа.
      </DemoKeyTakeaway>
    </div>
  );
}
