import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type FieldType = "text" | "email" | "tel" | "number" | "date";

const TYPES: { value: FieldType; label: string }[] = [
  { value: "text", label: "text" },
  { value: "email", label: "email" },
  { value: "tel", label: "tel" },
  { value: "number", label: "number" },
  { value: "date", label: "date" },
];

const NOTES: Record<FieldType, string> = {
  text: "Найбазовіший тип: жодної підказки клавіатурі, жодної вбудованої перевірки формату.",
  email: "На мобільному показує клавіатуру з @ на видному місці; спробуй ввести текст без @ і натисни «Перевірити».",
  tel: "Показує цифрову клавіатуру на телефоні, але НЕ перевіряє формат — приймає будь-які символи.",
  number: "Стрілки вгору/вниз для зміни значення; браузер не дозволить ввести літеру взагалі.",
  date: "Справжній календар браузера замість ручного розбору тексту.",
};

/**
 * Live demo for "Типи полів і атрибути": pick a real input type and type
 * into a genuine <input> of that type. The "Перевірити" button calls the
 * browser's real reportValidity() — the message shown is whatever Chrome/
 * Firefox/Safari actually generates for that type, not a scripted string.
 */
export function InputTypesDemo() {
  const [type, setType] = useState<FieldType>("email");
  const [validityMessage, setValidityMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const check = () => {
    const el = inputRef.current;
    if (!el) return;
    const ok = el.reportValidity();
    setValidityMessage(ok ? "Браузер вважає значення коректним для цього типу." : el.validationMessage);
  };

  return (
    <div className={styles.demoStack}>
      <DemoToolbar options={TYPES} value={type} onChange={(value) => { setType(value as FieldType); setValidityMessage(null); }} />

      <DemoPreview label="Введи щось у поле і натисни «Перевірити» — повідомлення нижче генерує сам браузер">
        <div className={styles.itStage}>
          <input
            ref={inputRef}
            key={type}
            type={type}
            className={styles.itInput}
            placeholder={`type="${type}"`}
            onChange={() => setValidityMessage(null)}
          />
          <button type="button" className={styles.itButton} onClick={check}>
            Перевірити
          </button>
        </div>
        {validityMessage ? <p className={styles.itValidity}>{validityMessage}</p> : null}
      </DemoPreview>

      <DemoExplanation>{NOTES[type]}</DemoExplanation>

      <DemoKeyTakeaway>
        Повідомлення вище — не текст, який ми написали. Це реальний el.reportValidity() браузера: спробуй email
        без @ чи заповни number літерою (насправді туди літеру просто не впишеш) і побач, як міняється формулювання
        залежно від типу поля.
      </DemoKeyTakeaway>
    </div>
  );
}
