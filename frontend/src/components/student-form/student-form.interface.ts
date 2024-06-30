export interface StudentFormProps {
  studentName: string;
  setStudentName: (name: string) => void;
  handleAddStudent: (studentName: string) => void;
}
