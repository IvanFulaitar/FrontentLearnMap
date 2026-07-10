import { useState } from "react";
import { DemoViewport, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

const LINKS = ["Меню", "Про нас", "Контакти"];

/**
 * Live demo for "Навігація кав'ярні на Flexbox": the actual café header
 * (logo + nav links + CTA button) built with the exact classes from the
 * lesson. Click a nav link to set it active (real click-driven state, not
 * just hover), and drag the viewport-width slider down to see the whole
 * header genuinely wrap onto a second line via flex-wrap: wrap.
 */
export function FlexNavDemo() {
  const [active, setActive] = useState(LINKS[0]);
  const [width, setWidth] = useState(640);

  return (
    <div className={styles.demoStack}>
      <DemoViewport width={width} onWidthChange={setWidth} min={300} max={760}>
        <div className={styles.fnHeader}>
          <span className={styles.fnLogo}>☕ Аромат</span>
          <nav className={styles.fnNav}>
            {LINKS.map((link) => (
              <button
                type="button"
                key={link}
                className={`${styles.fnLink} ${link === active ? styles.fnLinkActive : ""}`}
                onClick={() => setActive(link)}
              >
                {link}
              </button>
            ))}
          </nav>
          <button type="button" className={styles.fnCta}>Забронювати</button>
        </div>
      </DemoViewport>

      <DemoExplanation>
        Клікни на пункт меню — він стає активним (справжній клас .nav-link--active, не просто ілюстрація). Тягни
        повзунок ширини вниз: коли лого + меню + кнопка вже не влазять в один рядок, flex-wrap: wrap на
        .header-inner переносить кнопку "Забронювати" на новий рядок замість того, щоб стискати весь header чи
        дати йому вилізти за межі екрана.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.main-nav {
  display: flex;
  gap: 20px;
}

.nav-link--active {
  color: var(--color-primary);
  font-weight: 700;
}`}
      />

      <DemoKeyTakeaway>
        .main-nav — окремий flex-контейнер, вкладений усередину .header-inner: кожен рівень вкладеності керує лише
        своїми прямими дітьми (nav вирівнює лише посилання, header-inner — лого/nav/кнопку як три цілісні блоки).
      </DemoKeyTakeaway>
    </div>
  );
}
