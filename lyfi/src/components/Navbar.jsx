import React, { useState, useEffect } from "react";
import Logo from "./../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(location.pathname);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // State to track offcanvas visibility
  const navigate = useNavigate();
  const handleNavClick = (path) => {
    setActiveNav(path);
  };

  const handleRedirect = (e, path) => {
    e.preventDefault(); // Mencegah reload halaman
    navigate(path); // Redirect ke path yang diberikan
  };

  useEffect(() => {
    const offcanvasElement = document.getElementById("offcanvasExample");

    const handleOpen = () => setIsOffcanvasOpen(true);
    const handleClose = () => setIsOffcanvasOpen(false);

    offcanvasElement.addEventListener("show.bs.offcanvas", handleOpen);
    offcanvasElement.addEventListener("hide.bs.offcanvas", handleClose);

    // Cleanup event listeners on component unmount
    return () => {
      offcanvasElement.removeEventListener("show.bs.offcanvas", handleOpen);
      offcanvasElement.removeEventListener("hide.bs.offcanvas", handleClose);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-transparent">
      <div className="container-fluid">
        <a className="navbar-brand" href="../">
          <img src={Logo} alt="Logo" />
        </a>
        <button
          className="navbar-toggler border-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
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
        </div>
      </div>

      {/* Offcanvas Element */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        style={{ width: "80%" }}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <img src={Logo} alt="" />
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        {isOffcanvasOpen && (
          <div className="offcanvas-body">
            <ul className="offcanvas-link">
              <li className="offcanvas-nav">
                <a href="/" onClick={(e) => handleRedirect(e, "/")}>
                  <button>
                    <i className="fa-solid fa-home me-3"></i>Home
                  </button>
                </a>
              </li>
              <li className="offcanvas-nav">
                <a href="/product" onClick={(e) => handleRedirect(e, "/product")}>
                  <button>
                    <i className="fa-solid fa-shopping-cart me-3"></i>Product
                  </button>
                </a>
              </li>
              <li className="offcanvas-nav">
                <a href="/bundling" onClick={(e) => handleRedirect(e, "/bundling")}>
                  <button>
                    <i className="fa-solid fa-tags me-3"></i>Bundling
                  </button>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
