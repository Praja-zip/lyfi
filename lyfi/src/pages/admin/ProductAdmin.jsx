import React, { useState } from "react";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import Header from "../../componentadmin/ProductAdmin/Header";
import { Link } from "react-router-dom";
import foto from "./../../assets/LandingPage/about.png";

import ProductTable from "../../componentadmin/ProductAdmin/ProductTable";

import "./../../componentadmin/ProductAdmin/AddProduct.css";

const products = [
  {
    name: "Moisturizer A",
    price: "Rp 150.000",
    details: "Pelembab dengan kandungan alami",
    image: foto,
    category: "Moisturizer",
  },
  // Tambahkan lebih banyak produk
];
const ProductAdmin = () => {
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
          <Header />
          <div className="container-productadmin">
            <Link
              to="/admin/addproductadmin"
              className="next-page-product"
              href=""
            >
              <i class="fa-solid fa-plus me-2"></i>Create Product
            </Link>
            <Link
              to="/admin/addcategories"
              href=""
              className="next-page-product mx-3"
            >
              <i class="fa-solid fa-plus me-2"></i>Create Categories
            </Link>
          </div>
          <div className="container-tableproduct mt-2">
            <ProductTable products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;
