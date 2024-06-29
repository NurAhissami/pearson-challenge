import express from "express";
import cors from "cors";
import { Course, Student } from "./models";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/courses", async (req, res) => {
  const courses = await Course.findAll({ include: "students" });
  res.json(courses);
});

app.post("/courses", async (req, res) => {
  const newCourse = await Course.create(req.body);
  res.status(201).json(newCourse);
});

app.put("/courses/:id", async (req, res) => {
  const id = req.params.id;
  const course = await Course.findByPk(id);
  if (course) {
    await course.update(req.body);
    res.json(course);
  } else {
    res.status(404).send("Course not found");
  }
});

app.delete("/courses/:id", async (req, res) => {
  const id = req.params.id;
  await Course.destroy({ where: { id } });
  res.status(204).send();
});

app.post("/courses/:id/students", async (req, res) => {
  const courseId = req.params.id;
  const studentId = req.body.studentId;
  const student = await Student.findByPk(studentId);
  if (student) {
    const course = await Course.findByPk(courseId);
    if (course) {
      await course.addStudent(student);
      res.status(201).json(student);
    } else {
      res.status(404).send("Course not found");
    }
  } else {
    res.status(404).send("Student not found");
  }
});

app.delete("/courses/:courseId/students/:studentId", async (req, res) => {
  const { courseId, studentId } = req.params;
  const student = await Student.findByPk(studentId);
  const course = await Course.findByPk(courseId);

  if (student && course) {
    await course.removeStudent(student);
    res.status(204).send();
  } else {
    res.status(404).send("Course or student not found");
  }
});

app.get("/students", async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
});

app.post("/students", async (req, res) => {
  const newStudent = await Student.create(req.body);
  res.status(201).json(newStudent);
});

app.delete("/students/:id", async (req, res) => {
  const id = req.params.id;
  await Student.destroy({ where: { id } });
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
