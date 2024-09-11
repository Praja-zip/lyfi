import React, { useRef } from "react";
import logo from "./../../assets/LandingPage/produk.png";
import logo2 from "./../../assets/LandingPage/about.png";
import logo3 from "./../../assets/LandingPage/girl.png";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    category: "Skincare",
    price: "Rp.100.000,00",
    name: "Scarlet Whitening Facial Wash",
    image: logo,
  },
  {
    id: 2,
    category: "Skincare",
    price: "Rp.100.000,00",
    name: "Scarlet Whitening Facial Wash",
    image: logo2,
  },
  {
    id: 3,
    category: "Skincare",
    price: "Rp.100.000,00",
    name: "Scarlet Whitening",
    image: logo3,
  },
  {
    id: 4,
    category: "Skincare",
    price: "Rp.100.000,00",
    name: "Scarlet Whitening",
    image: logo2,
  },
  {
    id: 5,
    category: "Skincare",
    price: "Rp.100.000,00",
    name: "Scarlet Whitening",
    image: logo,
  },
];

const Product = () => {
  const containerRef = useRef(null);

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
          {products.map((product, index) => (
            <div
              key={index}
              className="product-card mx-2 border flex-shrink-0"
              style={{ width: "18rem", margin: "0 1rem" }} // Adjust margin to ensure space around each card
            >
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body mt-2">
                <h5 className="text-muted fw-semibold">
                  {truncateText(product.category, 2)}
                </h5>
                <p className="card-title fs-5">{truncateText(product.name, 2)}</p>
                <p className="card-text mt-4">
                  {truncateText(product.price, 2)}
                </p>
              </div>
              <Link to={"/InfoProduct"} className="custom-detail-produk">
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
