import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "buggy" | "fixed";

/**
 * Live demo for "Чекбокси, радіокнопки і валідація": real radio inputs,
 * genuinely re-rendered (via `key`) with either two DIFFERENT name
 * attributes (buggy — both can be checked at once) or the SAME name (fixed
 * — browser enforces exactly one). The "Перевірити" button calls the real
 * form's reportValidity() for the required checkbox.
 */
export function RadioValidationDemo() {
  const [mode, setMode] = useState<Mode>("buggy");
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  const check = () => {
    const form = formRef.current;
    if (!form) return;
    const ok = form.reportValidity();
    setMessage(ok ? "Форма пройшла валідацію: місце обрано, згода підтверджена." : "Браузер зупинив відправку — дивись підказку біля непозначеного поля.");
  };

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "buggy", label: "Різний name (баг)" },
          { value: "fixed", label: "Однаковий name (правильно)" },
        ]}
        value={mode}
        onChange={(value) => { setMode(value as Mode); setMessage(null); }}
      />

      <DemoPreview label="Клікни «Зал», потім «Тераса» — подивись, чи знімається позначка з першого варіанту">
        <form ref={formRef} key={mode} className={styles.rvForm} onSubmit={(event) => event.preventDefault()}>
          <fieldset className={styles.sfFieldset}>
            <legend className={styles.sfLegend}>Місце</legend>
            <label className={styles.rvOption}>
              <input type="radio" name={mode === "fixed" ? "seating" : "seating-hall"} required />
              Зал
            </label>
            <label className={styles.rvOption}>
              <input type="radio" name={mode === "fixed" ? "seating" : "seating-terrace"} />
              Тераса
            </label>
          </fieldset>

          <label className={styles.rvOption}>
            <input type="checkbox" required />
            Погоджуюсь з умовами
          </label>

          <button type="button" className={styles.itButton} onClick={check}>
            Перевірити форму
          </button>
        </form>
        {message ? <p className={styles.itValidity}>{message}</p> : null}
      </DemoPreview>

      <DemoExplanation>
        {mode === "buggy"
          ? "seating-hall і seating-terrace — це два РІЗНІ імені, тому браузер бачить дві незалежні групи по одній кнопці: можна позначити обидві одночасно."
          : "Однакове name=\"seating\" робить кнопки взаємовиключними — вибір другого варіанту автоматично знімає позначку з першого. Так поводиться будь-яка група radio в браузері."}
      </DemoExplanation>

      <DemoKeyTakeaway>
        Не заповнюй нічого і одразу натисни «Перевірити форму» — це справжній reportValidity() браузера: якщо
        required-поле порожнє, форма не пройде валідацію, і браузер сам покаже, куди дивитись.
      </DemoKeyTakeaway>
    </div>
  );
}
