import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { Quiz } from "../components/quiz/Quiz";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { courses } from "../data/courses";
import { useProgressContext } from "../context/ProgressContext";
import { usePlatform } from "../context/PlatformContext";
import { useToast } from "../context/ToastContext";
import { getNeighborLessons } from "../utils/progress";
import { XP_REWARDS } from "../constants/gamification";
import styles from "./QuizPage.module.css";

export function QuizPage() {
  const { courseId, moduleId, quizId } = useParams();
  const { saveQuizScore } = useProgressContext();
  const { addXp } = usePlatform();
  const { notify } = useToast();
  const [isQuizDone, setQuizDone] = useState(false);
  const course = courses.find((item) => item.id === courseId);
  const currentModule = course?.modules.find((item) => item.id === moduleId);
  const quiz = currentModule && currentModule.quiz.id === quizId ? currentModule.quiz : null;

  if (!course || !currentModule || !quiz || !courseId || !moduleId || !quizId) return <Navigate to="/courses" replace />;

  // The quiz always sits right after the module's own lessons, so "back to
  // lesson" returns to the last lesson of this module, and "next lesson"
  // (shown once the quiz is complete) is whatever comes right after that
  // lesson in the course-wide sequence — i.e. the first lesson of the next
  // module, or null if this was the very last lesson of the whole course.
  const lastLesson = currentModule.lessons[currentModule.lessons.length - 1];
  const nextLesson = lastLesson ? getNeighborLessons(course.id, currentModule.id, lastLesson.id).next : null;

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
        {lastLesson ? (
          <div className={styles.headerActions}>
            <Link to={`/courses/${course.id}/modules/${currentModule.id}/lessons/${lastLesson.id}`}>
              <Button variant="ghost">
                <ArrowLeft size={18} /> Повернутись до уроку
              </Button>
            </Link>
          </div>
        ) : null}
      </Card>
      <Quiz
        quiz={quiz}
        onComplete={(score) => {
          setQuizDone(true);
          saveQuizScore(courseId, moduleId, quizId, score);
          if (score >= 60) addXp(XP_REWARDS.quizPassed);
          notify({
            title: score >= 60 ? "Тест пройдено" : "Тест завершено",
            message: `Результат: ${score}%. Пояснення показано під питаннями.`,
            tone: score >= 60 ? "success" : "warning",
          });
        }}
        onRetry={() => setQuizDone(false)}
      />
      {isQuizDone && nextLesson ? (
        <div className={styles.nextLessonNav}>
          <Link
            to={`/courses/${nextLesson.course.id}/modules/${nextLesson.module.id}/lessons/${nextLesson.lesson.id}`}
          >
            <Button variant="primary">
              Наступний урок <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
