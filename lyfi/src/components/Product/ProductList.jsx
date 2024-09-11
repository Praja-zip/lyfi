import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./../../assets/LandingPage/produk.png";
import logo2 from "./../../assets/LandingPage/about.png";
import logo3 from "./../../assets/LandingPage/girl.png";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Scarlett Whitening Facial Wash",
    price: "Rp 100.000,-",
    category: "Face Wash",
    image: logo,
  },
  {
    id: 2,
    name: "Scarlett Whitening Toner",
    price: "Rp 110.000,-",
    category: "Toner",
    image: logo3,
  },
  {
    id: 3,
    name: "Scarlett Whitening Serum",
    price: "Rp 120.000,-",
    category: "Serum",
    image: logo,
  },
  {
    id: 5,
    name: "Scarlett Whitening Serum",
    price: "Rp 120.000,-",
    category: "Serum",
    image: logo2,
  },
  {
    id: 4,
    name: "Scarlett Whitening Lip Balm",
    price: "Rp 120.000,-",
    category: "Lip Balm",
    image: logo,
  },
  // Tambahkan produk lainnya sesuai kebutuhan
];

const categories = [
  "All",
  ...new Set(products.map((product) => product.category)),
];

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getShortName = (name) => {
    const words = name.split(" ");
    return words.length > 2 ? `${words.slice(0, 2).join(" ")}...` : name;
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container ">
      {/* Filter */}
      <div className="my-3 button-container">
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
            <img src={product.image} alt={product.name} />
            <div className="custom-card-body">
              <h3>{product.category}</h3>
              <p className="nama-product">{getShortName(product.name)}</p>
              <p>{product.price}</p>
            </div>
            <Link to={"/InfoProduct"} className="custom-detail-produk">
              <div className="custom-card-footer">Lihat Produk</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
