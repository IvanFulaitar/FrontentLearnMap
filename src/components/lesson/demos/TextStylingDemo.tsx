import { useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "unstyled" | "branded";

export function TextStylingDemo() {
  const [mode, setMode] = useState<Mode>("unstyled");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "unstyled", label: "Без стилів (за замовчуванням)" },
          { value: "branded", label: "Типографіка кав'ярні" },
        ]}
        value={mode}
        onChange={(value) => setMode(value as Mode)}
      />

      <div className={mode === "unstyled" ? styles.tsUnstyled : styles.tsBranded}>
        <h1>Кав&apos;ярня «Аромат»</h1>
        <p>
          Свіжообсмажена кава й ранкова випічка в затишному куточку міста.{" "}
          <a href="#" onClick={(event) => event.preventDefault()}>
            Переглянути меню
          </a>
          .
        </p>
        <div className={styles.tsMenuItem}>
          <strong>Капучино</strong>
          <span className={styles.tsPrice}>85 грн</span>
        </div>
      </div>

      <DemoExplanation>
        {mode === "unstyled"
          ? "Це стандартний вигляд браузера без жодного правила типографіки: однаковий чорний текст, синє підкреслене посилання, ціна нічим не виділена серед назви напою — важко з першого погляду зрозуміти, що важливіше."
          : "Тепер h1 отримав вагу й компактний line-height, опис — комфортний line-height і обмежену ширину рядка, посилання перефарбувалось у колір бренду, а ціна виділена жирним і кольором акценту — той самий контент, але з чіткою візуальною ієрархією."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          mode === "unstyled"
            ? `/* жодних правил — суцільний стандартний вигляд браузера */
h1, p, a, .price { all: revert; }`
            : `h1 { font-size: 1.8rem; font-weight: 700; line-height: 1.15; }
p { line-height: 1.6; max-width: 45ch; color: var(--color-muted); }
a { color: var(--color-primary); font-weight: 600; text-decoration: none; }
a:hover { text-decoration: underline; }
.price { font-weight: 900; color: var(--color-primary); }`
        }
      />

      <DemoKeyTakeaway>
        Типографіка — це не один прийом, а система: вага й розмір заголовка, line-height і ширина опису, колір
        посилання з hover-станом, і окремо виділена ціна. Прибери будь-яку одну частину — і ієрархія одразу
        послаблюється.
      </DemoKeyTakeaway>
    </div>
  );
}
