import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Kind = "fake" | "ul" | "ol";

const OPTIONS: { value: Kind; label: string }[] = [
  { value: "fake", label: "<p> з <br> (погано)" },
  { value: "ul", label: "<ul> маркований" },
  { value: "ol", label: "<ol> нумерований" },
];

const CODE: Record<Kind, string> = {
  fake: `<p>- Еспресо<br>- Капучино<br>- Лате</p>`,
  ul: `<ul>
  <li>Еспресо</li>
  <li>Капучино</li>
  <li>Лате</li>
</ul>`,
  ol: `<ol>
  <li>Еспресо</li>
  <li>Капучино</li>
  <li>Лате</li>
</ol>`,
};

const ANNOUNCEMENT: Record<Kind, string> = {
  fake: "«Еспресо. Капучино. Лате.» — суцільний текст в один рядок. Скрінрідер не повідомляє ні кількість пунктів, ні можливість навігації між ними.",
  ul: "«Список, 3 пункти: Еспресо; Капучино; Лате.» — користувач одразу знає, скільки пунктів, і може перестрибувати між ними клавішами.",
  ol: "«Список, 3 пункти: один. Еспресо; два. Капучино; три. Лате.» — так само, як ul, але з номером кожного пункту, бо порядок тут має сенс.",
};

const EXPLANATION: Record<Kind, string> = {
  fake: "Виглядає як список завдяки тире й переносам рядків, але в DOM це один-єдиний елемент <p> — жодної структури списку немає.",
  ul: "<ul> + <li> — справжня структура списку. Порядок пунктів не має значення: поміняй місцями Еспресо і Лате, і сенс меню не зміниться.",
  ol: "<ol> + <li> — та сама структура, але з номерами. Використовуй, коли порядок дійсно важливий (кроки рецепту, рейтинг, послідовність дій).",
};

/**
 * Live demo for "Марковані та нумеровані списки": switch between a fake
 * list (p + br), a real ul, and a real ol, and hear exactly what a screen
 * reader announces for each — the difference between "looks like a list"
 * and "is a list" made audible.
 */
export function ListSemanticsDemo() {
  const [kind, setKind] = useState<Kind>("fake");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar options={OPTIONS} value={kind} onChange={(value) => setKind(value as Kind)} />

      <DemoPreview label="Так це реально виглядає в браузері">
        {kind === "fake" ? (
          <p>
            - Еспресо
            <br />- Капучино
            <br />- Лате
          </p>
        ) : null}
        {kind === "ul" ? (
          <ul>
            <li>Еспресо</li>
            <li>Капучино</li>
            <li>Лате</li>
          </ul>
        ) : null}
        {kind === "ol" ? (
          <ol>
            <li>Еспресо</li>
            <li>Капучино</li>
            <li>Лате</li>
          </ol>
        ) : null}
      </DemoPreview>

      <p className={styles.headingAnnounce}>🔊 Скрінрідер оголосить: {ANNOUNCEMENT[kind]}</p>

      <DemoExplanation>{EXPLANATION[kind]}</DemoExplanation>

      <DemoCodeSnippet code={CODE[kind]} />

      <DemoKeyTakeaway>
        Візуально всі три варіанти можна зробити майже однаковими через CSS. Різниця, яка насправді важлива, —
        виключно в тегах: чи знає браузер (і скрінрідер), що це список, скільки в ньому пунктів і чи має значення їх
        порядок.
      </DemoKeyTakeaway>
    </div>
  );
}
