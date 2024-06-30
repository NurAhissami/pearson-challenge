import { Student } from "../types";

export interface StudentListProps {
  students: Student[];
  onDelete: (id: number) => void;
}
