import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../assets/LandingPage/LYFI.png";
import axios from "axios";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logoutHandler = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/admin/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      localStorage.removeItem("token");
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <nav className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {isOpen && (
        <a href="#" onClick={toggleSidebar} className="toggle-btn">
          <i className="fa-solid fa-xmark pe-3"></i>
        </a>
      )}
      <img src={logo} alt="LYFI Logo" className="mt-5" />
      <ul className="sidebar-nav flex-column">
        {localStorage.getItem("user-info") ? (
          <Link to="/login" className="sidebar-link">
            <li className="sidebar-item">
              <i className="fa-solid fa-cube pe-3"></i>
              Login
            </li>
          </Link>
        ) : (
          <>
            <Link to="/admin" className="sidebar-link active">
              <li className="sidebar-item">
                <i className="fa-solid fa-cubes-stacked pe-3"></i>
                Dashboard
              </li>
            </Link>
            <Link to="/admin/productadmin" className="sidebar-link">
              <li className="sidebar-item">
                <i className="fa-solid fa-cart-shopping pe-3"></i>
                Produk
              </li>
            </Link>
            <Link to="/admin/bundlingadmin" className="sidebar-link">
              <li className="sidebar-item">
                <i className="fa-solid fa-cube pe-3"></i>
                Bundling
              </li>
            </Link>
            <div className="sidebar-link" onClick={logoutHandler}>
              <li className="sidebar-item">
                <i className="fa-solid fa-door-open pe-3"></i>
                Logout
              </li>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
