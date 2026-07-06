import { useState } from "react";
import type { MicroExercise, PracticeTask } from "../../types/course";
import { Button } from "../ui/Button";
import styles from "./LessonPractice.module.css";

const exerciseKindLabels: Record<MicroExercise["kind"], string> = {
  predict: "Передбач результат",
  "find-the-bug": "Знайди помилку",
  explain: "Поясни код",
  rewrite: "Перепиши краще",
  choice: "Обери відповідь",
};

/**
 * Static, read-only replacement for the live code playground. The
 * interactive editor architecture (src/features/playground) is intentionally
 * left untouched — it is simply not rendered here for now, per product
 * decision, in favor of short self-check exercises after every lesson.
 */
export function LessonPractice({ practiceTask, microExercises }: { practiceTask: PracticeTask; microExercises?: MicroExercise[] }) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.taskCard}>
        <strong>{practiceTask.title}</strong>
        <p>{practiceTask.description}</p>
        <ul className={styles.checklist}>
          {practiceTask.checklist.map((item) => <li key={item}>{item}</li>)}
        </ul>
        {practiceTask.expectedOutput ? <p><strong>Очікуваний результат:</strong> {practiceTask.expectedOutput}</p> : null}
        {practiceTask.steps?.length ? (
          <ol className={styles.steps}>
            {practiceTask.steps.map((step, index) => (
              <li className={styles.step} key={step.title}>
                <div className={styles.stepHeading}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <strong>{step.title}</strong>
                </div>
                <p>{step.description}</p>
                <pre className={styles.codeBlock}>
                  <code>{step.code}</code>
                </pre>
              </li>
            ))}
          </ol>
        ) : null}
        {/* When a step-by-step build guide exists, step 1 already covers the
            starting point, so the raw starter file (often just an empty
            placeholder for mini-projects) would be redundant clutter here. */}
        {!practiceTask.steps?.length
          ? practiceTask.starterFiles.map((file) => (
              <pre className={styles.codeBlock} key={file.id ?? file.path ?? file.label}>
                <code>{`// ${file.label}\n${file.code}`}</code>
              </pre>
            ))
          : null}
        {practiceTask.hints?.length ? (
          <details className={styles.reveal}>
            <summary>Підказки</summary>
            <ul className={styles.hintsList}>
              {practiceTask.hints.map((hint) => <li key={hint}>{hint}</li>)}
            </ul>
          </details>
        ) : null}
        {practiceTask.solutionFiles?.length ? (
          <>
            <Button className={styles.solutionToggle} variant="secondary" onClick={() => setShowSolution((value) => !value)}>
              {showSolution ? "Сховати рішення" : "Показати рішення"}
            </Button>
            {showSolution
              ? practiceTask.solutionFiles.map((file) => (
                  <pre className={styles.codeBlock} key={file.id ?? file.path ?? file.label}>
                    <code>{`// ${file.label}\n${file.code}`}</code>
                  </pre>
                ))
              : null}
          </>
        ) : null}
      </div>

      {microExercises?.map((exercise) => (
        <div className={styles.exercise} key={exercise.id}>
          <span className={styles.exerciseKind}>{exerciseKindLabels[exercise.kind]}</span>
          <p>{exercise.prompt}</p>
          {exercise.code ? (
            <pre className={styles.codeBlock}>
              <code>{exercise.code}</code>
            </pre>
          ) : null}
          {exercise.options?.length ? (
            <ul className={styles.checklist}>
              {exercise.options.map((option) => <li key={option}>{option}</li>)}
            </ul>
          ) : null}
          <details className={styles.reveal}>
            <summary>Показати відповідь</summary>
            <p>{exercise.solution}</p>
          </details>
        </div>
      ))}
    </div>
  );
}
