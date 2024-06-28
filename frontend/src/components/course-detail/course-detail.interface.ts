import { Dispatch, SetStateAction } from "react";
import { Course } from "../types";

export interface CourseDetailProps {
  course: Course | null;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
  onAddStudent: (courseId: number, studentName: string) => void;
  studentName: string;
  setStudentName: Dispatch<SetStateAction<string>>;
}
