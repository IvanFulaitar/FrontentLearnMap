import { useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

const PAGES = ["Головна", "Меню", "Про нас", "Контакти"];

/**
 * Live demo for "Header і навігація сайту": a real <nav> where clicking a
 * link genuinely sets aria-current="page" on it via React state, and a
 * real CSS attribute selector ([aria-current="page"]) is what actually
 * underlines it — not a manually toggled class.
 */
export function ActiveNavDemo() {
  const [current, setCurrent] = useState(PAGES[0]);

  return (
    <div className={styles.demoStack}>
      <DemoPreview label={'Клікни пункт меню — саме йому реально присвоюється aria-current="page"'}>
        <nav className={styles.anNav}>
          {PAGES.map((page) => (
            <a
              key={page}
              href={`#${page}`}
              className={styles.anLink}
              aria-current={page === current ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                setCurrent(page);
              }}
            >
              {page}
            </a>
          ))}
        </nav>
        <p className={styles.itValidity}>
          Обчислений атрибут активного пункту: <code>aria-current="page"</code> зараз стоїть на «{current}».
        </p>
      </DemoPreview>

      <DemoExplanation>
        Підкреслення переходить на щойно обраний пункт через справжній CSS-селектор за атрибутом
        ([aria-current="page"] {"{"} text-decoration: underline {"}"}) — React лише встановлює сам атрибут,
        вигляд визначає CSS, а не окремий клас "active", який довелось би синхронізувати вручну.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Скрінрідер, натрапивши на цей aria-current, повідомить користувачу, яка сторінка відкрита зараз —
        саме тому це не просто візуальне підкреслення, а реальна інформація для допоміжних технологій.
      </DemoKeyTakeaway>
    </div>
  );
}
