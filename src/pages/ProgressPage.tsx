import { courses } from "../data/courses";
import { useProgressContext } from "../context/ProgressContext";
import { getCourseProgress, getLearningStats, getOverallProgress } from "../utils/progress";
import { ProgressBar } from "../components/progress/ProgressBar";
import { Card } from "../components/ui/Card";
import { PageHeader } from "../shared/page/PageHeader";
import styles from "./ProgressPage.module.css";

export function ProgressPage() {
  const { lessonProgress, quizProgress } = useProgressContext();
  const overall = getOverallProgress(lessonProgress);
  const stats = getLearningStats(lessonProgress, quizProgress);

  return (
    <div className="page">
      <PageHeader
        breadcrumbs={[{ label: "Дашборд", href: "/" }, { label: "Прогрес" }]}
        eyebrow="Прогрес"
        title="Твій прогрес навчання"
        description="Стан уроків і тестів зберігається локально в браузері."
      />
      <section className={styles.summary}>
        <Card className={styles.box}>
          <ProgressBar value={overall.percent} label="Загальний відсоток проходження" />
        </Card>
        <Card className={styles.box}>
          <div className={styles.number}>{overall.completed}</div>
          <p>завершених уроків</p>
        </Card>
        <Card className={styles.box}>
          <div className={styles.number}>{stats.passedTests}</div>
          <p>пройдених тестів</p>
        </Card>
        <Card className={styles.box}>
          <div className={styles.number}>{overall.total}</div>
          <p>уроків у roadmap</p>
        </Card>
        <Card className={styles.box}>
          <div className={styles.number}>{stats.completedPractices}</div>
          <p>практик завершено</p>
        </Card>
      </section>
      <section className={styles.courses}>
        {courses.map((course) => {
          const stats = getCourseProgress(course, lessonProgress);
          return (
            <Card className={styles.course} key={course.id}>
              <h2>{course.title}</h2>
              <p>{stats.completed}/{stats.total} уроків завершено</p>
              <ProgressBar value={stats.percent} label="Прогрес" />
            </Card>
          );
        })}
      </section>
    </div>
  );
}
