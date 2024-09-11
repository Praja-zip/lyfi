import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./../../assets/LandingPage/produk.png";
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
    image: logo,
  },
  {
    id: 3,
    name: "Scarlett Whitening Serum",
    price: "Rp 120.000,-",
    category: "Serum",
    image: logo,
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

const ProductList = () => {
  const getShortName = (name) => {
    const words = name.split(" ");
    return words.length > 2 ? `${words.slice(0, 2).join(" ")}...` : name;
  };

  return (
    <div className="custom-grid">
      {products.map((product) => (
        <div key={product.id} className="custom-container-product">
          <img src={product.image} alt={product.name} />
          <div className="custom-card-body">
            <h3>{product.category}</h3>
            <p className="nama-product">{getShortName(product.name)}</p>
            <p>{product.price}</p>
          </div>
          <Link to="/InfoBundling" className="custom-detail-produk" href="">
            <div className="custom-card-footer">Lihat Produk</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
