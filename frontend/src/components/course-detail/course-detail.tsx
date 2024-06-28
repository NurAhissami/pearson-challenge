import { FC, FormEvent, useState } from "react";
import { CourseDetailProps } from "./course-detail.interface";
import { Student } from "../student/student";

export const CourseDetail: FC<CourseDetailProps> = ({
  course,
  onEdit,
  onDelete,
  onAddStudent,
  studentName,
  setStudentName,
}) => {
  const [expandedCourses, setExpandedCourses] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleExpand = (courseId: number) => {
    setExpandedCourses((prevState) => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
  };

  if (!course) {
    return <div className="course-detail">Select a course to see details</div>;
  }

  const handleEdit = () => {
    onEdit(course);
  };

  const handleDelete = () => {
    onDelete(course.id);
  };

  const handleAddStudent = (e: FormEvent) => {
    e.preventDefault();
    onAddStudent(course.id, studentName);
    setStudentName("");
  };

  return (
    <div className="course-detail">
      <div className="course-detail__header">
        <h4 className="course-detail__title">{course.name}</h4>
        <div className="course-detail__buttons">
          <button
            data-testid="course-detail-edit-button"
            className="course-detail__button-edit"
            onClick={handleEdit}
          ></button>
          <button
            data-testid="course-detail-delete-button"
            className="course-detail__button-delete"
            onClick={handleDelete}
          ></button>
        </div>
      </div>

      <p className="course-detail__text">{course.description}</p>
      <p className="course-detail__text-date">
        <strong>{course.schedule}</strong>
      </p>

      <Student
        course={course}
        toggleExpand={toggleExpand}
        expandedCourses={expandedCourses[course.id]}
        studentName={studentName}
        setStudentName={setStudentName}
        handleAddStudent={handleAddStudent}
      />
    </div>
  );
};
