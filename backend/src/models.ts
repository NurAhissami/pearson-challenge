import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Sequelize initialization
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

// Course attributes interface
interface CourseAttributes {
  id: number;
  name: string;
  description: string;
  schedule: string;
}

// Course creation attributes
interface CourseCreationAttributes extends Optional<CourseAttributes, "id"> {}

// Student attributes interface
interface StudentAttributes {
  id: number;
  name: string;
}

// Student creation attributes
interface StudentCreationAttributes extends Optional<StudentAttributes, "id"> {}

// Extend model class for Course
class Course
  extends Model<CourseAttributes, CourseCreationAttributes>
  implements CourseAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public schedule!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  public addStudent!: (student: Student | number) => Promise<void>;
  public getStudents!: () => Promise<Student[]>;
  public removeStudent!: (student: Student | number) => Promise<void>;
}

// Extend model class for Student
class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  public id!: number;
  public name!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Course initialization
Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schedule: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Course",
  }
);

// Student initialization
Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Student",
  }
);

// Enrollment model for many-to-many relationship
const Enrollment = sequelize.define("Enrollment", {});

// Associations
Course.belongsToMany(Student, { through: Enrollment, as: "students" });
Student.belongsToMany(Course, { through: Enrollment, as: "courses" });

// Sync database
sequelize.sync({ force: true }).then(() => {
  console.log("Database created!");
});

export { Course, Student, sequelize };
