import { FormEvent } from "react";
import { Course } from "../types";

export interface StudentProps {
  course: Course;
  expandedCourses: boolean;
  handleAddStudent: (e: FormEvent<HTMLFormElement>) => void;
  setStudentName: (name: string) => void;
  studentName: string;
  toggleExpand: (courseId: number) => void;
}
