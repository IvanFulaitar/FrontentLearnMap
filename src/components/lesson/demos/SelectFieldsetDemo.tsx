import { useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Textarea, select і fieldset": a real <fieldset> with a
 * genuine native <select> (with <optgroup>) and <textarea> inside. Toggling
 * the checkbox sets `disabled` on the FIELDSET itself — every field inside
 * goes gray and unusable at once, a real cascading effect, not three
 * separate disabled attributes.
 */
export function SelectFieldsetDemo() {
  const [locked, setLocked] = useState(false);

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Онови секцію нижче — усі поля вмикаються/вимикаються ОДНИМ атрибутом на fieldset">
        <label className={styles.sfToggle}>
          <input type="checkbox" checked={locked} onChange={(event) => setLocked(event.target.checked)} />
          Секція ще недоступна (наприклад, поки не обрано дату)
        </label>

        <fieldset className={styles.sfFieldset} disabled={locked}>
          <legend className={styles.sfLegend}>Деталі бронювання</legend>

          <label className={styles.sfLabel} htmlFor="demo-sf-time">
            Час
          </label>
          <select id="demo-sf-time" className={styles.sfInput} defaultValue="19:00">
            <optgroup label="Вечір">
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
            </optgroup>
          </select>

          <label className={styles.sfLabel} htmlFor="demo-sf-comment">
            Коментар
          </label>
          <textarea id="demo-sf-comment" className={styles.sfInput} rows={3} placeholder="Побажання..." />
        </fieldset>
      </DemoPreview>

      <DemoExplanation>
        {locked
          ? "fieldset disabled справді вимикає select і textarea всередині — не можна відкрити список чи клікнути в textarea, і жодне з цих полів не потрапить у дані форми, якби вона зараз відправлялась."
          : "Секція активна: select — це справжній нативний список (клікни, щоб відкрити), а textarea можна тягнути за нижній правий кут."}
      </DemoExplanation>

      <DemoKeyTakeaway>
        Постав галочку вище — обидва поля вимкнулись одночасно, хоча в коді атрибут disabled стоїть лише один раз,
        на fieldset. Прибери галочку — усе знову активне, без жодних змін у самих select/textarea.
      </DemoKeyTakeaway>
    </div>
  );
}
