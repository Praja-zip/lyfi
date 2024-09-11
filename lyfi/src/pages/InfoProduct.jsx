import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/LandingPage/Footer";
import ImageProduct from "../components/InfoProduct/ImageProduct";
import DetailProduct from "../components/InfoProduct/DetailProduct";
import Product from "../components/LandingPage/Product";

const InfoProduct = () => {
  return (
    <>
      <Navbar />
      <div class="container-info-product text-center">
        <div class="row">
          <div class="col">
            <ImageProduct />
          </div>
          <div class="col">
            <DetailProduct />
          </div>
        </div>
      </div>
      <Product />
      <Footer />
    </>
  );
};
export default InfoProduct;
