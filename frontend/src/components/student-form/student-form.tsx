import { FC } from "react";
import { StudentFormProps } from "./student-form.interface";
import { Input } from "../input";

export const StudentForm: FC<StudentFormProps> = ({
  handleAddStudent,
  setStudentName,
  studentName,
}) => {
  return (
    <form
      className="student"
      onSubmit={handleAddStudent}
      data-testid="student-form"
    >
      <Input
        classname="student__input"
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={setStudentName}
        datatestid="student-name-input"
      />
      <button className="student__button" type="submit">
        Add Student
      </button>
    </form>
  );
};
