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
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas menu */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="offcanvas-nav">
              <li
                className={`offcanvas-item ${
                  activeNav === "/" ? "active" : ""
                }`}
                onClick={() => handleNavClick("/")}
              >
                <Link to="/" className="offcanvas-link">
                  Home
                </Link>
              </li>
              <li
                className={`offcanvas-item ${
                  activeNav === "/Product" ? "active" : ""
                }`}
                onClick={() => handleNavClick("/Product")}
              >
                <Link to="/Product" className="offcanvas-link ">
                  Product
                </Link>
              </li>
              <li
                className={`offcanvas-item ${
                  activeNav === "/Bundling" ? "active" : ""
                }`}
                onClick={() => handleNavClick("/Bundling")}
              >
                <Link to="/Bundling" className="offcanvas-link">
                  Bundling
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Navbar content */}
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
