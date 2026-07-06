import { useMemo, useState } from "react";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { codingChallenges } from "../data/challenges";
import { useWindowedList } from "../hooks/useWindowedList";
import { lessonDifficultyLabels } from "../constants/labels";
import { PageHeader } from "../shared/page/PageHeader";
import styles from "./PlatformPages.module.css";

const WINDOW_SIZE = 30;

export function ChallengesPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => codingChallenges.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())), [query]);
  const { visible, next, previous, reset } = useWindowedList(filtered, WINDOW_SIZE);

  return (
    <div className="page">
      <PageHeader
        breadcrumbs={[{ label: "Дашборд", href: "/" }, { label: "Виклики" }]}
        eyebrow="100+ викликів"
        title="Маленькі задачі"
        description="Віконний рендеринг показує лише частину довгого списку для кращої продуктивності."
      />
      <div className={styles.toolbar}>
        <input className={styles.input} value={query} onChange={(event) => { setQuery(event.target.value); reset(); }} placeholder="Пошук виклику" />
        <button className={styles.input} onClick={previous}>Назад</button>
        <button className={styles.input} onClick={next}>Далі</button>
      </div>
      <section className={styles.grid}>
        {visible.map((challenge) => (
          <Card className={styles.card} key={challenge.id}>
            <Badge>{challenge.category}</Badge>
            <h2>{challenge.title}</h2>
            <p>{challenge.description}</p>
            <Badge>{lessonDifficultyLabels[challenge.difficulty]}</Badge>
            <strong>{challenge.xpReward} XP</strong>
          </Card>
        ))}
      </section>
    </div>
  );
}
