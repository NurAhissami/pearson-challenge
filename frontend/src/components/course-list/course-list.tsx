import { FC } from "react";
import { formatDate } from "../../utils";
import { CourseListProps } from "./course-list.interface";

export const CourseList: FC<CourseListProps> = ({ courses, onSelect }) => {
  return (
    <ul className="course-list">
      {courses?.map((course) => {
        const { day, month } = formatDate(course.schedule);
        return (
          <li
            key={course.id}
            className="course-list__list"
            onClick={() => onSelect(course)}
          >
            <div className="course-list__item">
              <div className="course-list__date">
                {course.schedule && (
                  <>
                    <span className="course-list__date-day">{day}</span>
                    <span className="course-list__date-month">{month}</span>
                  </>
                )}
              </div>
              <h4 className="course-list__details">{course.name}</h4>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
