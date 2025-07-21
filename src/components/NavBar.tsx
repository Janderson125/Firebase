import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Import the CSS file

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">My E-Commerce</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li>
          <Link to="/register" className="nav-link">Register</Link>
        </li>
        <li>
          <Link to="/cart" className="nav-link">Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
