import { useState } from "react";
import { DemoControls, DemoSlider, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

function getDiscount(cartTotal: number): number {
  if (cartTotal >= 2000) {
    return 20;
  } else if (cartTotal >= 1000) {
    return 10;
  } else {
    return 0;
  }
}

/**
 * Live demo for "Умовні оператори if": a cart-total slider feeding a real
 * if / else if / else discount calculation — dragging across the 1000 and
 * 2000 boundaries visibly switches which branch ran, instead of describing
 * branches in the abstract.
 */
export function IfElseDemo() {
  const [cartTotal, setCartTotal] = useState(650);
  const discount = getDiscount(cartTotal);
  const finalPrice = Math.round(cartTotal * (1 - discount / 100));

  const branch =
    cartTotal >= 2000 ? "if (cartTotal >= 2000)" : cartTotal >= 1000 ? "else if (cartTotal >= 1000)" : "else";

  return (
    <div className={styles.demoStack}>
      <DemoControls>
        <DemoSlider label="Сума кошика" value={cartTotal} onChange={setCartTotal} min={0} max={2500} step={50} unit=" грн" />
      </DemoControls>

      <DemoPreview label="Перетягуй повзунок через межі 1000 і 2000 грн">
        <div className={styles.semanticBlock}>
          <p>Сума кошика: <strong>{cartTotal} грн</strong></p>
          <p>Знижка: <strong>{discount}%</strong></p>
          <p>До сплати: <strong>{finalPrice} грн</strong></p>
          <p><small>Спрацював блок: <code>{branch}</code></small></p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        JavaScript перевіряє умови зверху вниз і виконує ПЕРШИЙ блок, чия умова true — решта навіть не перевіряються.
        Тому порядок гілок важливий: умова {"cartTotal >= 2000"} стоїть першою, інакше сума 2500 ніколи б до неї не дійшла.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`function getDiscount(cartTotal) {
  if (cartTotal >= 2000) {
    return 20;
  } else if (cartTotal >= 1000) {
    return 10;
  } else {
    return 0;
  }
}

getDiscount(${cartTotal}); // ${discount} — спрацював "${branch}"`}
      />

      <DemoKeyTakeaway>
        if/else if/else обирає РІВНО один блок — щойно умова виявилась true, решта гілок ігноруються. Порядок гілок
        від найвужчої (найбільша сума) до найширшої (else) — типовий, надійний патерн для тарифних порогів.
      </DemoKeyTakeaway>
    </div>
  );
}
