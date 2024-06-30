import { FC } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/main.scss";
import { CoursePage, HomePage, StudentPage } from "./pages";
import { NavLink } from "./components/nav-link";

const App: FC = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <div className="app__header-box"></div>
          <div className="app__header--title-box">
            <Link to="/" className="app__header-title">
              Pearson Course Management
            </Link>
          </div>
        </header>
        <main className="app__container">
          <nav className="app__navigation">
            <NavLink to="/add-course">Add Course</NavLink>
            <NavLink to="/add-student">Add Student</NavLink>
          </nav>
          <Routes>
            <Route path="/add-course" element={<CoursePage />} />
            <Route path="/add-student" element={<StudentPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
