import { FC, useState, useEffect, useRef } from "react";
import { Student } from "../types";
import { StudentList } from "../student-list";
import { addStudentToCourse, fetchStudents } from "../../utils";
import { CourseDetailProps } from "./course-detail.interface";

export const CourseDetail: FC<CourseDetailProps> = ({
  course,
  onEdit,
  onDelete,
  handleRemoveStudentFromCourse,
  updateCourseStudents,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAndSetStudents = async () => {
      try {
        const response = await fetchStudents();
        if (response.data) {
          const sortedStudents = response.data.sort((a: Student, b: Student) =>
            a.name.localeCompare(b.name)
          );
          setStudents(sortedStudents);
          setFilteredStudents(sortedStudents.slice(0, 5));
        } else {
          throw new Error("Response data is undefined");
        }
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };

    fetchAndSetStudents();
  }, []);

  useEffect(() => {
    const availableStudents = students.filter(
      (student) => !course?.students?.some((s) => s.id === student.id)
    );
    if (searchTerm === "") {
      setFilteredStudents(availableStudents.slice(0, 5));
    } else {
      setFilteredStudents(
        availableStudents
          .filter((student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 5)
      );
    }
  }, [searchTerm, students, course]);

  const handleAddStudentToCourse = (studentId: number) => {
    if (course) {
      addStudentToCourse(course.id, studentId)
        .then((response) => {
          const updatedStudents = [...course.students, response.data].sort(
            (a, b) => a.name.localeCompare(b.name)
          );
          updateCourseStudents(course.id, updatedStudents);
          setSelectedStudent(null);
          setSearchTerm("");
          if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus();
          }
        })
        .catch((error) =>
          console.error("Error adding student to course", error)
        );
    }
  };

  if (!course) return <div className="course-detail">Select a course</div>;

  return (
    <div className="course-detail">
      <div className="course-detail__header">
        <h4 className="course-detail__title">{course.name}</h4>
        <div className="course-detail__buttons">
          <button
            data-testid="course-detail-edit-button"
            className="course-detail__button-edit"
            onClick={() => onEdit(course)}
          ></button>
          <button
            data-testid="course-detail-delete-button"
            className="course-detail__button-delete"
            onClick={() => onDelete(course.id)}
          ></button>
        </div>
      </div>
      <p className="course-detail__text">{course.description}</p>
      <p className="course-detail__text-date">
        <strong>{course.schedule}</strong>
      </p>
      <div className="course-detail__add-student">
        <h4 className="course-detail__add-student-title">
          Add Student to Course
        </h4>
        <div className="course-detail__add-student-container">
          <input
            type="text"
            ref={inputRef}
            className="course-detail__add-student-container--input"
            placeholder="Search for a student"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && filteredStudents.length > 0) {
                handleAddStudentToCourse(filteredStudents[0].id);
              }
            }}
          />
          {isFocused && filteredStudents.length > 0 && (
            <ul className="course-detail__add-student-container--list">
              {filteredStudents.map((student) => (
                <li
                  key={student.id}
                  onMouseDown={() => handleAddStudentToCourse(student.id)}
                >
                  {student.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        {course?.students?.length !== 0 && (
          <StudentList
            students={course.students}
            onDelete={(studentId) =>
              handleRemoveStudentFromCourse(course.id, studentId)
            }
          />
        )}
      </div>
    </div>
  );
};
