import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type TagKey = "quote" | "time" | "code" | "highlight" | "abbr";

const TAGS: { value: TagKey; label: string }[] = [
  { value: "quote", label: "Цитата" },
  { value: "time", label: "Час" },
  { value: "code", label: "Код" },
  { value: "highlight", label: "Виділення" },
  { value: "abbr", label: "Скорочення" },
];

const TAG_CODE: Record<TagKey, string> = {
  quote: `<blockquote>
  <p>Найкраща кава в цьому районі Львова.</p>
  <cite>— Марія, постійна клієнтка</cite>
</blockquote>`,
  time: `<p>Працюємо з <time datetime="08:00">8:00</time> до <time datetime="20:00">20:00</time>.</p>`,
  code: `<pre><code>function hello() {
  console.log("Hello");
}</code></pre>`,
  highlight: `<p><del>1000 грн</del> <ins>800 грн</ins></p>
<p>Ви шукали: <mark>кава</mark></p>`,
  abbr: `<p><abbr title="HyperText Markup Language">HTML</abbr> — мова розмітки.</p>`,
};

const TAG_EXPLANATION: Record<TagKey, string> = {
  quote: "blockquote + cite виглядають як звичайний текст з відступом, але скрінрідер і Google розпізнають це саме як цитату з автором — а не як абзац з дизайнерським відступом.",
  time: "Візуально це просто \"8:00\" і \"20:00\", але атрибут datetime дає машиночитаний формат: скрипти й пошуковики можуть парсити час, не вгадуючи формат із тексту.",
  code: "pre зберігає пробіли й переноси рядків, які звичайний текст \"схлопує\" в один пробіл — тому багаторядковий код виглядає так само, як у редакторі.",
  highlight: "del і ins — це не просто закреслений і підкреслений текст: вони семантично означають \"було видалено\" і \"було додано\" (типово — стара й нова ціна). mark підсвічує знайдений фрагмент.",
  abbr: "Наведи курсор на HTML нижче — атрибут title показує розшифровку. Це працює по-справжньому, тому що це реальний браузерний тултип, а не картинка.",
};

/**
 * Live demo for "Цитати, код і додаткові текстові елементи": switch between
 * 5 semantic text tags and see the ACTUAL browser-rendered element (real
 * blockquote/time/pre+code/mark+del+ins/abbr, not a screenshot) plus the
 * source that produced it. The abbr tab is genuinely hoverable — the title
 * tooltip is the browser's real behavior, not a simulation.
 */
export function SemanticTextDemo() {
  const [tag, setTag] = useState<TagKey>("quote");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar options={TAGS} value={tag} onChange={(value) => setTag(value as TagKey)} />

      <DemoPreview label="Так це реально виглядає в браузері">
        <div className={styles.semanticBlock}>
          {tag === "quote" ? (
            <blockquote>
              <p>Найкраща кава в цьому районі Львова.</p>
              <cite>— Марія, постійна клієнтка</cite>
            </blockquote>
          ) : null}
          {tag === "time" ? (
            <p>
              Працюємо з <time dateTime="08:00">8:00</time> до <time dateTime="20:00">20:00</time>.
            </p>
          ) : null}
          {tag === "code" ? (
            <pre>
              <code>{`function hello() {\n  console.log("Hello");\n}`}</code>
            </pre>
          ) : null}
          {tag === "highlight" ? (
            <>
              <p>
                <del>1000 грн</del> <ins>800 грн</ins>
              </p>
              <p>Ви шукали: <mark>кава</mark></p>
            </>
          ) : null}
          {tag === "abbr" ? (
            <p>
              <abbr title="HyperText Markup Language">HTML</abbr> — мова розмітки. Наведи курсор, щоб побачити
              розшифровку.
            </p>
          ) : null}
        </div>
      </DemoPreview>

      <DemoExplanation>{TAG_EXPLANATION[tag]}</DemoExplanation>

      <DemoCodeSnippet code={TAG_CODE[tag]} />

      <DemoKeyTakeaway>
        Кожен з цих тегів має власний нативний вигляд у браузері за замовчуванням — і власний сенс, який скрінрідер
        чи пошуковик зчитує окремо від візуального стилю. CSS може змінити вигляд, але сенс (це цитата, це час, це
        видалена ціна) залишається в самому тегу.
      </DemoKeyTakeaway>
    </div>
  );
}
