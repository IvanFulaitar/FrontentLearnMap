import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface PriceItem {
  id: string;
  title: string;
  description: string;
  price: string;
}

const ITEMS: PriceItem[] = [
  { id: "espresso", title: "Еспресо", description: "Насичений подвійний еспресо.", price: "45 грн" },
  { id: "cappuccino", title: "Капучино", description: "Еспресо, молоко та ніжна пінка.", price: "85 грн" },
  { id: "latte", title: "Лате", description: "М'який еспресо з великою порцією молока.", price: "75 грн" },
];

function buildCode(recommendedTitle: string): string {
  return `.price-card--recommended {
  border: 3px solid var(--color-primary);
}

.price-card--recommended::before {
  content: "Хіт продажів";
  /* зараз застосовано до картки "${recommendedTitle}" */
}`;
}

/**
 * Live demo for "Прайс-таблиця як картки": a real grid of price cards.
 * Hover any card to see the genuine CSS lift (transform + box-shadow).
 * Click a toolbar option to move the "Хіт продажів" badge + accent border
 * to a different card — the same .price-card--recommended class from the
 * lesson, applied live. Click "Замовити" on any card to toggle its own
 * ordered state, independent of the others.
 */
export function PriceCardsDemo() {
  const [recommended, setRecommended] = useState<string>("cappuccino");
  const [ordered, setOrdered] = useState<Record<string, boolean>>({});

  const recommendedItem = ITEMS.find((item) => item.id === recommended) ?? ITEMS[0];

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={ITEMS.map((item) => ({ value: item.id, label: `Рекомендувати: ${item.title}` }))}
        value={recommended}
        onChange={setRecommended}
      />

      <DemoPreview label="Наведи мишку на картку, клікни «Замовити», або обери іншу рекомендовану вище">
        <div className={styles.pcGrid}>
          {ITEMS.map((item) => {
            const isRecommended = item.id === recommended;
            const isOrdered = Boolean(ordered[item.id]);
            return (
              <div
                key={item.id}
                className={`${styles.pcCard} ${isRecommended ? styles.pcCardRecommended : ""}`}
              >
                {isRecommended ? <span className={styles.pcBadge}>Хіт продажів</span> : null}
                <div className={styles.pcContent}>
                  <strong className={styles.pcTitle}>{item.title}</strong>
                  <p className={styles.pcDescription}>{item.description}</p>
                  <p className={styles.pcPrice}>{item.price}</p>
                </div>
                <button
                  type="button"
                  className={`${styles.pcButton} ${isOrdered ? styles.pcButtonOrdered : ""}`}
                  onClick={() => setOrdered((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                >
                  {isOrdered ? "Замовлено ✓" : "Замовити"}
                </button>
              </div>
            );
          })}
        </div>
      </DemoPreview>

      <DemoExplanation>
        Картка «{recommendedItem.title}» зараз має клас price-card--recommended: товщий border кольору бренду й
        бейдж «Хіт продажів» через ::before. Наведи мишку на будь-яку картку — вона плавно піднімається
        (transform + box-shadow), а кнопка «Замовити» завжди лишається внизу завдяки flex-grow на блоці контенту,
        незалежно від довжини опису.
      </DemoExplanation>

      <DemoCodeSnippet code={buildCode(recommendedItem.title)} />

      <DemoKeyTakeaway>
        Рекомендований варіант — це просто ще один клас (price-card--recommended), який можна навісити на будь-яку
        картку сітки: badge і рамка не прив'язані до конкретного товару, а сама сітка (auto-fit + minmax) не знає
        і не дбає про те, яка картка зараз виділена.
      </DemoKeyTakeaway>
    </div>
  );
}
