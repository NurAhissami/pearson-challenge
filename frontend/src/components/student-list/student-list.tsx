import { FC } from "react";
import { Course } from "../types";

export const StudentList: FC<{
  course: Course;
}> = ({ course }) => {
  return (
    <ul className="student-list">
      {course?.students?.map((student) => (
        <li
          className="student-list__item"
          key={student.id}
          data-testid="student-list-item"
        >
          {student.name}
        </li>
      ))}
    </ul>
  );
};
