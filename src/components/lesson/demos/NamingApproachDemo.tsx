import { useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Approach = "bem" | "modules" | "utility";

const CODE: Record<Approach, string> = {
  bem: `<div class="card">
  <h3 class="card__title card__title--large">Латте</h3>
  <button class="card__button card__button--primary">Купити</button>
</div>`,
  modules: `<div className={styles.card}>
  <h3 className={styles.titleLarge}>Латте</h3>
  <button className={styles.buttonPrimary}>Купити</button>
</div>`,
  utility: `<div class="rounded-lg shadow p-4">
  <h3 class="text-lg font-bold">Латте</h3>
  <button class="bg-orange-600 text-white px-4 py-2 rounded">Купити</button>
</div>`,
};

const NOTE: Record<Approach, string> = {
  bem: "БЕМ кодує і структуру (__title = елемент), і варіант (--large = модифікатор) прямо в довгому імені класу. Ізоляція від конфліктів тримається лише на дисципліні: якщо хтось в іншому файлі теж напише .card__title, вони зіткнуться.",
  modules: "CSS Modules дозволяють короткі, прості імена (titleLarge) — конфлікт технічно неможливий, бо збірка згенерує унікальне ім'я для кожного файлу. Саме цей підхід використовує застосунок, у якому ти зараз навчаєшся.",
  utility: "Utility-first взагалі не має власного CSS-файлу для картки — усі стилі це готові одноцільові класи прямо в розмітці. CSS-файлів менше, але className у розмітці стає довшим і менш описовим.",
};

/**
 * Live demo for "БЕМ проти CSS Modules проти utility-first": a toolbar
 * swaps between the three real naming approaches while the rendered card
 * stays visually identical — the point of this lesson is that all three
 * produce the same result, and only the underlying code differs.
 */
export function NamingApproachDemo() {
  const [approach, setApproach] = useState<Approach>("bem");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "bem", label: "БЕМ" },
          { value: "modules", label: "CSS Modules" },
          { value: "utility", label: "Utility-first" },
        ]}
        value={approach}
        onChange={(value) => setApproach(value as Approach)}
      />

      <div className={styles.naCard}>
        <h3 className={styles.naCardTitle}>Латте</h3>
        <button type="button" className={styles.naCardButton}>
          Купити
        </button>
      </div>

      <DemoExplanation>{NOTE[approach]}</DemoExplanation>

      <DemoCodeSnippet code={CODE[approach]} />

      <DemoKeyTakeaway>
        Візуальний результат картки вище однаковий незалежно від обраного підходу — БЕМ, CSS Modules і
        utility-first вирішують ту саму проблему (організація й ізоляція стилів) по-різному, і жоден з них не є
        "єдиним правильним"; важливіше, щоб уся команда послідовно дотримувалась одного підходу.
      </DemoKeyTakeaway>
    </div>
  );
}
