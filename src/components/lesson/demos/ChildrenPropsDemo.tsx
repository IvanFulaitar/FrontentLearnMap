import { useState, type ReactNode } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// interface CardProps { children: ReactNode; }
interface CardProps {
  children: ReactNode;
}

function Card({ children }: CardProps) {
  return <div className={`${styles.tsCompilerBox} ${styles.tsCompilerBoxOk}`}>{children}</div>;
}

type ChildrenVariant = "text" | "number" | "element" | "list";

const VARIANTS: Record<ChildrenVariant, { code: string; render: () => ReactNode }> = {
  text: { code: '<Card>Латте — 65 грн</Card>', render: () => "Латте — 65 грн" },
  number: { code: "<Card>{65}</Card>", render: () => 65 },
  element: {
    code: "<Card><strong>Латте</strong> — 65 грн</Card>",
    render: () => (
      <>
        <strong>Латте</strong> — 65 грн
      </>
    ),
  },
  list: {
    code: "<Card>{[\"Латте\", \"Капучино\"].map(...)}</Card>",
    render: () => (
      <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
        {["Латте", "Капучино"].map((drink) => (
          <li key={drink}>{drink}</li>
        ))}
      </ul>
    ),
  },
};

/**
 * Live demo for "Типізація children": models
 * `interface CardProps { children: ReactNode }` on a REAL component and
 * actually renders four genuinely different, all-valid children values
 * (string, number, JSX element, array of elements) — showing that
 * ReactNode really does cover this whole range, unlike a narrower type
 * like `string` would.
 */
export function ChildrenPropsDemo() {
  const [variant, setVariant] = useState<ChildrenVariant>("text");
  const current = VARIANTS[variant];

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="interface CardProps { children: ReactNode }">
        <DemoToolbar
          options={[
            { value: "text", label: "Рядок" },
            { value: "number", label: "Число" },
            { value: "element", label: "JSX-елемент" },
            { value: "list", label: "Масив елементів" },
          ]}
          value={variant}
          onChange={(value) => setVariant(value as ChildrenVariant)}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>{current.code}</span>
          <span className={styles.tsBadgeOk}>дозволено</span>
        </div>

        <Card>{current.render()}</Card>
      </DemoPreview>

      <DemoExplanation>
        ReactNode — це вбудований у типи React union, що охоплює все, що компонент реально МОЖЕ повернути чи прийняти
        як children: рядок, число, JSX-елемент, масив елементів, null, undefined, boolean. Якби children типізували
        вужче — наприклад, просто string — три з чотирьох варіантів вище одразу стали б помилками компілятора, хоча
        всі вони реально коректно рендеряться в React. ReactNode обирають саме тому, що діапазон дозволених значень
        children у реальному React ширший, ніж здається спочатку.
      </DemoExplanation>

      <DemoKeyTakeaway>
        children: ReactNode — стандартний спосіб типізувати вміст, переданий між відкриваючим і закриваючим тегом
        компонента; вужчий тип тут майже завжди помилково забороняє щось, що React реально вміє відрендерити.
      </DemoKeyTakeaway>
    </div>
  );
}
