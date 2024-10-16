import React, { useState, useEffect } from "react";
import "./../../componentadmin/Admin.css";
import Sidebar from "./../../componentadmin/sidebar";
import EditProducts from "../../componentadmin/ProductAdmin/EditProducts";
import "./../../componentadmin/ProductAdmin/AddProduct.css";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [product, setProduct] = useState({
    nama_produk: "",
    harga_produk: "",
    detail_produk: "",
    bahan_produk: "",
    cara_pemakaian: "",
    redirect: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [foto_produk, setFotoProduk] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const token = localStorage.getItem("token");
  const [fotoProductFromServer, setFotoProductFromServer] = useState([]);
  const [loading, setLoading] = useState(true); // Tetap loading sampai data produk berhasil didapat

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
        const productData = response.data.data;
        setProduct(productData);
        setFotoProductFromServer(productData.foto_produk);
        setSelectedCategory({
          value: productData.kategori[0].id, // Asumsi kategori adalah array
          label: productData.kategori[0].nama_kategori,
        });
        console.log(response.data.data);
        setLoading(false); // Set loading ke false setelah data produk berhasil diambil
      } catch (error) {

        if (error.status === 401 || error.message === "Unauthorized"){
          navigate('/login');
        }
        console.error("Error fetching product:", error);
        setLoading(false); // Nonaktifkan loading meskipun ada error
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/kategoris",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAllCategories(response.data.kategoris);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Konversi file list ke array
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]); // Tambahkan file baru ke file yang sudah ada
    setFotoProduk((prevFiles) => [...prevFiles, ...files]); // Simpan foto produk
  };

  const handleCategoryChange = (selectedCategory) => {
    setProduct((prev) => ({ ...prev, kategori: selectedCategory.value }));
  };

  const uploadProduct = async () => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("nama_produk", product.nama_produk);
    formData.append("harga_produk", product.harga_produk);
    formData.append("detail_produk", product.detail_produk);
    formData.append("bahan_produk", product.bahan_produk);
    formData.append("cara_pemakaian", product.cara_pemakaian);
    formData.append("kategori", selectedCategory ? selectedCategory.value : "");
    formData.append("redirect", product.redirect);

    selectedFiles.forEach((file) => {
      formData.append(`foto_produk[]`, file); // Lampirkan foto produk
    });

    fotoProductFromServer.forEach((foto, index) => {
      formData.append(`existing_foto_bundle[]`, foto); // Nama file/URL foto yang sudah ada
    });

    console.log([...formData]);

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/master-products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/admin/productadmin");
    } catch (error) {
      if (error.status === 401 || error.message === "Unauthorized"){
        navigate('/login');
      }
      console.error("Error updating product:", error.response.data);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
              <EditProducts
                product={product}
                allCategories={allCategories}
                handleInputChange={handleInputChange}
                handleCategoryChange={handleCategoryChange}
                handleFileChange={handleFileChange}
                handleSubmit={uploadProduct}
                setSelectedFiles={setSelectedFiles}
                selectedFiles={selectedFiles}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={ selectedCategory } 
                setFotoProductFromServer={ setFotoProductFromServer }
                fotoProductFromServer={ fotoProductFromServer }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProduct;
