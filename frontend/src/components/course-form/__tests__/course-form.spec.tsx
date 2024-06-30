import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CourseForm } from "../course-form";

describe("CourseForm component", () => {
  const defaultProps = {
    name: "",
    description: "",
    schedule: "",
    setName: jest.fn(),
    setDescription: jest.fn(),
    setSchedule: jest.fn(),
    onSubmit: jest.fn(),
    editCourseId: null,
    showModal: true,
    closeModal: jest.fn(),
  };

  const renderComponent = (props = {}) =>
    render(<CourseForm {...defaultProps} {...props} />);

  it("renders course form correctly", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("Course Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Schedule")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Course/i })
    ).toBeInTheDocument();
  });

  it("calls onSubmit and closeModal on form submission", () => {
    renderComponent({
      name: "Mathematics",
      description: "Advanced Math Course",
      schedule: "2024-07-01",
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Course/i }));

    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
    expect(defaultProps.closeModal).toHaveBeenCalledTimes(1);
  });

  it("disables the submit button for invalid dates", () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Schedule"), {
      target: { value: "2020-01-01" },
    });

    expect(
      screen.getByText("*The date cannot be earlier than the current date.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Course/i })).toBeDisabled();
  });

  it("enables the submit button for valid dates", () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Schedule"), {
      target: { value: new Date().toISOString().split("T")[0] },
    });

    expect(
      screen.getByRole("button", { name: /Add Course/i })
    ).not.toBeDisabled();
  });
});
