import { DemoPreview, DemoExplanation, DemoCodeSnippet, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Мобільне меню без JavaScript": the actual checkbox-hack
 * from the lesson, wired with a real <input type="checkbox"> and a CSS
 * sibling selector (:checked ~ nav) — no React state at all. Clicking the
 * label genuinely toggles the checkbox and the CSS reacts on its own,
 * proving the technique works without a single line of JS.
 */
export function MobileMenuDemo() {
  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Клікни «☰ Меню» — це справжній checkbox, керований лише CSS, без жодного useState">
        <div className={styles.mmStage}>
          <input type="checkbox" id="mm-toggle" className={styles.mmCheckbox} />
          <label htmlFor="mm-toggle" className={styles.mmLabel}>
            ☰ Меню
          </label>
          <nav className={styles.mmNav} aria-label="Мобільне меню кав'ярні">
            <a href="#about" onClick={(e) => e.preventDefault()}>
              Про нас
            </a>
            <a href="#menu" onClick={(e) => e.preventDefault()}>
              Меню
            </a>
            <a href="#contacts" onClick={(e) => e.preventDefault()}>
              Контакти
            </a>
          </nav>
        </div>
      </DemoPreview>

      <DemoExplanation>
        Чекбокс тут не прихований через display: none (це прибрало б його з табуляції клавіатурою) — він
        візуально схований класом .visually-hidden, залишаючись доступним. Клік по label вмикає/вимикає
        checkbox, а CSS-селектор :checked ~ .mobile-nav реагує на це сам, без жодного JavaScript чи React-стану.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`.mobile-menu {\n  display: none;\n}\n\n.menu-toggle-input:checked ~ .mobile-menu {\n  display: block;\n}`}
      />

      <DemoKeyTakeaway>
        Це справжній робочий приклад "checkbox hack" — той самий механізм, що описаний у коді уроку вище, живий
        прямо тут, без жодної рядки JavaScript.
      </DemoKeyTakeaway>
    </div>
  );
}
