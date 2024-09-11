import React, { useEffect, useState } from "react";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import Header from "./../../componentadmin/DashboardAdmin/Header";
import Dashboard from "../../componentadmin/DashboardAdmin/Dashboard";
import "./../../componentadmin/DashboardAdmin/Dashboard.css";
import DoughnutChart from "../../componentadmin/DashboardAdmin/DiagramContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  console.log('Token:', token)

  const fetchData = async () => {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/me', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  }  

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/login');
  //   } else {
  //     fetchData();
  //   }
  // }, [token, navigate]);

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

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboardadmin">
      <Sidebar logoutHandler={logoutHandler} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {!isSidebarOpen && (
        <a href="#" onClick={toggleSidebar} className="open-btn">
          ☰
        </a>
      )}
      <div className={`content ${isSidebarOpen ? "content-open" : "content-closed"}`}>
        <div className="main-content">
          <Header />
          <Dashboard />
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
