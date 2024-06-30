import { FC } from "react";
import { StudentFormProps } from "./student-form.interface";

export const StudentForm: FC<StudentFormProps> = ({
  studentName,
  setStudentName,
  handleAddStudent,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddStudent(studentName);
    }
  };

  return (
    <div className="student" data-testid="student-form">
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Student name"
        data-testid="student-name-input"
        className="student__input"
        onKeyDown={handleKeyDown}
      />

      <button
        className="student__button"
        onClick={() => handleAddStudent(studentName)}
      >
        Add Student
      </button>
    </div>
  );
};
