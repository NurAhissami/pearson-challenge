import { FC, useState, useEffect } from "react";
import { StudentList } from "../components/student-list";
import { StudentForm } from "../components/student-form";
import { Student } from "../components/types";
import { fetchStudents, addStudent, deleteStudent } from "../utils/api";

export const StudentPage: FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentName, setStudentName] = useState<string>("");

  useEffect(() => {
    fetchStudents()
      .then((response) => {
        const sortedStudents = response.data.sort((a: Student, b: Student) =>
          a.name.localeCompare(b.name)
        );
        setStudents(sortedStudents);
      })
      .catch((error) => console.error("Error fetching students", error));
  }, []);

  const handleAddStudent = (name: string) => {
    addStudent({ name })
      .then((response) => {
        const updatedStudents = [response.data, ...students];
        updatedStudents.sort((a, b) => a.name.localeCompare(b.name));
        setStudents(updatedStudents);
        setStudentName("");
      })
      .catch((error) => console.error("Error adding student", error));
  };

  const handleDeleteStudent = (id: number) => {
    deleteStudent(id)
      .then(() => {
        const updatedStudents = students.filter((student) => student.id !== id);
        updatedStudents.sort((a, b) => a.name.localeCompare(b.name));
        setStudents(updatedStudents);
      })
      .catch((error) => console.error("Error deleting student", error));
  };

  return (
    <div className="student-page">
      <StudentForm
        studentName={studentName}
        setStudentName={setStudentName}
        handleAddStudent={handleAddStudent}
      />
      {students.length !== 0 && (
        <StudentList students={students} onDelete={handleDeleteStudent} />
      )}
    </div>
  );
};
