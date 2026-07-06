import { ChevronDown, ChevronRight, ClipboardCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Course, Module } from "../../types/course";
import { getLessonStatus, getModuleMeta, getModuleProgress, type ProgressMap } from "../../utils/progress";
import { ProgressBar } from "../progress/ProgressBar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { LessonItem } from "./LessonItem";
import { ProjectBrief } from "./ProjectBrief";
import styles from "./ModuleAccordion.module.css";

interface ModuleAccordionProps {
  course: Course;
  module: Module;
  progress: ProgressMap;
}

export function ModuleAccordion({ course, module, progress }: ModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const moduleProgress = getModuleProgress(course, module, progress);
  const meta = getModuleMeta(module);

  return (
    <Card className={styles.module}>
      <button className={styles.summary} onClick={() => setIsOpen((value) => !value)}>
        <div>
          <div className={styles.summaryTop}>
            <h3>{module.title}</h3>
            {moduleProgress.isCompleted ? <Badge tone="completed">Завершено</Badge> : <Badge tone="in-progress">У процесі</Badge>}
          </div>
          <p>{module.description}</p>
          <div className={styles.meta}>
            <Badge>{meta.lessonCount} уроків</Badge>
            <Badge>{meta.quizCount} тестів</Badge>
            <Badge>{Math.round(meta.estimatedTime / 60)} год</Badge>
          </div>
          <ProgressBar value={moduleProgress.percent} label={`${moduleProgress.completed}/${moduleProgress.total} уроків`} />
        </div>
        {isOpen ? <ChevronDown size={22} /> : <ChevronRight size={22} />}
      </button>
      {isOpen ? (
        <div className={styles.content}>
          {module.lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              status={getLessonStatus(lesson, progress, course.id, module.id)}
              href={`/courses/${course.id}/modules/${module.id}/lessons/${lesson.id}`}
            />
          ))}
          <Link className={styles.quiz} to={`/courses/${course.id}/modules/${module.id}/quiz/${module.quiz.id}`}>
            <Button variant="ghost">
              <ClipboardCheck size={18} /> Тест модуля
            </Button>
          </Link>
          <ProjectBrief project={module.project} />
        </div>
      ) : null}
    </Card>
  );
}
