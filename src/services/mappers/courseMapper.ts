import type { Course } from "../../types/course";
import type { CourseDto } from "../api/dto";

export const mapCourseDto = (dto: CourseDto): Course => dto;
