import React, { useState, useEffect } from "react";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import Header from "../../componentadmin/ProductAdmin/Header";
import { Link } from "react-router-dom";
import foto from "./../../assets/LandingPage/about.png";
import ProductTable from "../../componentadmin/ProductAdmin/ProductTable";
import "./../../componentadmin/ProductAdmin/AddProduct.css";
import axios from "axios";
import DeleteProducts from "../../componentadmin/ProductAdmin/DeleteProducts";



const ProductAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const token = localStorage.getItem("token");
  const [deleteComponent, setDeleteProducts] = useState({ show: false, product: null });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/master-products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Product deleted:", response.data);
      setAllProducts(allProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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

          <div className="container-productadmin d-flex">
            <Link
              to="/admin/addproductadmin"
              className="next-page-product"
              href=""
            >
              <i class="fa-solid fa-plus me-2"></i>Create Product

            </Link>
            <Link to="/admin/addcategories" className="next-page-product mx-3">
              <i className="fa-solid fa-plus me-2"></i>Create Categories
            </Link>
            <Link
              to="/admin/category"
              href=""
              className="next-page-product mx-3"
            >
              <i class="fa-solid fa-plus me-2"></i>Lihat Daftar Kategori
            </Link>
          </div>
          <div className="container-tableproduct mt-2">
            <ProductTable allProducts={allProducts}  
            handleDeleteProduct={(product) => setDeleteProducts({ show: true, product })}
            />
          </div>

          {deleteComponent.show && (
            <DeleteProducts
              productName={deleteComponent.product?.nama_produk}
              onConfirm={() => {
                handleDeleteProduct(deleteComponent.product.id);
                setDeleteProducts({ show: false, product: null });
              }}
              onCancel={() => setDeleteProducts({ show: false, product: null })}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;
