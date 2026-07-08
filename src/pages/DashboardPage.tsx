import { useProgressContext } from "../context/ProgressContext";
import { usePlatform } from "../context/PlatformContext";
import {
  ActivityCharts,
  CourseProgressGrid,
  DashboardHero,
  DashboardMissions,
  DashboardStats,
  LearningPathPreview,
} from "../features/dashboard/DashboardWidgets";
import { useDashboardData } from "../features/dashboard/useDashboardData";

export function DashboardPage() {
  const { lessonProgress, quizProgress, activityLog } = useProgressContext();
  const platform = usePlatform();
  const data = useDashboardData(lessonProgress, quizProgress, activityLog);

  return (
    <div className="page">
      <DashboardHero data={data} platform={platform} />
      <DashboardStats data={data} platform={platform} />
      <CourseProgressGrid data={data} lessonProgress={lessonProgress} />
      <DashboardMissions platform={platform} />
      <LearningPathPreview data={data} lessonProgress={lessonProgress} />
      <ActivityCharts activityLog={activityLog} />
    </div>
  );
}
