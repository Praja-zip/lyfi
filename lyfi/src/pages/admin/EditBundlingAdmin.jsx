import React, { useState, useEffect } from "react";
import Sidebar from "../../componentadmin/sidebar";
import EditBundling from "../../componentadmin/BundlingAdmin/EditBundling";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";


const EditBundlingAdmin = () => {
  const token = localStorage.getItem("token");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [namaBundle, setNamaBundle] = useState("");
  const [hargaBundle, setHargaBundle] = useState("");
  const [detailBundle, setDetailBundle] = useState("");
  const [fotoPreview, setFotoPreview] = useState([]);
  const [produk, setProduk] = useState([]);
  const [tokopediaLink, setTokopediaLink] = useState("");
  const [shopeeLink, setShopeeLink] = useState("");
  const [fotoBundle, setFotoBundle] = useState([]);

  
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Konversi file list ke array
    setFotoPreview((prevFiles) => [...prevFiles, ...files]); // Append file baru ke file yang sudah ada
  };

  const handleProdukChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setProduk([...produk, value]);
    } else {
      setProduk(produk.filter((item) => item !== value));
    }
  };

  const uploadBundling = async () => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("nama_bundle", namaBundle);
    formData.append("harga_bundle", hargaBundle);
    formData.append("detail_bundle", detailBundle);
    formData.append("redirect[0]", tokopediaLink);
    formData.append("redirect[1]", shopeeLink);

    fotoPreview.forEach((file, index) => {
      formData.append(`foto_bundle[]`, file); // Lampirkan file baru dari device
    });
  
    // Kirimkan nama atau URL dari foto yang sudah ada di server, tanpa mengupload ulang
    fotoBundle.forEach((foto, index) => {
      formData.append(`existing_foto_bundle[]`, foto); // Nama file/URL foto yang sudah ada
    });

    produk.forEach((prod, index) => {
      formData.append(`pilih_produk[${index}]`, prod);
    });

    console.log([...formData]);
    console.log(tokopediaLink)

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/produk-bundlings/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Bundling updated:", response.data);
      // Redirect to the bundling list after success
      navigate("/admin/bundlingadmin");
    } catch (error) {
      console.error("Error updating bundling:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        console.error("No token available");
        return;
      }
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/master-products",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAllProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchBundling = async () => {
      if (!token) {
        console.error("No token available");
        return;
      }
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/produk-bundlings/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const bundlingData = response.data.bundling;
        console.log(response.data.bundling)
        setNamaBundle(bundlingData.nama_bundle);
        setHargaBundle(bundlingData.harga_bundle);
        setDetailBundle(bundlingData.detail_bundle);

        const productIds = bundlingData.products.map((prod) => String(prod.id));
        setProduk(productIds);
        
        // const selected = allProduct.filter((product) =>
        //   productIds.includes(String(product.id))
        // );
        // setSelectedProducts(productIds);

        setFotoBundle(bundlingData.foto_bundle);

        setTokopediaLink(bundlingData.redirect[0]);
        setShopeeLink(bundlingData.redirect[1]);
        setLoading(false); // Set loading ke false setelah data bundling berhasil diambil
      } catch (error) {
        console.error("Error fetching bundling:", error);
        setLoading(false); // Set loading ke false jika terjadi error
      }
    };

    fetchBundling();
    fetchProducts();
  }, [id, token]);

  return (
    <>
      {loading ? (
        <Loading /> // Tampilkan loading ketika data masih diambil
      ) : (
        <div className="dashboardadmin">
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          />
          <div
            className={`content ${
              isSidebarOpen ? "content-open" : "content-closed"
            }`}
          >
            <div className="main-content">
              <EditBundling
                handleSubmit={uploadBundling}
                produk={produk}
                setProduk={setProduk}
                namaBundle={namaBundle}
                hargaBundle={hargaBundle}
                detailBundle={detailBundle}
                allProducts={allProduct}
                handleFotoChange={handleFileChange}
                fotoPreview={fotoPreview}
                handleProdukChange={handleProdukChange}
                setNamaBundle={setNamaBundle}
                setDetailBundle={setDetailBundle}
                setHargaBundle={setHargaBundle}
                setTokopediaLink={setTokopediaLink}
                setShopeeLink={setShopeeLink}
                shopeeLink={shopeeLink}
                tokopediaLink={tokopediaLink}
                setFotoPreview={setFotoPreview}
                fotoBundle={fotoBundle}
                setFotoBundle={setFotoBundle}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBundlingAdmin;
