import axios from "axios";
import { Course, Student } from "../components/types";

const BASE_URL = "http://localhost:8080";

// Courses API
export const fetchCourses = () => axios.get<Course[]>(`${BASE_URL}/courses`);
export const addCourse = (course: {
  name: string;
  description: string;
  schedule: string;
}) => axios.post<Course>(`${BASE_URL}/courses`, course);
export const updateCourse = (
  id: number,
  course: { name: string; description: string; schedule: string }
) => axios.put<Course>(`${BASE_URL}/courses/${id}`, course);
export const deleteCourse = (id: number) =>
  axios.delete(`${BASE_URL}/courses/${id}`);

// Students API
export const fetchStudents = () => axios.get<Student[]>(`${BASE_URL}/students`);

export const addStudent = (student: { name: string }) =>
  axios.post<Student>(`${BASE_URL}/students`, student);

export const updateStudent = (id: number, student: { name: string }) =>
  axios.put<Student>(`${BASE_URL}/students/${id}`, student);

export const deleteStudent = (id: number) =>
  axios.delete(`${BASE_URL}/students/${id}`);

export const addStudentToCourse = (courseId: number, studentId: number) =>
  axios.post<Student>(`${BASE_URL}/courses/${courseId}/students`, {
    studentId,
  });

export const removeStudentFromCourse = (courseId: number, studentId: number) =>
  axios.delete(`${BASE_URL}/courses/${courseId}/students/${studentId}`);
