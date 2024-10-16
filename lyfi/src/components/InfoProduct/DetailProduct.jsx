import React, { useState } from "react"; // Mengimpor useState
import tokped from "./../../assets/Bundling/tokped.png";
import shopee from "./../../assets/Bundling/shopee.png";

const DetailProduct = ({ product }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");

  const copyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setMessage("Tautan berhasil disalin");
        setShowNotification(true);
        // Menyembunyikan notifikasi setelah 2 detik
        setTimeout(() => {
          setShowNotification(false);
        }, 2000);
      })
      .catch((err) => {
        setMessage("Tautan gagal disalin");
        setShowNotification(true);
        // Menyembunyikan notifikasi setelah 2 detik
        setTimeout(() => {
          setShowNotification(false);
        }, 2000);
      });
  };

  return (
    <>
      <div className="info-detail-product">
        {showNotification && (
          <div className="notification-popup">
            <p className="notification-message">{message}</p>
          </div>
        )}
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
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(product?.harga_produk || 0)}
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
        <hr className="mt-5" />
        <p className="bagikan-produk">
          Bagikan Produk ini
          <span>
            <div className="button-container-sosmed d-flex">
              <button class="Btn-sharelink me-2" onClick={copyLink}>
                <div class="sign-sharelink">
                  <i class="fa-solid fa-share-nodes"></i>
                </div>

                <div class="text-sharelink">Salin Link</div>
              </button>
              <button class="Btn-instagram me-2">
                <div class="sign-instagram">
                  <i class="fa-brands fa-instagram"></i>
                </div>

                <div class="text-instagram">Kunjungi Kami</div>
              </button>
              <button class="Btn-Facebook">
                <div class="sign-Facebook">
                  <i class="fa-brands fa-whatsapp"></i>
                </div>

                <div class="text-Facebook">Kirim Pesan ke kami</div>
              </button>
            </div>
          </span>
        </p>
      </div>
    </>
  );
};

export default DetailProduct;
