import React, { useState,useEffect } from "react";
import axios from "axios"; // Pastikan axios diimpor
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import EditCategories from "./../../componentadmin/ProductAdmin/EditCategory";
import "./../../componentadmin/ProductAdmin/AddProduct.css";
import { useNavigate, useParams } from "react-router-dom";

const EditCategoriesAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [nama_kategori, setCategory] = useState("");
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/kategoris/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategory(response.data.data.nama_kategori);
        console.log(response.data.data.nama_kategori);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    
  }, [id, token]);

  const handleSubmit = async () => {
    const item = { nama_kategori }; // Data yang akan dikirim
    console.log(item);

    try {
      const response = await axios.put( // Menggunakan PUT untuk update
        `http://127.0.0.1:8000/api/kategoris/${id}`,
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
      window.location.reload(); // Refresh halaman setelah sukses
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
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
          <EditCategories
            category={nama_kategori}
            setCategory={setCategory}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCategoriesAdmin;
