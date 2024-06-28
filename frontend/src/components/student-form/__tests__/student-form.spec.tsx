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

    const inputElement = screen.getByPlaceholderText("Student Name");
    const buttonElement = screen.getByRole("button", { name: /add student/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls setStudentName on input change", () => {
    const setStudentName = jest.fn();
    setup({ setStudentName });

    const inputElement = screen.getByPlaceholderText("Student Name");
    fireEvent.change(inputElement, { target: { value: "John Doe" } });

    expect(setStudentName).toHaveBeenCalledWith("John Doe");
  });

  it("calls handleAddStudent on form submit", () => {
    const handleAddStudent = jest.fn((e) => {
      e.preventDefault();
    });
    setup({ handleAddStudent });

    const formElement = screen.getByTestId("student-form");
    fireEvent.submit(formElement);

    expect(handleAddStudent).toHaveBeenCalledTimes(1);
  });
});
