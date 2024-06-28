import { Course } from "../types";

export interface CourseListProps {
  courses: Course[];
  onSelect: (course: Course) => void;
}
