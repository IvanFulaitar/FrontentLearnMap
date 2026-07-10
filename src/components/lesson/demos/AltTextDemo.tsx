import { useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type AltQuality = "missing" | "generic" | "good" | "decorative";

const OPTIONS: { value: AltQuality; label: string }[] = [
  { value: "missing", label: "Без alt" },
  { value: "generic", label: 'alt="картинка"' },
  { value: "good", label: "Змістовний alt" },
  { value: "decorative", label: 'alt="" (декор)' },
];

const IMG_CODE: Record<AltQuality, string> = {
  missing: `<img src="headphones.jpg" />`,
  generic: `<img src="headphones.jpg" alt="картинка" />`,
  good: `<img src="headphones.jpg" alt="Бездротові навушники AirSound чорного кольору" />`,
  decorative: `<img src="divider.svg" alt="" />`,
};

const ANNOUNCEMENT: Record<AltQuality, string> = {
  missing: '«headphones.jpg, зображення» — скрінрідер зачитує саму назву файлу, бо більше нічого не має.',
  generic: '«картинка, зображення» — технічно alt є, але не несе жодної інформації про сам товар.',
  good: '«Бездротові навушники AirSound чорного кольору, зображення» — користувач розуміє, що саме на фото, не бачачи його.',
  decorative: "(нічого не оголошується — елемент повністю пропускається, як і мало бути для орнаменту чи розділювача)",
};

const EXPLANATION: Record<AltQuality, string> = {
  missing: "Без атрибута alt браузер і скрінрідер не мають жодної альтернативи — деякі скрінрідери в цьому випадку зачитують технічну назву файлу, що майже завжди марно для користувача.",
  generic: '"Картинка" — це те саме, що й відсутність alt: технічно вимога виконана, а по суті користувач нічого не дізнався про зміст фото.',
  good: "Змістовний alt описує саме те, що зображено — так, ніби ти розповідаєш про фото другу по телефону. Це і є мета атрибута.",
  decorative: 'alt="" — свідомий, правильний вибір для суто декоративних елементів: він явно каже "тут немає інформації, пропусти мене", на відміну від випадкової відсутності alt.',
};

/**
 * Live demo for "Зображення та альтернативний текст": switch between 4
 * quality levels of alt text and hear exactly what a screen reader would
 * announce for each — turning "write a good alt" from an abstract rule
 * into an audible difference.
 */
export function AltTextDemo() {
  const [quality, setQuality] = useState<AltQuality>("missing");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar options={OPTIONS} value={quality} onChange={(value) => setQuality(value as AltQuality)} />

      <div className={styles.brokenImageBox}>
        <span className={styles.brokenImageIcon} aria-hidden="true">
          🖼️
        </span>
        <span className={styles.brokenImageAlt}>
          {quality === "decorative" ? "(порожній alt — немає видимого тексту заміни)" : IMG_CODE[quality].match(/alt="([^"]*)"/)?.[1] || "(alt відсутній)"}
        </span>
      </div>

      <p className={styles.headingAnnounce}>🔊 Скрінрідер оголосить: {ANNOUNCEMENT[quality]}</p>

      <DemoExplanation>{EXPLANATION[quality]}</DemoExplanation>

      <DemoCodeSnippet code={IMG_CODE[quality]} />

      <DemoKeyTakeaway>
        Уяви, що картинка не завантажилась (саме так виглядає цей блок вище) — те, що залишається на екрані замість
        неї, це і є alt. Якщо цей текст не пояснює зміст фото, він не виконує свою роль ні для скрінрідера, ні для
        людини на повільному інтернеті.
      </DemoKeyTakeaway>
    </div>
  );
}
