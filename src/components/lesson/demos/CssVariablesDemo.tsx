import { useState, type CSSProperties } from "react";
import { DemoSection, DemoControls, DemoColorInput, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, DemoHighlight } from "./framework";
import styles from "./demos.module.css";

/**
 * Live CSS custom-properties demo: change ONE variable, and every place
 * that uses var(--color-primary) across a small realistic mini café
 * component (header, button, price tag) updates at once — the core reason
 * design tokens exist.
 */
export function CssVariablesDemo() {
  const [primary, setPrimary] = useState("#b45309");
  const [bg, setBg] = useState("#fdfaf5");

  const themeVars = { "--demo-primary": primary, "--demo-bg": bg } as CSSProperties;

  return (
    <DemoSection>
      <DemoControls>
        <DemoColorInput label="--color-primary" value={primary} onChange={setPrimary} />
        <DemoColorInput label="--color-bg" value={bg} onChange={setBg} />
      </DemoControls>

      <DemoPreview>
        <DemoHighlight signal={`${primary}-${bg}`}>
          <div className={styles.themeStage} style={themeVars}>
            <div className={styles.themeHeader}>
              <span className={styles.themeLogo}>☕ Аромат</span>
              <span className={styles.themeCta}>Забронювати</span>
            </div>
            <div className={styles.themeCard}>
              <strong>Латте</strong>
              <span className={styles.themePrice}>75 грн</span>
            </div>
            <a href="#" onClick={(event) => event.preventDefault()} className={styles.themeLink}>Переглянути все меню →</a>
          </div>
        </DemoHighlight>
      </DemoPreview>

      <DemoExplanation>
        Один клік по --color-primary одразу перефарбував кнопку "Забронювати", ціну "75 грн" і посилання внизу —
        усі три місця читають той самий var(--color-primary), тому оновились одночасно, без правки трьох окремих правил.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`:root {
  --color-primary: ${primary};
  --color-bg: ${bg};
}`}
      />

      <DemoKeyTakeaway>
        Дизайн-токен (CSS-змінна) — це "одне джерело правди" для значення, яке повторюється в багатьох місцях.
        Зміни один раз у :root — і весь сайт (чи ціла тема) оновлюється разом.
      </DemoKeyTakeaway>
    </DemoSection>
  );
}
