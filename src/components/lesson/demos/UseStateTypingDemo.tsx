import { useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface SelectedDrink {
  title: string;
  price: number;
}

const DRINKS: SelectedDrink[] = [
  { title: "Латте", price: 65 },
  { title: "Капучино", price: 60 },
];

/**
 * Live demo for "Типізація useState": a REAL
 * `useState<SelectedDrink | null>(null)` — showing that TypeScript infers
 * the state type from the initial value UNLESS you give it an explicit
 * type parameter, which is required here because `null` alone would give
 * a useless inferred type of just `null`. Real narrowing (`selected ===
 * null`) gates real access to `.title`/`.price`.
 */
export function UseStateTypingDemo() {
  const [selected, setSelected] = useState<SelectedDrink | null>(null);

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="const [selected, setSelected] = useState<SelectedDrink | null>(null);">
        <div className={styles.tsRow}>
          {DRINKS.map((drink) => (
            <button
              key={drink.title}
              type="button"
              onClick={() => setSelected(drink)}
              className={styles.tsBadgeOk}
              style={{ cursor: "pointer" }}
            >
              Обрати {drink.title}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSelected(null)}
            className={styles.tsBadgeErr}
            style={{ cursor: "pointer" }}
          >
            Скинути вибір
          </button>
        </div>

        <div className={`${styles.tsCompilerBox} ${selected !== null ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {selected === null
            ? "selected === null — доступ до selected.title чи selected.price тут заборонений компілятором.\n→ реальний стан: нічого не обрано"
            : `if (selected !== null) звужує тип до SelectedDrink — доступ до .title і .price безпечний.\n→ реальний стан: ${selected.title}, ${selected.price} грн`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        useState(null) без явного параметра типу вивів би тип null для всього стану назавжди — це заважало б колись
        записати туди реальний обʼєкт напою. useState&lt;SelectedDrink | null&gt;(null) явно каже: стан може бути АБО
        обʼєктом SelectedDrink, АБО null, навіть якщо початкове значення — саме null. Це той самий принцип, що й з
        анотацією типу змінної (детальніше — у модулі ts-basics): початкове значення не описує всі майбутні можливі
        стани, тому явна анотація тут необхідна.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Коли початкове значення useState — null чи undefined, але стан пізніше повинен містити реальні дані, завжди
        передавай явний параметр типу: useState&lt;Тип | null&gt;(null), а не покладайся на виведення з самого null.
      </DemoKeyTakeaway>
    </div>
  );
}
