import { FC, FormEvent } from "react";
import { CourseFormProps } from "./course-form.interface";
import { Input } from "../input";

export const CourseForm: FC<CourseFormProps> = ({
  name,
  description,
  schedule,
  setName,
  setDescription,
  setSchedule,
  onSubmit,
  editCourseId,
  showModal,
  closeModal,
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
    closeModal();
  };

  return (
    <div
      className={`course-form-modal ${
        showModal ? "course-form-modal__open" : ""
      }`}
    >
      <div className="course-form-modal__content">
        <div className="course-form-modal__header">
          <h4 className="course-form-modal__header--title">Add Course</h4>
          <span
            className="course-form-modal__header--close"
            onClick={closeModal}
          >
            &times;
          </span>
        </div>
        <form className="course-form-modal__body" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Course Name"
            value={name}
            onChange={setName}
          />
          <Input
            type="textarea"
            placeholder="Description"
            value={description}
            onChange={setDescription}
          />
          <Input
            type="date"
            placeholder="Schedule"
            value={schedule}
            onChange={setSchedule}
          />
          <button className="course-form-modal__body--button" type="submit">
            {editCourseId ? "Update Course" : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
};
