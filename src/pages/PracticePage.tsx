import { useMemo, useState } from "react";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { practiceTasks } from "../data/practice";
import type { ChallengeCategory } from "../types/platform";
import { lessonDifficultyLabels } from "../constants/labels";
import { PageHeader } from "../shared/page/PageHeader";
import styles from "./PlatformPages.module.css";

const CATEGORY_LABELS: Record<ChallengeCategory | "All", string> = {
  All: "Усі",
  HTML: "HTML",
  CSS: "CSS",
  JavaScript: "JavaScript",
  React: "React",
  TypeScript: "TypeScript",
};

export function PracticePage() {
  const [category, setCategory] = useState<ChallengeCategory | "All">("All");
  const tasks = useMemo(() => category === "All" ? practiceTasks : practiceTasks.filter((task) => task.category === category), [category]);

  return (
    <div className="page">
      <PageHeader
        breadcrumbs={[{ label: "Дашборд", href: "/" }, { label: "Практика" }]}
        eyebrow="Практика"
        title="Практичні завдання"
        description="Категоризовані вправи з початковим кодом, підказками та прихованим рішенням."
        actions={
        <select className={styles.select} value={category} onChange={(event) => setCategory(event.target.value as ChallengeCategory | "All")}>
          {(["All", "HTML", "CSS", "JavaScript", "React", "TypeScript"] as const).map((item) => <option key={item} value={item}>{CATEGORY_LABELS[item]}</option>)}
        </select>
        }
      />
      <section className={styles.grid}>
        {tasks.map((task) => (
          <Card className={styles.card} key={task.id}>
            <Badge>{task.category}</Badge>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <Badge>{lessonDifficultyLabels[task.difficulty]}</Badge>
            <strong>Вимоги</strong>
            <ul>{task.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
            <details>
              <summary>Підказки</summary>
              <ul>{task.hints.map((item) => <li key={item}>{item}</li>)}</ul>
            </details>
            <details>
              <summary>Рішення</summary>
              <pre>{task.solution}</pre>
            </details>
          </Card>
        ))}
      </section>
    </div>
  );
}
