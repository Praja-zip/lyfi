import React from "react";
import "./LandingPage.css";
import logo from "./../../assets/LandingPage/LYFI.png";
import girl from "./../../assets/LandingPage/girl.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-home text-center">
      <div
        className="row detail-home d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col teks-left text-left">
          <div className="text mb-3">
            <h1>
              Timeless Beauty, <br />
              Timeless You
            </h1>
          </div>
          <div className="text">
            <Link to={"/Product"} href="#">
              <em>View Product</em>
              <i className="fa-solid fa-arrow-right ms-3"></i>
            </Link>
            <img src={logo} alt="" className="logo-home" />
          </div>
        </div>
        <div className="col image-girl">
          <img src={girl} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
