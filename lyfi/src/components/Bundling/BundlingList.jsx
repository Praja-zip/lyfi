import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./../../assets/LandingPage/produk.png";
import { Link } from "react-router-dom";
import axios from "axios";

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
  const [bundling, setBundling] = useState([]);

  useEffect(() => {
    const fetchBundling = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/produk-bundlings", {
        });
        setBundling(response.data.bundlings);
        console.log(response.data.bundlings);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchBundling();
  }, []);

  return (
    <div className="custom-grid">
      {bundling.map((bundle) => (
        <div key={bundle.id} className="custom-container-product">
          <img src={`http://127.0.0.1:8000/${bundle.foto_bundle[0]}`} alt={bundle.nama_bundle} />
          <div className="custom-card-body">
            <h3>{bundle.nama_bundle}</h3>
            <p className="nama-product">{getShortName(bundle.nama_bundle)}</p>
            <p>{bundle.harga_bundle}</p>
          </div>
          <Link to={`/infobundling/${bundle.id}`} className="custom-detail-produk" href="">
            <div className="custom-card-footer">Lihat Produk</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
