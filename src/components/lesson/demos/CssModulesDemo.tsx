import { useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "global" | "modules";

/**
 * Live demo for "CSS Modules": two separate "components" (Кнопка, Картка)
 * each nominally style a class called .accent. In "global CSS" mode they
 * are wired to SHARE one literal color value — clicking the button's
 * accent swatch visibly changes the card too, simulating exactly the
 * global-class-collision bug the lesson describes. In "CSS Modules" mode
 * each component's .accent is scoped independently, so the same click only
 * ever affects its own component — a real click, a real (simulated)
 * consequence, not just a static before/after image.
 */
export function CssModulesDemo() {
  const [mode, setMode] = useState<Mode>("global");
  const [buttonAccent, setButtonAccent] = useState(0);
  const [cardAccent, setCardAccent] = useState(0);

  const ACCENTS = ["#b45309", "#2563eb", "#059669"];

  const effectiveCardAccent = mode === "global" ? buttonAccent : cardAccent;

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "global", label: "Звичайний глобальний CSS" },
          { value: "modules", label: "CSS Modules" },
        ]}
        value={mode}
        onChange={(value) => setMode(value as Mode)}
      />

      <div className={styles.cmDemoRow}>
        <div className={styles.cmDemoBox}>
          <span className={styles.cmDemoLabel}>Button.tsx — клас .accent</span>
          <button
            type="button"
            className={styles.cmDemoButton}
            style={{ background: ACCENTS[buttonAccent] }}
            onClick={() => setButtonAccent((index) => (index + 1) % ACCENTS.length)}
          >
            Змінити колір кнопки
          </button>
        </div>
        <div className={styles.cmDemoBox}>
          <span className={styles.cmDemoLabel}>Card.tsx — теж клас .accent</span>
          <button
            type="button"
            className={styles.cmDemoCard}
            style={{ borderColor: ACCENTS[effectiveCardAccent] }}
            disabled={mode === "global"}
            onClick={() => setCardAccent((index) => (index + 1) % ACCENTS.length)}
            title={mode === "modules" ? "Клікни, щоб змінити колір лише цієї картки" : "У глобальному режимі картка керується кольором кнопки"}
          >
            Картка товару
          </button>
        </div>
      </div>

      <DemoExplanation>
        {mode === "global"
          ? "Обидва компоненти написали .accent у звичайному глобальному CSS. Натисни кнопку зліва — колір картки справа ЗМІНИВСЯ ТЕЖ, хоча ти клікнув на зовсім інший компонент: останнє підключене правило .accent перемогло всюди."
          : "Ті самі два компоненти, але тепер кожен .accent живе у своєму *.module.css і отримав унікальне згенероване ім'я. Клік на кнопку більше ніяк не чіпає картку — компоненти справді ізольовані одне від одного."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          mode === "global"
            ? `/* styles.css — підключений і в Button, і в Card */
.accent { border-color: ${ACCENTS[buttonAccent]}; background: ${ACCENTS[buttonAccent]}; }
/* Card.tsx теж написав .accent — останнє правило перемагає ОБИДВА компоненти */`
            : `/* Button.module.css */
.accent { background: ${ACCENTS[buttonAccent]}; } /* -> Button_accent_x7a1 */

/* Card.module.css */
.accent { border-color: ${ACCENTS[cardAccent]}; } /* -> Card_accent_p9k3, ІНШЕ ім'я */`
        }
      />

      <DemoKeyTakeaway>
        У звичайному CSS всі класи глобальні — однакова назва .accent у двох файлах неминуче конфліктує. CSS
        Modules автоматично генерують унікальне ім'я для кожного файлу під час збірки, тож той самий клас .accent у
        Button.module.css і Card.module.css ніколи не перетнеться.
      </DemoKeyTakeaway>
    </div>
  );
}
