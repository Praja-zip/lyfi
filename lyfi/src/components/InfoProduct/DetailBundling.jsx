import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import tokped from "./../../assets/Bundling/tokped.png";
import shopee from "./../../assets/Bundling/shopee.png";

const DetailBundling = ({ bundling }) => {
  const productContainerRef = useRef(null);
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
        console.error("Gagal menyalin tautan: ", err);
      });
  };

  // Fungsi untuk scroll ke bawah
  const scrollDown = () => {
    if (productContainerRef.current) {
      productContainerRef.current.scrollBy({
        top: 150, // Sesuaikan dengan tinggi konten produk yang terlihat
        behavior: "smooth",
      });
    }
  };

  // Fungsi untuk scroll ke atas
  const scrollUp = () => {
    if (productContainerRef.current) {
      productContainerRef.current.scrollBy({
        top: -150, // Sesuaikan dengan tinggi konten produk yang terlihat
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="info-detail-bundling text-start">
      {/* Notifikasi */}
      {showNotification && (
        <div className="notification-popup">
          <p className="notification-message">{message}</p>
        </div>
      )}
      <div className="judul">
        <h1>{bundling.nama_bundle}</h1>
        <p>{bundling.detail_bundle}</p>
      </div>
      <div className="isi-product">
        <h3>Isi Produk :</h3>
        {bundling.products?.length > 0 ? (
          <div
            className="product-container hide-scrollbar"
            ref={productContainerRef}
            style={{
              maxHeight: "280px",
              overflowY: "scroll", // Aktifkan scroll vertikal
            }}
          >
            {bundling.products.map((product, index) => (
              <div key={index} className="isi-product-card d-flex mt-3">
                <img
                  src={
                    product.foto_produk?.length > 0
                      ? `http://127.0.0.1:8000/${product.foto_produk[0]}`
                      : "/fallback-image.png"
                  }
                  alt={product.nama_produk}
                />
                <div className="information-bundling">
                  <p className="product-name fw-semibold">
                    {product.nama_produk}
                  </p>
                  <p className="product-price">Rp.{product.harga}</p>
                  <Link
                    to={`/infoproduct/${product.id}`}
                    className="information-link mt-5"
                  >
                    Lihat Product
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Tidak ada produk yang tersedia dalam bundling ini.</p>
        )}

        {/* Tombol scroll */}
        <div className="scroll-buttons d-flex mt-3">
          <button onClick={scrollUp} className="scroll-up-button">
            <i className="fa-solid fa-arrow-up"></i>
          </button>
          <button onClick={scrollDown} className="scroll-down-button ms-4">
            <i className="fa-solid fa-arrow-down"></i>
          </button>
        </div>

        <hr />
        <div className="price-info mt-3 text-start">
          <p className="fs-3 fw-light">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(bundling?.harga_bundle || 0)}
          </p>
          <p className="fw-semibold text-secondary">Tersedia di</p>
          {bundling.redirect[0] && (
            <a
              href={bundling.redirect[0]}
              className="tokopedia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tokped} alt="Tokopedia" /> Tokopedia
            </a>
          )}
          {bundling.redirect[1] && (
            <a
              href={bundling.redirect[1]}
              className="ms-2 shopee"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={shopee} alt="Shopee" /> Shopee
            </a>
          )}
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
