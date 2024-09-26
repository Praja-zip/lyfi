import React, { useState, useEffect } from "react";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import EditProducts from "../../componentadmin/ProductAdmin/EditProducts";
import "./../../componentadmin/ProductAdmin/AddProduct.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  console.log("params", id)

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 786);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [product, setProduct] = useState({
    nama_produk: "",
    harga_produk: "",
    detail_produk: "",
    bahan_produk: "",
    cara_pemakaian: "",
    kategori: "", // Updated to a single category
    redirect: "",
  });

  const [foto_produk, setFotoProduk] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch product and categories data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/master-products/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data.data)
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

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

    fetchProduct();
    fetchCategories();
  }, [id, token]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert file list to array
    setSelectedFiles(prevFiles => [...prevFiles, ...files]); // Append new files
};
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleCategoryChange = (selectedCategory) => {
    setProduct((prev) => ({ ...prev, kategori: selectedCategory.value }));
  };

  const uploadProduct = async ( ) => {
    console.log("submit");
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('nama_produk', product.nama_produk);
    formData.append('harga_produk', product.harga_produk);
    formData.append('detail_produk', product.detail_produk);
    formData.append('bahan_produk', product.bahan_produk);
    formData.append('cara_pemakaian', product.cara_pemakaian);
    formData.append('kategori', product.kategori); // Jika tidak berupa array
    formData.append('redirect', product.redirect);

    selectedFiles.forEach((file, index) => {
      formData.append(`foto_produk[]`, file); // Notice the `[]` to indicate an array
  });

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
  }


    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/master-products/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data'
        }
      });
        console.log(response.data);
        navigate('/admin/productadmin');
    } catch (error) {
        console.error("Error updating product:", error.response.data);
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
          <EditProducts
            product={product}
            allCategories={allCategories}
            handleInputChange={handleInputChange}
            handleCategoryChange={handleCategoryChange}
            handleFileChange={handleFileChange}
            handleSubmit={uploadProduct}
            setSelectedFiles={ setSelectedFiles }
            selectedFiles={ selectedFiles }
          />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
