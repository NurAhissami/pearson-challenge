import { FC } from "react";
import { StudentList } from "../student-list";
import { StudentForm } from "../student-form";
import { StudentProps } from "./student.interface";

export const Student: FC<StudentProps> = ({
  course,
  expandedCourses,
  handleAddStudent,
  setStudentName,
  studentName,
  toggleExpand,
}) => {
  return (
    <div className="student__container">
      <div>
        <h4 className="student__title" onClick={() => toggleExpand(course.id)}>
          Students
        </h4>
      </div>
      {expandedCourses && (
        <div className="student__content">
          <StudentList course={course} />
          <StudentForm
            studentName={studentName}
            setStudentName={setStudentName}
            handleAddStudent={handleAddStudent}
          />
        </div>
      )}
    </div>
  );
};
