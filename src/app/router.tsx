import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense, type ReactElement } from "react";
import { App } from "./App";
import { Skeleton } from "../components/ui/Skeleton";

const CoursesPage = lazy(() => import("../pages/CoursesPage").then((module) => ({ default: module.CoursesPage })));
const DashboardPage = lazy(() => import("../pages/DashboardPage").then((module) => ({ default: module.DashboardPage })));
const LessonPage = lazy(() => import("../pages/LessonPage").then((module) => ({ default: module.LessonPage })));
const ProgressPage = lazy(() => import("../pages/ProgressPage").then((module) => ({ default: module.ProgressPage })));
const QuizPage = lazy(() => import("../pages/QuizPage").then((module) => ({ default: module.QuizPage })));
const TasksPage = lazy(() => import("../pages/TasksPage").then((module) => ({ default: module.TasksPage })));
const ResourcesPage = lazy(() => import("../pages/ResourcesPage").then((module) => ({ default: module.ResourcesPage })));
const ProfilePage = lazy(() => import("../pages/ProfilePage").then((module) => ({ default: module.ProfilePage })));
const SettingsPage = lazy(() => import("../pages/SettingsPage").then((module) => ({ default: module.SettingsPage })));
const SystemPage = lazy(() => import("../pages/SystemPage").then((module) => ({ default: module.SystemPage })));

const withSuspense = (page: ReactElement) => (
  <Suspense
    fallback={
      <div className="page">
        <Skeleton height={44} width="38%" />
        <Skeleton height={180} />
        <Skeleton height={260} />
      </div>
    }
  >
    {page}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: withSuspense(<DashboardPage />) },
      { path: "courses", element: withSuspense(<CoursesPage />) },
      { path: "courses/:courseId", element: withSuspense(<CoursesPage />) },
      {
        path: "courses/:courseId/modules/:moduleId/lessons/:lessonId",
        element: withSuspense(<LessonPage />),
      },
      {
        path: "courses/:courseId/modules/:moduleId/quiz/:quizId",
        element: withSuspense(<QuizPage />),
      },
      { path: "progress", element: withSuspense(<ProgressPage />) },
      { path: "tasks", element: withSuspense(<TasksPage />) },
      // Practice and Challenges used to be two separate, near-identical
      // pages — merged into one ("Задачі"). Old links/bookmarks still land
      // somewhere useful instead of a 404.
      { path: "practice", element: <Navigate to="/tasks" replace /> },
      { path: "challenges", element: <Navigate to="/tasks" replace /> },
      // "Проєкти" (portfolio projects) removed entirely — it was 11
      // procedurally-generated cards with an identical description, just the
      // title swapped, same problem as the old practice/challenges/resources
      // data. Old bookmarks land on the dashboard instead of a 404.
      { path: "projects", element: <Navigate to="/" replace /> },
      { path: "resources", element: withSuspense(<ResourcesPage />) },
      { path: "profile", element: withSuspense(<ProfilePage />) },
      { path: "settings", element: withSuspense(<SettingsPage />) },
      { path: "403", element: withSuspense(<SystemPage type="403" />) },
      { path: "500", element: withSuspense(<SystemPage type="500" />) },
      { path: "offline", element: withSuspense(<SystemPage type="offline" />) },
      { path: "*", element: withSuspense(<SystemPage type="404" />) },
    ],
  },
]);
