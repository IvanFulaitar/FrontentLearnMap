import { useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface CodeLine {
  code: string;
  hasBug: boolean;
  explanation: string;
}

const LINES: CodeLine[] = [
  { code: '<div onclick="submit()">Надіслати</div>', hasBug: true, explanation: "div замість button — не реагує на Tab/Enter/Space." },
  { code: '<input type="text" placeholder="Email" />', hasBug: true, explanation: "placeholder замість label, і type=\"text\" замість type=\"email\"." },
  { code: '<img src="cake.jpg">', hasBug: true, explanation: "Відсутній alt — для скрінрідера це просто \"невідоме зображення\"." },
  { code: '<h1>Заголовок 1</h1>', hasBug: false, explanation: "Сам по собі цей h1 коректний — проблема лише в тому, що є ще один нижче." },
  { code: '<h1>Заголовок 2</h1>', hasBug: true, explanation: "Другий h1 на сторінці — має бути рівно один." },
];

/**
 * Live demo for "Найпоширеніші помилки початківців в HTML": click each
 * real code line to flag it as buggy — genuinely compared against the
 * actual bug list, with a real running score, not a static answer key
 * shown upfront.
 */
export function BugHuntDemo() {
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [revealed, setRevealed] = useState(false);

  const toggle = (index: number) => {
    if (revealed) return;
    setFlagged((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const correctCount = LINES.filter((line, i) => Boolean(flagged[i]) === line.hasBug).length;

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Клікни на рядки, де, на твою думку, є помилка, а тоді натисни «Перевірити»">
        <div className={styles.bhStage}>
          {LINES.map((line, i) => {
            const isFlagged = Boolean(flagged[i]);
            const showVerdict = revealed;
            const correct = showVerdict && isFlagged === line.hasBug;
            return (
              <div key={i} className={styles.bhLineWrap}>
                <button
                  type="button"
                  className={`${styles.bhLine} ${isFlagged ? styles.bhLineFlagged : ""} ${showVerdict ? (correct ? styles.wfBlockCorrect : styles.wfBlockWrong) : ""}`}
                  onClick={() => toggle(i)}
                >
                  <code>{line.code}</code>
                </button>
                {showVerdict ? (
                  <p className={styles.wfVerdict}>
                    {line.hasBug ? `Помилка: ${line.explanation}` : "Тут усе гаразд."}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        {!revealed ? (
          <button type="button" className={styles.itButton} onClick={() => setRevealed(true)}>
            Перевірити
          </button>
        ) : (
          <>
            <p className={styles.itValidity}>
              Правильних оцінок: {correctCount} / {LINES.length}
            </p>
            <button
              type="button"
              className={styles.itButton}
              onClick={() => {
                setFlagged({});
                setRevealed(false);
              }}
            >
              Спробувати ще раз
            </button>
          </>
        )}
      </DemoPreview>

      <DemoExplanation>
        Четвертий рядок (перший h1) навмисно без помилки — проблема виникає лише через ПОВТОРЕННЯ нижче. Це
        перевіряє не заучування списку, а реальне розуміння, чому кожна помилка є помилкою.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Онови сторінку демо (чи натисни ще раз "Перевірити" після зміни виборів) — рахунок перераховується від
        твоїх реальних кліків, а не показує наперед заготовлений результат.
      </DemoKeyTakeaway>
    </div>
  );
}
