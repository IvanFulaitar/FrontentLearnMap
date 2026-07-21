import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// interface PriceList { [productName: string]: number; }
const PRICE_LIST: Record<string, number> = {
  Латте: 65,
  Капучино: 60,
  Американо: 50,
};

const LOOKUP_KEYS = ["Латте", "Капучино", "Американо", "Раф"];

/**
 * Live demo for "Індексні сигнатури": models `[productName: string]:
 * number` on a real object, then performs a genuine dynamic property
 * lookup for whichever key is selected, including a key that is genuinely
 * absent — showing the real `undefined` result an index signature allows
 * TypeScript to hide unless `noUncheckedIndexedAccess` is considered.
 */
export function IndexSignatureDemo() {
  const [key, setKey] = useState("Латте");
  const value = PRICE_LIST[key];
  const exists = key in PRICE_LIST;

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="interface PriceList { [productName: string]: number; }">
        <DemoToolbar options={LOOKUP_KEYS.map((item) => ({ value: item, label: item }))} value={key} onChange={setKey} />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>priceList[&quot;{key}&quot;]</span>
          <span className={exists ? styles.tsBadgeOk : styles.tsBadgeErr}>{exists ? "є в обʼєкті" : "відсутнє в обʼєкті"}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${exists ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {exists
            ? `Тип за індексною сигнатурою: number\n→ реальний результат: ${value}`
            : `Тип за індексною сигнатурою: number (компілятор так вважає для БУДЬ-ЯКОГО рядкового ключа)\n→ реальний результат виконання: ${String(value)}\n\nІндексна сигнатура [productName: string]: number обіцяє, що ЛЮБИЙ рядковий ключ поверне number — але "${key}" реально відсутній в обʼєкті, тому JavaScript насправді повертає undefined. Компілятор цього не бачить: він довіряє обіцянці індексної сигнатури, а не факту, що саме цього ключа немає.`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        [productName: string]: number — це індексна сигнатура: вона описує обʼєкт, у якого можуть бути будь-які
        рядкові ключі, і кожен із них веде до значення типу number. Це зручно, коли наперед невідомо, скільки саме
        властивостей буде в обʼєкті і які точно ключі там опиняться. Але ця зручність має ціну: компілятор ВІРИТЬ
        обіцянці індексної сигнатури для будь-якого ключа, навіть того, якого реально немає в обʼєкті, — тому
        priceList["Раф"] має тип number за типами, хоча насправді поверне undefined під час виконання.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Індексна сигнатура дозволяє довільні ключі, але не гарантує, що конкретний ключ реально існує в обʼєкті —
        типи тут оптимістичніші за реальність, тож завжди варто перевіряти результат перед використанням.
      </DemoKeyTakeaway>
    </div>
  );
}
