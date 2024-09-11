import React from "react";
import "./Footer.css";
import logo from "./../../assets/LandingPage/logomerge.png";
import "./LandingPage.css"

const Footer = () => {
  return (
    <>
      <div className="container-footer">
        <footer d-flex>
          <div className="main">
            <img src={logo} alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              porro, consequatur optio rerum quo et!
            </p>
          </div>
          <div className="detail">
            <ul className="me-5">
              <h5>Home</h5>
              <li>
                <a href="">Our Product</a>
              </li>
              <li>
                <a href="">About the Brand</a>
              </li>
              <li>
                <a href="">Top Categories</a>
              </li>
              <li>
                <a href="">Question</a>
              </li>
            </ul>
            <ul className="me-5">
              <h5>Product</h5>
              <li>
                <a href="">Product</a>
              </li>
              <li>
                <a href="">Product</a>
              </li>
              <li>
                <a href="">Product</a>
              </li>
            </ul>
            <ul className="me-5">
              <h5>Discount</h5>
              <li>
                <a href="">Discount Today</a>
              </li>
              <li>
                <a href="">Bundling</a>
              </li>
              <li>
                <a href="">Voucher</a>
              </li>
            </ul>
            <ul>
              <h5>Contact</h5>
              <li>
                <a href=""></a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Footer;
