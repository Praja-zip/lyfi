import React, { useState, useRef } from "react";
import foto from "./../../assets/LandingPage/Productcategory.png";
import logo2 from "./../../assets/LandingPage/about.png";
import logo3 from "./../../assets/LandingPage/girl.png";
import "./LandingPage.css";

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleCategoryClick = (event, index) => {
    event.preventDefault();
    setActiveIndex(index);
    if (carouselRef.current) {
      const carouselElement = carouselRef.current;
      const bsCarousel = new window.bootstrap.Carousel(carouselElement);
      bsCarousel.to(index);
    }
  };

  return (
    <div className="container-categories text-center">
      <div className="row flex-column flex-md-row align-items-stretch">
        <div className="col-12 col-md-4 main p-4">
          <h3 className="text-center text-md-left">Top Categories</h3>
          <ul className="d-flex flex-md-column justify-space-between align-items-center p-0">
            <li className="w-100 mb-4">
              <a
                href="#"
                className="d-flex align-items-center justify-content-start justify-content-md-center"
                onClick={(event) => handleCategoryClick(event, 0)}
              >
                <i className="fa-regular fa-face-smile"></i>
                <span className="d-none d-md-block">Facewash</span>
              </a>
            </li>
            <li className="w-100 mb-4">
              <a
                href="#"
                className="d-flex align-items-center justify-content-start justify-content-md-center"
                onClick={(event) => handleCategoryClick(event, 1)}
              >
                <i className="fa-solid fa-droplet"></i>
                <span className="d-none d-md-block">Toner</span>
              </a>
            </li>
            <li className="w-100 mb-4">
              <a
                href="#"
                className="d-flex align-items-center justify-content-start justify-content-md-center"
                onClick={(event) => handleCategoryClick(event, 2)}
              >
                <i className="fa-solid fa-bottle-droplet"></i>
                <span className="d-none d-md-block">Serum</span>
              </a>
            </li>
            <li className="w-100 mb-4">
              <a
                href="#"
                className="d-flex align-items-center justify-content-start justify-content-md-center"
                onClick={(event) => handleCategoryClick(event, 3)}
              >
                <i className="fa-regular fa-sun"></i>
                <span className="d-none d-md-block">Sunscreen</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="col-12 col-md-8 detail d-flex align-items-center">
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide"
            data-bs-ride="carousel"
            ref={carouselRef}
          >
            <div className="carousel-inner">
              <div
                className={`carousel-item  ${
                  activeIndex === 0 ? "active" : ""
                }`}
              >
                <div className="container text-center">
                  <div className="row">
                    <div className="col-12 col-md-6 mb-4 mb-md-0">
                      <img src={foto} alt="Face Wash" className="img-fluid w-25" />
                    </div>
                    <div className="col-12 col-md-6">
                      <p className="fs-4 text-start">Face Wash</p>
                      <h3 className="text-start fw-semibold text-light">
                        Lyfi Face Wash 100ml
                      </h3>
                      <p className="text-start">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Odio, voluptatibus at exercitationem temporibus
                        suscipit cumque natus maxime modi! Velit maxime
                        dignissimos provident nostrum eius earum.
                      </p>
                      <a href="#">
                        <em>Baca Selengkapnya</em>
                        <i className="fa-solid fa-arrow-right ms-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`carousel-item ${activeIndex === 1 ? "active" : ""}`}
              >
                <div className="container text-center">
                  <div className="row">
                    <div className="col-12 col-md-6 mb-4 mb-md-0">
                      <img src={logo2} alt="Toner" className="img-fluid" />
                    </div>
                    <div className="col-12 col-md-6">
                      <p className="fs-4 text-start">Toner</p>
                      <h3 className="text-start fw-semibold text-light">
                        Toner type A
                      </h3>
                      <p className="text-start">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Odio, voluptatibus at exercitationem temporibus
                        suscipit cumque natus maxime modi! Velit maxime
                        dignissimos provident nostrum eius earum.
                      </p>
                      <a href="#">
                        <em>Baca Selengkapnya</em>
                        <i className="fa-solid fa-arrow-right ms-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`carousel-item ${activeIndex === 2 ? "active" : ""}`}
              >
                <div className="container text-center">
                  <div className="row">
                    <div className="col-12 col-md-6 mb-4 mb-md-0">
                      <img src={foto} alt="Serum" className="img-fluid" />
                    </div>
                    <div className="col-12 col-md-6">
                      <p className="fs-4 text-start">Serum</p>
                      <h3 className="text-start fw-semibold text-light">
                        Serum tipe A
                      </h3>
                      <p className="text-start">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Odio, voluptatibus at exercitationem temporibus
                        suscipit cumque natus maxime modi! Velit maxime
                        dignissimos provident nostrum eius earum.
                      </p>
                      <a href="#">
                        <em>Baca Selengkapnya</em>
                        <i className="fa-solid fa-arrow-right ms-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`carousel-item ${activeIndex === 3 ? "active" : ""}`}
              >
                <div className="container text-center">
                  <div className="row">
                    <div className="col-12 col-md-6 mb-4 mb-md-0">
                      <img src={logo3} alt="Sunscreen" className="img-fluid" />
                    </div>
                    <div className="col-12 col-md-6">
                      <p className="fs-4 text-start">Sunscreen</p>
                      <h3 className="text-start fw-semibold text-light">
                        Sunscreen para iblis
                      </h3>
                      <p className="text-start">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Odio, voluptatibus at exercitationem temporibus
                        suscipit cumque natus maxime modi! Velit maxime
                        dignissimos provident nostrum eius earum.
                      </p>
                      <a href="#">
                        <em>Baca Selengkapnya</em>
                        <i className="fa-solid fa-arrow-right ms-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
