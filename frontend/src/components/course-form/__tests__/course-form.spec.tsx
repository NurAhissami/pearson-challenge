import { render, fireEvent, screen } from "@testing-library/react";
import { CourseForm } from "../course-form";

describe("CourseForm component", () => {
  it("renders course form correctly", () => {
    const setName = jest.fn();
    const setDescription = jest.fn();
    const setSchedule = jest.fn();
    const onSubmit = jest.fn();
    const closeModal = jest.fn();

    render(
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

    expect(screen.getByPlaceholderText("Course Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Schedule")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Course/i })
    ).toBeInTheDocument();
  });

  it("calls onSubmit and closeModal on form submission", () => {
    const setName = jest.fn();
    const setDescription = jest.fn();
    const setSchedule = jest.fn();
    const onSubmit = jest.fn();
    const closeModal = jest.fn();

    render(
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

    fireEvent.click(screen.getByRole("button", { name: /Add Course/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it("disables the submit button for invalid dates", () => {
    const setName = jest.fn();
    const setDescription = jest.fn();
    const setSchedule = jest.fn();
    const onSubmit = jest.fn();
    const closeModal = jest.fn();

    render(
      <CourseForm
        name="Mathematics"
        description="Advanced Math Course"
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

    fireEvent.change(screen.getByPlaceholderText("Schedule"), {
      target: { value: "2020-01-01" },
    });

    expect(
      screen.getByText("*The date cannot be earlier than the current date.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Course/i })).toBeDisabled();
  });

  it("enables the submit button for valid dates", () => {
    const setName = jest.fn();
    const setDescription = jest.fn();
    const setSchedule = jest.fn();
    const onSubmit = jest.fn();
    const closeModal = jest.fn();

    render(
      <CourseForm
        name="Mathematics"
        description="Advanced Math Course"
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

    fireEvent.change(screen.getByPlaceholderText("Schedule"), {
      target: { value: new Date().toISOString().split("T")[0] },
    });

    expect(
      screen.getByRole("button", { name: /Add Course/i })
    ).not.toBeDisabled();
  });
});
