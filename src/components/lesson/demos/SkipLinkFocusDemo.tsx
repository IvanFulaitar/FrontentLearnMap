import { useRef } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Скрінрідери та клавіатурна навігація": a genuinely
 * functional Skip Link (invisible until it receives real keyboard focus,
 * then jumps to a real target further down) plus a real button styled
 * with `:focus-visible` — click it with the mouse and no ring appears;
 * reach it with Tab and a real ring appears. Both effects come from
 * actual CSS pseudo-classes evaluated by the browser, not JS.
 */
export function SkipLinkFocusDemo() {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Клікни десь у цій картці мишею, а тоді натисни Tab від самого початку — перший стоп це Skip Link">
        <div className={styles.slfStage}>
          <a
            href="#demo-slf-main"
            className={styles.slfSkipLink}
            onClick={(event) => {
              event.preventDefault();
              mainRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
              mainRef.current?.focus();
            }}
          >
            Перейти до основного контенту
          </a>

          <nav className={styles.slfNav}>
            <span>Головна</span>
            <span>Каталог</span>
            <span>Про нас</span>
            <span>Контакти</span>
          </nav>

          <button type="button" className={styles.slfFocusButton}>
            Натисни мишею (без рамки) чи дійди Tab-ом (з рамкою)
          </button>

          <div id="demo-slf-main" ref={mainRef} tabIndex={-1} className={styles.slfMain}>
            Основний контент — сюди веде Skip Link.
          </div>
        </div>
      </DemoPreview>

      <DemoExplanation>
        Посилання "Перейти до основного контенту" не видно, доки на нього не потрапити Tab-ом — тоді воно реально
        зʼявляється (звичайна CSS-техніка: приховати, показати лише на :focus). Кнопка нижче використовує
        :focus-visible — клікни по ній мишею: рамки не буде; дійди до неї Tab-ом: рамка зʼявиться. Це справжня
        поведінка браузера, а не імітація.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Якщо прибрати :focus-visible-стиль без заміни (button:focus {"{"} outline: none {"}"}), кнопка вище перестане
        показувати, де фокус, і для клавіатурного користувача весь блок стане непрохідним наосліп.
      </DemoKeyTakeaway>
    </div>
  );
}
