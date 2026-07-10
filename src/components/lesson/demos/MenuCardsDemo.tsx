import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type AlignMode = "stretch" | "start";

interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: number;
}

const ITEMS: MenuItem[] = [
  { id: "cappuccino", title: "Капучино", description: "Еспресо, молоко.", price: 75 },
  { id: "filter", title: "Фільтр-кава з м'ятним сиропом і корицею", description: "Наша фірмова, довга варка з додатковими ароматними нотами.", price: 95 },
  { id: "cheesecake", title: "Чізкейк", description: "Класичний Нью-Йорк.", price: 110 },
];

/**
 * Live demo for "Картки меню": click the toolbar to compare Grid's default
 * align-items: stretch (cards in a row match the tallest one) against
 * align-items: start (cards keep their own natural height and go ragged).
 * Click "Додати" on any card to add it to a running order total — a real,
 * poke-able state, not a static illustration of equal-height cards.
 */
export function MenuCardsDemo() {
  const [align, setAlign] = useState<AlignMode>("stretch");
  const [ordered, setOrdered] = useState<Record<string, boolean>>({});

  const total = ITEMS.filter((item) => ordered[item.id]).reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "stretch", label: "Природне вирівнювання (stretch)" },
          { value: "start", label: "Без вирівнювання (start)" },
        ]}
        value={align}
        onChange={(value) => setAlign(value as AlignMode)}
      />

      <DemoPreview label="Клікни «Додати» на будь-якій картці — сума оновиться внизу">
        <div className={align === "stretch" ? styles.mcGridStretch : styles.mcGridStart}>
          {ITEMS.map((item) => {
            const isOrdered = Boolean(ordered[item.id]);
            return (
              <div key={item.id} className={styles.mcCard}>
                <div className={styles.mcContent}>
                  <strong className={styles.mcTitle}>{item.title}</strong>
                  <p className={styles.mcDescription}>{item.description}</p>
                </div>
                <div className={styles.mcFooter}>
                  <span className={styles.mcPrice}>{item.price} грн</span>
                  <button
                    type="button"
                    className={`${styles.mcButton} ${isOrdered ? styles.mcButtonOrdered : ""}`}
                    onClick={() => setOrdered((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                  >
                    {isOrdered ? "Додано ✓" : "Додати"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <p className={styles.mcTotal}>Разом: {total} грн</p>
      </DemoPreview>

      <DemoExplanation>
        {align === "stretch"
          ? "align-items: stretch (значення Grid за замовчуванням) розтягує всі картки одного рядка до висоти найвищої — довгий опис фільтр-кави не робить її картку вищою за сусідні, вони й так усі однакової висоти."
          : "align-items: start повертає кожній картці її природну висоту — тепер видно, що опис фільтр-кави реально довший, і картки стають нерівними в рядку. Саме тому за замовчуванням майже завжди лишають stretch."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={`.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  align-items: ${align === "stretch" ? "stretch" /* за замовчуванням, можна не писати */ : "start"};
}

.menu-card {
  display: flex;
  flex-direction: column;
}

.menu-card-content {
  flex-grow: 1;
}`}
      />

      <DemoKeyTakeaway>
        Grid вирівнює висоту рядка автоматично (stretch), а flex-direction: column + flex-grow: 1 на блоці контенту
        всередині картки притискає ціну й кнопку донизу — обидва механізми працюють незалежно один від одного, тому
        картки різної довжини тексту завжди виглядають акуратно в одному рядку.
      </DemoKeyTakeaway>
    </div>
  );
}
