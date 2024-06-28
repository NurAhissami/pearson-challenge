import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const fetchCourses = () => axios.get(`${BASE_URL}/courses`);

export const addCourse = (course: {
  name: string;
  description: string;
  schedule: string;
}) => axios.post(`${BASE_URL}/courses`, course);

export const updateCourse = (
  id: number,
  course: { name: string; description: string; schedule: string }
) => axios.put(`${BASE_URL}/courses/${id}`, course);

export const deleteCourse = (id: number) =>
  axios.delete(`${BASE_URL}/courses/${id}`);

export const addStudentToCourse = (
  courseId: number,
  student: { name: string }
) => axios.post(`${BASE_URL}/courses/${courseId}/students`, student);
