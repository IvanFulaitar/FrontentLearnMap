import { useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Part = "doctype" | "lang" | "head" | "body";

const PARTS: { value: Part; label: string }[] = [
  { value: "doctype", label: "<!DOCTYPE html>" },
  { value: "lang", label: "html lang=\"uk\"" },
  { value: "head", label: "<head>" },
  { value: "body", label: "<body>" },
];

const PART_CODE: Record<Part, string> = {
  doctype: `<!DOCTYPE html>`,
  lang: `<html lang="uk">`,
  head: `<head>
  <meta charset="UTF-8" />
  <title>Кав'ярня «Аромат»</title>
</head>`,
  body: `<body>
  <h1>Кав'ярня «Аромат»</h1>
  <p>Свіжообсмажена кава щодня.</p>
</body>`,
};

const PART_EXPLANATION: Record<Part, string> = {
  doctype: "Вмикає Standards Mode — сучасний, передбачуваний режим рендерингу. Без цього рядка браузер може перейти в застарілий Quirks Mode, де навіть базові CSS-властивості рахуються інакше.",
  lang: "Каже скрінрідерам і пошуковим системам, якою мовою озвучувати й індексувати сторінку. Без lang=\"uk\" скрінрідер може прочитати український текст з англійською вимовою.",
  head: "Усе, що тут, — службова інформація: кодування, заголовок вкладки, підключення стилів. Користувач цього блоку НІКОЛИ не бачить на сторінці.",
  body: "Єдина частина документа, яку реально бачить відвідувач сайту. Усе, що не потрапило в body, для користувача не існує.",
};

/**
 * Live demo for "Анатомія HTML-документа": click one of the 4 required
 * parts of the document skeleton to see just that fragment's code and
 * what it's responsible for — instead of reading all 4 as one static
 * block of text.
 */
export function DocAnatomyDemo() {
  const [part, setPart] = useState<Part>("doctype");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar options={PARTS} value={part} onChange={(value) => setPart(value as Part)} />

      <div className={styles.pipelineRow}>
        {PARTS.map((p) => (
          <div
            key={p.value}
            className={`${styles.pipelineStage} ${p.value === part ? styles.pipelineStageActive : ""}`}
            style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.75rem" }}
          >
            {p.label}
          </div>
        ))}
      </div>

      <DemoExplanation>{PART_EXPLANATION[part]}</DemoExplanation>

      <DemoCodeSnippet code={PART_CODE[part]} />

      <DemoKeyTakeaway>
        Браузер читає документ строго зверху вниз: doctype → html[lang] → head → body. Пропусти будь-яку з цих 4
        частин — і щось обов'язково зламається: рендеринг, доступність, SEO або сама структура сторінки.
      </DemoKeyTakeaway>
    </div>
  );
}
