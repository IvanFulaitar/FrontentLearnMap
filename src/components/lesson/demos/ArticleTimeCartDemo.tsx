import { useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

const RELATIVE_LABELS = ["10 липня 2026", "3 дні тому", "щойно"];

/**
 * Live demo for "Стаття блогу і картка товару": cycling the VISIBLE text
 * of a real <time datetime="2026-07-10"> while the machine-readable
 * datetime attribute stays fixed — and a real "Додати в кошик" contrast
 * between <a href="#"> (jumps to top of the demo — a real, visible side
 * effect) and a real <button> (no navigation at all).
 */
export function ArticleTimeCartDemo() {
  const [labelIndex, setLabelIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [scrolledByLink, setScrolledByLink] = useState(false);

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Онови видимий текст дати — атрибут datetime лишається незмінним">
        <div className={styles.atcRow}>
          <time dateTime="2026-07-10" className={styles.atcTime}>
            {RELATIVE_LABELS[labelIndex]}
          </time>
          <button
            type="button"
            className={styles.itButton}
            onClick={() => setLabelIndex((i) => (i + 1) % RELATIVE_LABELS.length)}
          >
            Змінити видимий текст
          </button>
        </div>
        <p className={styles.itValidity}>
          Реальний атрибут: <code>datetime="2026-07-10"</code> — саме це читають браузер і пошукова система,
          незалежно від того, що написано всередині тега.
        </p>

        <div className={styles.atcCartRow}>
          <a
            href="#"
            className={styles.clLink}
            onClick={(event) => {
              event.preventDefault();
              setScrolledByLink(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Додати в кошик (a href="#")
          </a>
          <button
            type="button"
            className={styles.itButton}
            onClick={() => setCartCount((c) => c + 1)}
          >
            Додати в кошик (button): {cartCount}
          </button>
        </div>
        {scrolledByLink ? (
          <p className={styles.itValidity}>href="#" щойно реально прокрутив сторінку вгору — типовий побічний ефект цього хаку.</p>
        ) : null}
      </DemoPreview>

      <DemoExplanation>
        Ліва дія — справжнє посилання, яке веде "в нікуди" (#) і як побічний ефект смикає сторінку вгору; права —
        справжня кнопка, лічильник кошика зростає без жодного переходу чи прокрутки. Обидва ефекти зараз реальні,
        не намальовані.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Спробуй правий клік на кожному варіанті "Додати в кошик" — на посиланні контекстне меню запропонує
        "Відкрити в новій вкладці", хоча відкривати нічого; на кнопці такого пункту не буде взагалі, бо це не
        посилання.
      </DemoKeyTakeaway>
    </div>
  );
}
