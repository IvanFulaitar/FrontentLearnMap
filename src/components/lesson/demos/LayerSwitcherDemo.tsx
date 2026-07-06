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
    "Лише HTML: браузер малює кнопку й текст своїми стилями за замовчуванням (серифний шрифт, чорний текст, сіра кнопка). Клік поки що нічого не робить.",
  css:
    "Додано CSS: та сама розмітка — жодного нового тега — тепер має колір бренду, відступи й заокруглені кути. Клік і досі нічого не робить: CSS не вміє реагувати на дії.",
  js:
    "Додано JS: розмітка й стилі лишились ті самі, але тепер клік по кнопці змінює її текст. Тільки JavaScript вміє реагувати на дії користувача.",
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
    <div>
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
