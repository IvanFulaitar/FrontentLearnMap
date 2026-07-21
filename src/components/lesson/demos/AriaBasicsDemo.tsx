import { useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Основи ARIA: коли HTML недостатньо": a real burger-menu
 * button whose aria-expanded genuinely flips (and a real <nav> genuinely
 * opens/closes), plus a real aria-live region that actually receives new
 * text when "Додати в кошик" is clicked, and a toggle showing what the
 * button's accessible name would be with/without aria-label.
 */
export function AriaBasicsDemo() {
  const [open, setOpen] = useState(false);
  const [hasLabel, setHasLabel] = useState(true);
  const [cartMessages, setCartMessages] = useState<string[]>([]);

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Відкрий меню, додай товар у кошик і поглянь на обчислене ім'я кнопки нижче">
        <div className={styles.abStage}>
          <div className={styles.abRow}>
            <button
              type="button"
              className={styles.itButton}
              aria-label={hasLabel ? "Відкрити меню" : undefined}
              aria-expanded={open}
              aria-controls="demo-ab-menu"
              onClick={() => setOpen((o) => !o)}
            >
              ☰
            </button>
            <label className={styles.abToggle}>
              <input type="checkbox" checked={hasLabel} onChange={(event) => setHasLabel(event.target.checked)} />
              aria-label на кнопці
            </label>
          </div>

          <p className={styles.itValidity}>
            Обчислене ім'я кнопки для скрінрідера: <strong>{hasLabel ? "«Відкрити меню»" : "(немає — лише символ ☰)"}</strong>
            {" "}· aria-expanded зараз: <strong>{String(open)}</strong>
          </p>

          {open ? (
            <nav id="demo-ab-menu" className={styles.slfNav}>
              <a href="/" aria-current="page">Головна</a>
              <span>Каталог</span>
            </nav>
          ) : null}

          <button
            type="button"
            className={styles.itButton}
            onClick={() => setCartMessages((prev) => [...prev, "Товар успішно додано в кошик."])}
          >
            Додати в кошик
          </button>

          <div role="status" aria-live="polite" className={styles.aeLog}>
            <p className={styles.aeLogTitle}>role="status" — реально оновлюється при кліку:</p>
            {cartMessages.length === 0 ? (
              <p className={styles.aeLogEmpty}>(поки нічого не додано)</p>
            ) : (
              <ul className={styles.aeLogList}>
                {cartMessages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </DemoPreview>

      <DemoExplanation>
        Прибери галочку "aria-label на кнопці" — символ ☰ лишається без жодного пояснення. aria-expanded вище
        реально перемикається між true/false синхронно з тим, чи справді відкрите меню нижче — саме так це
        повинно працювати в реальному коді, а не залишатись застарілим значенням.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Кожен клік "Додати в кошик" реально дописує рядок у aria-live-регіон — саме тому скрінрідер озвучив би
        кожне повідомлення без перезавантаження сторінки, не перериваючи те, що читалось до цього.
      </DemoKeyTakeaway>
    </div>
  );
}
