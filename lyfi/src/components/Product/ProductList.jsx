import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./../Loading/LoadingBlack"; // Impor komponen Loading

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading
  const token = localStorage.getItem("token");

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
        setAllProducts(response.data.data);

        // Set kategori dari produk
        const fetchedCategories = [
          "All",
          ...new Set(response.data.data.map((product) => product.kategori[0])),
        ];
        setCategories(fetchedCategories);
        setLoading(false); // Setelah data di-load, matikan loading
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Pastikan loading dimatikan jika ada error
      }
    };
    fetchProducts();
  }, [token]);

  const getShortName = (name) => {
    const words = name.split(" ");
    return words.length > 2 ? `${words.slice(0, 2).join(" ")}...` : name;
  };

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter(
          (product) => product.kategori[0] === selectedCategory
        );

  if (loading) {
    return <Loading />; // Tampilkan Loading saat masih dalam proses fetch data
  }

  return (
    <div className="container ">
      {/* Filter */}
      <div className="my-3 button-container d-flex justify-content-center">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`button-category ${
              selectedCategory === category ? "button-before" : "button-after"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="custom-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="custom-container-product">
            <img
              src={`http://127.0.0.1:8000/${product.foto_produk[0]}`}
              alt={product.nama_produk}
            />
            <div className="custom-card-body">
              <h3>{product.kategori[0]}</h3>
              <p className="nama-product">
                {getShortName(product?.nama_produk || "...", 2)}
              </p>
              <p>{product.harga_produk}</p>
            </div>
            <Link
              to={`/infoproduct/${product.id}`}
              className="custom-detail-produk"
            >
              <div className="custom-card-footer">Lihat Produk</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
