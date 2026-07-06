import { CheckCircle2, Circle, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Lesson, LessonStatus } from "../../types/course";
import { lessonStatusLabels, lessonTypeLabels } from "../../constants/labels";
import { Badge } from "../ui/Badge";
import styles from "./LessonItem.module.css";

interface LessonItemProps {
  lesson: Lesson;
  status: LessonStatus;
  href: string;
}

const icon = {
  completed: <CheckCircle2 size={18} />,
  "in-progress": <Clock3 size={18} />,
  "not-started": <Circle size={18} />,
};

export function LessonItem({ lesson, status, href }: LessonItemProps) {
  return (
    <Link to={href} className={styles.item}>
      <span className={`${styles.check} ${status === "completed" ? styles.done : ""}`} aria-hidden="true">
        {icon[status]}
      </span>
      <div>
        <div className={styles.title}>{lesson.title}</div>
        <div className={styles.duration}>{lesson.duration} · {lessonTypeLabels[lesson.type]}</div>
      </div>
      <Badge tone={status}>{lessonStatusLabels[status]}</Badge>
    </Link>
  );
}
