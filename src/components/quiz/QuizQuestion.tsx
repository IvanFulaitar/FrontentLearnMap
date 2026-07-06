import type { QuizQuestion as QuizQuestionType } from "../../types/course";
import styles from "./QuizQuestion.module.css";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selected?: string | string[] | boolean;
  isSubmitted: boolean;
  onSelect: (answer: string | string[] | boolean) => void;
}

// True/False options are rendered from fixed, localized labels instead of
// matching against the raw option text (previously `option === "True"`),
// which broke as soon as the option strings were translated out of English.
const TRUE_FALSE_OPTIONS: { label: string; value: boolean }[] = [
  { label: "Так", value: true },
  { label: "Ні", value: false },
];

export function QuizQuestion({ question, selected, isSubmitted, onSelect }: QuizQuestionProps) {
  const selectedArray = Array.isArray(selected) ? selected : [];
  const correctArray = Array.isArray(question.correctAnswer) ? question.correctAnswer : [String(question.correctAnswer)];
  const isTrueFalse = question.type === "true-false";
  const displayOptions = isTrueFalse
    ? TRUE_FALSE_OPTIONS.map((item) => ({ key: item.label, label: item.label, value: item.value }))
    : question.options.map((option) => ({ key: option, label: option, value: option }));

  // Prefer a note tied to the option the learner actually picked (why *this*
  // choice is wrong) over the single generic explanation, when the question
  // data provides one.
  const pickedWrongNotes = isSubmitted
    ? selectedArray
        .concat(typeof selected === "string" ? [selected] : [])
        .filter((value) => !correctArray.map(String).includes(String(value)))
        .map((value) => question.optionExplanations?.[value])
        .filter((note): note is string => Boolean(note))
    : [];

  return (
    <div className={styles.question}>
      <strong>{question.question}</strong>
      {question.codeSnippet ? (
        <pre className={styles.code}>
          <code>{question.codeSnippet}</code>
        </pre>
      ) : null}
      <div className={styles.options}>
        {displayOptions.map(({ key, label, value: answerValue }) => {
          const isSelected = question.type === "multiple" ? selectedArray.includes(answerValue as string) : selected === answerValue;
          const isCorrect = isSubmitted && correctArray.map(String).includes(String(answerValue));
          const isWrong = isSubmitted && isSelected && !isCorrect;
          return (
            <label
              className={`${styles.option} ${isCorrect ? styles.correct : ""} ${isWrong ? styles.wrong : ""}`}
              key={key}
            >
              <input
                type={question.type === "multiple" ? "checkbox" : "radio"}
                name={question.id}
                checked={isSelected}
                disabled={isSubmitted}
                onChange={() => {
                  if (question.type === "multiple") {
                    const optionValue = answerValue as string;
                    onSelect(isSelected ? selectedArray.filter((item) => item !== optionValue) : [...selectedArray, optionValue]);
                    return;
                  }
                  onSelect(answerValue);
                }}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
      {isSubmitted ? (
        <div className={styles.explanationGroup}>
          <div className={`${styles.explanation} ${styles.explanationCorrect}`}>
            <strong>Чому правильно:</strong> {question.explanation}
          </div>
          {pickedWrongNotes.map((note, index) => (
            <div className={`${styles.explanation} ${styles.explanationWrong}`} key={index}>
              <strong>Чому твій варіант не підходить:</strong> {note}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
