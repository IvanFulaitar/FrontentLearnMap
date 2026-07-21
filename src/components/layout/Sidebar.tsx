import {
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock3,
  Home,
  Library,
  PanelLeftOpen,
  Settings,
  Trophy,
  User,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { courses } from "../../data/courses";
import { useProgressContext } from "../../context/ProgressContext";
import { getCourseProgress, getLessonStatus } from "../../utils/progress";
import { courseLevelLabels } from "../../constants/labels";
import { ProgressBar } from "../progress/ProgressBar";
import { Button } from "../ui/Button";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onCollapseToggle: () => void;
}

const statusIcon = {
  completed: <CheckCircle2 size={16} />,
  "in-progress": <Clock3 size={16} />,
  "not-started": <Circle size={16} />,
};

const navItems = [
  { to: "/", label: "Дашборд", icon: Home, end: true },
  { to: "/courses", label: "Курси", icon: Library },
  { to: "/progress", label: "Прогрес", icon: BarChart3 },
  { to: "/tasks", label: "Задачі", icon: Trophy },
  { to: "/resources", label: "Ресурси", icon: Library },
  { to: "/profile", label: "Профіль", icon: User },
  { to: "/settings", label: "Налаштування", icon: Settings },
];

export function Sidebar({ isOpen, onClose, isCollapsed, onCollapseToggle }: SidebarProps) {
  const { pathname } = useLocation();
  const { lessonProgress } = useProgressContext();

  // The course the learner is currently viewing (if any) starts expanded;
  // every other course starts collapsed so the list of ~10 courses with all
  // of their modules and lessons doesn't turn the sidebar into one huge wall
  // of links. Courses can be expanded/collapsed independently by clicking
  // their title.
  const activeCourseId = useMemo(() => pathname.match(/^\/courses\/([^/]+)/)?.[1], [pathname]);
  const [expandedCourseIds, setExpandedCourseIds] = useState<Set<string>>(
    () => new Set(activeCourseId ? [activeCourseId] : []),
  );

  const toggleCourse = (courseId: string) => {
    setExpandedCourseIds((current) => {
      const next = new Set(current);
      if (next.has(courseId)) next.delete(courseId);
      else next.add(courseId);
      return next;
    });
  };

  if (isCollapsed) {
    return (
      <aside className={`${styles.sidebar} ${styles.rail} ${isOpen ? styles.open : ""}`}>
        <Button className={styles.close} variant="ghost" onClick={onClose}>
          <X size={18} /> Закрити
        </Button>
        <Button
          className={styles.railExpand}
          variant="ghost"
          onClick={onCollapseToggle}
          aria-label="Показати бічну панель"
          title="Показати бічну панель"
        >
          <PanelLeftOpen size={18} />
        </Button>
        <nav className={styles.nav}>
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `${styles.navLink} ${styles.railLink} ${isActive ? styles.active : ""}`}
              aria-label={label}
              title={label}
            >
              <Icon size={18} />
            </NavLink>
          ))}
        </nav>
      </aside>
    );
  }

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <Button className={styles.close} variant="ghost" onClick={onClose}>
        <X size={18} /> Закрити
      </Button>
      <nav className={styles.nav}>
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className={styles.sectionTitle}>Курси</div>
      {courses.map((course) => {
        const isExpanded = expandedCourseIds.has(course.id);
        return (
          <div className={styles.courseBlock} key={course.id}>
            <button
              type="button"
              className={styles.courseTitle}
              onClick={() => toggleCourse(course.id)}
              aria-expanded={isExpanded}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span className={styles.courseTitleText}>{course.title}</span>
              {/* vscode-setup is a short onboarding checklist, not a graded
                  skill-level course — a "Beginner" badge on it reads as
                  confusing/redundant next to the real courses below it. */}
              {course.id === "vscode-setup" ? null : (
                <span className={styles.courseMeta}>{courseLevelLabels[course.level]}</span>
              )}
            </button>
            <div className={styles.progress}>
              <ProgressBar
                value={getCourseProgress(course, lessonProgress).percent}
                ariaLabel={`Прогрес курсу «${course.title}»: ${getCourseProgress(course, lessonProgress).percent}%`}
              />
            </div>
            <div
              className={`${styles.courseDetails} ${isExpanded ? styles.courseDetailsOpen : ""}`}
              // Content stays mounted (for the smooth height transition below)
              // even while collapsed, so `inert` removes it from tab order and
              // assistive tech instead of leaving hidden links reachable.
              inert={!isExpanded}
            >
              <div className={styles.courseDetailsInner}>
                <NavLink to={`/courses/${course.id}`} className={styles.courseOpenLink} onClick={onClose}>
                  Відкрити курс →
                </NavLink>
                {course.modules.map((module) => (
                  <div key={module.id}>
                    <div className={styles.moduleTitle}>{module.title}</div>
                    {module.lessons.map((lesson) => {
                      const status = getLessonStatus(lesson, lessonProgress, course.id, module.id);
                      const href = `/courses/${course.id}/modules/${module.id}/lessons/${lesson.id}`;
                      return (
                        <NavLink
                          key={lesson.id}
                          to={href}
                          className={`${styles.lessonLink} ${pathname === href ? styles.lessonActive : ""} ${status === "completed" ? styles.lessonCompleted : ""}`}
                          onClick={onClose}
                        >
                          {statusIcon[status]}
                          <span>{lesson.title}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
