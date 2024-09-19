import React, { useState } from "react";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import { Link } from "react-router-dom";
import "./../../componentadmin/BundlingAdmin/Bundlingadmin.css";

import CategoryTable from "../../componentadmin/ProductAdmin/CategoryTable";
import "./../../componentadmin/ProductAdmin/AddProduct.css";
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
            <CategoryTable category={cat} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
