import { render, fireEvent } from "@testing-library/react";
import { CourseForm } from "../course-form";

describe("CourseForm component", () => {
  it("renders course form correctly", () => {
    const setName = jest.fn();
    const setDescription = jest.fn();
    const setSchedule = jest.fn();
    const onSubmit = jest.fn();
    const closeModal = jest.fn();

    const { getByPlaceholderText, getByRole } = render(
      <CourseForm
        name=""
        description=""
        schedule=""
        setName={setName}
        setDescription={setDescription}
        setSchedule={setSchedule}
        onSubmit={onSubmit}
        editCourseId={null}
        showModal={true}
        closeModal={closeModal}
      />
    );

    const nameInputElement = getByPlaceholderText("Course Name");
    expect(nameInputElement).toBeInTheDocument();

    const descriptionInputElement = getByPlaceholderText("Description");
    expect(descriptionInputElement).toBeInTheDocument();

    const scheduleInputElement = getByPlaceholderText("Schedule");
    expect(scheduleInputElement).toBeInTheDocument();

    const addButtonElement = getByRole("button", { name: /Add Course/i });
    expect(addButtonElement).toBeInTheDocument();
  });

  it("calls onSubmit and closeModal on form submission", () => {
    const setName = jest.fn();
    const setDescription = jest.fn();
    const setSchedule = jest.fn();
    const onSubmit = jest.fn();
    const closeModal = jest.fn();

    const { getByRole } = render(
      <CourseForm
        name="Mathematics"
        description="Advanced Math Course"
        schedule="2024-07-01"
        setName={setName}
        setDescription={setDescription}
        setSchedule={setSchedule}
        onSubmit={onSubmit}
        editCourseId={null}
        showModal={true}
        closeModal={closeModal}
      />
    );

    const submitButtonElement = getByRole("button", { name: /Add Course/i });
    fireEvent.click(submitButtonElement);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});
