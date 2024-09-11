import React from "react";
import Background from "./../../assets/Bundling/bundling.png";

const HeaderBundling = () => {
  return (
    <>
      <div className="product-header-container">
        <img className="product-header" src={Background} alt="" />
        <div className="product-content">
          <h1 className="mt-5 fs-1">BUNDLING</h1>
        </div>
      </div>{" "}
    </>
  );
};
export default HeaderBundling;
