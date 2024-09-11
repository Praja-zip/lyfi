import React, { useState } from "react";
import axios from "axios"; // Pastikan axios diimpor
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import AddCategories from "./../../componentadmin/ProductAdmin/AddCategories";
import "./../../componentadmin/ProductAdmin/AddProduct.css";

const AddCategoriesAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSubmit = async () => {
    const item = { category };
    console.log(item);
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/kategoris?token=${token}`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data); 
      window.location.reload();

    } catch (error) {
      console.error("Error:", error);
      // Handle fetch error
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
        className={`content ${
          isSidebarOpen ? "content-open" : "content-closed"
        }`}
      >
        <div className="main-content">
          <AddCategories 
            category={category} 
            setCategory={setCategory} 
            handleSubmit={handleSubmit} 
          />
        </div>
      </div>
    </div>
  );
};

export default AddCategoriesAdmin;
