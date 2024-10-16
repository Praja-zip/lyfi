import React, { useState, useEffect } from "react";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import AddProduct from "./../../componentadmin/ProductAdmin/AddProduct";
import "./../../componentadmin/ProductAdmin/AddProduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Ensure you have this for navigation

const AddProductAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 786) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const [nama_produk, setNamaProduk] = useState("");
  const [harga_produk, setHargaProduk] = useState("");
  const [detail_produk, setDetailProduk] = useState("");
  const [bahan_produk, setBahanProduk] = useState("");
  const [cara_pemakaian, setCaraPemakaian] = useState("");
  const [redirect, setRedirect] = useState("");
  const [foto_produk, setFotoProduk] = useState(null);
  const [kategori, setKategori] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const token = localStorage.getItem("token");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
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
    fetchCategories();
  }, [token]);
  
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setKategori([...kategori, value]);
    } else {
      setKategori(kategori.filter((item) => item !== value));
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert file list to array
    setSelectedFiles(prevFiles => [...prevFiles, ...files]); // Append new files
};

  const uploadProduct = async () => {
    const formData = new FormData();
    formData.append("nama_produk", nama_produk);
    formData.append("harga_produk", harga_produk);
    formData.append("detail_produk", detail_produk);
    formData.append("bahan_produk", bahan_produk);
    formData.append("cara_pemakaian", cara_pemakaian);
    formData.append("redirect", redirect);
    formData.append("kategori", selectedCategory ? selectedCategory.value : "");


    selectedFiles.forEach((file, index) => {
      formData.append(`foto_produk[]`, file); // Notice the `[]` to indicate an array
  });;

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/master-products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        console.log(response);
        setTimeout(() => {
          navigate("/admin/productadmin");
        }, 500);
      }
    } catch (error) {
      if (error.status === 401){
        navigate('/login');
      }

      if (error.response) {
        console.log("Error Response:", error.response.data);
        console.log("Status:", error.response.status);
      } else {
        console.error("Error uploading product!", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();
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
          <AddProduct
            nama_produk={nama_produk}
            harga_produk={harga_produk}
            detail_produk={detail_produk}
            bahan_produk={bahan_produk}
            cara_pemakaian={cara_pemakaian}
            redirect={redirect}
            kategori={kategori}
            allCategories={allCategories}
            handleInputChange={{
              setNamaProduk,
              setHargaProduk,
              setDetailProduk,
              setBahanProduk,
              setCaraPemakaian,
              setRedirect,
            }}
            handleCheckboxChange={handleCheckboxChange}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            selectedFiles={ selectedFiles }
            setSelectedFiles={ setSelectedFiles }
            setSelectedCategory={ setSelectedCategory }
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductAdmin;
