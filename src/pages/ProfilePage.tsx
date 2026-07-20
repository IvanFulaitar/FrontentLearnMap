import { CheckCircle2, Lock } from "lucide-react";
import { achievements } from "../constants/gamification";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { usePlatform } from "../context/PlatformContext";
import { useProgressContext } from "../context/ProgressContext";
import { courses } from "../data/courses";
import { getCourseProgress, getLearningStats } from "../utils/progress";
import { ProgressBar } from "../components/progress/ProgressBar";
import { PageHeader } from "../shared/page/PageHeader";
import styles from "./PlatformPages.module.css";

export function ProfilePage() {
  const platform = usePlatform();
  const { lessonProgress, quizProgress, activityLog } = useProgressContext();
  const stats = getLearningStats(lessonProgress, quizProgress, activityLog);
  const completedCourses = courses.filter((course) => getCourseProgress(course, lessonProgress).percent === 100).length;

  return (
    <div className="page">
      <PageHeader breadcrumbs={[{ label: "Дашборд", href: "/" }, { label: "Профіль" }]} eyebrow="Профіль" title={platform.profile.username} />
      <section className={styles.stats}>
        <Card className={styles.card}>
          <div className={styles.avatar}>{platform.profile.avatar}</div>
          <h2>{platform.level.current.title}</h2>
          <ProgressBar value={platform.level.progress} label={`Рівень ${platform.level.current.level} → ${platform.level.next?.level ?? "максимум"}`} />
        </Card>
        <Card className={styles.card}><strong>Всього XP</strong><h2>{platform.xp}</h2></Card>
        <Card className={styles.card}><strong>Завершено курсів</strong><h2>{completedCourses}</h2></Card>
        <Card className={styles.card}><strong>Уроків завершено</strong><h2>{stats.completedLessons}</h2></Card>
      </section>
      <PageHeader
        eyebrow="Бейджі"
        title={`Досягнення · ${platform.unlockedAchievements.length}/${achievements.length}`}
      />
      <section className={styles.grid}>
        {achievements.map((achievement) => {
          const unlocked = platform.unlockedAchievements.includes(achievement.id);
          return (
            <Card className={`${styles.card} ${unlocked ? styles.achievementCardUnlocked : styles.locked}`} key={achievement.id}>
              <div className={styles.achievementCardHeader}>
                {unlocked ? (
                  <CheckCircle2 size={22} aria-hidden="true" className={styles.achievementCardIconDone} />
                ) : (
                  <Lock size={20} aria-hidden="true" className={styles.achievementCardIconLocked} />
                )}
                <Badge tone={unlocked ? "completed" : "not-started"}>{unlocked ? "Відкрито" : "Заблоковано"}</Badge>
              </div>
              <h2>{achievement.title}</h2>
              <p>{achievement.description}</p>
              <strong>{achievement.xpReward} XP</strong>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
