import { FC, useEffect, useState } from "react";
import { CourseFormProps } from "./course-form.interface";
import { Input } from "../input";
import { validateDate } from "../../utils/validate-date";

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
  const [error, setError] = useState<string>("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (!schedule) {
      setSchedule(today);
    } else {
      validateDate(schedule, setError, setIsSubmitDisabled);
    }
  }, [schedule]);

  const handleDateChange = (date: string) => {
    setSchedule(date);
    validateDate(date, setError, setIsSubmitDisabled);
  };

  const handleSubmit = (e: React.FormEvent) => {
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
            onChange={handleDateChange}
          />
          {error && isSubmitDisabled && (
            <p className="course-form-modal__body--error">{error}</p>
          )}
          <button
            className={
              !isSubmitDisabled
                ? "course-form-modal__body--button"
                : "course-form-modal__body--button course-form-modal__body--button-disabled"
            }
            type="submit"
            disabled={isSubmitDisabled}
          >
            {editCourseId ? "Update Course" : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
};
