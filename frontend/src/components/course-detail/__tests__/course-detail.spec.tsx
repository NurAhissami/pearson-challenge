import { render, fireEvent } from "@testing-library/react";
import { CourseDetail } from "../course-detail";

describe("CourseDetail component", () => {
  const course = {
    id: 1,
    name: "Mathematics",
    description: "Advanced Math Course",
    schedule: "2024-07-01",
    students: [],
  };

  const onEditMock = jest.fn();
  const onDeleteMock = jest.fn();
  const onAddStudentMock = jest.fn();

  it("renders course details correctly", () => {
    const { getByText } = render(
      <CourseDetail
        course={course}
        onEdit={onEditMock}
        onDelete={onDeleteMock}
        onAddStudent={onAddStudentMock}
        studentName=""
        setStudentName={() => {}}
      />
    );

    expect(getByText("Mathematics")).toBeInTheDocument();
    expect(getByText("Advanced Math Course")).toBeInTheDocument();
    expect(getByText("2024-07-01")).toBeInTheDocument();
  });

  it("calls onDelete callbacks correctly", () => {
    const { getByTestId } = render(
      <CourseDetail
        course={course}
        onEdit={onEditMock}
        onDelete={onDeleteMock}
        onAddStudent={onAddStudentMock}
        studentName=""
        setStudentName={() => {}}
      />
    );

    fireEvent.click(getByTestId("course-detail-delete-button"));
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(course.id);
  });

  it("calls onEdit callback correctly", () => {
    const { getByTestId } = render(
      <CourseDetail
        course={course}
        onEdit={onEditMock}
        onDelete={onDeleteMock}
        onAddStudent={onAddStudentMock}
        studentName=""
        setStudentName={() => {}}
      />
    );

    const editButton = getByTestId("course-detail-edit-button");
    fireEvent.click(editButton);

    expect(onEditMock).toHaveBeenCalledTimes(1);
    expect(onEditMock).toHaveBeenCalledWith(course);
  });
});
