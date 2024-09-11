import React, { useState } from "react";
import Logo from "./../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(location.pathname);

  const handleNavClick = (path) => {
    setActiveNav(path);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-transparent">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={Logo} alt="Logo" />
        </a>
        <button
          className="navbar-toggler border-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li
              className={`nav-item me-5 ${activeNav === "/" ? "active" : ""}`}
              onClick={() => handleNavClick("/")}
            >
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>
            </li>
            <li
              className={`nav-item me-5 ${
                activeNav === "/Product" ? "active" : ""
              }`}
              onClick={() => handleNavClick("/Product")}
            >
              <Link to="/Product" className="nav-link">
                Product
              </Link>
            </li>
            <li
              className={`nav-item me-5 ${
                activeNav === "/Bundling" ? "active" : ""
              }`}
              onClick={() => handleNavClick("/Bundling")}
            >
              <Link to="/Bundling" className="nav-link">
                Bundling
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
