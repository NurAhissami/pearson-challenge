import { Course, Student } from "../types";

export interface CourseDetailProps {
  course: Course | null;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
  handleRemoveStudentFromCourse: (courseId: number, studentId: number) => void;
  updateCourseStudents: (courseId: number, students: Student[]) => void;
}
