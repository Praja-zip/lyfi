import React from "react";
import Product from "../../assets/LandingPage/produk.png";
import { Link } from "react-router-dom";
import tokped from "./../../assets/Bundling/tokped.png";
import shopee from "./../../assets/Bundling/shopee.png";

const DetailBundling = ({ bundling }) => {
  const copyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Tautan telah disalin ke clipboard!");
      })
      .catch((err) => {
        console.error("Gagal menyalin tautan: ", err);
      });
  };

  return (
    <div className="info-detail-bundling text-start">
      <div className="judul">
        <h1>{bundling.nama_bundle}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          repellat nam autem, provident cum molestiae omnis quod minus
          inventore animi, fugiat tempore ducimus qui impedit.
        </p>
      </div>
      <div className="isi-product">
        <h3>Isi Produk :</h3>
        <div className="isi-product-card d-flex mt-3">
          <img src={Product} alt="Product" />
          <div className="information-bundling">
            <p className="product-name fw-semibold">{bundling.nama_bundle}</p>
            <p className="product-price">Rp.{bundling.harga_bundle}</p>
            <Link to={`/infoproduct/${bundling.id}`} className="information-link mt-5">
              Lihat Product<i className="fa-solid fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
        <hr />
        <div className="price-info mt-3 text-start">
          <p className="fs-3 fw-light">Rp.{bundling.harga_bundle}</p>
          <p className="fw-semibold text-secondary">Tersedia di</p>
          <div className="checkout-product">
            <a href={bundling.redirect[0]} className="tokopedia" target="_blank" rel="noopener noreferrer">
              <img src={tokped} alt="Tokopedia" /> Tokopedia
            </a>
            <a href={bundling.redirect[1]} className="ms-2 shopee" target="_blank" rel="noopener noreferrer">
              <img src={shopee} alt="Shopee" /> Shopee
            </a>
          </div>
        </div>
        <hr className="mt-5" />
        <p className="bagikan-produk">
          Bagikan Produk ini
          <span>
            <i
              className="fa-solid fa-share-nodes me-3"
              onClick={copyLink}
              style={{ cursor: "pointer" }}
            ></i>
            <i className="fa-brands fa-instagram me-3"></i>
            <i className="fa-brands fa-whatsapp"></i>
          </span>
        </p>
      </div>
    </div>
  );
};

export default DetailBundling;
