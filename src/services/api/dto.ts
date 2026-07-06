import type { Course } from "../../types/course";
import type { LearningResource, ProjectTask } from "../../types/platform";

export type CourseDto = Course;
export type ProjectDto = ProjectTask;
export type ResourceDto = LearningResource;

export interface UserDto {
  id: string;
  username: string;
  role: "guest" | "student" | "admin";
}
