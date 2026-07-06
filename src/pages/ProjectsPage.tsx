import { CheckCircle2 } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { usePlatform } from "../context/PlatformContext";
import { useToast } from "../context/ToastContext";
import { platformProjects } from "../data/projects";
import { courseLevelLabels, lessonDifficultyLabels } from "../constants/labels";
import { PageHeader } from "../shared/page/PageHeader";
import styles from "./PlatformPages.module.css";

export function ProjectsPage() {
  const { completeProject, completedProjects } = usePlatform();
  const { notify } = useToast();

  return (
    <div className="page">
      <PageHeader
        breadcrumbs={[{ label: "Дашборд", href: "/" }, { label: "Проєкти" }]}
        eyebrow="Проєкти для портфоліо"
        title="Проєкти"
        description="Кожен проєкт має вимоги, чекліст, очікуваний результат, вайрфрейм і корисні ресурси."
      />
      <section className={styles.grid}>
        {platformProjects.map((project) => (
          <Card className={styles.card} key={project.id}>
            <Badge>{courseLevelLabels[project.level]}</Badge>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <Badge>{lessonDifficultyLabels[project.difficulty]}</Badge>
            <strong>Очікуваний результат</strong>
            <p>{project.expectedResult}</p>
            <strong>Технології</strong>
            <p>{project.technologies.join(", ")}</p>
            <details><summary>Чекліст</summary><ul>{project.checklist.map((item) => <li key={item}>{item}</li>)}</ul></details>
            <Button
              variant={completedProjects.includes(project.id) ? "secondary" : "primary"}
              onClick={() => {
                completeProject(project.id);
                notify({ title: "Проєкт завершено", message: `«${project.title}» додано до прогресу.`, tone: "success" });
              }}
            >
              <CheckCircle2 size={18} /> {completedProjects.includes(project.id) ? "Завершено" : "Завершити проєкт"}
            </Button>
          </Card>
        ))}
      </section>
    </div>
  );
}
