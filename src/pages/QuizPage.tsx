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
  const { saveQuizScore, lastOpenedLesson } = useProgressContext();
  const { addXp } = usePlatform();
  const { notify } = useToast();
  const [isQuizDone, setQuizDone] = useState(false);
  const course = courses.find((item) => item.id === courseId);
  const currentModule = course?.modules.find((item) => item.id === moduleId);
  // A quiz URL can point either at the module's own "контрольний тест" or at
  // one lesson's individual "швидка перевірка" — both live under the same
  // /quiz/:quizId route, distinguished only by which id matches. Checking
  // ONLY currentModule.quiz.id here (the previous behavior) meant every
  // lesson-level quiz link 404'd silently to /courses, which is why lesson
  // quizzes were unreachable and everyone ended up seeing just the one
  // module test.
  const lessonQuizMatch = currentModule?.lessons.find((item) => item.quiz.id === quizId);
  const quiz = (currentModule && currentModule.quiz.id === quizId ? currentModule.quiz : null) ?? lessonQuizMatch?.quiz ?? null;

  if (!course || !currentModule || !quiz || !courseId || !moduleId || !quizId) return <Navigate to="/courses" replace />;

  // "Тест модуля" on LessonPage can be reached from ANY lesson in the
  // module, not just the last one — so "back to lesson" has to return to
  // wherever the learner actually came from, not assume it's the module's
  // last lesson (that assumption sent everyone back to the wrong lesson).
  // lastOpenedLesson is updated by LessonPage every time a lesson is
  // visited, so if it matches this course+module it's the real referrer;
  // otherwise (e.g. the quiz was opened directly/bookmarked) fall back to
  // the module's last lesson as a reasonable default.
  // A lesson's own quiz always "belongs" to that exact lesson, so it takes
  // priority over the referrer guess.
  const referrerLesson =
    lastOpenedLesson && lastOpenedLesson.courseId === course.id && lastOpenedLesson.moduleId === currentModule.id
      ? currentModule.lessons.find((item) => item.id === lastOpenedLesson.lessonId)
      : null;
  const backLesson = lessonQuizMatch ?? referrerLesson ?? currentModule.lessons[currentModule.lessons.length - 1];
  // "Next lesson" after finishing the quiz should be whatever comes right
  // after that same reference lesson in the course-wide sequence — the next
  // lesson in this module if the learner came from an earlier one, or the
  // first lesson of the next module if they came from the last one.
  const nextLesson = backLesson ? getNeighborLessons(course.id, currentModule.id, backLesson.id).next : null;

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
        <p>Дай відповіді на {quiz.questions.length} питань. Після перевірки побачиш відсоток і правильні відповіді.</p>
        {backLesson ? (
          <div className={styles.headerActions}>
            <Link to={`/courses/${course.id}/modules/${currentModule.id}/lessons/${backLesson.id}`}>
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
