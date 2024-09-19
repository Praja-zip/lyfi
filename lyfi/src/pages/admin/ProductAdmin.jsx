import React, { useState, useEffect } from "react";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import Header from "../../componentadmin/ProductAdmin/Header";
import { Link } from "react-router-dom";
import foto from "./../../assets/LandingPage/about.png";

import ProductTable from "../../componentadmin/ProductAdmin/ProductTable";

import "./../../componentadmin/ProductAdmin/AddProduct.css";
import axios from "axios";

const ProductAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const token = localStorage.getItem("token");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/master-products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      setAllProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  fetchProducts();
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
          <Header />
          <div className="container-productadmin">
            <Link to="/admin/addproductadmin" className="next-page-product">
              <i className="fa-solid fa-plus me-2"></i>Create Product
            </Link>
            <Link to="/admin/addcategories" className="next-page-product mx-3">
              <i className="fa-solid fa-plus me-2"></i>Create Categories
            </Link>
          </div>
          <div className="container-tableproduct mt-2">
            <ProductTable allProducts={allProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;
