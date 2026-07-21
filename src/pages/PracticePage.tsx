import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { practiceTasks } from "../data/practice";
import type { ChallengeCategory, PracticeTask } from "../types/platform";
import { lessonDifficultyLabels } from "../constants/labels";
import { useProgressContext } from "../context/ProgressContext";
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

interface PracticeTaskCardProps {
  task: PracticeTask;
  isDone: boolean;
  onToggleDone: () => void;
}

function PracticeTaskCard({ task, isDone, onToggleDone }: PracticeTaskCardProps) {
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
      <span className={styles.codeLabel}>З чого почати</span>
      {task.starterCode.map((file) => (
        <pre className={styles.solutionCode} key={file.label}>
          <code>{`// ${file.label}\n${file.code}`}</code>
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
      <Button variant={isDone ? "success" : "primary"} onClick={onToggleDone}>
        {isDone ? (
          <>
            <CheckCircle2 size={16} aria-hidden="true" /> Виконано
          </>
        ) : (
          "Позначити виконаним"
        )}
      </Button>
    </Card>
  );
}

export function PracticePage() {
  const [category, setCategory] = useState<ChallengeCategory | "All">("All");
  const { practiceTaskProgress, setPracticeTaskStatus } = useProgressContext();
  const tasks = useMemo(() => category === "All" ? practiceTasks : practiceTasks.filter((task) => task.category === category), [category]);
  const doneCount = practiceTasks.filter((task) => practiceTaskProgress[task.id]).length;

  return (
    <div className="page">
      <PageHeader
        breadcrumbs={[{ label: "Дашборд", href: "/" }, { label: "Практика" }]}
        eyebrow="Практика"
        title="Практичні завдання"
        description={`Прочитай умову, напиши код у своєму редакторі, звір із рішенням і познач завдання виконаним. Виконано ${doneCount} з ${practiceTasks.length} ${pluralizeUk(practiceTasks.length, ["завдання", "завдання", "завдань"])}.`}
        actions={
        <select className={styles.select} value={category} onChange={(event) => setCategory(event.target.value as ChallengeCategory | "All")}>
          {(["All", "HTML", "CSS", "JavaScript", "React", "TypeScript"] as const).map((item) => <option key={item} value={item}>{CATEGORY_LABELS[item]}</option>)}
        </select>
        }
      />
      <section className={styles.grid}>
        {tasks.map((task) => (
          <PracticeTaskCard
            key={task.id}
            task={task}
            isDone={Boolean(practiceTaskProgress[task.id])}
            onToggleDone={() => setPracticeTaskStatus(task.id, !practiceTaskProgress[task.id])}
          />
        ))}
      </section>
    </div>
  );
}
