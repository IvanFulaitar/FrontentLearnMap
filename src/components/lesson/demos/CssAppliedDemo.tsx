import { DemoSection, DemoPreview, DemoExplanation, DemoKeyTakeaway, DemoBeforeAfter } from "./framework";
import styles from "./demos.module.css";

/**
 * "How CSS applies to HTML" — a real café header, Before (raw browser
 * defaults) / After (with CSS) toggle. Same HTML both times; only whether
 * a stylesheet is linked changes.
 */
export function CssAppliedDemo() {
  return (
    <DemoSection>
      <DemoPreview>
        <DemoBeforeAfter
          beforeLabel="Без CSS"
          afterLabel="З CSS"
          before={
            <div className={styles.rawStage}>
              <div>☕ Аромат</div>
              <div>Меню</div>
              <div>Про нас</div>
              <div>Контакти</div>
              <a href="#" onClick={(event) => event.preventDefault()}>Забронювати</a>
            </div>
          }
          after={
            <div className={styles.navPreview} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
              <span className={styles.navLogo}>☕ Аромат</span>
              <span className={styles.navLink}>Меню</span>
              <span className={styles.navLink}>Про нас</span>
              <span className={styles.navLink}>Контакти</span>
              <span className={styles.navCta}>Забронювати</span>
            </div>
          }
        />
      </DemoPreview>

      <DemoExplanation>
        Розмітка (HTML) в обох варіантах ІДЕНТИЧНА — жоден тег не змінився. Різниця лише в тому, чи підключений
        стиль (CSS): без нього браузер показує елементи одне під одним стандартним шрифтом і кольором; з ним — той самий
        HTML перетворюється на впізнаваний header кав&apos;ярні.
      </DemoExplanation>

      <DemoKeyTakeaway>
        CSS ніколи не змінює зміст HTML — лише те, ЯК він виглядає. Один і той самий HTML може виглядати
        якось завгодно залежно від підключеного CSS.
      </DemoKeyTakeaway>
    </DemoSection>
  );
}
