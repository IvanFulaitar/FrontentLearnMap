import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type IndexChoice = "0" | "2" | "last" | "outOfRange" | "negative";

const products = ["Книга", "Ручка", "Зошит", "Лінійка"];

function resolveIndex(choice: IndexChoice): number {
  if (choice === "0") return 0;
  if (choice === "2") return 2;
  if (choice === "last") return products.length - 1;
  if (choice === "negative") return -1;
  return products.length; // одна позиція за межами масиву
}

/**
 * Live demo for "Створення масивів і доступ до елементів": a real 4-item
 * array, indexed with genuinely computed indices (including out-of-range
 * and negative) — products[index] is a real expression evaluated live,
 * not a described lookup.
 */
export function ArrayAccessDemo() {
  const [choice, setChoice] = useState<IndexChoice>("0");
  const index = resolveIndex(choice);
  const value = products[index];

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Індекс</span>
          <DemoToolbar
            options={[
              { value: "0", label: "0 (перший)" },
              { value: "2", label: "2" },
              { value: "last", label: "length - 1 (останній)" },
              { value: "negative", label: "-1" },
              { value: "outOfRange", label: "length (за межами)" },
            ]}
            value={choice}
            onChange={(v) => setChoice(v as IndexChoice)}
          />
        </div>
      </div>

      <DemoPreview label="Реальний масив products і products[index] для обраного індексу">
        <div className={styles.semanticBlock}>
          <p>
            products = [{products.map((p) => `"${p}"`).join(", ")}], products.length = {products.length}
          </p>
          <p>
            products[{index}] = <strong style={{ color: value === undefined ? "#c0392b" : "#2e7d32" }}>
              {value === undefined ? "undefined" : `"${value}"`}
            </strong>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {choice === "negative"
          ? "products[-1] НЕ повертає останній елемент, як у деяких інших мовах — JavaScript шукає властивість з ключем \"-1\", якої немає, тому результат undefined."
          : choice === "outOfRange"
            ? "products[products.length] звертається до позиції ОДРАЗУ за останнім елементом — такого індексу не існує, і JavaScript тихо повертає undefined, без помилки."
            : choice === "last"
              ? "Останній елемент масиву завжди на позиції length - 1, а не length — це найпоширеніша причина off-by-one помилки."
              : "products[index] звертається до елемента на вказаній позиції — індексація починається з 0."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={`const products = ["Книга", "Ручка", "Зошит", "Лінійка"];\n\nproducts[${index}]; // ${value === undefined ? "undefined" : `"${value}"`}\nproducts.length; // ${products.length}`}
      />

      <DemoKeyTakeaway>
        Звернення за межами масиву (чи за від'ємним індексом без спеціального синтаксису) не кидає помилку — воно
        просто повертає undefined. Останній елемент — завжди products[products.length - 1].
      </DemoKeyTakeaway>
    </div>
  );
}
