import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Layer = "html" | "css" | "js";

const OPTIONS = [
  { value: "html", label: "Лише HTML" },
  { value: "css", label: "+ CSS" },
  { value: "js", label: "+ CSS + JS" },
];

const EXPLANATIONS: Record<Layer, string> = {
  html:
    "Лише HTML: без жодного оформлення браузер сам малює кнопку й текст так, як вміє за замовчуванням (звичайний шрифт, чорний текст, сіра кнопка). Клік по кнопці поки що нічого не робить.",
  css:
    "Додано CSS: сама розмітка (HTML-код) не змінилась — лише оформлення. Тепер є колір бренду, відступи й заокруглені кути. Клік і досі нічого не робить: CSS вміє лише оформлювати, він не може реагувати на дії користувача.",
  js:
    "Додано JS: розмітка й оформлення лишились ті самі, але тепер клік по кнопці змінює її текст. Реагувати на дії користувача (клік, ввід тексту) вміє лише JavaScript.",
};

/** "Property Switcher" для вступного уроку "HTML, CSS і JavaScript: хто за
 * що відповідає" — той самий реальний елемент (кнопка замовлення) послідовно
 * отримує структуру, вигляд і поведінку, щоб різницю між трьома технологіями
 * було видно на одному прикладі, а не читати про неї. */
export function LayerSwitcherDemo() {
  const [layer, setLayer] = useState<Layer>("html");
  const [ordered, setOrdered] = useState(false);

  const withCss = layer !== "html";
  const withJs = layer === "js";

  const handleClick = () => {
    if (!withJs) return;
    setOrdered((value) => !value);
  };

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={OPTIONS}
        value={layer}
        onChange={(value) => {
          setLayer(value as Layer);
          setOrdered(false);
        }}
      />
      <DemoPreview label="Кнопка замовлення на сайті кав'ярні">
        {withCss ? (
          <div className={styles.themeCard}>
            <span>Лате «Аромат» — 75 грн</span>
            <button type="button" className={styles.navCta} onClick={handleClick}>
              {ordered ? "Замовлено ✓" : "Замовити"}
            </button>
          </div>
        ) : (
          <div className={styles.rawStage}>
            <div>Лате «Аромат» — 75 грн</div>
            <button type="button" onClick={handleClick}>
              {ordered ? "Замовлено ✓" : "Замовити"}
            </button>
          </div>
        )}
      </DemoPreview>
      <DemoExplanation>{EXPLANATIONS[layer]}</DemoExplanation>
      <DemoKeyTakeaway>
        HTML описує ЩО це (кнопка й ціна). CSS визначає ЯК це виглядає. JS визначає ЩО відбувається по кліку. Три
        технології — три чіткі ролі, і жодна не виконує роботу іншої.
      </DemoKeyTakeaway>
    </div>
  );
}
