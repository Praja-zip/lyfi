import React from "react";
import Product from "../../assets/LandingPage/produk.png";
import { Link } from "react-router-dom";
import tokped from "./../../assets/Bundling/tokped.png";
import shopee from "./../../assets/Bundling/shopee.png";

const DetailBundling = () => {
  return (
    <>
      <div className="info-detail-bundling text-start">
        <div className="judul">
          <h1>Konoha Bundling</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            repellat nam autem, provident cum molestiae omnis quod minus
            inventore animi, fugiat tempore ducimus qui impedit.
          </p>
        </div>
        <div className="isi-product">
          <h3>Isi Produk :</h3>
          <div className="isi-product-card d-flex mt-3">
            <img src={Product} alt="" />
            <div className="information-bundling">
              <p className="product-name fw-semibold">Nama Product</p>
              <p className="product-price">Rp.999.999</p>
              <Link className="information-link mt-5" href="">
                Lihat Product<i class="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
          <div className="isi-product-card d-flex mt-3">
            <img src={Product} alt="" />
            <div className="information-bundling">
              <p className="product-name fw-semibold">Nama Product</p>
              <p className="product-price">Rp.999.999</p>
              <Link className="information-link mt-5" href="">
                Lihat Product<i class="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
          <hr />
          <div className="price-info mt-3 text-start">
            <p className="fs-3 fw-light">Rp.999.999</p>
            <p className="fw-semibold text-secondary">Tersedia di</p>
            <div className="checkout-product">
              <a href="" className="tokopedia">
                <img src={tokped} alt="" /> Tokopedia
              </a>
              <a href="" className="ms-2 shopee">
                <img src={shopee} alt="" /> Shopee
              </a>
            </div>
          </div>
          <hr className="mt-5" />
          <p class="bagikan-produk">
            Bagikan Produk ini
            <span>
              <i class="fa-brands fa-instagram me-3"></i>
              <i class="fa-brands fa-whatsapp "></i>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
export default DetailBundling;
