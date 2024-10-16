import React, { useState, useEffect } from "react";
import Sidebar from "./../../componentadmin/sidebar";
import AddBundling from "../../componentadmin/BundlingAdmin/AddBundling";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBundlingAdmin = () => {
  const token = localStorage.getItem("token");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [namaBundle, setNamaBundle] = useState("");
  const [hargaBundle, setHargaBundle] = useState("");
  const [detailBundle, setDetailBundle] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [produk, setProduk] = useState([]);
  const [redirect, setRedirect] = useState([]);
  const [tokopediaLink, setTokopediaLink] = useState("");
  const [shopeeLink, setShopeeLink] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleProdukChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setProduk([...produk, value]);
    } else {
      setProduk(produk.filter((item) => item !== value));
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert file list to array
    setSelectedFiles(prevFiles => [...prevFiles, ...files]); // Append new files
};

  const handleRedirectChange = (e) => {
    const value = e.target.value;
    setRedirect(value.split(",")); // Assuming user inputs comma-separated values
  };

  const uploadBundling = async () => {
    const formData = new FormData();
    formData.append("nama_bundle", namaBundle);
    formData.append("harga_bundle", hargaBundle);
    formData.append("detail_bundle", detailBundle);
    selectedFiles.forEach((file, index) => {
      formData.append(`foto_bundle[]`, file); // Notice the `[]` to indicate an array
  });

    formData.append("redirect[0]", tokopediaLink);
    formData.append("redirect[1]", shopeeLink);
    
    produk.forEach((prod, index) => {
      formData.append(`pilih_produk[${index}]`, prod);
    });

    console.log([...formData]);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/produk-bundlings",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Bundling created:", response.data);
      navigate("/admin/bundlingadmin");
      
      // Reset form after success
      setNamaBundle("");
      setHargaBundle("");
      setDetailBundle("");
      setFoto(null);
      setFotoPreview(null);
      setProduk([]);
      setRedirect([]);
      
    } catch (error) {
      if (error.status === 401){
        navigate('/login');
      }
      console.error("Error creating bundling:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadBundling();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/master-products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [token]);

  return (
    <div className="dashboardadmin">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <div className={`content ${isSidebarOpen ? "content-open" : "content-closed"}`}>
        <div className="main-content">
          <AddBundling
            handleSubmit={handleSubmit}
            produk={produk}
            setProduk={setProduk}
            namaBundle={namaBundle}
            hargaBundle={hargaBundle}
            detailBundle={detailBundle}
            allProducts={allProduct}
            handleFotoChange={handleFotoChange}
            fotoPreview={fotoPreview}
            handleProdukChange={handleProdukChange}
            setNamaBundle={setNamaBundle}
            setDetailBundle={setDetailBundle}
            setHargaBundle={setHargaBundle}
            handleRedirectChange={handleRedirectChange} 
            setTokopediaLink={ setTokopediaLink }
            setShopeeLink={ setShopeeLink }
            shopeeLink={ shopeeLink }
            tokopediaLink={ tokopediaLink }
            setSelectedFiles={ setSelectedFiles }
            selectedFiles={ selectedFiles }
          />
        </div>
      </div>
    </div>
  );
};

export default AddBundlingAdmin;
