import { RotateCcw, Send } from "lucide-react";
import { useMemo, useState } from "react";
import type { QuizData } from "../../types/course";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { QuizQuestion } from "./QuizQuestion";
import styles from "./Quiz.module.css";

interface QuizProps {
  quiz: QuizData;
  onComplete: (score: number) => void;
}

export function Quiz({ quiz, onComplete }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, string | string[] | boolean>>({});
  const [isSubmitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    const correct = quiz.questions.filter((question) => {
      const answer = answers[question.id];
      if (Array.isArray(question.correctAnswer)) {
        return Array.isArray(answer)
          && answer.length === question.correctAnswer.length
          && question.correctAnswer.every((item) => answer.includes(item));
      }
      return answer === question.correctAnswer;
    }).length;
    return Math.round((correct / quiz.questions.length) * 100);
  }, [answers, quiz.questions]);

  const submit = () => {
    setSubmitted(true);
    onComplete(score);
  };

  const retry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className={styles.quiz}>
      {quiz.questions.map((question) => (
        <QuizQuestion
          key={question.id}
          question={question}
          selected={answers[question.id]}
          isSubmitted={isSubmitted}
          onSelect={(answer) => setAnswers((current) => ({ ...current, [question.id]: answer }))}
        />
      ))}
      {isSubmitted ? (
        <Card className={styles.result}>
          <div>
            <div className={styles.score}>{score}%</div>
            <p>Правильні відповіді підсвічено зеленим. Помилки - червоним.</p>
          </div>
          <Button variant="secondary" onClick={retry}>
            <RotateCcw size={18} /> Повторити тест
          </Button>
        </Card>
      ) : (
        <div className={styles.actions}>
          <Button onClick={submit} disabled={Object.keys(answers).length < quiz.questions.length}>
            <Send size={18} /> Перевірити результат
          </Button>
        </div>
      )}
    </div>
  );
}
