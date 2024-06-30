import { FC, useState, useEffect } from "react";
import { CourseList, CourseForm, CourseDetail } from "../components";
import { Course, Student } from "../components/types";
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  removeStudentFromCourse,
} from "../utils";

export const CoursePage: FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [schedule, setSchedule] = useState<string>("");
  const [editCourseId, setEditCourseId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses()
      .then((response) => {
        setCourses(response.data);
        const storedCourseId = localStorage.getItem("selectedCourseId");
        if (storedCourseId) {
          const storedCourse = response.data.find(
            (course) => course.id === parseInt(storedCourseId)
          );
          if (storedCourse) {
            setSelectedCourse(storedCourse);
          } else if (response?.data?.length > 0) {
            setSelectedCourse(response.data[0]);
          }
        } else if (response?.data?.length > 0) {
          setSelectedCourse(response.data[0]);
        }
      })
      .catch((error) => console.error("Error fetching courses", error));
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      localStorage.setItem("selectedCourseId", selectedCourse.id.toString());
    }
  }, [selectedCourse]);

  const handleAddCourse = () => {
    if (editCourseId !== null) {
      updateCourse(editCourseId, { name, description, schedule })
        .then((response) => {
          setCourses((prevCourses) =>
            prevCourses.map((course) =>
              course.id === editCourseId ? response.data : course
            )
          );
          if (selectedCourse?.id === editCourseId) {
            setSelectedCourse(response.data);
          }
          clearForm();
        })
        .catch((error) => console.error("Error updating course", error));
    } else {
      addCourse({ name, description, schedule })
        .then((response) => {
          setCourses((prevCourses) => [...prevCourses, response.data]);
          if (courses?.length === 0) {
            setSelectedCourse(response.data);
          }
          clearForm();
        })
        .catch((error) => console.error("Error adding course", error));
    }
  };

  const handleDeleteCourse = (id: number) => {
    deleteCourse(id)
      .then(() => {
        const updatedCourses = courses.filter((course) => course.id !== id);
        setCourses(updatedCourses);
        if (selectedCourse?.id === id) {
          setSelectedCourse(
            updatedCourses.length > 0 ? updatedCourses[0] : null
          );
        }
      })
      .catch((error) => console.error("Error deleting course", error));
  };

  const handleRemoveStudentFromCourse = (
    courseId: number,
    studentId: number
  ) => {
    removeStudentFromCourse(courseId, studentId)
      .then(() => {
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  students: course.students.filter(
                    (student) => student.id !== studentId
                  ),
                }
              : course
          )
        );
        if (selectedCourse?.id === courseId) {
          setSelectedCourse((prevSelectedCourse) =>
            prevSelectedCourse
              ? {
                  ...prevSelectedCourse,
                  students: prevSelectedCourse.students.filter(
                    (student) => student.id !== studentId
                  ),
                }
              : null
          );
        }
      })
      .catch((error) =>
        console.error("Error removing student from course", error)
      );
  };

  const updateCourseStudents = (courseId: number, students: Student[]) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId ? { ...course, students } : course
      )
    );
    if (selectedCourse?.id === courseId) {
      setSelectedCourse((prevSelectedCourse) =>
        prevSelectedCourse ? { ...prevSelectedCourse, students } : null
      );
    }
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setSchedule("");
    setEditCourseId(null);
  };

  const handleEditCourse = (course: Course) => {
    setName(course.name);
    setDescription(course.description);
    setSchedule(course.schedule);
    setEditCourseId(course.id);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
    clearForm();
  };

  return (
    <div className="course-page">
      <div className="course-page__add-button" onClick={openModal}>
        Add more course
      </div>
      {showModal && (
        <CourseForm
          name={name}
          description={description}
          schedule={schedule}
          setName={setName}
          setDescription={setDescription}
          setSchedule={setSchedule}
          onSubmit={handleAddCourse}
          editCourseId={editCourseId}
          showModal={showModal}
          closeModal={closeModal}
        />
      )}
      {courses.length !== 0 && (
        <div className="course-page__container">
          <CourseList courses={courses} onSelect={setSelectedCourse} />
          <div className="course-page__courses-divider"></div>
          <CourseDetail
            course={selectedCourse}
            onEdit={handleEditCourse}
            onDelete={handleDeleteCourse}
            handleRemoveStudentFromCourse={handleRemoveStudentFromCourse}
            updateCourseStudents={updateCourseStudents}
          />
        </div>
      )}
    </div>
  );
};
