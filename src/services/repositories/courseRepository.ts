import { courses } from "../../data/courses";
import type { Course } from "../../types/course";

export interface CourseRepository {
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | null>;
}

export const mockCourseRepository: CourseRepository = {
  async getCourses() {
    return courses;
  },
  async getCourse(id: string) {
    return courses.find((course) => course.id === id) ?? null;
  },
};
