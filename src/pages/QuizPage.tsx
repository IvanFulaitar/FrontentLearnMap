import { Navigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { Quiz } from "../components/quiz/Quiz";
import { Card } from "../components/ui/Card";
import { courses } from "../data/courses";
import { useProgressContext } from "../context/ProgressContext";
import { usePlatform } from "../context/PlatformContext";
import { useToast } from "../context/ToastContext";
import { XP_REWARDS } from "../constants/gamification";
import styles from "./QuizPage.module.css";

export function QuizPage() {
  const { courseId, moduleId, quizId } = useParams();
  const { saveQuizScore } = useProgressContext();
  const { addXp } = usePlatform();
  const { notify } = useToast();
  const course = courses.find((item) => item.id === courseId);
  const currentModule = course?.modules.find((item) => item.id === moduleId);
  const quiz = currentModule && currentModule.quiz.id === quizId ? currentModule.quiz : null;

  if (!course || !currentModule || !quiz || !courseId || !moduleId || !quizId) return <Navigate to="/courses" replace />;

  return (
    <div className="page">
      <Card className={styles.header}>
        <Breadcrumbs
          items={[
            { label: "Курси", href: "/courses" },
            { label: course.title, href: `/courses/${course.id}` },
            { label: currentModule.title, href: `/courses/${course.id}` },
            { label: quiz.title },
          ]}
        />
        <span className="eyebrow">{course.title} · {currentModule.title}</span>
        <h1>{quiz.title}</h1>
        <p>Дай відповіді на 5 питань. Після перевірки побачиш відсоток і правильні відповіді.</p>
      </Card>
      <Quiz
        quiz={quiz}
        onComplete={(score) => {
          saveQuizScore(courseId, moduleId, quizId, score);
          if (score >= 60) addXp(XP_REWARDS.quizPassed);
          notify({
            title: score >= 60 ? "Тест пройдено" : "Тест завершено",
            message: `Результат: ${score}%. Пояснення показано під питаннями.`,
            tone: score >= 60 ? "success" : "warning",
          });
        }}
      />
    </div>
  );
}
