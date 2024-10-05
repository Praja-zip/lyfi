import React from "react";
import tokped from "./../../assets/Bundling/tokped.png";
import shopee from "./../../assets/Bundling/shopee.png";

const DetailProduct = ({ product }) => {
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
    <>
      <div className="info-detail-product">
        <div className="judul-Info">
          <h1 className="text-start">
            {product?.nama_produk || "Nama Produk Tidak Tersedia"}
          </h1>
          <p className="text-start">
            {product?.detail_produk || "Detail produk tidak tersedia"}
          </p>
        </div>
        <div className="accordion" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Detail Produk
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
            >
              <div className="accordion-body">
                <p className="text-start">
                  {product?.detail_produk || "Tidak ada detail produk"}
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Ingredients
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                <p className="text-start">
                  {product?.bahan_produk || "Bahan produk tidak tersedia"}
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseThree"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseThree"
              >
                Cara Pemakaian
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseThree"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                <p className="text-start">
                  {product?.cara_pemakaian || "Cara pemakaian tidak tersedia"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="price-info mt-5 text-start">
          <p className="fs-3 fw-light">
            {" "}
            {product?.harga_produk
              ? new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(product.harga_produk)
              : "0"}
          </p>
          <p className="fw-semibold text-secondary">Tersedia di</p>
          <div className="checkout-product">
            {product.redirect && product.redirect[0] && (
              <a href={product.redirect[0]} className="tokopedia">
                <img src={tokped} alt="Tokopedia" /> Tokopedia
              </a>
            )}
            {product.redirect && product.redirect[1] && (
              <a href={product.redirect[1]} className="ms-2 shopee">
                <img src={shopee} alt="Shopee" /> Shopee
              </a>
            )}
          </div>
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
    </>
  );
};

export default DetailProduct;
