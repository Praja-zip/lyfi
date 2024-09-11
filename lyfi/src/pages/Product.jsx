import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/LandingPage/Footer";
import Header from "../components/Product/Header";
import ProductList from "../components/Product/ProductList";
import "./../components/Product/Product.css";
import "./../components/InfoProduct/InfoProduct.css"
const Product = () => {
  return (
    <>
      <Navbar />
      <div className="product">
        <Header />
        <ProductList />
        <Footer />
      </div>
    </>
  );
};

export default Product;
