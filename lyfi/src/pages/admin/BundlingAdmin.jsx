import React, { useState, useEffect } from "react";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import Header from "../../componentadmin/ProductAdmin/Header";
import { Link } from "react-router-dom";
import foto from "./../../assets/LandingPage/about.png";
import "./../../componentadmin/BundlingAdmin/Bundlingadmin.css";
import BundlingTable from "../../componentadmin/BundlingAdmin/BundlingTable";

import "./../../componentadmin/ProductAdmin/AddProduct.css";
import axios from "axios";



const BundlingAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [allBundlings, setAllBundlings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBundling = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/produk-bundlings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllBundlings(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchBundling();
  }, [token]);

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
          <Header />
          <div className="container-productadmin">
            <Link
              to="/admin/addbundlingadmin"
              className="next-page-product"
              href=""
            >
              <i class="fa-solid fa-plus me-2"></i>Create Bundling
            </Link>
          </div>
          <div className="container-tableproduct mt-2">
            <BundlingTable products={allBundlings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundlingAdmin;
