import { render, screen, fireEvent } from "@testing-library/react";
import { CourseList } from "../course-list";
import { Course } from "../../types";
import { formatDate } from "../../../utils/date-formatter";

jest.mock("../../../utils/date-formatter");

describe("CourseList component", () => {
  const courses: Course[] = [
    {
      id: 1,
      name: "Mathematics",
      description: "Advanced Math Course",
      schedule: "2023-04-20",
      students: [],
    },
    {
      id: 2,
      name: "Science",
      description: "Basic Science Course",
      schedule: "2023-05-15",
      students: [],
    },
  ];

  const mockFormatDate = formatDate as jest.MockedFunction<typeof formatDate>;

  beforeEach(() => {
    mockFormatDate.mockImplementation((dateString: string) => {
      const formattedDate = new Date(dateString);
      return {
        day: formattedDate.getDate(),
        month: formattedDate.toLocaleString("default", { month: "short" }),
      };
    });
  });

  it("renders a list of courses", () => {
    render(<CourseList courses={courses} onSelect={jest.fn()} />);

    courses.forEach((course) => {
      expect(screen.getByText(course.name)).toBeInTheDocument();
    });
  });

  it("calls onSelect with the correct course when a course is clicked", () => {
    const onSelect = jest.fn();
    render(<CourseList courses={courses} onSelect={onSelect} />);

    const courseElements = screen.getAllByRole("listitem");

    courseElements.forEach((element, index) => {
      fireEvent.click(element);
      expect(onSelect).toHaveBeenCalledWith(courses[index]);
    });
  });

  it("renders formatted schedule date correctly", () => {
    render(<CourseList courses={courses} onSelect={jest.fn()} />);

    courses.forEach((course) => {
      const { day, month } = formatDate(course.schedule);
      expect(screen.getByText(day.toString())).toBeInTheDocument();
      expect(screen.getByText(month)).toBeInTheDocument();
    });
  });
});
