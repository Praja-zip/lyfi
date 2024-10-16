import React, { useState } from "react";
import axios from "axios";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import AddCategories from "./../../componentadmin/ProductAdmin/AddCategories";
import "./../../componentadmin/ProductAdmin/AddProduct.css";
import { useNavigate } from "react-router-dom";

const AddCategoriesAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [nama_kategori, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSubmit =  () => {
     // Prevent default form submission
    if (!nama_kategori.trim()) {
      setError("Category name cannot be empty.");
      return;
    }

    const item = { nama_kategori };
    const token = localStorage.getItem("token");

    setLoading(true);
    setError(null); // Clear previous errors
    setSuccess(false); // Reset success state

    try {
      const response = axios.post(
        `http://127.0.0.1:8000/api/kategoris`,
        item,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setSuccess(true); // Show success feedback
      setCategory(""); // Clear the input field
    } catch (error) {
      if (error.status === 401){
        navigate('/login');
      }
      setError(
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setLoading(false);
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
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCategoriesAdmin;
