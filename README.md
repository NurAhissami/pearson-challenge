# Full-Stack Project with React, TypeScript, Node.js, and SQLite

## Description

This project is a full-stack web application that manages courses and students. The frontend is built with React and TypeScript, while the backend is developed with Node.js, using SQLite and Sequelize for data persistence.

https://github.com/NurAhissami/pearson-challenge/assets/80348550/913a598e-f233-4237-a69a-fc591890692e

## Table of Content

1. [Project Structure](#project-structure)
2. [Design Decisions](#design-decisions)
3. [Folder Structure](#folder-structure)
4. [Installation and Execution](#installation-and-execution)
5. [Running Tests](#running-tests)
6. [Backend API Endpoints](#backend-api-endpoints)


## Project Structure

### Frontend
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Programming language that extends JavaScript by adding static types.




### Backend
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **SQLite**: Lightweight database, used for data persistence.
- **Sequelize**: ORM for Node.js, facilitating interaction with the database.

## Design Decisions

### Frontend

1. **React with TypeScript**: React was chosen for its popularity and efficiency in building dynamic user interfaces. TypeScript was used to add a layer of static type safety, making the development and maintenance of the codebase easier.
2. **Functional Components**: Functional components were chosen over class components to leverage React hooks, simplifying state management and side effects.
3. **Testing Library**: Testing Library is used for frontend testing due to its focus on testing based on user behavior.

### Backend

1. **Node.js with Express**: Node.js was chosen for its performance and scalability. Express is a minimalist and flexible framework for web applications.
2. **SQLite**: SQLite was used for its simplicity and ease of setup, ideal for prototyping and small applications.
3. **Sequelize**: Sequelize was selected as the ORM to simplify database operations and keep the code clean and maintainable.

## Folder Structure
```markdown
root
│
├── [+] backend
  ├── [+] src
    ├── models
    └── index.ts
  ├── database.sqlite
  ├── tests
  ├── tsconfig.json
  └── package.json

├── [+] frontend
  ├── [+] src
    ├── [+] assets
    ├── [+] components
      ├── [+] course-detail
        ├── [+] __tests__
          ├── course-detail.spec.tsx
        ├── course-detail.interface.tsx
        ├── course-detail.tsx
        ├── index.ts
      ├── [+] course-form
      ├── [+] course-list
      ├── [+] input
      ├── [+] nav-link
      ├── [+] student-form
      ├── [+] student-list
      ├── index.ts
      └── types.ts
    ├── [+] pages
        ├── course-page.tsx
        ├── student-page.tsx
        ├── home-page.tsx
        └── types.ts
    ├── [+] utils
        ├── [+] __tests__
        ├── api.ts
        ├── date-formatter.ts
        ├── validate-date.ts
        └── index.ts    
    ├── App.tsx
    ├── index.tsx
    └── [+] styles
  ├── public
  ├── .babelrc
  ├── .gitignore
  ├── .gitignore
  ├── babel.config.js
  ├── jest.config.js
  ├── setupTests.js
  └── package.json
 
└── README.md

```


## Installation and Execution

### Backend

1. Clone the repository:
    ```bash
    git clone https://github.com/NurAhissami/pearson-challenge.git
    cd pearson-challenge
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application:
    ```bash
    npm start
    ```

The application will be available at `http://localhost:3000`.

## Running Tests

### Frontend

To run backend tests, use the following command:

  ```bash
    cd frontend
    npm test
```

## Backend API Endpoints

https://pearson-challenge.onrender.com/courses
https:localhost8080/courses

### Courses

#### Get All Courses

- **Endpoint**: `GET /courses`
- **Description**: Retrieves a list of all courses.

#### Get Course by ID

- **Endpoint**: `GET /courses/:id`
- **Description**: Retrieves a single course by its ID.

#### Create Course

- **Endpoint**: `POST /courses`
- **Description**: Creates a new course.
- **Payload**:
  
  ```json
  {
    "name": "Course Name",
    "description": "Course Description",
    "schedule": "YYYY-MM-DD"
  }
  ```

#### Update Course
- **Endpoint**: PUT /courses/:id
- **Description**: Updates an existing course.
- **Payload**:
  
```json
{
  "name": "Updated Course Name",
  "description": "Updated Course Description",
  "schedule": "YYYY-MM-DD"
}
```

#### Delete Course
- **Endpoint**: DELETE /courses/:id
- **Description**: Deletes a course by its ID.

  
### Students

https://pearson-challenge.onrender.com/students
https:localhost8080/students

#### Get All Students
- **Endpoint**: GET /students
- **Description**: Retrieves a list of all students.

#### Get Student by ID
- **Endpoint**: GET /students/:id
- **Description**: Retrieves a single student by their ID.

#### Create Student
- **Endpoint**: POST /students
- **Description**: Creates a new student.
- **Payload**:
  
```json
{
  "name": "Student Name",
  "courseId": 1
}
```

#### Delete Student
- **Endpoint**: DELETE /students/:id
- **Description**: Deletes a student by their ID.


