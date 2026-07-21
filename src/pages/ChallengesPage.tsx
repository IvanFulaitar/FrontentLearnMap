import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { codingChallenges } from "../data/challenges";
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

interface ChallengeCardProps {
  challenge: CodingChallenge;
  isDone: boolean;
  onComplete: () => void;
}

function ChallengeCard({ challenge, isDone, onComplete }: ChallengeCardProps) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <Card className={`${styles.card} ${isDone ? styles.cardDone : ""}`}>
      <div className={styles.taskHeader}>
        <Badge>{challenge.category}</Badge>
        <Badge>{lessonDifficultyLabels[challenge.difficulty]}</Badge>
      </div>
      <h2>{challenge.title}</h2>
      <p>{challenge.description}</p>
      <strong>Вимоги</strong>
      <ul>{challenge.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
      <span className={styles.codeLabel}>Заверши код</span>
      {challenge.starterCode.map((file) => (
        <pre className={styles.solutionCode} key={file.label}>
          <code>{file.code}</code>
        </pre>
      ))}
      {challenge.hints.length ? (
        <details className={styles.reveal}>
          <summary>Підказки</summary>
          <ul>{challenge.hints.map((item) => <li key={item}>{item}</li>)}</ul>
        </details>
      ) : null}
      <Button variant="secondary" onClick={() => setShowSolution((value) => !value)}>
        {showSolution ? "Сховати рішення" : "Показати рішення"}
      </Button>
      {showSolution ? (
        <pre className={styles.solutionCode}>
          <code>{challenge.solution}</code>
        </pre>
      ) : null}
      <div className={styles.taskFooter}>
        <strong>{challenge.xpReward} XP</strong>
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

export function ChallengesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ChallengeCategory | "All">("All");
  const { completedChallenges, completeChallenge } = usePlatform();
  const filtered = useMemo(
    () =>
      codingChallenges.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) &&
          (category === "All" || item.category === category),
      ),
    [query, category],
  );
  const doneCount = codingChallenges.filter((item) => completedChallenges.includes(item.id)).length;

  return (
    <div className="page">
      <PageHeader
        breadcrumbs={[{ label: "Дашборд", href: "/" }, { label: "Виклики" }]}
        eyebrow={`${codingChallenges.length} ${pluralizeUk(codingChallenges.length, ["виклик", "виклики", "викликів"])}`}
        title="Маленькі задачі"
        description={`Заверши код за коментарем-підказкою, звір із рішенням і забери XP. Виконано ${doneCount} з ${codingChallenges.length} ${pluralizeUk(codingChallenges.length, ["виклику", "викликів", "викликів"])}.`}
      />
      <div className={styles.toolbar}>
        <input className={styles.input} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Пошук виклику" />
        <select className={styles.select} value={category} onChange={(event) => setCategory(event.target.value as ChallengeCategory | "All")}>
          {(["All", "HTML", "CSS", "JavaScript", "React", "TypeScript"] as const).map((item) => <option key={item} value={item}>{CATEGORY_LABELS[item]}</option>)}
        </select>
      </div>
      <section className={styles.grid}>
        {filtered.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            isDone={completedChallenges.includes(challenge.id)}
            onComplete={() => completeChallenge(challenge.id, challenge.xpReward)}
          />
        ))}
      </section>
    </div>
  );
}
