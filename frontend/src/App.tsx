import { useState, useEffect, FC } from "react";
import { CourseForm } from "./components/course-form";
import { CourseList } from "./components/course-list";
import { Course } from "./components/types";
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  addStudentToCourse,
} from "./utils/api";
import "./styles/main.scss";
import { CourseDetail } from "./components/course-detail";

const App: FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [schedule, setSchedule] = useState<string>("");
  const [editCourseId, setEditCourseId] = useState<number | null>(null);
  const [studentName, setStudentName] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetchCourses()
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses", error));
  }, []);

  const handleAddCourse = () => {
    if (editCourseId !== null) {
      updateCourse(editCourseId, { name, description, schedule })
        .then((response) => {
          setCourses(
            courses.map((course) =>
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
          setCourses([...courses, response.data]);
          clearForm();
        })
        .catch((error) => console.error("Error adding course", error));
    }
  };

  const handleDeleteCourse = (id: number) => {
    deleteCourse(id)
      .then(() => {
        setCourses(courses.filter((course) => course.id !== id));
        if (selectedCourse?.id === id) {
          setSelectedCourse(null);
        }
      })
      .catch((error) => console.error("Error deleting course", error));
  };

  const handleAddStudentToCourse = (courseId: number, studentName: string) => {
    addStudentToCourse(courseId, { name: studentName })
      .then((response) => {
        const updatedCourses = courses.map((course) =>
          course.id === courseId
            ? { ...course, students: [response.data, ...course.students] }
            : course
        );
        setCourses(updatedCourses);
        setSelectedCourse(
          updatedCourses.find((course) => course.id === courseId) || null
        );

        setStudentName("");
      })
      .catch((error) => console.error("Error adding student", error));
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

  if (!courses) {
    return <div className="course-detail">Add Course</div>;
  }

  console.log(courses);

  return (
    <div className="app">
      <header>
        <div className="app__header-box"></div>
        <div className="app__header--title-box">
          <span className="app__header-title">Pearson Course Management</span>
        </div>
      </header>
      <main className="app__container">
        <div className="app__floating-button" onClick={openModal}>
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
          <div className="app__courses">
            <CourseList courses={courses} onSelect={setSelectedCourse} />
            <div className="app__courses-divider"></div>
            <CourseDetail
              course={selectedCourse}
              onEdit={handleEditCourse}
              onDelete={handleDeleteCourse}
              onAddStudent={handleAddStudentToCourse}
              studentName={studentName}
              setStudentName={setStudentName}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
