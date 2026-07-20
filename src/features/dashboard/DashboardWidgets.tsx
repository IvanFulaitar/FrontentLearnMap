import { Link } from "react-router-dom";
import {
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  Circle,
  Code2,
  Flame,
  GraduationCap,
  Lock,
  PartyPopper,
  Trophy,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { achievements, dailyChallenges } from "../../constants/gamification";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { ProgressBar } from "../../components/progress/ProgressBar";
import { GradientLineChart } from "../../shared/charts/GradientLineChart";
import { LevelRing } from "../../shared/charts/LevelRing";
import type { usePlatform } from "../../context/PlatformContext";
import type { useDashboardData } from "./useDashboardData";
import type { ProgressMap } from "../../utils/progress";
import { getActivitySeries, getCourseProgress } from "../../utils/progress";
import styles from "../../pages/DashboardPage.module.css";

type DashboardData = ReturnType<typeof useDashboardData>;
type PlatformState = ReturnType<typeof usePlatform>;

const TOPIC_ILLUSTRATIONS: Record<string, string> = {
  html: "/images/topic-html.svg",
  css: "/images/topic-css.svg",
  javascript: "/images/topic-javascript.svg",
  typescript: "/images/topic-typescript.svg",
  react: "/images/topic-react.svg",
  "node-basics": "/images/topic-node.svg",
  git: "/images/topic-git.svg",
  browser: "/images/topic-browser.svg",
  accessibility: "/images/topic-accessibility.svg",
  performance: "/images/topic-performance.svg",
};

export function DashboardHero({ data, platform }: { data: DashboardData; platform: PlatformState }) {
  const { overall, lastLesson, allCompleted } = data;
  const lessonHref = `/courses/${lastLesson.course.id}/modules/${lastLesson.module.id}/lessons/${lastLesson.lesson.id}`;
  const topicImage = TOPIC_ILLUSTRATIONS[lastLesson.course.id] ?? "/images/topic-html.svg";

  return (
    <section className={styles.hero}>
      <Card className={styles.panel}>
        <span className="eyebrow">Навчальна платформа</span>
        <h1 className={styles.heroTitle}>Привіт! Продовжуй шлях до Frontend Developer</h1>
        <p>
          Понад 300 уроків у форматі cheat-sheet: живі приклади коду, інтерактивні демо й реальні міні-проєкти
          замість сухої теорії — від HTML і CSS до React, TypeScript і основ backend.
        </p>
        <ProgressBar value={overall.percent} label="Загальний прогрес" />
        <div className={styles.levelRow}>
          <LevelRing percent={platform.level.progress} level={platform.level.current.level} />
          <div className={styles.levelInfo}>
            <span className={styles.levelTitle}>{platform.level.current.title}</span>
            <span className={styles.levelXp}>
              {platform.xp} XP
              {platform.level.next
                ? ` · ще ${Math.max(0, platform.level.next.minXp - platform.xp)} XP до «${platform.level.next.title}»`
                : " · максимальний рівень"}
            </span>
          </div>
        </div>
        <Alert title="Як влаштований курс" message="Кожен урок: пояснення мовою наставника, живий приклад у браузері, практика і питання на співбесіді. Модуль за модулем — до підсумкового проєкту." />
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
            <img
              src={topicImage}
              alt=""
              aria-hidden="true"
              width={200}
              height={200}
              className={styles.lastLessonArt}
            />
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
    <section className={styles.missionsGrid}>
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
            : "Визначається автоматично з твоєї реальної активності — нічого позначати вручну не треба."}
        </p>
        <div className={styles.challengeList}>
          {dailyChallenges.map((challenge) => {
            const done = platform.completedDaily.includes(challenge.id);
            return (
              <div className={`${styles.challengeRow} ${done ? styles.challengeRowDone : ""}`} key={challenge.id}>
                {done ? (
                  <CheckCircle2 size={20} aria-hidden="true" className={styles.achievementIconDone} />
                ) : (
                  <Circle size={20} aria-hidden="true" className={styles.achievementIconLocked} />
                )}
                <span className={styles.challengeText}>
                  <span className={styles.challengeLabel}>{challenge.title}</span>
                  <span className={styles.challengeDescription}>{challenge.description}</span>
                </span>
                <span className={styles.challengeXp}>+{challenge.xpReward} XP</span>
              </div>
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

export function LearningPathPreview({ data, lessonProgress }: { data: DashboardData; lessonProgress: ProgressMap }) {
  return (
    <section className={styles.pathSection}>
      <Card className={styles.panel}>
        <h2>Навчальний шлях</h2>
        <div className={styles.journey}>
          {data.courses.map((course, index) => {
            const stats = getCourseProgress(course, lessonProgress);
            const status = stats.percent === 100 ? "done" : stats.percent > 0 ? "active" : "locked";
            const isLast = index === data.courses.length - 1;
            const nodeClass =
              status === "done" ? styles.journeyNodeDone : status === "active" ? styles.journeyNodeActive : styles.journeyNodeLocked;
            return (
              <div className={styles.journeyRow} key={course.id}>
                <div className={styles.journeyNodeColumn}>
                  <span className={`${styles.journeyNode} ${nodeClass}`}>
                    {status === "done" ? (
                      <CheckCircle2 size={18} aria-hidden="true" />
                    ) : status === "locked" ? (
                      <Lock size={15} aria-hidden="true" />
                    ) : (
                      `${stats.percent}%`
                    )}
                  </span>
                  {!isLast ? (
                    <span className={`${styles.journeyLine} ${status === "done" ? styles.journeyLineDone : ""}`} />
                  ) : null}
                </div>
                <div className={styles.journeyContent} style={isLast ? { paddingBottom: 0 } : undefined}>
                  <div className={styles.journeyHeader}>
                    <h3>{course.title}</h3>
                    <span className={styles.journeyPercent}>{stats.completed}/{stats.total} уроків</span>
                  </div>
                  <ProgressBar value={stats.percent} ariaLabel={`${course.title}: ${stats.percent}% пройдено`} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
}

export function ActivityCharts({ activityLog }: { activityLog: string[] }) {
  const { daily, weekly } = getActivitySeries(activityLog);

  // Real metrics, not the fabricated "XP" numbers from the original design
  // mockup: `daily` is a 0/1 active-day flag per weekday, `weekly` is a
  // 0-7 count of active days in that week — see getActivitySeries().
  const activeDaysThisWeek = daily.reduce((sum, item) => sum + item.value, 0);
  const activeDaysThisMonth = weekly.reduce((sum, item) => sum + item.value, 0);
  const busiestWeek = weekly.reduce((best, item) => (item.value > best.value ? item : best), weekly[0] ?? { label: "-", value: 0 });

  return (
    <section className={styles.activityGrid}>
      <Card className={styles.panel}>
        <div className={styles.chartHeader}>
          <h2>Активність за тиждень</h2>
          <span className={styles.chartBadge}>
            {activeDaysThisWeek} з {daily.length} <TrendingUp size={14} />
          </span>
        </div>
        <GradientLineChart
          data={daily}
          ariaLabel="Активність за останні 7 днів"
          // The active/inactive dot fill + the day label below already say
          // everything — labeling every one of the 7 points "Активний"/"—"
          // was noisy and, worse, adjacent "Активний" labels could overlap.
          // Hover still shows the full status via the tooltip.
          formatPointLabel={() => ""}
          formatTooltip={(value, label) => `${label}: ${value >= 1 ? "Активний день" : "Немає активності"}`}
        />
        <div className={styles.chartFooter}>
          <span className={styles.chartFooterIcon}>
            <BarChart3 size={18} />
          </span>
          <div>
            <p className={styles.chartFooterLabel}>Активних днів цього тижня</p>
            <p className={styles.chartFooterValue}>{activeDaysThisWeek} з {daily.length}</p>
          </div>
        </div>
      </Card>
      <Card className={styles.panel}>
        <div className={styles.chartHeader}>
          <h2>Активність за місяць</h2>
          <span className={styles.chartBadge}>
            {activeDaysThisMonth} днів <TrendingUp size={14} />
          </span>
        </div>
        <GradientLineChart
          data={weekly}
          ariaLabel="Активність за останні 4 тижні"
          formatTooltip={(value, label) => `${label}: ${value} з 7 днів`}
        />
        <div className={styles.chartFooter}>
          <span className={styles.chartFooterIconAlt}>
            <TrendingUp size={18} />
          </span>
          <div>
            <p className={styles.chartFooterLabel}>Найактивніший тиждень</p>
            <p className={styles.chartFooterValue}>{busiestWeek.label} · {busiestWeek.value} з 7 днів</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
