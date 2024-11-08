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
  const [produk, setProduk] = useState("");
  const [bundling, setBundling] = useState("");
  const [visitor, setVisitor] = useState("")
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/count`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }  
        });
        setProduk(response.data.total_produk);
        setBundling(response.data.total_bundling);
      } catch (error) {
        console.error("Error fetching categories:", error);
        if (error.status === 401){
          navigate('/login');
        }
      }
    };

    const fetchVisitor = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/visitor-stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }  
        });
        setVisitor(response.data.nonBotVisitors);  
      } catch (error) {
        console.error("Error fetching visitor:", error);
        if (error.status === 401){
          navigate('/login');
        }
      }
    };

    fetchCategories();
    fetchVisitor()
    
  }, [ token]);


 

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboardadmin">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {!isSidebarOpen && (
        <a href="#" onClick={toggleSidebar} className="open-btn">
          ☰
        </a>
      )}
      <div className={`content ${isSidebarOpen ? "content-open" : "content-closed"}`}>
        <div className="main-content">
          <Header />
          <Dashboard produk={ produk } bundling={ bundling } visitor={ visitor } />
          <DoughnutChart/>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
