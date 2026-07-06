import { useState } from "react";
import { useParams } from "react-router-dom";
import { CourseCard } from "../components/course/CourseCard";
import { ModuleAccordion } from "../components/course/ModuleAccordion";
import { EmptyState } from "../components/ui/EmptyState";
import { useProgressContext } from "../context/ProgressContext";
import { type CourseFilter, useCourseFilters } from "../features/courses/useCourseFilters";
import { PageHeader } from "../shared/page/PageHeader";
import styles from "./CoursesPage.module.css";

export function CoursesPage() {
  const { courseId } = useParams();
  const { lessonProgress } = useProgressContext();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CourseFilter>("all");
  const { selectedCourse, filteredCourses, visibleModules } = useCourseFilters(courseId, query, filter, lessonProgress);

  return (
    <div className="page">
      <PageHeader
        breadcrumbs={[{ label: "Дашборд", href: "/" }, { label: "Курси", href: "/courses" }, ...(selectedCourse ? [{ label: selectedCourse.title }] : [])]}
        eyebrow="Roadmap / Курси"
        title={selectedCourse ? selectedCourse.title : "Frontend Roadmap"}
        description={selectedCourse ? selectedCourse.description : "Обери курс, відкрий модуль і рухайся урок за уроком."}
      />
      <div className={styles.controls}>
        <input
          className={styles.input}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Пошук по уроках"
        />
        <select className={styles.select} value={filter} onChange={(event) => setFilter(event.target.value as CourseFilter)}>
          <option value="all">Усі</option>
          <option value="completed">Завершені</option>
          <option value="in-progress">У процесі</option>
          <option value="not-started">Не розпочаті</option>
          <option value="theory">Теорія</option>
          <option value="practice">Практика</option>
          <option value="quiz">Тест</option>
        </select>
      </div>
      {selectedCourse ? (
        <div className={styles.modules}>
          {visibleModules.length ? (
            visibleModules.map((module) => (
              <ModuleAccordion key={module.id} course={selectedCourse} module={module} progress={lessonProgress} />
            ))
          ) : (
            <EmptyState title="Немає модулів за фільтром" message="Зміни пошук або фільтр, щоб побачити roadmap." />
          )}
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredCourses.length ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} progress={lessonProgress} />
            ))
          ) : (
            <EmptyState title="Нічого не знайдено" message="Спробуй інший запит або скинь фільтр." />
          )}
        </div>
      )}
    </div>
  );
}
