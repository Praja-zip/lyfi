import React, { useState } from "react";
import axios from "axios"; // Pastikan axios diimpor
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import AddCategories from "./../../componentadmin/ProductAdmin/AddCategories";
import "./../../componentadmin/ProductAdmin/AddProduct.css";

const AddCategoriesAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [nama_kategori, setCategory] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSubmit = async () => {
    const item = { nama_kategori };
    console.log(item);
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/kategoris`, 
        item, 
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
  
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
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
        className={`content ${isSidebarOpen ? "content-open" : "content-closed"}`}
      >
        <div className="main-content">
          <AddCategories 
            category={nama_kategori} 
            setCategory={setCategory} 
            handleSubmit={handleSubmit} 
          />
        </div>
      </div>
    </div>
  );
};

export default AddCategoriesAdmin;
