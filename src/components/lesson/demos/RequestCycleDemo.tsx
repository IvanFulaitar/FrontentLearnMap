import { useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Stage = "request" | "dns" | "response" | "render";

const STAGES: { value: Stage; label: string }[] = [
  { value: "request", label: "1. Запит" },
  { value: "dns", label: "2. DNS" },
  { value: "response", label: "3. Відповідь" },
  { value: "render", label: "4. Рендер" },
];

const STAGE_CODE: Record<Stage, string> = {
  request: `https://aroma-cafe.com/menu
     ↑           ↑        ↑
  протокол     домен    шлях

Браузер готує HTTP-запит на цю адресу.`,
  dns: `aroma-cafe.com   →   DNS   →   142.250.74.14
   (домен,               (IP-адреса,
   потрібен людям)        потрібна комп'ютерам)`,
  response: `Request:   GET /menu  →  "Дай мені сторінку меню"
Response:  200 OK     →  HTML, CSS, JS, картинки`,
  render: `HTML + CSS + JS  →  браузер збирає їх у видиму сторінку`,
};

const STAGE_EXPLANATION: Record<Stage, string> = {
  request: "Браузер (програма, у якій ти відкриваєш сайти) розбирає адресу сайту на 3 частини — протокол (спосіб передачі даних), домен (ім'я сайту) і шлях (яка саме сторінка) — і готується надіслати запит саме на цю адресу.",
  dns: "Перед тим як надіслати запит, браузеру треба знайти комп'ютер, на якому лежить сайт. Кожен такий комп'ютер (сервер) має свою IP-адресу — набір цифр. DNS — це як телефонна книга: перетворює зручне ім'я сайту на цю адресу.",
  response: "Сервер (комп'ютер, який зберігає сайт) отримує запит, знаходить потрібні файли й надсилає їх назад разом із коротким кодом-статусом: 200 означає \"усе добре\", 404 — \"такої сторінки немає\".",
  render: "Отримавши файли (HTML, CSS, JS), браузер обробляє їх і малює готову сторінку, яку бачить користувач на екрані.",
};

/**
 * Live demo for "Як працює інтернет": click through the 4 stages of a
 * request/response cycle (matching the lesson's own comparisonTable) —
 * each stage highlights in a horizontal pipeline and swaps the code
 * example and explanation, instead of showing all 4 as static text.
 */
export function RequestCycleDemo() {
  const [stage, setStage] = useState<Stage>("request");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar options={STAGES} value={stage} onChange={(value) => setStage(value as Stage)} />

      <div className={styles.pipelineRow}>
        {STAGES.map((s, index) => (
          <div key={s.value} style={{ display: "contents" }}>
            <div className={`${styles.pipelineStage} ${s.value === stage ? styles.pipelineStageActive : ""}`}>
              {s.label}
            </div>
            {index < STAGES.length - 1 ? <div className={styles.pipelineArrow}>→</div> : null}
          </div>
        ))}
      </div>

      <DemoExplanation>{STAGE_EXPLANATION[stage]}</DemoExplanation>

      <DemoCodeSnippet code={STAGE_CODE[stage]} />

      <DemoKeyTakeaway>
        Кожен раз, коли відкривається сайт, ці 4 кроки відбуваються послідовно, одне за одним: браузер розбирає
        адресу → DNS знаходить потрібний сервер → сервер надсилає файли у відповідь → браузер малює готову сторінку.
        Усе це займає лише частку секунди.
      </DemoKeyTakeaway>
    </div>
  );
}
