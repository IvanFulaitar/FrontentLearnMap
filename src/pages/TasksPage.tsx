import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { codingTasks } from "../data/tasks";
import type { CodingChallenge, ChallengeCategory } from "../types/platform";
import { lessonDifficultyLabels } from "../constants/labels";
import { usePlatform } from "../context/PlatformContext";
import { pluralizeUk } from "../utils/pluralize";
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

interface TaskCardProps {
  task: CodingChallenge;
  isDone: boolean;
  onComplete: () => void;
}

function TaskCard({ task, isDone, onComplete }: TaskCardProps) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <Card className={`${styles.card} ${isDone ? styles.cardDone : ""}`}>
      <div className={styles.taskHeader}>
        <Badge>{task.category}</Badge>
        <Badge>{lessonDifficultyLabels[task.difficulty]}</Badge>
      </div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <strong>Вимоги</strong>
      <ul>{task.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
      <span className={styles.codeLabel}>Заверши код</span>
      {task.starterCode.map((file) => (
        <pre className={styles.solutionCode} key={file.label}>
          <code>{file.code}</code>
        </pre>
      ))}
      {task.hints.length ? (
        <details className={styles.reveal}>
          <summary>Підказки</summary>
          <ul>{task.hints.map((item) => <li key={item}>{item}</li>)}</ul>
        </details>
      ) : null}
      <Button variant="secondary" onClick={() => setShowSolution((value) => !value)}>
        {showSolution ? "Сховати рішення" : "Показати рішення"}
      </Button>
      {showSolution ? (
        <pre className={styles.solutionCode}>
          <code>{task.solution}</code>
        </pre>
      ) : null}
      <div className={styles.taskFooter}>
        <strong>{task.xpReward} XP</strong>
        <Button variant={isDone ? "success" : "primary"} onClick={onComplete} disabled={isDone}>
          {isDone ? (
            <>
              <CheckCircle2 size={16} aria-hidden="true" /> Виконано
            </>
          ) : (
            "Позначити виконаним"
          )}
        </Button>
      </div>
    </Card>
  );
}

export function TasksPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ChallengeCategory | "All">("All");
  const { completedChallenges, completeChallenge } = usePlatform();
  const filtered = useMemo(
    () =>
      codingTasks.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) &&
          (category === "All" || item.category === category),
      ),
    [query, category],
  );
  const doneCount = codingTasks.filter((item) => completedChallenges.includes(item.id)).length;

  return (
    <div className="page">
      <PageHeader
        breadcrumbs={[{ label: "Дашборд", href: "/" }, { label: "Задачі" }]}
        eyebrow={`${codingTasks.length} ${pluralizeUk(codingTasks.length, ["задача", "задачі", "задач"])}`}
        title="Маленькі задачі"
        description={`Заверши код за коментарем-підказкою, звір із рішенням і забери XP. Виконано ${doneCount} з ${codingTasks.length} ${pluralizeUk(codingTasks.length, ["задачі", "задач", "задач"])}.`}
      />
      <div className={styles.toolbar}>
        <input className={styles.input} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Пошук задачі" />
        <select className={styles.select} value={category} onChange={(event) => setCategory(event.target.value as ChallengeCategory | "All")}>
          {(["All", "HTML", "CSS", "JavaScript", "React", "TypeScript"] as const).map((item) => <option key={item} value={item}>{CATEGORY_LABELS[item]}</option>)}
        </select>
      </div>
      <section className={styles.grid}>
        {filtered.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isDone={completedChallenges.includes(task.id)}
            onComplete={() => completeChallenge(task.id, task.xpReward)}
          />
        ))}
      </section>
    </div>
  );
}
