import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

interface Student {
  id: number;
  name: string;
}

interface Course {
  id: number;
  name: string;
  description: string;
  schedule: string;
  students: Student[];
}

let courses: Course[] = [];

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.post("/courses", (req, res) => {
  const newCourse: Course = {
    id: courses.length + 1,
    name: req.body.name,
    description: req.body.description,
    schedule: req.body.schedule,
    students: [],
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.put("/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find((c) => c.id === id);
  if (course) {
    course.name = req.body.name;
    course.description = req.body.description;
    course.schedule = req.body.schedule;
    res.json(course);
  } else {
    res.status(404).send("Course not found");
  }
});

app.delete("/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  courses = courses.filter((course) => course.id !== id);
  res.status(204).send();
});

app.get("/students", (req, res) => {
  const allStudents: Student[] = courses.reduce(
    (studentsAccumulator: Student[], course) => [
      ...studentsAccumulator,
      ...course.students,
    ],
    []
  );
  res.json(allStudents);
});

app.post("/courses/:id/students", (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find((c) => c.id === courseId);
  if (course) {
    const newStudent: Student = {
      id: course.students.length + 1,
      name: req.body.name,
    };
    course.students.push(newStudent);
    res.status(201).json(newStudent);
  } else {
    res.status(404).send("Course not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
