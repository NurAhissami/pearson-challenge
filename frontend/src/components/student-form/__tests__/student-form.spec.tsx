import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { StudentForm } from "../student-form";
import { StudentFormProps } from "../student-form.interface";

describe("StudentForm component", () => {
  const setup = (props: Partial<StudentFormProps> = {}) => {
    const defaultProps: StudentFormProps = {
      studentName: "",
      setStudentName: jest.fn(),
      handleAddStudent: jest.fn(),
      ...props,
    };

    return render(<StudentForm {...defaultProps} />);
  };

  it("renders the input and button correctly", () => {
    setup();

    const inputElement = screen.getByPlaceholderText("Student name");
    const buttonElement = screen.getByRole("button", { name: /add student/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls setStudentName on input change", () => {
    const setStudentName = jest.fn();
    setup({ setStudentName });

    const inputElement = screen.getByPlaceholderText("Student name");
    fireEvent.change(inputElement, { target: { value: "John Doe" } });

    expect(setStudentName).toHaveBeenCalledWith("John Doe");
  });

  it("calls handleAddStudent on button click", () => {
    const handleAddStudent = jest.fn();
    setup({ handleAddStudent, studentName: "John Doe" });

    const buttonElement = screen.getByRole("button", { name: /add student/i });
    fireEvent.click(buttonElement);

    expect(handleAddStudent).toHaveBeenCalledTimes(1);
    expect(handleAddStudent).toHaveBeenCalledWith("John Doe");
  });

  it("calls handleAddStudent on Enter key press", () => {
    const handleAddStudent = jest.fn();
    setup({ handleAddStudent, studentName: "John Doe" });

    const inputElement = screen.getByPlaceholderText("Student name");
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(handleAddStudent).toHaveBeenCalledTimes(1);
    expect(handleAddStudent).toHaveBeenCalledWith("John Doe");
  });
});
