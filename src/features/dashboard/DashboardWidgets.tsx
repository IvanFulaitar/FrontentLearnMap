import { Link } from "react-router-dom";
import {
  BookOpenCheck,
  CheckCircle2,
  Circle,
  Code2,
  Flame,
  GraduationCap,
  PartyPopper,
  Trophy,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { achievements, dailyChallenges, learningPathSteps } from "../../constants/gamification";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { ProgressBar } from "../../components/progress/ProgressBar";
import { BarChart } from "../../shared/charts/BarChart";
import type { usePlatform } from "../../context/PlatformContext";
import type { useDashboardData } from "./useDashboardData";
import type { ProgressMap } from "../../utils/progress";
import { getCourseProgress } from "../../utils/progress";
import styles from "../../pages/DashboardPage.module.css";

type DashboardData = ReturnType<typeof useDashboardData>;
type PlatformState = ReturnType<typeof usePlatform>;

export function DashboardHero({ data, platform }: { data: DashboardData; platform: PlatformState }) {
  const { overall, lastLesson, allCompleted } = data;
  const lessonHref = `/courses/${lastLesson.course.id}/modules/${lastLesson.module.id}/lessons/${lastLesson.lesson.id}`;

  return (
    <section className={styles.hero}>
      <Card className={styles.panel}>
        <span className="eyebrow">Навчальна платформа</span>
        <h1 className={styles.heroTitle}>Привіт! Продовжуй шлях до Frontend Developer</h1>
        <p>Roadmap веде від HTML і CSS до React, TypeScript та базового backend-контексту. Прогрес зберігається у браузері.</p>
        <ProgressBar value={overall.percent} label="Загальний прогрес" />
        <ProgressBar value={platform.level.progress} label={`Поточний XP: ${platform.xp} · Наступний рівень: ${platform.level.next?.title ?? "Максимальний рівень"}`} />
        <Alert title="Навчальний шлях" message="Рухайся модуль за модулем: урок, практика, тест і підсумковий проект." />
        <Link to={lessonHref}>
          <Button>Продовжити навчання</Button>
        </Link>
      </Card>
      <Card className={`${styles.panel} ${styles.lastLesson}`}>
        {allCompleted ? (
          <>
            <span className={styles.lastLessonTop}>
              <span className="eyebrow">Курс завершено</span>
              <PartyPopper size={20} aria-hidden="true" className={styles.lastLessonIcon} />
            </span>
            <h2>Усі уроки пройдено!</h2>
            <p>Можеш повторити будь-який урок або переглянути свій прогрес і бейджі.</p>
            <Link to="/progress">
              <Button variant="secondary">Переглянути прогрес</Button>
            </Link>
          </>
        ) : (
          <>
            <span className="eyebrow">Останній відкритий урок</span>
            <div className={styles.lastLessonBody}>
              <h2>{lastLesson.lesson.title}</h2>
              <p>{lastLesson.course.title} · {lastLesson.module.title}</p>
            </div>
            <Link to={lessonHref}>
              <Button variant="secondary">Відкрити урок</Button>
            </Link>
          </>
        )}
      </Card>
    </section>
  );
}

export function DashboardStats({ data, platform }: { data: DashboardData; platform: PlatformState }) {
  const { overall, learningStats, completedCourses, courses } = data;
  const stats: { icon: ReactNode; value: string | number; label: string; accent: string }[] = [
    { icon: <Zap size={18} aria-hidden="true" />, value: platform.xp, label: "Поточний XP", accent: styles.accentAmber },
    { icon: <Trophy size={18} aria-hidden="true" />, value: platform.level.current.level, label: platform.level.current.title, accent: styles.accentPrimary },
    { icon: <TrendingUp size={18} aria-hidden="true" />, value: `${overall.percent}%`, label: "загального прогресу", accent: styles.accentSuccess },
    { icon: <GraduationCap size={18} aria-hidden="true" />, value: `${completedCourses}/${courses.length}`, label: "курсів завершено", accent: styles.accentPrimary },
    { icon: <BookOpenCheck size={18} aria-hidden="true" />, value: `${overall.completed}/${overall.total}`, label: "уроків виконано", accent: styles.accentSuccess },
    { icon: <Flame size={18} aria-hidden="true" />, value: learningStats.currentStreak, label: "поточна серія днів", accent: styles.accentDanger },
    { icon: <Trophy size={18} aria-hidden="true" />, value: learningStats.longestStreak, label: "найдовша серія днів", accent: styles.accentAmber },
    { icon: <Code2 size={18} aria-hidden="true" />, value: learningStats.completedPractices, label: "виконаних практик", accent: styles.accentPrimary },
    { icon: <CheckCircle2 size={18} aria-hidden="true" />, value: learningStats.passedTests, label: "пройдених тестів", accent: styles.accentSuccess },
  ];

  return (
    <section className={styles.stats}>
      {stats.map((stat) => (
        <Card className={styles.stat} key={stat.label}>
          <span className={`${styles.statIcon} ${stat.accent}`}>{stat.icon}</span>
          <div className={styles.number}>{stat.value}</div>
          <p>{stat.label}</p>
        </Card>
      ))}
    </section>
  );
}

export function CourseProgressGrid({ data, lessonProgress }: { data: DashboardData; lessonProgress: ProgressMap }) {
  return (
    <section className={styles.courseProgress}>
      {data.courses.map((course) => {
        const stats = getCourseProgress(course, lessonProgress);
        return (
          <Card className={styles.courseCard} key={course.id}>
            <h3>{course.title}</h3>
            <ProgressBar value={stats.percent} label={`${stats.completed}/${stats.total} уроків`} />
          </Card>
        );
      })}
    </section>
  );
}

export function DashboardMissions({ platform }: { platform: PlatformState }) {
  const doneToday = dailyChallenges.filter((challenge) => platform.completedDaily.includes(challenge.id)).length;
  const allDoneToday = doneToday === dailyChallenges.length;
  const unlockedCount = platform.unlockedAchievements.length;

  return (
    <section className={styles.courseProgress}>
      <Card className={styles.panel}>
        <div className={styles.missionsHeader}>
          <h2>Щоденні виклики</h2>
          <span className={`${styles.missionsBadge} ${allDoneToday ? styles.missionsBadgeDone : ""}`}>
            {doneToday}/{dailyChallenges.length} сьогодні
          </span>
        </div>
        <p className={styles.missionsSubtitle}>
          {allDoneToday
            ? "Усе на сьогодні виконано — нові виклики зʼявляться завтра."
            : "Список оновлюється щодня о півночі."}
        </p>
        <div className={styles.challengeList}>
          {dailyChallenges.map((challenge) => {
            const done = platform.completedDaily.includes(challenge.id);
            return (
              <label className={`${styles.challengeRow} ${done ? styles.challengeRowDone : ""}`} key={challenge.id}>
                <input
                  className={styles.challengeCheckbox}
                  type="checkbox"
                  checked={done}
                  onChange={() => platform.completeDaily(challenge.id)}
                />
                <span className={styles.challengeText}>
                  <span className={styles.challengeLabel}>{challenge.title}</span>
                  <span className={styles.challengeDescription}>{challenge.description}</span>
                </span>
                <span className={styles.challengeXp}>+{challenge.xpReward} XP</span>
              </label>
            );
          })}
        </div>
      </Card>
      <Card className={styles.panel}>
        <div className={styles.missionsHeader}>
          <h2>Досягнення</h2>
          <span className={styles.missionsBadge}>{unlockedCount}/{achievements.length}</span>
        </div>
        <div className={styles.achievementList}>
          {achievements.slice(0, 6).map((achievement) => {
            const unlocked = platform.unlockedAchievements.includes(achievement.id);
            return (
              <div className={`${styles.achievementRow} ${unlocked ? styles.achievementUnlocked : ""}`} key={achievement.id}>
                {unlocked ? (
                  <CheckCircle2 size={18} aria-hidden="true" className={styles.achievementIconDone} />
                ) : (
                  <Circle size={18} aria-hidden="true" className={styles.achievementIconLocked} />
                )}
                <span className={styles.achievementText}>
                  <span className={styles.achievementTitle}>{achievement.title}</span>
                  <span className={styles.achievementDescription}>{achievement.description}</span>
                </span>
                {unlocked ? <span className={styles.achievementXp}>+{achievement.xpReward} XP</span> : null}
              </div>
            );
          })}
        </div>
        <Link to="/profile" className={styles.missionsFooterLink}>
          <Button variant="secondary">Всі бейджі</Button>
        </Link>
      </Card>
    </section>
  );
}

export function LearningPathPreview({ progressPercent }: { progressPercent: number }) {
  return (
    <section className={styles.courseProgress}>
      <Card className={styles.panel}>
        <h2>Навчальний шлях</h2>
        <div className={styles.pathPreview}>
          {learningPathSteps.map((step, index) => {
            const unlocked = index <= Math.floor(progressPercent / 8);
            return <span key={step} className={unlocked ? styles.unlockedPath : styles.lockedPath}>{step}</span>;
          })}
        </div>
      </Card>
    </section>
  );
}

export function ActivityCharts({ data, platform }: { data: DashboardData; platform: PlatformState }) {
  const { learningStats, overall } = data;
  return (
    <section className={styles.courseProgress}>
      <Card className={styles.panel}>
        <h2>Активність за тиждень</h2>
        <BarChart data={[
          { label: "Пн", value: learningStats.completedLessons || 1 },
          { label: "Вт", value: learningStats.completedPractices + 1 },
          { label: "Ср", value: learningStats.passedTests + 1 },
          { label: "Чт", value: platform.xp / 100 + 1 },
          { label: "Пт", value: overall.percent + 1 },
          { label: "Сб", value: learningStats.longestStreak + 1 },
          { label: "Нд", value: learningStats.totalStudyDays + 1 },
        ]} />
      </Card>
      <Card className={styles.panel}>
        <h2>Активність за місяць</h2>
        <BarChart data={[
          { label: "Тиж. 1", value: overall.completed + 1 },
          { label: "Тиж. 2", value: learningStats.completedPractices + 2 },
          { label: "Тиж. 3", value: learningStats.passedTests + 3 },
          { label: "Тиж. 4", value: platform.level.current.level + 4 },
        ]} />
      </Card>
    </section>
  );
}
