import { render, screen } from "@testing-library/react";
import { StudentList } from "../student-list";
import { Student } from "../../types";

describe("StudentList component", () => {
  const mockOnDelete = jest.fn();

  const setup = (students: Student[] = []) => {
    return render(<StudentList students={students} onDelete={mockOnDelete} />);
  };

  it("renders student items correctly when there are students", () => {
    const students: Student[] = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ];

    setup(students);

    const studentItems = screen.getAllByTestId("student-list-item");

    expect(studentItems).toHaveLength(students.length);
  });

  it("renders no student items when there are no students", () => {
    setup();

    const studentItem = screen.queryByTestId("student-list-item");

    expect(studentItem).toBeNull();
  });
});
