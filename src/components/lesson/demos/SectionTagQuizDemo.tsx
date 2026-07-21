import { useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface Question {
  scenario: string;
  correctTag: string;
}

const QUESTIONS: Question[] = [
  { scenario: "Блок навігаційних посилань зверху сторінки", correctTag: "nav" },
  { scenario: "Тематичний розділ \"Переваги\" зі своїм заголовком h2", correctTag: "section" },
  { scenario: "Окрема картка товару, яку можна показати й на власній сторінці", correctTag: "article" },
  { scenario: "Блок \"Схожі товари\" збоку від опису товару", correctTag: "aside" },
  { scenario: "Увесь унікальний контент сторінки, один раз", correctTag: "main" },
];

const TAG_OPTIONS = ["header", "nav", "main", "section", "article", "aside", "footer"];

/**
 * Live demo for "Як розбити сторінку на семантичні секції": a real
 * one-question-at-a-time quiz built from the lesson's own decision
 * table. Each answer is genuinely checked and scored, then the demo
 * moves to the next real scenario.
 */
export function SectionTagQuizDemo() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const question = QUESTIONS[step];
  const isDone = step >= QUESTIONS.length;

  const answer = (tag: string) => {
    if (answered) return;
    setAnswered(true);
    const correct = tag === question.correctTag;
    if (correct) setScore((s) => s + 1);
    setFeedback(correct ? "Правильно!" : `Ні — правильний тег: ${question.correctTag}`);
  };

  const next = () => {
    setStep((s) => s + 1);
    setAnswered(false);
    setFeedback(null);
  };

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Обери тег для кожного сценарію — рахунок реальний, підраховується по ходу">
        {isDone ? (
          <p className={styles.itValidity}>
            Готово: {score} / {QUESTIONS.length} правильних відповідей.
          </p>
        ) : (
          <div className={styles.stqStage}>
            <p className={styles.stqScenario}>
              Питання {step + 1}/{QUESTIONS.length}: {question.scenario}
            </p>
            <div className={styles.stqOptions}>
              {TAG_OPTIONS.map((tag) => (
                <button key={tag} type="button" className={styles.itButton} onClick={() => answer(tag)} disabled={answered}>
                  {tag}
                </button>
              ))}
            </div>
            {feedback ? (
              <>
                <p className={styles.itValidity}>{feedback}</p>
                <button type="button" className={styles.itButton} onClick={next}>
                  Далі
                </button>
              </>
            ) : null}
          </div>
        )}
      </DemoPreview>

      <DemoExplanation>
        Кожен сценарій узятий прямо з таблиці рішень уроку — тест на article ("чи має сенс окремо"), на aside
        ("чи це побічний контент") застосовується тут по-справжньому, а не просто читається як текст.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Рахунок вище — це реальний підрахунок твоїх відповідей у цій сесії, не фіксоване число. Пройди квіз ще
        раз, обираючи інші варіанти, і побач інший результат.
      </DemoKeyTakeaway>
    </div>
  );
}
