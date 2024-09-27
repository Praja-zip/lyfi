import React, { useState, useEffect } from "react";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import { Link } from "react-router-dom";
import "./../../componentadmin/BundlingAdmin/Bundlingadmin.css";

import CategoryTable from "../../componentadmin/ProductAdmin/CategoryTable";
import "./../../componentadmin/ProductAdmin/AddProduct.css";
import axios from "axios";
const cat = [
    {
      name: "Moisturizer A"
    },
    // Tambahkan lebih banyak produk
  ];
  const Category = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
  };

  const token = localStorage.getItem("token");
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/kategoris", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllCategories(response.data.kategoris);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [token]);
  
  return (
    <div className="dashboardadmin">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {!isSidebarOpen && (
        <a href="#" onClick={toggleSidebar} className="open-btn">
          ☰
        </a>
      )}
      <div
        className={`content ${
          isSidebarOpen ? "content-open" : "content-closed"
        }`}
      >
        <div className="main-content">
          <div className="container-tableproduct mt-2">
            <CategoryTable categories={ allCategories } />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
