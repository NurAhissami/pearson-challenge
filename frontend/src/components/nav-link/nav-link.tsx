import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

export const NavLink: FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`app__navigation-link ${isActive ? "active" : ""}`}
    >
      {children}
    </Link>
  );
};
