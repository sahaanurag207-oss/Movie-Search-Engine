import { Link, NavLink } from "react-router-dom";
import "../css/Nav_Bar.css";

function Nav_Bar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" aria-label="Frame home">
          <span className="brand-mark" aria-hidden="true">F</span>
          <span>frame</span>
        </Link>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
          Discover
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
          Favorites
        </NavLink>
      </div>
    </nav>
  );
}

export default Nav_Bar;