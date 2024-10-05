import React, { useState, useEffect } from "react";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import CategoryTable from "../../componentadmin/ProductAdmin/CategoryTable";
import "./../../componentadmin/ProductAdmin/AddProduct.css";
import axios from "axios";
import DeleteCategory from "../../componentadmin/CategoryAdmin/DeleteCategory";

const Category = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [deleteCategory, setDeleteCategory] = useState({ show: false, allCategories: null });
  const token = localStorage.getItem("token");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

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

  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/kategoris/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Category deleted:", response.data);
      setAllCategories(allCategories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
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
      <div className={`content ${isSidebarOpen ? "content-open" : "content-closed"}`}>
        <div className="main-content">
          <div className="container-tableproduct mt-2">
            <CategoryTable
              categories={allCategories}
              handleDeleteCategory={(category) =>
                setDeleteCategory({ show: true, allCategories: category })
              }
            />
          </div>
        </div>
      </div>
      
    </div>
    
);
};

export default Category;
