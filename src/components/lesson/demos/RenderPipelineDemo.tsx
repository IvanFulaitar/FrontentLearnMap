import { useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Stage = "dom" | "cssom" | "render-tree" | "layout" | "paint";

const STAGES: { value: Stage; label: string }[] = [
  { value: "dom", label: "HTML → DOM" },
  { value: "cssom", label: "CSS → CSSOM" },
  { value: "render-tree", label: "Render Tree" },
  { value: "layout", label: "Layout" },
  { value: "paint", label: "Paint" },
];

const STAGE_CODE: Record<Stage, string> = {
  dom: `<body>
  <h1>Кав'ярня «Аромат»</h1>
  <p>Смачна кава з 8:00</p>
</body>

→ будується дерево DOM-вузлів`,
  cssom: `h1 { font-size: 2rem; }
p  { display: none; }

→ будується дерево CSSOM-правил`,
  "render-tree": `DOM + CSSOM → Render Tree

h1  — потрапляє в Render Tree (видимий)
p   — display: none → НЕ потрапляє в Render Tree`,
  layout: `Render Tree → Layout

Браузер рахує: h1 займає всю ширину, висота 40px,
відступ зверху 16px...`,
  paint: `Layout → Paint → Composite

Браузер малює колір тексту, фон, тіні —
і збирає всі шари в готове зображення на екрані`,
};

const STAGE_EXPLANATION: Record<Stage, string> = {
  dom: "Браузер читає HTML послідовно й будує дерево DOM — кожен тег стає окремим вузлом.",
  cssom: "Паралельно браузер збирає всі CSS-правила (з <style>, <link>, атрибутів) у дерево CSSOM.",
  "render-tree": "DOM і CSSOM об'єднуються в Render Tree — але туди потрапляє лише те, що реально буде видно: елементи з display: none пропускаються повністю.",
  layout: "Браузер обчислює точний розмір і позицію кожного елемента з Render Tree на сторінці.",
  paint: "Нарешті браузер малює кольори, текст і тіні (Paint), а потім об'єднує всі шари в один кадр (Composite) — це і є те, що бачить користувач.",
};

/**
 * Live demo for "Як браузер рендерить HTML": click through the 5 stages
 * of the render pipeline — each stage highlights in the same pipeline
 * pattern as RequestCycleDemo, but with entirely different stages/data
 * (DOM/CSSOM/Render Tree/Layout/Paint), showing why display:none skips
 * Render Tree entirely.
 */
export function RenderPipelineDemo() {
  const [stage, setStage] = useState<Stage>("dom");

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
        HTML → DOM, CSS → CSSOM, разом вони дають Render Tree (тільки видимі елементи), потім Layout визначає
        розміри й позиції, а Paint + Composite малюють фінальний кадр. display: none виключає елемент ще на етапі
        Render Tree — він взагалі не бере участі в Layout чи Paint.
      </DemoKeyTakeaway>
    </div>
  );
}
