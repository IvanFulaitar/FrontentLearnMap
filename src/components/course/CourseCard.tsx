import { Link } from "react-router-dom";
import type { Course } from "../../types/course";
import { getCourseProgress, type ProgressMap } from "../../utils/progress";
import { courseLevelLabels } from "../../constants/labels";
import { ProgressBar } from "../progress/ProgressBar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import styles from "./CourseCard.module.css";

interface CourseCardProps {
  course: Course;
  progress: ProgressMap;
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const stats = getCourseProgress(course, progress);

  return (
    <Card className={styles.card}>
      <div className={styles.top}>
        <div>
          <h2 className={styles.title}>{course.title}</h2>
          <p>{course.description}</p>
        </div>
        <Badge>{courseLevelLabels[course.level]}</Badge>
      </div>
      <div className={styles.meta}>
        <span>{course.modules.length} мод.</span>
        <span>{stats.completed}/{stats.total} уроків</span>
      </div>
      <div className={styles.levels} aria-label="Рівні складності курсу">
        {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
          <span className={`${styles.level} ${course.level === level ? styles.activeLevel : ""}`} key={level}>
            {courseLevelLabels[level]}
          </span>
        ))}
      </div>
      <ProgressBar value={stats.percent} label="Прогрес курсу" />
      <Link to={`/courses/${course.id}`}>
        <Button variant="secondary">Відкрити курс</Button>
      </Link>
    </Card>
  );
}
