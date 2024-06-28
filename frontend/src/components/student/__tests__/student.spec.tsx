import { render, screen, fireEvent } from "@testing-library/react";
import { Student, StudentProps } from "../index";
import { StudentFormProps } from "../../student-form";
import { Course } from "../../types";

jest.mock("../../student-list", () => ({
  StudentList: ({ course }: { course: Course }) => (
    <ul data-testid="student-list" data-course={JSON.stringify(course)}></ul>
  ),
}));

jest.mock("../../student-form", () => ({
  StudentForm: ({
    studentName,
    setStudentName,
    handleAddStudent,
  }: StudentFormProps) => (
    <form data-testid="student-form" onSubmit={handleAddStudent}>
      <input
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Student Name"
      />
      <button type="submit">Add Student</button>
    </form>
  ),
}));

describe("Student component", () => {
  const setup = (props: Partial<StudentProps> = {}) => {
    const defaultProps: StudentProps = {
      course: {
        id: 1,
        name: "Mathematics",
        description: "Advanced Math Course",
        schedule: "Monday and Wednesday",
        students: [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" },
        ],
      },
      toggleExpand: jest.fn(),
      expandedCourses: true,
      studentName: "",
      setStudentName: jest.fn(),
      handleAddStudent: jest.fn(),
      ...props,
    };

    return render(<Student {...defaultProps} />);
  };

  it("renders StudentList and StudentForm when expandedCourses is true", () => {
    setup();

    const titleElement = screen.getByText("Students");
    expect(titleElement).toBeInTheDocument();

    const studentListElement = screen.getByTestId("student-list");
    expect(studentListElement).toBeInTheDocument();

    const studentFormElement = screen.getByTestId("student-form");
    expect(studentFormElement).toBeInTheDocument();
  });

  it("calls toggleExpand when title is clicked", () => {
    const toggleExpand = jest.fn();
    setup({ toggleExpand });

    const titleElement = screen.getByText("Students");
    fireEvent.click(titleElement);

    expect(toggleExpand).toHaveBeenCalledTimes(1);
    expect(toggleExpand).toHaveBeenCalledWith(1);
  });

  it("passes course prop correctly to StudentList", () => {
    setup();

    const studentListElement = screen.getByTestId("student-list");
    const courseProp = studentListElement.getAttribute("data-course");

    expect(courseProp).toEqual(
      JSON.stringify({
        id: 1,
        name: "Mathematics",
        description: "Advanced Math Course",
        schedule: "Monday and Wednesday",
        students: [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" },
        ],
      })
    );
  });

  it("passes props correctly to StudentForm", () => {
    const setStudentName = jest.fn();
    const handleAddStudent = jest.fn();
    setup({ setStudentName, handleAddStudent });

    const studentFormElement = screen.getByTestId("student-form");

    fireEvent.change(screen.getByPlaceholderText("Student Name"), {
      target: { value: "Alice" },
    });

    fireEvent.submit(studentFormElement);

    expect(setStudentName).toHaveBeenCalledWith("Alice");
    expect(handleAddStudent).toHaveBeenCalledTimes(1);
  });
});
