import React from "react";
import tokped from "./../../assets/Bundling/tokped.png";
import shopee from "./../../assets/Bundling/shopee.png";

const DetailProduct = () => {
  return (
    <>
      <div className="info-detail-product">
        <div className="judul-Info">
          <h1 className="text-start">Lyfi Product</h1>
          <p className="text-start">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consectetur totam a voluptatem quae quibusdam, minus, nam doloremque
            possimus numquam ipsam exercitationem provident deleniti iure nulla.
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
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Soluta, fugiat! Inventore quia, at velit quo aspernatur cum
                  labore rem exercitationem numquam voluptas perferendis itaque
                  nulla.
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
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Soluta, fugiat! Inventore quia, at velit quo aspernatur cum
                  labore rem exercitationem numquam voluptas perferendis itaque
                  nulla.
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
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Soluta, fugiat! Inventore quia, at velit quo aspernatur cum
                  labore rem exercitationem numquam voluptas perferendis itaque
                  nulla.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="price-info mt-5 text-start">
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
    </>
  );
};

export default DetailProduct;
