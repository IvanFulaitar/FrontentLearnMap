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
  request: "Браузер розбирає URL на протокол, домен і шлях, і готується відправити HTTP-запит саме на цю адресу.",
  dns: "Перед тим як відправити запит, браузер має дізнатись, на яку IP-адресу його слати — DNS перетворює зручний домен на цю адресу.",
  response: "Сервер отримує запит, знаходить потрібні файли й повертає їх у відповіді разом зі статусом (200 OK, 404, 500...).",
  render: "Отримавши HTML/CSS/JS, браузер обробляє їх і малює готову сторінку, яку бачить користувач.",
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
        Кожен запит до сайту проходить усі 4 етапи послідовно: браузер розбирає адресу, DNS знаходить сервер, сервер
        відповідає файлами, і лише потім браузер малює сторінку. Вкладка Network у DevTools показує саме ці кроки
        для кожного окремого файлу.
      </DemoKeyTakeaway>
    </div>
  );
}
