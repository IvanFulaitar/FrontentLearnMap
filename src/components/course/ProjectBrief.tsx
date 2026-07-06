import { ClipboardCheck } from "lucide-react";
import type { ModuleProject } from "../../types/course";
import { Badge } from "../ui/Badge";
import styles from "./ProjectBrief.module.css";

export function ProjectBrief({ project }: { project: ModuleProject }) {
  return (
    <section className={styles.brief} aria-labelledby={`${project.id}-title`}>
      <div>
        <Badge>Проєкт модуля</Badge>
        <h3 id={`${project.id}-title`}>{project.title}</h3>
        <p>{project.description}</p>
        <Badge>{Math.round(project.estimatedTime / 60)} год</Badge>
      </div>
      <div className={styles.columns}>
        <div>
          <strong>Вимоги</strong>
          <ul className={styles.list}>
            {project.requirements.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <strong>Чекліст</strong>
          <ul className={styles.list}>
            {project.checklist.map((item) => <li key={item}><ClipboardCheck size={14} /> {item}</li>)}
          </ul>
        </div>
        <div>
          <strong>Критерії оцінювання</strong>
          <ul className={styles.list}>
            {project.evaluationCriteria.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
