import { FormEvent } from "react";

export interface StudentFormProps {
  handleAddStudent: (e: FormEvent<HTMLFormElement>) => void;
  setStudentName: (name: string) => void;
  studentName: string;
}
