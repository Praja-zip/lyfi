import React, { useState, useEffect } from "react";
import Sidebar from "./../../componentadmin/sidebar";
import Header from "../../componentadmin/ProductAdmin/Header";
import { Link, useNavigate } from "react-router-dom";
import BundlingTable from "../../componentadmin/BundlingAdmin/BundlingTable";
import axios from "axios";
import DeleteBundling from "../../componentadmin/BundlingAdmin/DeleteBundling";

const BundlingAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [allBundlings, setAllBundlings] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteBundling, setDeleteBundling] = useState({
    show: false,
    bundling: null,
  });
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBundling = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/produk-bundlings",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAllBundlings(response.data.bundlings);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        if (error.status === 401){
          navigate('/login');
        }
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchBundling();
  }, [token]);

  const handleDeleteBundling = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/produk-bundlings/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Bundling berhasil dihapus");
      setShowNotification(true);
      console.log("Product deleted:", response.data);
      setAllBundlings(allBundlings.filter((bundling) => bundling.id !== id));
    } catch (error) {
      if (error.status === 401){
        navigate('/login');
      }
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
      <div
        className={`content ${
          isSidebarOpen ? "content-open" : "content-closed"
        }`}
      >
        <div className="main-content">
          <Header />
          {showNotification && (
            <div className="notification-popup">
              <p className="notification-message">{message}</p>
            </div>
          )}
          
          <div className="container-productadmin">
            <Link to="/admin/addbundlingadmin" className="next-page-product">
              <i class="fa-solid fa-plus me-2"></i>Create Bundling
            </Link>
          </div>
          <div className="container-tableproduct mt-2">
            <BundlingTable
              loading={loading}
              products={allBundlings}
              handleDeleteBundling={(bundling) =>
                setDeleteBundling({ show: true, bundling })
              }
            />
          </div>

          {deleteBundling.show && (
            <DeleteBundling
              bundlingName={deleteBundling.bundling?.nama_bundle}
              onConfirm={() => {
                handleDeleteBundling(deleteBundling.bundling.id);
                setDeleteBundling({ show: false, bundling: null });
              }}
              onCancel={() =>
                setDeleteBundling({ show: false, bundling: null })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BundlingAdmin;
