import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import { CourseDetailProps } from "../course-detail.interface";
import { CourseDetail } from "../course-detail";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("CourseDetail component", () => {
  const course = {
    id: 1,
    name: "Mathematics",
    description: "Advanced Math Course",
    schedule: "2024-07-01",
    students: [],
  };

  const mockCourseDetailProps: CourseDetailProps = {
    course,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    handleRemoveStudentFromCourse: jest.fn(),
    updateCourseStudents: jest.fn(),
  };

  beforeEach(() => {
    mockedAxios.post.mockClear();
    mockedAxios.get.mockClear();
  });

  it("renders 'Select a course' message when no course is selected", () => {
    const { getByText } = render(
      <CourseDetail {...mockCourseDetailProps} course={null} />
    );
    const selectCourseMessage = getByText("Select a course");
    expect(selectCourseMessage).toBeInTheDocument();
  });

  it("renders course details when a course is selected", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    const { getByText } = render(<CourseDetail {...mockCourseDetailProps} />);
    const courseTitle = getByText("Mathematics");
    const courseDescription = getByText("Advanced Math Course");
    const courseSchedule = getByText("2024-07-01");

    expect(courseTitle).toBeInTheDocument();
    expect(courseDescription).toBeInTheDocument();
    expect(courseSchedule).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });
});
