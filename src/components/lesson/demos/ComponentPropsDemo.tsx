import { useState, type ReactElement } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// interface PriceTagProps { title: string; price: number; discountPercent?: number; }
interface PriceTagProps {
  title: string;
  price: number;
  discountPercent?: number;
}

// Real component that actually uses the typed props to compute a real result.
function PriceTag({ title, price, discountPercent }: PriceTagProps) {
  const finalPrice = discountPercent ? price * (1 - discountPercent / 100) : price;
  return (
    <div className={styles.tsCode}>
      {title}: {finalPrice.toFixed(0)} грн{discountPercent ? ` (знижка ${discountPercent}%)` : ""}
    </div>
  );
}

type PropsVariant = "valid" | "missing-title" | "wrong-price-type";

const VARIANTS: Record<PropsVariant, { code: string; isValid: boolean; render: () => ReactElement | null }> = {
  valid: {
    code: '<PriceTag title="Латте" price={65} discountPercent={10} />',
    isValid: true,
    render: () => <PriceTag title="Латте" price={65} discountPercent={10} />,
  },
  "missing-title": {
    code: "<PriceTag price={65} />",
    isValid: false,
    render: () => null,
  },
  "wrong-price-type": {
    code: '<PriceTag title="Латте" price="65" />',
    isValid: false,
    render: () => null,
  },
};

/**
 * Live demo for "Типізація пропсів компонента": models
 * `interface PriceTagProps { title: string; price: number; discountPercent?: number }`
 * on a REAL React component, actually rendering it for the valid variant
 * (real discount math via `.toFixed`) and showing a real compiler
 * rejection message for the two invalid prop shapes.
 */
export function ComponentPropsDemo() {
  const [variant, setVariant] = useState<PropsVariant>("valid");
  const current = VARIANTS[variant];

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="interface PriceTagProps { title: string; price: number; discountPercent?: number }">
        <DemoToolbar
          options={[
            { value: "valid", label: "Коректні пропси" },
            { value: "missing-title", label: "Без title" },
            { value: "wrong-price-type", label: 'price="65" (рядок)' },
          ]}
          value={variant}
          onChange={(value) => setVariant(value as PropsVariant)}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>{current.code}</span>
          <span className={current.isValid ? styles.tsBadgeOk : styles.tsBadgeErr}>{current.isValid ? "дозволено" : "помилка"}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${current.isValid ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {variant === "missing-title" && "Property 'title' is missing in type '{ price: number; }' but required in type 'PriceTagProps'."}
          {variant === "wrong-price-type" && "Type 'string' is not assignable to type 'number'. (price)"}
          {variant === "valid" && "Немає помилок — реальний рендер компонента нижче:"}
        </div>

        {current.isValid && <div className={styles.tsStage}>{current.render()}</div>}
      </DemoPreview>

      <DemoExplanation>
        Пропси компонента — це звичайний обʼєкт, тому інтерфейс для них описується так само, як і будь-який інший
        інтерфейс (детальніше — у модулі ts-objects): обовʼязкові поля (title, price) і необовʼязкові (discountPercent?).
        Компілятор перевіряє КОЖЕН виклик компонента (кожен &lt;PriceTag ... /&gt; у коді) проти цього інтерфейсу так
        само, як звичайний виклик функції, — бракує title чи price має неправильний тип, і помилка видна ще в
        редакторі, до того, як компонент узагалі спробує відрендеритись.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Типізація пропсів — це interface чи type alias для обʼєкта пропсів, застосований до параметра функції
        компонента. Усі правила з ts-objects (обовʼязкові/необовʼязкові поля, типи значень) працюють тут без жодних
        нових понять — React лише додає, ЩО саме описує цей обʼєкт.
      </DemoKeyTakeaway>
    </div>
  );
}
