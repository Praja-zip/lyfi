import React, { useState, useEffect } from "react";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import Header from "../../componentadmin/ProductAdmin/Header";
import { Link } from "react-router-dom";
import foto from "./../../assets/LandingPage/about.png";
import "./../../componentadmin/BundlingAdmin/Bundlingadmin.css";
import Loading from "./../../components/Loading/Loading";
import BundlingTable from "../../componentadmin/BundlingAdmin/BundlingTable";

import "./../../componentadmin/ProductAdmin/AddProduct.css";

const bundling = [
  {
    name: "Moisturizer A",
    price: "Rp 150.000",
    details: "Pelembab dengan kandungan alami",
    image: foto,
    category: "Moisturizer",
  },
  // Tambahkan lebih banyak produk
];

const BundlingAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Inisialisasi state loading

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handlePageLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => {
      window.removeEventListener("load", handlePageLoad);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
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
                  >
                    <i className="fa-solid fa-plus me-2"></i>Create Bundling
                  </Link>
                </div>
                <div className="container-tableproduct mt-2">
                  <BundlingTable products={bundling} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BundlingAdmin;
