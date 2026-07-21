import { useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface Block {
  id: string;
  label: string;
  correctTag: string;
}

const BLOCKS: Block[] = [
  { id: "b1", label: "Лого + меню зверху", correctTag: "header" },
  { id: "b2", label: "Великий заголовок + кнопка", correctTag: "section (hero)" },
  { id: "b3", label: "Однакові картки товарів", correctTag: "article" },
  { id: "b4", label: "Копірайт і посилання внизу", correctTag: "footer" },
];

const TAG_OPTIONS = ["header", "section (hero)", "article", "footer", "div"];

/**
 * Live demo for "Як аналізувати дизайн у Figma": a real wireframe where
 * each block gets a genuine select — choosing a tag immediately checks
 * it against the correct answer and colors the block, tallying a real
 * running score.
 */
export function WireframeTagMatchDemo() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const answeredCount = Object.keys(answers).length;
  const correctCount = BLOCKS.filter((b) => answers[b.id] === b.correctTag).length;

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Обери тег для кожного блоку макета нижче — перевірка реальна, не заготовлена">
        <div className={styles.wfStage}>
          {BLOCKS.map((block) => {
            const chosen = answers[block.id];
            const isCorrect = chosen === block.correctTag;
            const isWrong = chosen && !isCorrect;
            return (
              <div
                key={block.id}
                className={`${styles.wfBlock} ${isCorrect ? styles.wfBlockCorrect : ""} ${isWrong ? styles.wfBlockWrong : ""}`}
              >
                <p className={styles.wfBlockLabel}>{block.label}</p>
                <select
                  className={styles.itInput}
                  value={chosen ?? ""}
                  onChange={(event) => setAnswers((prev) => ({ ...prev, [block.id]: event.target.value }))}
                >
                  <option value="" disabled>
                    Обери тег...
                  </option>
                  {TAG_OPTIONS.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
                {chosen ? <p className={styles.wfVerdict}>{isCorrect ? "Правильно" : `Ні — правильно: ${block.correctTag}`}</p> : null}
              </div>
            );
          })}
        </div>

        <p className={styles.itValidity}>
          Правильних відповідей: {correctCount} / {BLOCKS.length} (відповіли: {answeredCount})
        </p>
      </DemoPreview>

      <DemoExplanation>
        Кожен блок макета — це питання з таблиці уроку: чи це шапка, чи повторюваний елемент, чи підвал. Вибір
        "div" теж доступний навмисно — саме так виглядає типова помилка "усе через div", яку відразу видно
        червоним.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Онови будь-яку відповідь — рахунок вище перераховується по-справжньому. Це той самий процес, який
        відбувається в голові розробника при першому погляді на новий макет у Figma.
      </DemoKeyTakeaway>
    </div>
  );
}
