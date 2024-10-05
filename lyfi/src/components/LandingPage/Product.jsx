import React, { useRef, useEffect, useState } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const containerRef = useRef(null);
  const [allProducts, setAllProducts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/master-products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error.response ? error.response.data.message : error.message);
      }
    };
    fetchProduk();
  }, [token]);

  console.log(allProducts);
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -containerRef.current.clientWidth / 4,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.clientWidth / 4,
        behavior: "smooth",
      });
    }
  };

  const truncateText = (text, numWords) => {
    const words = text.split(" ");
    if (words.length > numWords) {
      return words.slice(0, numWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <div>
      <h1 className="container-product-title mt-5" style={{ color: "#B09E7C" }}>
        Our Product
      </h1>
      <div className="d-flex justify-content-center align-items-center">
        <button className="me-3" onClick={scrollLeft}>
          <i
            className="fa-solid fa-chevron-left"
            style={{
              color: "#B1A182",
            }}
          ></i>
        </button>
        <div
          className="container-product d-flex justify-content-start"
          style={{
            overflowX: "auto",
            scrollBehavior: "smooth",
            width: "70%", // Adjust this to your container width for 4 blocks
            padding: "0 2rem", // Increase padding to ensure no card is cut off
            position: "relative",
          }}
          ref={containerRef}
        >
          {allProducts.map((product, index) => (
            <div
              key={index}
              className="product-card mx-2 border flex-shrink-0"
              style={{ width: "18rem", margin: "0 1rem" }} // Adjust margin to ensure space around each card
            >
              <img
                src={`http://127.0.0.1:8000/${product.foto_produk[0]}`}
                className="card-img-top"
                alt={product.nama_produk}
              />
              <div className="card-body mt-2">
                <h5 className="text-muted fw-semibold">
                  {truncateText(product?.kategori[0] || "Kategori Tidak Ditemukan", 2)}
                </h5>
                <p className="card-title fs-5">{truncateText(product.nama_produk, 2)}</p>
                <p className="card-text mt-4">
                  {product.harga_produk}
                </p>
              </div>
              <Link to={`/infoproduct/${product.id}`} className="custom-detail-produk">
                <div className="custom-card-footer">Lihat Produk</div>
              </Link>
            </div>
          ))}
        </div>
        <button className="ms-3" onClick={scrollRight}>
          <i
            className="fa-solid fa-chevron-right"
            style={{
              color: "#B1A182",
            }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Product;
