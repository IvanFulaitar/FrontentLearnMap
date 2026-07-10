import { useState } from "react";
import { DemoViewport, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Footer-макет на Grid": a real multi-column footer inside a
 * resizable viewport, so the auto-fit column collapse is genuinely visible,
 * plus real (if inert) tel:/mailto: contact links to show what "clickable
 * contact" means in practice.
 */
export function FooterGridDemo() {
  const [width, setWidth] = useState(760);

  return (
    <div className={styles.demoStack}>
      <DemoViewport width={width} onWidthChange={setWidth} min={320} max={900}>
        <footer className={styles.fgFooter}>
          <div className={styles.fgColumn}>
            <strong className={styles.fgBrandName}>Кав&apos;ярня «Аромат»</strong>
            <p className={styles.fgBrandText}>Свіжа кава щодня з 8:00 до 20:00.</p>
          </div>
          <div className={styles.fgColumn}>
            <strong className={styles.fgColumnTitle}>Контакти</strong>
            <a className={styles.fgLink} href="tel:+380000000000" onClick={(e) => e.preventDefault()}>
              +380 00 000 00 00
            </a>
            <a className={styles.fgLink} href="mailto:hello@aroma.coffee" onClick={(e) => e.preventDefault()}>
              hello@aroma.coffee
            </a>
          </div>
          <div className={styles.fgColumn}>
            <strong className={styles.fgColumnTitle}>Меню</strong>
            <a className={styles.fgLink} href="#" onClick={(e) => e.preventDefault()}>
              Кава
            </a>
            <a className={styles.fgLink} href="#" onClick={(e) => e.preventDefault()}>
              Десерти
            </a>
          </div>
        </footer>
      </DemoViewport>

      <DemoExplanation>
        Звузь повзунок ширини — колонки footer складаються в один стовпчик самі, завдяки
        repeat(auto-fit, minmax(160px, 1fr)), без жодного медіазапиту. Контакти — справжні клікабельні tel:/mailto:
        посилання, а не звичайний текст.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`.site-footer {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 20px;\n}`}
      />

      <DemoKeyTakeaway>
        Той самий repeat(auto-fit, minmax(...)) патерн, що й у галереї фото та картках цін — footer не потребує
        окремого набору медіазапитів для кожної точки перелому.
      </DemoKeyTakeaway>
    </div>
  );
}
