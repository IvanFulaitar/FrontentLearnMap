import { ArrowLeft, ArrowRight, Bookmark, CheckCircle2, ClipboardCheck } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { LessonContent } from "../components/lesson/LessonContent";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useProgressContext } from "../context/ProgressContext";
import { usePlatform } from "../context/PlatformContext";
import { useToast } from "../context/ToastContext";
import { findLesson, getLessonKey, getLessonStatus, getNeighborLessons } from "../utils/progress";
import { XP_REWARDS } from "../constants/gamification";
import { lessonDifficultyLabels, lessonStatusLabels, lessonTypeLabels } from "../constants/labels";
import styles from "./LessonPage.module.css";

export function LessonPage() {
  const { courseId, moduleId, lessonId } = useParams();
  const location = findLesson(courseId, moduleId, lessonId);
  const { lessonProgress, setLessonStatus } = useProgressContext();
  const { addXp, bookmarks, notes, saveNote, toggleBookmark } = usePlatform();
  const { notify } = useToast();

  if (!location || !courseId || !moduleId || !lessonId) return <Navigate to="/courses" replace />;

  const { course, module, lesson } = location;
  const status = getLessonStatus(lesson, lessonProgress, course.id, module.id);
  const neighbors = getNeighborLessons(course.id, module.id, lesson.id);
  const lessonKey = getLessonKey(course.id, module.id, lesson.id);
  const completeLesson = () => {
    const wasCompleted = status === "completed";
    setLessonStatus(course.id, module.id, lesson.id, "completed");
    if (!wasCompleted) addXp(XP_REWARDS.lessonRead);
    notify({ title: "Урок завершено", message: `«${lesson.title}» позначено як завершений.`, tone: "success" });
  };

  return (
    <div className="page">
      <Card className={styles.headerCard}>
        <Breadcrumbs
          items={[
            { label: "Курси", href: "/courses" },
            { label: course.title, href: `/courses/${course.id}` },
            { label: module.title, href: `/courses/${course.id}` },
            { label: lesson.title },
          ]}
        />
        <span className="eyebrow">{course.title} · {module.title}</span>
        <h1>{lesson.title}</h1>
        <p>{lesson.description}</p>
        <div className={styles.meta}>
          <Badge tone={status}>{lessonStatusLabels[status]}</Badge>
          <Badge>{lesson.duration}</Badge>
          <Badge>{lessonTypeLabels[lesson.type]}</Badge>
          <Badge>{lessonDifficultyLabels[lesson.difficulty]}</Badge>
        </div>
        <div className={styles.actions}>
          <Button onClick={completeLesson}>
            <CheckCircle2 size={18} /> Позначити як виконано
          </Button>
          <Button variant="secondary" onClick={() => toggleBookmark(lessonKey)}>
            <Bookmark size={18} /> {bookmarks.includes(lessonKey) ? "Збережено" : "Додати в закладки"}
          </Button>
          {status === "not-started" ? (
            <Button variant="secondary" onClick={() => setLessonStatus(course.id, module.id, lesson.id, "in-progress")}>
              Почати урок
            </Button>
          ) : null}
          <Link to={`/courses/${course.id}/modules/${module.id}/quiz/${module.quiz.id}`}>
            <Button variant="ghost">
              <ClipboardCheck size={18} /> Тест модуля
            </Button>
          </Link>
        </div>
      </Card>
      <LessonContent lesson={lesson} />
      <Card className={styles.notes}>
        <h2>Мої нотатки</h2>
        <p>Конспект зберігається локально в браузері й буде готовий для майбутнього Notes API.</p>
        <textarea
          value={notes[lessonKey] ?? ""}
          onChange={(event) => saveNote(lessonKey, event.target.value)}
          placeholder="Запиши головні ідеї, приклади або питання до уроку..."
          aria-label="Мої нотатки"
        />
      </Card>
      <div className={styles.nav}>
        {neighbors.previous ? (
          <Link
            to={`/courses/${neighbors.previous.course.id}/modules/${neighbors.previous.module.id}/lessons/${neighbors.previous.lesson.id}`}
          >
            <Button variant="ghost">
              <ArrowLeft size={18} /> Попередній урок
            </Button>
          </Link>
        ) : <span />}
        {neighbors.next ? (
          <Link to={`/courses/${neighbors.next.course.id}/modules/${neighbors.next.module.id}/lessons/${neighbors.next.lesson.id}`}>
            <Button variant="ghost">
              Наступний урок <ArrowRight size={18} />
            </Button>
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
