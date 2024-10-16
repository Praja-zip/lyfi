import React, { useState, useEffect } from "react";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import Header from "../../componentadmin/ProductAdmin/Header";
import { Link, useNavigate } from "react-router-dom";
import foto from "./../../assets/LandingPage/about.png";
import ProductTable from "../../componentadmin/ProductAdmin/ProductTable";
import "./../../componentadmin/ProductAdmin/AddProduct.css";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import DeleteProducts from "../../componentadmin/ProductAdmin/DeleteProducts";
const ProductAdmin = () => {
<<<<<<< HEAD
=======
  
>>>>>>> 98c4d66a849d5a75922f2bee33dbb63d4aa75403
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [deleteComponent, setDeleteProducts] = useState({
    show: false,
    product: null,
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/master-products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Produk berhasil dihapus");
      setShowNotification(true);
      console.log("Product deleted:", response.data);
      setAllProducts(allProducts.filter((product) => product.id !== id));
    } catch (error) {
      if (error.status === 401){
        navigate('/login');
      }
      console.error("Error deleting product:", error);
      console.log("error nih", error.response.data.message);
      setMessage(error.response.data.message)
      setShowNotification(true);
    }
  };
  const [loading, setLoading] = useState(true);

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
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/master-products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setAllProducts(response.data.data);
      } catch (error) {
        if (error.status === 401){
          navigate('/login');
        }
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [token]);

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
                {showNotification && (
                    <div className="notification-popup">
                      <p className="notification-message">{message}</p>
                    </div>
                  )}

                <div className="container-productadmin d-flex">
                  <Link
                    to="/admin/addproductadmin"
                    className="next-page-product"
                    href=""
                  >
                    <i class="fa-solid fa-plus me-2"></i>Create Product
                  </Link>
                  <Link
                    to="/admin/addcategories"
                    className="next-page-product mx-3"
                  >
                    <i className="fa-solid fa-plus me-2"></i>Create Categories
                  </Link>
                  <Link
                    to="/admin/category"
                    href=""
                    className="next-page-product mx-3"
                  >
                    <i class="fa-solid fa-list me-2"></i>Lihat Daftar Kategori
                  </Link>
                </div>
                <div className="container-tableproduct mt-2">
                  <ProductTable
                    allProducts={allProducts}
                    handleDeleteProduct={(product) =>
                      setDeleteProducts({ show: true, product })
                    }
                  />
                </div>

                {deleteComponent.show && (
                  <DeleteProducts
                    productName={deleteComponent.product?.nama_produk}
                    onConfirm={() => {
                      handleDeleteProduct(deleteComponent.product.id);
                      setDeleteProducts({ show: false, product: null });
                    }}
                    onCancel={() =>
                      setDeleteProducts({ show: false, product: null })
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductAdmin;
