import { FC } from "react";
import { StudentListProps } from "./student-list.interface";

export const StudentList: FC<StudentListProps> = ({ students, onDelete }) => {
  return (
    <div className="student-list">
      {students?.map((student) => (
        <div key={student.id} className="student-list__item">
          <div className="student-list__item-info">
            <span>{student.name}</span>
          </div>
          <button
            className="student-list__button-delete"
            onClick={() => onDelete(student.id)}
          ></button>
        </div>
      ))}
    </div>
  );
};
