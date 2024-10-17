import React from "react";
import "./Footer.css";
import logo from "./../../assets/LandingPage/logomerge.png";
import "./LandingPage.css";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="container-footer">
        <footer d-flex>
          <div className="main">
            <img src={logo} alt="" />
            <p>
              {" "}
              perawatan menyeluruh yang meratakan warna kulit, menjaga
              kelembaban dan memberikan kilau alami.
            </p>
          </div>
          <div className="detail">
            <ul className="me-5">
              <h5>Our Pages</h5>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/product">Product</Link>
              </li>
              <li>
                <Link to="/bundling">Bundling</Link>
              </li>
            </ul>
            <ul>
              <h5>Contact</h5>
              <li>
                <Link to="/"></Link>
              </li>
              <li>
                <i class="fa-brands fa-instagram me-2"></i>
                <Link to="/">Instagram</Link>
              </li>
              <li>
                <i class="fa-brands fa-whatsapp me-2"></i>
                <Link to="/">Whatsapp</Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Footer;
