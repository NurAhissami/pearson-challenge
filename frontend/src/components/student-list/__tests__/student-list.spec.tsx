import { render } from "@testing-library/react";
import { StudentList } from "../student-list";
import { Course } from "../../types";

describe("StudentList component", () => {
  it("renders student items correctly when course has students", () => {
    const course: Course = {
      id: 1,
      name: "Mathematics",
      description: "Advanced Math Course",
      schedule: "Monday and Wednesday",
      students: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
    };

    const { getAllByTestId } = render(<StudentList course={course} />);
    const studentItems = getAllByTestId("student-list-item");

    if (course.students) {
      expect(studentItems).toHaveLength(course.students.length);
    } else {
      expect(studentItems).toHaveLength(0);
    }
  });

  it("renders no student items when course has no students", () => {
    const course: Course = {
      id: 2,
      name: "Physics",
      description: "Advanced Physics Course",
      schedule: "Tuesday and Thursday",
      students: [],
    };

    const { queryByTestId } = render(<StudentList course={course} />);
    const studentItem = queryByTestId("student-list-item");

    expect(studentItem).toBeNull();
  });

  it("renders no student items when course is undefined", () => {
    // @ts-expect-error: Ignoring TypeScript error for testing purposes
    const { queryByTestId } = render(<StudentList course={undefined} />);
    const studentItem = queryByTestId("student-list-item");

    expect(studentItem).toBeNull();
  });
});
