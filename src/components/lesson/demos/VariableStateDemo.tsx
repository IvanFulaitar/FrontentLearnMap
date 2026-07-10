import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Scenario = "counter" | "menu";

const CODE: Record<Scenario, string> = {
  counter: `const countElement = document.querySelector("#cart-count");
const addButton = document.querySelector("#add-button");
let cartCount = 0;

addButton.addEventListener("click", () => {
  cartCount = cartCount + 1;
  countElement.textContent = cartCount;
});`,
  menu: `const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");
let isMenuOpen = false;

menuButton.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  menu.hidden = !isMenuOpen;
  menuButton.setAttribute("aria-expanded", String(isMenuOpen));
});`,
};

const EXPLANATION: Record<Scenario, string> = {
  counter: "cartCount — let, бо перепризначається після кожного кліку (cartCount = cartCount + 1). countElement і addButton — const, бо самі DOM-елементи не змінюються, змінюється лише те, що показано всередині них.",
  menu: "isMenuOpen — let, бо перемикається між true/false після кожного кліку. menuButton і menu — const, бо це ті самі два DOM-елементи від першого до останнього кліку.",
};

/**
 * Live demo for "Змінні з let і const": two REAL, clickable interface
 * fragments (a cart counter and a menu toggle) built with genuine state that
 * changes on click — the same let/const split a student writes in the
 * practiceTask, demonstrated live instead of just described.
 */
export function VariableStateDemo() {
  const [scenario, setScenario] = useState<Scenario>("counter");
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "counter", label: "Лічильник кошика" },
          { value: "menu", label: "Перемикач меню" },
        ]}
        value={scenario}
        onChange={(value) => setScenario(value as Scenario)}
      />

      <DemoPreview label="Клікай — це реальний стан, побудований на let">
        {scenario === "counter" ? (
          <div className={styles.semanticBlock}>
            <p>
              Товарів у кошику: <strong>{cartCount}</strong>
            </p>
            <button type="button" onClick={() => setCartCount((c) => c + 1)}>
              Додати товар
            </button>
          </div>
        ) : null}
        {scenario === "menu" ? (
          <div className={styles.semanticBlock}>
            <button type="button" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((v) => !v)}>
              {isMenuOpen ? "Закрити меню" : "Відкрити меню"}
            </button>
            {isMenuOpen ? (
              <nav>
                <ul>
                  <li>Головна</li>
                  <li>Курси</li>
                  <li>Контакти</li>
                </ul>
              </nav>
            ) : null}
          </div>
        ) : null}
      </DemoPreview>

      <DemoExplanation>{EXPLANATION[scenario]}</DemoExplanation>

      <DemoCodeSnippet code={CODE[scenario]} />

      <DemoKeyTakeaway>
        Обидва приклади мають однакову структуру: DOM-елементи — const (знайдені один раз, більше не перепризначені),
        а стан, що змінюється після кліку, — let. Клікай по кілька разів у кожному режимі — це і є практичне правило
        вибору між let і const.
      </DemoKeyTakeaway>
    </div>
  );
}
