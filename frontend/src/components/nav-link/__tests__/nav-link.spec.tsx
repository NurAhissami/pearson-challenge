import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { NavLink } from "../nav-link";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useLocation: jest.fn(),
  };
});

const { useLocation } = require("react-router-dom");

describe("NavLink component", () => {
  test("renders correctly and matches the link", () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/" });

    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <NavLink to="/">Home</NavLink>
      </MemoryRouter>
    );

    const linkElement = getByText("Home");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  test("applies active class when link is active", () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/active" });

    const { getByText } = render(
      <MemoryRouter initialEntries={["/active"]}>
        <NavLink to="/active">Active Link</NavLink>
      </MemoryRouter>
    );

    const linkElement = getByText("Active Link");
    expect(linkElement).toHaveClass("active");
  });

  test("does not apply active class when link is not active", () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/inactive" });

    const { getByText } = render(
      <MemoryRouter initialEntries={["/inactive"]}>
        <NavLink to="/active">Inactive Link</NavLink>
      </MemoryRouter>
    );

    const linkElement = getByText("Inactive Link");
    expect(linkElement).not.toHaveClass("active");
  });
});
