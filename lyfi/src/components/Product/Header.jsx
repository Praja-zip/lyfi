import React from "react";
import Background from "../../assets/Product/bgProduct.jpeg";
import "./Product.css";

const Header = () => {
  return (
    <>
      <div className="product-header-container">
        <img className="product-header" src={Background} alt="" />
        <div className="product-content">
          <h1 className="mt-5 fs-1">PRODUCT</h1>
        </div>
      </div>
    </>
  );
};
export default Header;
