import React, { useState, useEffect } from "react";
import Sidebar from "./../../componentadmin/sidebar";
import Header from "../../componentadmin/ProductAdmin/Header";
import { Link } from "react-router-dom";
import BundlingTable from "../../componentadmin/BundlingAdmin/BundlingTable";
import axios from "axios";
import DeleteBundling from "../../componentadmin/BundlingAdmin/DeleteBundling";

const BundlingAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [allBundlings, setAllBundlings] = useState([]);
  const [deleteBundling, setDeleteBundling] = useState({ show: false, bundling: null });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBundling = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/produk-bundlings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllBundlings(response.data.bundlings);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchBundling();
  }, [token]);

  const handleDeleteBundling = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/produk-bundlings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllBundlings(allBundlings.filter((bundling) => bundling.id !== id));
    } catch (error) {
      console.error("Error deleting bundling:", error);
    }
  };

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
      <div className={`content ${isSidebarOpen ? "content-open" : "content-closed"}`}>
        <div className="main-content">
          <Header />
          <div className="container-productadmin">
            <Link to="/admin/addbundlingadmin" className="next-page-product">
              <i class="fa-solid fa-plus me-2"></i>Create Bundling
            </Link>
          </div>
          <div className="container-tableproduct mt-2">
            <BundlingTable 
              products={allBundlings} 
              handleDeleteBundling={(bundling) => setDeleteBundling({ show: true, bundling })}
            />
          </div>

          {deleteBundling.show && (
            <DeleteBundling
              bundlingName={deleteBundling.bundling?.nama_bundle}
              onConfirm={() => {
                handleDeleteBundling(deleteBundling.bundling.id);
                setDeleteBundling({ show: false, bundling: null });
              }}
              onCancel={() => setDeleteBundling({ show: false, bundling: null })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BundlingAdmin;
